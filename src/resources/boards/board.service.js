const usersRepository = require('./board.memory.repository');
const tasksRepository = require('../tasks/task.memory.repository');

const getAll = () => usersRepository.getAll();
const addBoard = user => usersRepository.addBoard(user);
const getBoardById = id => usersRepository.getBoardById(id);
const updateBoardById = (id, body) => usersRepository.updateBoardById(id, body);
const deleteBoardById = id => {
  tasksRepository.deleteTaskByBoardId(id);
  usersRepository.deleteBoardById(id);
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
