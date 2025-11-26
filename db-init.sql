-- db-init.sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL
);

INSERT INTO users (firstname, lastname) VALUES
('Levy', 'SABAK'),
('Admin', 'RoyalJewels');
