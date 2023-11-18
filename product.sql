-- Create the 'products' database
DROP DATABASE IF EXISTS products;
CREATE DATABASE IF NOT EXISTS products;

-- Switch to 'products' database
USE products;

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(50),
    password VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    PRIMARY KEY (user_id)
);

-- Create the 'cart' table
CREATE TABLE IF NOT EXISTS cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create the 'reports' table
CREATE TABLE IF NOT EXISTS reports (
    report_id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (report_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id) -- Assuming a 'products' table exists
);
