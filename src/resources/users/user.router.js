const router = require('express').Router();

const networkValidation = require('../../validation/networkValidation.js');
const tasksService = require('../tasks/task.service.js');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await usersService.getAll();

      return res.status(200).json(users);
    } catch (e) {
      console.log('Error by getting all users: ', e);

      return res.status(500);
    }
  })
  .post(networkValidation.userParamsValidationMiddleware, async (req, res) => {
    try {
      const { name, login, password } = req.body;
      const newUserParams = { name, login, password };
      const createdUser = await usersService.addUser(newUserParams);

      if (!createdUser) {
        throw new Error('User was not created');
      }

      return res.status(200).json(createdUser);
    } catch (e) {
      console.log('Error by adding new user: ', e);

      return res.status(500);
    }
  });

router
  .route('/:id')
  .all(networkValidation.checkRequestIdMiddleware)
  .get(async (req, res) => {
    try {
      const userId = req.params.id;
      const userById = await usersService.getUserById(userId);

      if (userById) {
        return res.status(200).json(userById);
      }

      return res.status(404).send('User was not found');
    } catch (e) {
      console.log('Error by finding user by id: ', e);

      return res.status(500);
    }
  })
  .put(networkValidation.userParamsValidationMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, login, password } = req.body;
      const userNewParams = { name, login, password };
      const updatedUserById = await usersService.updateUserById(
        userId,
        userNewParams
      );

      if (updatedUserById) {
        return res.status(200).json(updatedUserById);
      }

      return res.status(404).send('User was not found');
    } catch (e) {
      console.log('Error by finding user by id: ', e);

      return res.status(500);
    }
  })
  .delete(async (req, res) => {
    const userId = req.params.id;
    const userWasDeleted = await usersService.deleteUserById(userId);

    await tasksService.deleteUserFromTaskByUserId(userId);

    if (userWasDeleted) {
      return res.status(204).send('The user has been deleted');
    }

    return res.status(404).send('User was not found');
  });

module.exports = router;
