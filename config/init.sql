-- Create Category Table
CREATE TABLE category (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Product Table
CREATE TABLE product (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    product_image_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Create Product_Item Table
CREATE TABLE product_item (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID,
    SKU VARCHAR(50) NOT NULL,
    qty_in_stock INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    product_image_url VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Create Order Table mm
CREATE TABLE order_table (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

-- Create Order_Item Table
CREATE TABLE order_item (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID,
    product_item_id UUID,
    quantity INT NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES order_table(id),
    FOREIGN KEY (product_item_id) REFERENCES product_item(id)
);

-- Create Customer Table (Assuming you have a customer table)
CREATE TABLE customer (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- ALTERING CUSTOMER TABLE
-- Add the missing columns to the customer table
ALTER TABLE customer
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(15),
ADD COLUMN IF NOT EXISTS address VARCHAR(255),
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS state VARCHAR(50),
ADD COLUMN IF NOT EXISTS zip_code VARCHAR(20),
ADD COLUMN IF NOT EXISTS country VARCHAR(50),
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

    



-- adding category and product
-- Insert a Category
INSERT INTO category (name)
VALUES ('Baseball Uniform');

-- Get the UUID of the newly inserted category (you might retrieve it programmatically in a real scenario)
SELECT id FROM category WHERE name = 'Baseball Uniform';

-- Assume the result is '123e4567-e89b-12d3-a456-426614174001'

-- Insert a Product in the Electronics category
INSERT INTO product (category_id, name, description, product_image_url)
VALUES ('d2125084-c2bc-43ff-b4ec-53017afe8f9b', 'Baseball Uniform for Women', 'High-quality Uniform', 'https://www.harley-davidson.com/content/dam/h-d/images/product-images/museum/2021/jan/99535-21mw/99535-21MW_F.jpg?impolicy=myresize&rw=700');
