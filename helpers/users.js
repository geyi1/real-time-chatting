const users = [];

function addUser(info) {
  users.push(info);
}

function getRoomUsers(room) {
  return users.filter((each) => {
    return each.room === room;
  });
}

function removeUser(id) {
  let index = users.findIndex((each) => {
    return each.clientId === id;
  });
  let username = users[index].username;
  users.splice(index, 1);
  return username;
}

function findUser(id) {
  let index = users.findIndex((each) => {
    return each.clientId === id;
  });
  return users[index];
}

module.exports = {
  addUser,
  getRoomUsers,
  removeUser,
  findUser,
};
