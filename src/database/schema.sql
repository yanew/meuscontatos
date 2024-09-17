CREATE DATABASE meuscontatos;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categoria (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    nome VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contato (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    nome VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    fone VARCHAR,
    id_categoria UUID,
    FOREIGN KEY(id_categoria) REFERENCES categoria(id)
);
