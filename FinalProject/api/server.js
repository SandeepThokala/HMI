const express = require('express');
const fsp = require('fs').promises;
const app = express();
const port = process.env.PORT || 5001;

// Middleware for parsing req bodies to JSON (req.body)
app.use(express.json());

app.get('/api/volume', (req, res, next) => {
  fsp.readFile('./data.json')
    .then((data) => {
      const json = JSON.parse(data);
      res.send({ volume: json.volume });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Data file not found or corrupt');
    });
});

app.put('/api/volume', (req, res) => {
  fsp.readFile('./data.json')
    .then((data) => {
      const json = JSON.parse(data);
      json.volume = Number(req.body.volume);
      fsp.writeFile('./data.json', JSON.stringify(json, null, 2))
        .then(() => {
          res.send({ volume: Number(req.body.volume) });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Data file not found or corrupt');
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Data file not found or corrupt');
      });
});

app.get('/api/bluetooth', (req, res, next) => {
  fsp.readFile('./data.json')
    .then((data) => {
      const json = JSON.parse(data);
      res.send(json.bluetooth.devices.map(device => device.deviceName));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Data file not found or corrupt');
    });
});

app.get('/api/bluetooth/connected', (req, res, next) => {
  fsp.readFile('./data.json')
    .then((data) => {
      const json = JSON.parse(data);
      res.send(json.bluetooth.devices.find(device => device.deviceId === json.bluetooth.connected));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Data file not found or corrupt');
    });
});

app.put('/api/bluetooth/connected', (req, res) => {
  fsp.readFile('./data.json')
    .then((data) => {
      const json = JSON.parse(data);
      const newId = Number(req.body.deviceId);
      json.bluetooth.connected = newId;

      fsp.writeFile('./data.json', JSON.stringify(json, null, 2))
        .then(() => {
          res.send(json.bluetooth.devices.find(device => device.deviceId === newId));
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Data file not found or corrupt');
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Data file not found or corrupt');
      });
});

// Path params
app.get('/api/songs/:id', (req, res) => {
  fsp.readFile('./data.json')
    .then((data) => {
      const json = JSON.parse(data);
      res.send(json.playlist.find(song => song.songId == req.params.id));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Data file not found or corrupt');
    });
});

const logError = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const handleError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send('An error occured');
};

// Error handling middleware
app.use(logError);
app.use(handleError);

app.listen(port, () => {
  console.log(`Final project API listening on port ${port}`);
});
