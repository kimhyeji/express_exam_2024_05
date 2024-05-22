# DB 생성
DROP DATABASE IF EXISTS music_list;
CREATE DATABASE music_list;
USE music_list;

# 테이블 생성
CREATE TABLE music (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    regDate DATETIME NOT NULL,
    title VARCHAR(200) NOT NULL,
    artist VARCHAR(50) NOT NULL
);

# 데이터 생성
INSERT INTO music
SET regDate = NOW(),
title = "마그네틱",
artist = "아일릿";

INSERT INTO music
SET regDate = NOW(),
title = "봄날",
artist = "BTS";

INSERT INTO music
SET regDate = NOW(),
title = "해야",
artist = "아이브";

# 데이터 조회
SELECT * FROM music;