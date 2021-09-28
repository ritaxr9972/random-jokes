const team = [];

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getTeams = (request, response) => {
  const responseJSON = {
    team,
  };
  respondJSON(request, response, 200, responseJSON);
};

const addTeam = (request, response, body) => {
  const responseJSON = {
    message: 'name are required',
  };

  if (!body) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  const responseCode = 201;

  team.push(body);

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

module.exports = {

  getTeams,
  addTeam,
};
