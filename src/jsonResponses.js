const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
];

const randomJokeXML = (max = 1) => {
  const jokesToPrint = [];
  const max2 = Number(max);

  // store jokes in an array
  for (let i = 0; i < max2; i++) {
    jokesToPrint.push(jokes[(Math.floor(Math.random() * jokes.length))]);
  }
  const responseXML = `
    <response>
        <question>${jokesToPrint.q}</question>
        <answer>${jokesToPrint.a}</answer>
    </response>
`;
  const responseMultipleXML = `
    <response>
        <question>${jokesToPrint[0].q}</question>
        <answer>${jokesToPrint[0].a}</answer>
        <question>${jokesToPrint[1].q}</question>
        <answer>${jokesToPrint[1].a}</answer>
    </response>
`;
  if (max2 > 1) {
    return responseMultipleXML;
  }
  return responseXML;
};

const randomJoke = (max = 1) => {
  const jokesToPrint = [];
  let max2 = Number(max);
  max2 = !max2 ? 1 : max2;
  max2 = max2 < 1 ? 1 : max2;
  // store jokes in an array
  for (let i = 0; i < max2; i++) {
    jokesToPrint.push(jokes[(Math.floor(Math.random() * jokes.length))]);
  }
  return JSON.stringify(jokesToPrint);
};

const getRandomJokeResponse = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(randomJoke(params.max));
  response.end();
};

const getRandomJokeResponseXML = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.write(randomJokeXML(params.max));
  response.end();
};

const getResponse = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'application/json') {
    getRandomJokeResponse(request, response, params);
  } else if (acceptedTypes[0] === 'text/xml') {
    getRandomJokeResponseXML(request, response, params);
  } else {
    getRandomJokeResponse(request, response, params);
  }
};

module.exports.getResponse = getResponse;
