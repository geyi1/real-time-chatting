// const users = [];
// const rooms = {};

// function addUser(info) {
//   users.push(info);
// }

// function getRoomUsers(room) {
//   return users.filter((each) => {
//     return each.room === room;
//   });
// }

// function removeUser(id) {
//   let index = users.findIndex((each) => {
//     return each.clientId === id;
//   });
//   let username = users[index].username;
//   users.splice(index, 1);
//   return username;
// }

// function findUser(id) {
//   let index = users.findIndex((each) => {
//     return each.clientId === id;
//   });
//   return users[index];
// }

// module.exports = {
//   addUser,
//   getRoomUsers,
//   removeUser,
//   findUser,
// };

const users = [];
const allRooms = {};
const userMap = new Map();

function addUser(info, clientId) {
  if (allRooms[info.room]) {
    allRooms[info.room].push({ username: info.username, clientId });
    userMap.set(clientId, { username: info.username, rooms: [info.room] });
  } else {
    allRooms[info.room] = [];
    allRooms[info.room].push({ username: info.username, clientId });
    userMap.set(clientId, { username: info.username, rooms: [info.room] });
  }
}

function getRoomUsers(room) {
  return allRooms[room].map((each) => {
    return each.username;
  });
}

function removeUser(clientId) {
  let info = userMap.get(clientId);
  let rooms = info.rooms;
  for (let each of rooms) {
    let index = allRooms[each].findIndex((element) => {
      return element.clientId === clientId;
    });
    allRooms[each].splice(index, 1);
  }
  let username = info.username;
  return username;
}

function findUser(clientId) {
  return userMap.get(clientId);
}

module.exports = {
  addUser,
  getRoomUsers,
  removeUser,
  findUser,
};
