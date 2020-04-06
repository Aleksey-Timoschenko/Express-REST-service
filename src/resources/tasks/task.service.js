const taskRepository = require('./task.memory.repository');

const getAll = () => taskRepository.getAll();
const addTask = (boardId, task) => taskRepository.addTask(boardId, task);
const getTaskByBoardId = id => taskRepository.getTaskByBoardId(id);
const getTaskByBoardAndTaskId = (id, boardId) =>
  taskRepository.getTaskByBoardAndTaskId(id, boardId);
const updateTaskById = (id, boardId, body) =>
  taskRepository.updateTaskById(id, boardId, body);
const deleteTaskById = (id, boardId) =>
  taskRepository.deleteTaskById(id, boardId);
const deleteTaskByBoardId = boardId =>
  taskRepository.deleteTaskByBoardId(boardId);
const deleteUserFromTaskByUserId = userId =>
  taskRepository.deleteUserFromTaskByUserId(userId);

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
