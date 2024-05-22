import express from 'express';
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "korad",
    password: "kor123414",
    database: "music_list",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

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

app.get('/music', async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM music ORDER BY id DESC");

  res.json(rows);
});

app.get('/music/:id', async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM music WHERE id = ?", [id]);

    res.json(rows[0]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})