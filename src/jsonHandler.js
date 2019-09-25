const users = {}; // purely in memory

// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get user object
// should calculate a 200
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about user object
// should calculate a 200
const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const addUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  if (users[newUser.createdAt]) {
    users[newUser.createdAt] = newUser;

    // return a 204 updated status
    return respondJSON(request, response, 204, newUser);
  }
  // create the new user and return 201 status
  users[newUser.createdAt] = newUser;
  return respondJSON(request, response, 201, newUser);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
