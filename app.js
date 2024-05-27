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
app.use(express.json());
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

// 데이터 리스트 조회
app.get('/music', async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM music ORDER BY id DESC");

  res.json(rows);
});

// 데이터 단건 조회
app.get('/music/:id', async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM music WHERE id = ?", [id]);

    // 데이터가 없으면 not found 출력 후 종료
    if ( rows.length == 0 ) {
        res.status(404).send("not found");
        return;
    }

    res.json(rows[0]);
});

// 등록
app.post('/music', async (req, res) => {
    const { title, artist } = req.body;

    if ( !title ) {
        res.status(400).json({
            msg: "title required"
        });
        return;
    }

    if ( !artist ) {
        res.status(400).json({
            msg: "title required"
        });
        return;
    }

    const [rs] = await pool.query(
        `
        INSERT INTO music
        SET regDate = NOW(),
        title = ?,
        artist = ?
        `,
        [title, artist]
    );

    res.status(201).json({
        id: rs.insertId,
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})