let tasksArray = [];

const getAll = async () => {
  return tasksArray;
};

const addTask = async (boardId, task) => {
  const newTask = { ...task, boardId };
  const tasks = await getAll();
  const addFlag = tasks.push(newTask);

  if (!addFlag) {
    throw new Error("Couldn't add new task");
  } else {
    return newTask;
  }
};

const getTaskByBoardId = async id => {
  const tasks = await getAll();

  const findTasks = tasks.filter(task => task.boardId === id);
  if (findTasks) {
    return findTasks;
  }
  throw new Error('Task not found');
};

const getTaskByBoardAndTaskId = async (id, boardId) => {
  const tasks = await getAll();

  const findTask = tasks.find(
    task => task.boardId === boardId && task.id === id
  );
  if (findTask) {
    return findTask;
  }
  throw new Error('Task not found');
};

const updateTaskById = async (id, boardId, body) => {
  let findFlag = false;
  const tasks = await getAll();

  tasksArray = tasks.map(task => {
    if (task.boardId === boardId && task.id === id) {
      findFlag = true;
      return { ...task, ...body };
    }
    return task;
  });
  if (!findFlag) {
    throw new Error('Task not found');
  }
};

const deleteTaskById = async (id, boardId) => {
  let findFlag = false;
  const tasks = await getAll();
  tasksArray = tasks.filter(task => {
    if (task.boardId.toString() === boardId && task.id === id) {
      findFlag = true;
      return false;
    }
    return task;
  });
  if (!findFlag) {
    throw new Error('Task not found');
  }
};

const deleteTaskByBoardId = async boardId => {
  const tasks = await getAll();
  tasksArray = tasks.filter(task => task.boardId !== boardId);
};

const deleteUserFromTaskByUserId = async userId => {
  const tasks = await getAll();
  tasksArray = tasks.map(task => {
    if (task.userId === userId) {
      return { ...task, userId: null };
    }
    return task;
  });
};

module.exports = {
  getAll,
  addTask,
  getTaskByBoardId,
  getTaskByBoardAndTaskId,
  updateTaskById,
  deleteTaskById,
  deleteTaskByBoardId,
  deleteUserFromTaskByUserId
};
