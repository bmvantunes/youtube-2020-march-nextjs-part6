-- Up
CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

CREATE TABLE Vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    ownerId INTEGER REFERENCES Person(id)
);

INSERT INTO Person (name, email) values ('bruno', 'bruno@antunes.pt');
INSERT INTO Person (name, email) values ('jack', 'jack@antunes.pt');

INSERT INTO Vehicle (brand, model, ownerId) values('audi', 'R8', 1);
INSERT INTO Vehicle (brand, model, ownerId) values('audi', 'R6', 1);
INSERT INTO Vehicle (brand, model, ownerId) values('mercedes', 'benz', 2);

-- Down
DROP TABLE Person;
DROP TABLE Vehicle;