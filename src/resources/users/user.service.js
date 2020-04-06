const UserModel = require('./user.model.js');
const usersRepo = require('./user.memory.repository.js');

const getAll = async () => {
  const allUsers = await usersRepo.getAll();

  return allUsers.map(user => UserModel.toResponse(user));
};

const addUser = async userParams => {
  const newUser = new UserModel(userParams);
  const createdUser = await usersRepo.addUser(newUser);

  if (createdUser) {
    return UserModel.toResponse(createdUser);
  }

  return null;
};

const getUserById = async userId => {
  const userById = await usersRepo.getUserById(userId);

  if (userById) {
    return UserModel.toResponse(userById);
  }

  return null;
};

const updateUserById = async (userId, userNewParams) => {
  const { isUserWasUpdated, updatedUser } = await usersRepo.updateUserById(
    userId,
    userNewParams
  );

  if (isUserWasUpdated) {
    return UserModel.toResponse(updatedUser);
  }

  return null;
};

const deleteUserById = async userId => {
  const userWasDeleted = await usersRepo.deleteUserById(userId);

  return userWasDeleted;
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
