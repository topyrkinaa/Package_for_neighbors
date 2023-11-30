create Table users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(255),
    surname VARCHAR(255),
    patronymic VARCHAR(255),
    password VARCHAR(255)
);