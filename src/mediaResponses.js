const fs = require('fs');
const path = require('path');

const loadFile = (request, response, url, dataype) => {
  const file = path.resolve(__dirname, `${url}`);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }
    let { range } = request.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt([1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Tpye': dataype,
    });
    const stream = fs.createReadStream(file, { start, end });
    stream.on('open', () => {
      stream.pipe(response);
    });
    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });
    return stream;
  });
};

const getPokeball = (request, response) => {
  loadFile(request, response, '../client/Poke_Ball_icon.png', 'image/png');
};

const getPikachu = (request, response) => {
  loadFile(request, response, '../client/clipart2229537.png', 'image/png');
};

const getBling = (request, response) => {
  loadFile(request, response, '../client/bling.mp3', 'audio/mpeg');
};

module.exports.getPokeball = getPokeball;
module.exports.getPikachu = getPikachu;
module.exports.getBling = getBling;
