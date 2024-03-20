create Table users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(255),
    surname VARCHAR(255),
    patronymic VARCHAR(255),
    password VARCHAR(255),
    last_seen DATE,
    avatar VARCHAR(255),
    telephone VARCHAR(255),
    apartmentNum INT,
    roommates VARCHAR(255),
);

create Table dialogs (
    id SERIAL PRIMARY KEY,
    authorId INT NOT NULL REFERENCES users,
    partnerId INT NOT NULL REFERENCES users,
    lastMessageId INT
);

ALTER TABLE dialogs ADD CONSTRAINT fk_lastMessage FOREIGN KEY (lastMessageId) REFERENCES messages(id)

create Table messages (
    id SERIAL PRIMARY KEY,
    authorId INT NOT NULL,
    title VARCHAR(4096),
    dialogId INT NOT NULL,
    unread boolean,
    created_at text,
    ALTER TABLE messages ADD CONSTRAINT fk_authorId_MU FOREIGN KEY(authorId) REFERENCES users(id),
    ALTER TABLE messages ADD CONSTRAINT fk_dialogId_MD FOREIGN KEY(dialogId) REFERENCES dialogs(id)
);


SELECT COUNT(1) FROM information_schema.table_constraints WHERE constraint_name='fk_authorId_MU' AND table_name='messages';
ALTER TABLE users ADD roommates VARCHAR(255);

UPDATE users SET telephone = "+7 (927) 789 90 98" WHERE id =10;
UPDATE users SET apartmentNum = 10 WHERE id =10;