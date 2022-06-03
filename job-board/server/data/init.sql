CREATE TABLE company (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE job (
    id TEXT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    company_id TEXT NOT NULL REFERENCES company (id),
    description TEXT
);

CREATE TABLE user (
    id TEXT NOT NULL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    company_id TEXT NOT NULL REFERENCES company (id)
);

INSERT INTO company (
    id,
    name,
    description
) VALUES (
    'pVbRRBQtMVw6lUAkj1k43',
    'Facegle',
    'We are a startup on a mission to disrupt social search engines. Think Facebook meet Google.'
), (
    'wvdB54Gqbdp_NZTXK9Tue',
    'Goobook',
    'We are a startup on a mission to disrupt search social media. Think Google meet Facebook.'
);

INSERT INTO job (
    id,
    title,
    company_id,
    description
) VALUES (
    'soP9m8MdKeQX_ZXZOCSaL',
    'Frontend Developer',
    'pVbRRBQtMVw6lUAkj1k43',
    'We are looking for a Frontend Developer familiar with React.'
), (
    'GR7vTA_btqTnLtXcEDX8C',
    'Backend Developer',
    'pVbRRBQtMVw6lUAkj1k43',
    'We are looking for a Backend Developer familiar with Node.js and Express.'
), (
    'yX71WsWqBRAFuMAIDj4W0',
    'Full-Stack Developer',
    'wvdB54Gqbdp_NZTXK9Tue',
    'We are looking for a Full-Stack Developer familiar with Node.js, Express, and React.'
);

INSERT INTO user (
    id,
    email,
    password,
    company_id
) VALUES (
    'uogQAZnLcAlT6lMuNbpQg',
    'alice@facegle.io',
    'alice123',
    'pVbRRBQtMVw6lUAkj1k43'
), (
    'i0Nn6qvicHP5DTuKTyaq0',
    'bob@goobook.co',
    'bob123',
    'wvdB54Gqbdp_NZTXK9Tue'
);
