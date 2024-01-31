const { compareAsc } = require("date-fns");
const TIME_INTERVAL = 15;

const getFreeTimes = (schedule) => {
  schedule.sort(compareAsc);

  // vision: taking in the input from the schedule, this should output a dictionary of the form
  // duration: [array of times the user is available for that duration]
  // note should be sorted by duration and within each array it should be sorted by date --- how to do this

  // take all available times and put it in the form latest time: duration
  const timeBlocks = new Map();
  for (time of schedule) {
    if (timeBlocks.has(time.getTime())) {
      // update time blocks to have newer latest time and new duration
      const duration = timeBlocks.get(time.getTime());
      timeBlocks.set(time.getTime() + TIME_INTERVAL * 60 * 1000, duration + TIME_INTERVAL);
      timeBlocks.delete(time.getTime());
    } else {
      // create a new time block
      timeBlocks.set(time.getTime() + TIME_INTERVAL * 60 * 1000, TIME_INTERVAL);
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
    description: task.notes,
    label: task.label,
    urgent: task.urgent,
    fruit: task.fruit,
    important: task.important,
  });
  // update schedule object
  const duration = task.duration;
  updateSchedule(scheduleObj, time, blockLength, duration);
};

const UrgentImpSort = (tasks) => {
  const output = {
    isUrgentIsImp: [],
    isUrgentNotImp: [],
    notUrgentIsImp: [],
    notUrgentNotImp: [],
  };
  for (task of tasks) {
    if (task.urgent && task.important) {
      output.isUrgentIsImp.push(task);
    } else if (task.urgent && !task.important) {
      output.isUrgentNotImp.push(task);
    } else if (!task.urgent && task.important) {
      output.notUrgentIsImp.push(task);
    } else {
      output.notUrgentNotImp.push(task);
    }
  }

  return output;
};

const formTasksQueue = (tasks) => {
  let queue = [];
  const UrgentImp = UrgentImpSort(tasks);
  const sortByDeadline = (task1, task2) => {
    return compareAsc(task1.deadline, task2.deadline);
  };
  // add all the urgent and important tasks first
  const isUrgentIsImp = [...UrgentImp.isUrgentIsImp];
  isUrgentIsImp.sort(sortByDeadline);
  queue = queue.concat(isUrgentIsImp);
  let middle = [];

  // add all the other tasks in the middle !
  const notUrgentIsImp = [...UrgentImp.notUrgentIsImp];
  notUrgentIsImp.sort(sortByDeadline);
  const isUrgentNotImp = [...UrgentImp.isUrgentNotImp].sort(sortByDeadline);

  console.log(`not urgent and important ${JSON.stringify(notUrgentIsImp)}`);

  let shorter = [];
  let longer = [];

  if (notUrgentIsImp.length >= isUrgentNotImp.length) {
    longer = notUrgentIsImp;
    shorter = isUrgentNotImp;
  } else {
    longer = isUrgentNotImp;
    shorter = notUrgentIsImp;
  }

  for (let i = 0; i < shorter.length; i++) {
    middle.push(notUrgentIsImp[i]);
    middle.push(isUrgentNotImp[i]);
  }

  // add all the tasks of the longer one
  middle = middle.concat(longer.slice(shorter.length));
  queue = queue.concat(middle);

  // add all the not urgent and not important tasks last
  queue = queue.concat([...UrgentImp.notUrgentNotImp].sort(sortByDeadline));

  return queue;
};

const cleanEvents = (events) => {
  let changed = true;
  let output = [...events];

  while (changed) {
    changed = false;
    for (let i = 0; i < output.length - 1; i++) {
      if (
        output[i].title === output[i + 1].title &&
        output[i].end.getTime() == output[i + 1].start.getTime()
      ) {
        output[i + 1].start = output[i].start;
        output = output.slice(i + 1);
        changed = true;
        break;
      }
    }
  }
  return output;
};

const createSchedule = (tasks, schedule) => {
  // returns an array where the first element is a boolean indicating if all tasks were scheduled
  // and second element is an array of events that were scheduled
  // After being passed through the API, it recognizes both as Arrays (as in Array.isArray returns True)
  // but the date objects inside are still strings which is why I did this
  // console.log(`task list ${JSON.stringify(tasks)}`);
  // Right now, it looks like the deadline is sometimes being passed as null which is why
  // the tasks_new deadline displays as null or the Unix epoch (Jan 1 1970)
  const tasks_new = tasks.map((obj) => ({ ...obj, deadline: new Date(obj.deadline) }));
  // Schedule seems to be working fine
  const schedule_new = schedule.map((obj) => new Date(obj));
  // console.log(`Schedule type ${typeof schedule_new[0]}`); //Object is what is to be expected
  // typeof Date objects returns Object
  // Inside the JSON.stringify the date looks like a string, but it
  // is in fact a date object (it's just the way stringiy works)
  console.log(`new task list ${JSON.stringify(tasks_new)}`);
  // console.log(`schedule list ${JSON.stringify(schedule_new)}`);

  const tasksObj = formatTasks(tasks_new);
  const scheduleObj = getFreeTimes(schedule_new);
  // array of all the tasks sorted so soonest deadline task is first
  let tasksQueue = formTasksQueue(tasks);

  const newSchedule = [];

  const startTime = Date.now();

  while (tasksQueue.length > 0) {
    // change to 15 minute block but need to take into account the case where it's a weird amount of time --- what's a better way to do this?
    if (Date.now() - startTime > 10 * 1000) {
      // ten seconds have passed and haven't fully scheduled everything -- break from loop
      console.log("could not find schedule that works for all tasks");
      return [false, cleanEvents(newSchedule)];
    }

    const currentTask = tasksQueue.shift(); // get first element from tasks list and remove it

    // if (currentTask.duration < 15) {
    //   console.log("could not schedule all tasks.");
    //   return [false, newSchedule];
    // }

    // find a time that works for the current task
    const res = findTime(scheduleObj, currentTask);
    const time = res[0];
    const blockLength = res[1];

    if (!time) {
      // couldn't find a time block to do entire task
      // split task in half and try scheduling that instead
      const task1 = { ...currentTask };
      task1.duration = Math.floor(currentTask.duration / 2);
      const task2 = { ...currentTask };
      task2.duration = Math.ceil(currentTask.duration / 2);
      newTasks = [task1, task2];
      tasksQueue = newTasks.concat(tasksQueue);
    } else {
      // schedule task for the found time block
      scheduleTask(newSchedule, scheduleObj, currentTask, time, blockLength);
    }
  }

  return [true, cleanEvents(newSchedule)];
};

// testing

const myTasks = [
  {
    name: "be cool",
    duration: 67,
    deadline: new Date(2024, 1, 25, 1, 0, 0),
    urgent: true,
    important: true,
  },
  // {
  //   name: "be cooler",
  //   duration: 60,
  //   deadline: new Date(2024, 1, 26, 1, 0, 0),
  //   urgent: true,
  //   important: false,
  // },
  // {
  //   name: "be coolest",
  //   duration: 60,
  //   deadline: new Date(2024, 1, 27, 1, 0, 0),
  //   urgent: false,
  //   important: true,
  // },
  // {
  //   name: "testing",
  //   duration: 60,
  //   deadline: new Date(2024, 1, 25, 1, 0, 0),
  //   urgent: true,
  //   important: false,
  // },
  // {
  //   name: "be cooler",
  //   duration: 60,
  //   deadline: new Date(2024, 1, 26, 3, 0, 0),
  //   urgent: false,
  //   important: true,
  // },

  // {
  //   name: "hellloooooo",
  //   duration: 15,
  //   deadline: new Date(2024, 1, 21, 5, 15, 0),
  //   urgent: true,
  //   important: true,
  // },
];

console.log(formTasksQueue(myTasks));

const tasks2 = [
  {
    _id: "65b2beeee5d86e522b7a7b14",
    name: "Test3",
    owner: "65b1451132f6af4052d69039",
    deadline: "2024-01-31T20:04:00.000Z",
    duration: 75,
    label: "",
    notes: "",
    source: "Manual",
    __v: 0,
  },
];

const schedule = [
  new Date(2024, 1, 24, 9, 0, 0),
  new Date(2024, 1, 24, 9, 15, 0),
  new Date(2024, 1, 24, 9, 30, 0),
  // new Date(2024, 1, 25, 8, 30, 0),
  // new Date(2024, 1, 25, 8, 45, 0),
  // new Date(2024, 1, 21, 11, 15, 0),
];

const schedule2 = [
  "Thu Jan 25 2024 08:00:00 GMT-0500 (Eastern Standard Time)",
  "Thu Jan 25 2024 08:15:00 GMT-0500 (Eastern Standard Time)",
  "Thu Jan 25 2024 08:30:00 GMT-0500 (Eastern Standard Time)",
  "Thu Jan 25 2024 08:45:00 GMT-0500 (Eastern Standard Time)",
  "Thu Jan 25 2024 09:00:00 GMT-0500 (Eastern Standard Time)",
  "Thu Jan 25 2024 09:15:00 GMT-0500 (Eastern Standard Time)",
  "Thu Jan 25 2024 09:30:00 GMT-0500 (Eastern Standard Time)",
  "Thu Jan 25 2024 09:45:00 GMT-0500 (Eastern Standard Time)",
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

const output = createSchedule(myTasks, schedule);
console.log(cleanEvents(output[1]));
// console.log(createSchedule(tasks2, schedule2));

module.exports = {
  createSchedule,
};
