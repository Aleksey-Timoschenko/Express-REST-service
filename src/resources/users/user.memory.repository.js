let usersCollection = [];

const getAll = async () => {
  return usersCollection;
};

const addUser = async user => {
  const oldUserCollectionLength = usersCollection.length;
  const newUsersCollectionLength = usersCollection.push(user);

  if (newUsersCollectionLength > oldUserCollectionLength) {
    return user;
  }

  return null;
};

const getUserById = async userId => {
  const userById = usersCollection.find(user => user.id === userId);

  return userById || null;
};

const updateUserById = async (userId, userNewParams) => {
  let isUserWasUpdated = false;
  let updatedUser = {};

  usersCollection = usersCollection.map(user => {
    if (user.id === userId) {
      isUserWasUpdated = true;
      updatedUser = {
        ...user,
        ...userNewParams
      };

      return updatedUser;
    }

    return user;
  });

  return { isUserWasUpdated, updatedUser };
};

const deleteUserById = async userId => {
  let userWasDeleted = false;

  usersCollection = usersCollection.filter(user => {
    if (user.id !== userId) {
      return true;
    }

    userWasDeleted = true;

    return false;
  });

  return userWasDeleted;
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
