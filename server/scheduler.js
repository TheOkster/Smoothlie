const { compareAsc } = require("date-fns");
const TIME_INTERVAL = 15;

const getFreeTimes = (schedule) => {
  console.log(`schedule ${schedule}`);
  schedule.sort(compareAsc);

  // vision: taking in the input from the schedule, this should output a dictionary of the form
  // duration: [array of times the user is available for that duration]
  // note should be sorted by duration and within each array it should be sorted by date --- how to do this

  // take all available times and put it in the form latest time: duration
  const timeBlocks = new Map();
  for (time of schedule) {
    const previousTime = time.getTime() - TIME_INTERVAL * 60 * 1000;
    if (timeBlocks.has(previousTime)) {
      // update time blocks to have newer latest time and new duration
      const duration = timeBlocks.get(previousTime);
      timeBlocks.set(time.getTime(), duration + TIME_INTERVAL);
      timeBlocks.delete(previousTime);
    } else {
      // create a new time block
      timeBlocks.set(time.getTime(), TIME_INTERVAL);
    }
  }

  // convert timeblocks to be of the form duration: [array of times the user is available for that duration]
  const scheduleObj = new Map();
  for (const [latestTime, duration] of timeBlocks.entries()) {
    const startTime = latestTime - duration * 60 * 1000;
    if (scheduleObj.has(duration)) {
      scheduleObj.get(duration).push(startTime);
    } else {
      scheduleObj.set(duration, [startTime]);
    }
  }

  // sort keys in ascending order
  const sorted = [...scheduleObj].sort();
  return new Map(sorted);
};

const formatTasks = (tasks) => {
  // given all the tasks object from user input, return an object of the form
  // duration: [array of tasks with that duration]
  let tasksObj = new Map();

  for (task of tasks) {
    const duration = task.duration;
    if (tasksObj.has(duration)) {
      tasksObj.get(duration).push(task);
    } else {
      tasksObj.set(duration, [task]);
    }
  }

  return tasksObj;
};

const checkDeadline = (task, time) => {
  // return true if the time of task.deadline is after the time block, false otherwise
  deadline2 = new Date(task.deadline);
  if (deadline2.getTime() > time + task.duration * 60 * 1000) {
    return true;
  }
  return false;
};

const findTime = (scheduleObj, task) => {
  // return a tuple time, length of time fblock
  const duration = task.duration;
  // console.log(duration);
  // binary search the schedule object keys to find available time >= duration --- might need to change this
  const timeBlocks = Array.from(scheduleObj.keys());

  let start = 0,
    end = timeBlocks.length - 1;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (timeBlocks[mid] >= duration) {
      // not the best solution - will always choose mid even if there is a smaller time block that works
      const blockLength = timeBlocks[mid];
      if (checkDeadline(task, scheduleObj.get(blockLength)[0])) {
        return [scheduleObj.get(blockLength)[0], blockLength];
      } else {
        start += 1;
      }
    } else {
      start += 1;
    }
  }
  // failed to schedule task
  return [false];
};

const updateSchedule = (scheduleObj, time, blockLength, taskDuration) => {
  // given a time and blockLength (total time available) and duration of the task,
  // update scheduleObj such that time for the duration of the task is removed from the timeBlock
  const newTime = time + taskDuration * 60 * 1000;
  const newBlockLength = blockLength - taskDuration;

  // remove old time
  const blocks = scheduleObj.get(blockLength);
  if (blocks.length === 1) {
    // remove this key entirely because it will become an empty list after
    var assert = require("assert");
    assert(blocks[0] === time); // double check the only value in the array is just the time
    scheduleObj.delete(blockLength);
  } else {
    const index = blocks.indexOf(time);
    blocks.splice(index, 1);
  }

  // add new time to schedule object if entire time block not used up
  if (newBlockLength > 0) {
    if (scheduleObj.has(newBlockLength)) {
      // note this can be optimized by just looping through entire list and seeing where we can add new time - do if time
      scheduleObj.get(newBlockLength).push(newTime);
      scheduleObj.get(newBlockLength).sort(compareAsc);
    } else {
      scheduleObj.set(newBlockLength, [newTime]);
    }
  } else if (newBlockLength < 0) {
    console.log("used a block that was not long enough for task... sus things are happening!");
  }
};

const scheduleTask = (newSchedule, scheduleObj, task, time, blockLength) => {
  const startTime = new Date(time);
  const endTime = new Date(time + task.duration * 60 * 1000);
  newSchedule.push({
    title: task.name,
    start: startTime,
    end: endTime,
  });
  // update schedule object
  const duration = task.duration;
  updateSchedule(scheduleObj, time, blockLength, duration);
};

const createSchedule = (tasks, schedule) => {
  // returns an array where the first element is a boolean indicating if all tasks were scheduled
  // and second element is an array of events that were scheduled
  // After being passed through the API, it recognizes both as Arrays (as in Array.isArray returns True)
  // but the date objects inside are still strings which is why I did this
  const tasks_new = tasks.map((obj) => ({ ...obj, deadline: new Date(obj.deadline) }));
  const schedule_new = schedule.map((obj) => new Date(obj));
  console.log(`task list ${JSON.stringify(tasks_new)}`);

  const tasksObj = formatTasks(tasks_new);
  const scheduleObj = getFreeTimes(schedule_new);
  // array of all the tasks sorted so soonest deadline task is first
  let tasksByDeadline = [...tasks_new].sort((task1, task2) => {
    compareAsc(task1.deadline, task2.deadline);
  });

  const newSchedule = [];

  const startTime = Date.now();

  while (tasksByDeadline.length > 0) {
    if (Date.now() - startTime > 10 * 1000) {
      // ten seconds have passed and haven't fully scheduled everything -- break from loop
      console.log("could not find schedule that works for all tasks");
      return [false, newSchedule];
    }

    const currentTask = tasksByDeadline.shift(); // get first element from tasks list and remove it

    // find a time that works for the current task
    const res = findTime(scheduleObj, currentTask);
    const time = res[0];
    const blockLength = res[1];

    if (!time) {
      // couldn't find a time block to do entire task
      // split task in half and try scheduling that instead
      const task1 = currentTask;
      task1.duration = Math.floor(currentTask.duration / 2);
      const task2 = currentTask;
      task2.duration = Math.ceil(currentTask.duration / 2);
      newTasks = [task1, task2];
      tasksByDeadline = newTasks.concat(tasksByDeadline);
    } else {
      // schedule task for the found time block
      scheduleTask(newSchedule, scheduleObj, currentTask, time, blockLength);
    }
  }

  return [true, newSchedule];
};

// testing

const myTasks = [
  { name: "be gay do crime", duration: 30, deadline: new Date(2024, 1, 25, 1, 0, 0) },
  { name: "be gayer and do more crime", duration: 60, deadline: new Date(2024, 1, 26, 1, 0, 0) },
  { name: "hellloooooo", duration: 15, deadline: new Date(2024, 1, 28, 5, 15, 0) },
];

const schedule = [
  new Date(2024, 1, 24, 9, 0, 0),
  new Date(2024, 1, 24, 9, 15, 0),
  new Date(2024, 1, 24, 9, 30, 0),
  new Date(2024, 1, 25, 8, 30, 0),
  new Date(2024, 1, 25, 8, 45, 0),
  new Date(2024, 1, 21, 11, 15, 0),
];

// const scheduleObj = getFreeTimes(schedule);
// console.log(scheduleObj);

// const tasksObj = formatTasks(myTasks);

// console.log(`task deadline: ${myTasks[0].deadline.getTime()}`);

// const res = findTime(scheduleObj, myTasks[0]);

// const myTime = res[0];
// const blockLength = res[1];

// updateSchedule(scheduleObj, myTime, blockLength, myTasks[0].duration);

// console.log(scheduleObj);

// console.log(createSchedule(myTasks, schedule));

module.exports = {
  createSchedule,
};
