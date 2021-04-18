var express = require('express');
var democracy = require('democracy');
var dotenv = require('dotenv');

dotenv.config({ path: process.env.ENV_PATH });

var app = express();
var port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
var hosts = process.env.HOSTS ? process.env.HOSTS.split(',') : [];

var dem = new democracy({
  source: `0.0.0.0:${port}`,
  peers: hosts,
});

dem.on('added', (data) => {
  console.log('Added: ', data);
});

dem.on('removed', (data) => {
  console.log('Removed: ', data);
});

dem.on('elected', (data) => {
  console.log('You have been elected leader!');
});

app.get('/', (req, res, next) => {
  res.send('hello world!');
});

app.get('/leader', (req, res, next) => {
  res.send(dem.leader());
});

app.get('/is-leader', (req, res, next) => {
  res.send(dem.isLeader());
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
