create table users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(30) DEFAULT 'student',
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






)