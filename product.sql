-- Create the 'products' database
CREATE DATABASE IF NOT EXISTS products;

-- Switch to 'products' database
USE products;

-- Create the 'cart' table
CREATE TABLE IF NOT EXISTS cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT
    #FOREIGN KEY (user_id) REFERENCES users(id),
    #FOREIGN KEY (product_id) REFERENCES products(id)
);
-- Inserting rows into the 'cart' table
INSERT INTO cart (user_id, product_id) VALUES
    (1, 101), -- User 1 adds Product 101 to their cart
    (2, 102), -- User 2 adds Product 102 to their cart
    (1, 103); -- User 1 adds Product 103 to their cart
