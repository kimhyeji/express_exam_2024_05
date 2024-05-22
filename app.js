import express from 'express';

const app = express();
const port = 3000;

const musicList = [
    {
        title: "마그네틱",
        artist: "아일릿",
    },
    {
        title: "봄날",
        artist: "BTS",
    },
];

app.get('/music', (req, res) => {
  res.json(musicList);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})