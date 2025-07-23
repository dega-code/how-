const express = require('express');
const { createCanvas } = require('canvas');

const app = express();

const width = 400;
const height = 300;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

let posX = 0;

app.get('/canvas.jpg', (req, res) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(posX, height / 2, 30, 0, Math.PI * 2);
  ctx.fill();

  posX += 5;
  if (posX > width) posX = 0;

  res.setHeader('Content-Type', 'image/jpeg');
  const stream = canvas.createJPEGStream();
  stream.pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
