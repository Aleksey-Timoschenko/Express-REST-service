let boardsArray = [];

const getAll = async () => {
  return boardsArray;
};

const addBoard = async board => {
  const boards = await getAll();
  const addFlag = boards.push(board);
  if (!addFlag) {
    throw new Error("Couldn't add new board");
  }
};

const getBoardById = async id => {
  const boards = await getAll();
  const findBoard = boards.find(board => board.id === id);
  if (findBoard) {
    return findBoard;
  }
  throw new Error('Board not found');
};

const updateBoardById = async (id, body) => {
  let findFlag = false;
  const boards = await getAll();

  boardsArray = boards.map(board => {
    if (board.id === id) {
      findFlag = true;
      return { ...board, ...body };
    }
    return board;
  });
  if (!findFlag) {
    throw new Error('Board not found');
  }
};

const deleteBoardById = async id => {
  let findFlag = false;
  const boards = await getAll();
  boardsArray = boards.filter(board => {
    if (board.id === id) {
      findFlag = true;
      return false;
    }
    return board;
  });
  if (!findFlag) {
    throw new Error('Board not found');
  }
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
