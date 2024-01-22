import { length } from "file-loader";

const getFreeTimes = (schedule) => {
  // vision: taking in the input from the schedule, this should output a dictionary of the form
  // duration: [array of times the user is available for that duration]
  // note should be sorted by duration and within each array it should be sorted by date
};

const formatTasks = (tasks) => {
  // given all the tasks object from user input, return an object of the form
  // duration: [array of tasks with that duration]
  let tasksObj = {};

  for (task of tasks) {
    const duration = task.duration;
    if (Object.keys(tasksObj).includes(`${duration}`)) {
      tasksObj[duration].push(task);
    } else {
      Object.assign(tasksObj, { [duration]: [task] });
    }
  }

  return tasksObj;
};

const checkDeadline = (task, time) => {
  // return true if the time of task.deadline is before the time block, false otherwise
};

const createSchedule = (scheduleObj, tasksObj) => {
  // array of all the tasks sorted so soonest deadline task is first
  let tasksByDeadline = [];
  let schedule = {};

  const findTime = (task) => {
    const duration = task.duration;

    // binary search the schedule object keys to find available time >= duration
    const timeBlocks = Object.keys(scheduleObj);
    let start = 0,
      end = timeBlocks.length - 1;

    while (start <= end) {
      mid = Math.floor((start + end) / 2);
      if (timeBlocks[mid] >= duration) {
        if (checkDeadline(task, timeBlocks[mid][0])) return timeBlocks[mid][0], timeBlocks[mid];
      } else {
        start += 1;
      }
    }
    // failed to schedule task
    return false, null;
  };

  const updateSchedule = (timeBlock, blockLength, duration) => {
    // given a time and blockLength (total time available) and duration of the task,
    // update schedule such that time for the duration of the task is removed from the timeBlock
    //     const times = scheduleObj[duration];
    //     for (let i = 0; i < times.length; i++) {
    //       if (time == times[i]) {
    //         // might have to update depending on syntax of schedule object
    //         delete times[i]; // NOTE --- change to instead of deleting, shorten the time block
    //         break;
    //       }
    //     }
    //     // no more times left of that duration -- delete from schedule object
    //     if (!times) {
    //       delete scheduleObj[duration];
    //     }
  };

  const scheduleTask = (task, time, blockLength) => {
    Object.assign(schedule, { time: task });

    // update schedule
    const duration = task.duration;
    updateSchedule(time, blockLength, duration);
  };

  while (tasksByDeadline) {
    const currentTask = tasksByDeadline.shift(); // get first element from tasks list
    let time,
      blockLength = findTime(currentTask);

    if (!time) {
      // couldn't find a time block to do entire task
      // split task in half and try scheduling that instead
      newTasks = [
        { ...currentTask, duration: Math.floor(duration / 2) },
        { ...currentTask, duration: Math.ceil(duration / 2) },
      ];
      tasksByDeadline = newTasks.concat(tasksByDeadline);
    } else {
      // schedule task for the found time block
      scheduleTask(currentTask, time, blockLength);
    }
  }
};

// testing

const myTasks = [
  { name: "be gay do crime", duration: 60 },
  { name: "be gayer and do more crime", duration: 80 },
  { name: "hellloooooo", duration: 60 },
];

console.log(formatTasks(myTasks));
