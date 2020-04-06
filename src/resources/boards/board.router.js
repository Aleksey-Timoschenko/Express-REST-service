const router = require('express').Router();
const { Board } = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (_, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;

  try {
    const user = await boardService.getBoardById(id);
    res.json(Board.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = new Board(req.body);
  try {
    await boardService.addBoard(board);
    res.status(200).json(Board.toResponse(board));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    await boardService.updateBoardById(id, body);
    res.status(200).json();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;

  try {
    await boardService.deleteBoardById(id);
    res.status(200).json();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
