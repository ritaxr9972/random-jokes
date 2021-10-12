const teams = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const returnXML = (request,response,params) => {
  const teamName = String(params.name);
  if (teams[teamName]) {
    const responseXML = `
    <response>
        <name>${teams[teamName].name}</name>
        <team>${JSON.stringify(teams[teamName].team)}</team>
    </response>
`;
    respondXML(request, response, 200, responseXML);
  } else {
      const responseXML = `<response>Not found</response>`
    respondXML(request, response, 404, responseXML);
  }
};

const returnTeamXML = (request,response) => {
    let keysArray = Object.keys(teams);
    let xml = '<response>';
    for(let i =0; i<keysArray.length;i++){
        xml += '<name>${teams[keysArray[i]].name}</name>';
        xml += '<team>${teams[keysArray[i]].team}</team>';
    }
    xml+= '</respond>';
    respondXML(request,response,200,xml);
};

const returnTeamName = (request, response, params) => {
  const teamName = String(params.name);
  if (teams[teamName]) {
    respondJSON(request, response, 200, teams[teamName]);
  } else if (!teams[teamName]) {
    const responseJSON = {
      Error: 'Team not Found',
    };
    respondJSON(request, response, 404, responseJSON);
  }
};

const getTeams = (request, response) => {
  respondJSON(request, response, 200, teams);
};

const addTeam = (request, response, body) => {
  const responseJSON = {
    message: 'name are required',
  };

  if (!body) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;
  if (teams[body.TeamName]) { // user exists
    responseCode = 204; // updating, so "no content"
  } else {
    teams[body.TeamName] = {}; // make a new user
  }

  teams[body.TeamName].name = body.TeamName;
  teams[body.TeamName].team = body.Team;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
    responseJSON.message = 'Successfully Updated';
  return respondJSONMeta(request, response, responseCode,responseJSON);
};

const getResponseHeader = (request, response, acceptedTypes) => {
  const header = {
    'Content-Type': acceptedTypes,
    'Content-Length': getBinarySize(JSON.stringify(teams)),
  };
  response.writeHead(200, header);
  response.end();
};

module.exports = {

  getTeams,
  addTeam,
  returnTeamName,
  getBinarySize,
  returnXML,
  getResponseHeader,
    returnTeamXML,
};
