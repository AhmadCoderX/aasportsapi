-- Create Category Table
CREATE TABLE category (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

ALTER TABLE category ADD description TEXT;
ALTER TABLE category ADD parent_category_id UUID;

ALTER TABLE category ADD CONSTRAINT FK_parent_category_id
FOREIGN KEY (parent_category_id) REFERENCES category(id) ON DELETE CASCADE;

ALTER TABLE category ALTER COLUMN id TYPE VARCHAR(255); -- Optional: Change type to VARCHAR(255) if needed

ALTER TABLE category ADD COLUMN category_img_url TEXT;


-- Create Product Table
CREATE TABLE product (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(20) CHECK (type IN ('single', 'package')),
    custom_product_id UUID REFERENCES custom_product(c_id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);




-- Creating product_tags table
CREATE TABLE product_tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    tag VARCHAR(255)
);

-- dummy tags insertion
INSERT INTO product_tags (product_id, tag) VALUES('c5f795b5-ec32-4048-bd01-7428a91a892e', 'Piano');
INSERT INTO product_tags(product_id, tag) VALUES('c5f795b5-ec32-4048-bd01-7428a91a892e', 'Ballpoint Pen');
INSERT INTO product_tags(product_id, tag) VALUES('c5f795b5-ec32-4048-bd01-7428a91a892e', 'Multiple Colors');

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
    product_id UUID,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
-- altered to delete product
 alter table order_item add column product_id UUID references product(id) on delete set null;

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

ALTER TABLE customer ADD password VARCHAR(255);

-- resetTokens table
CREATE TABLE resetTokens 
(
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    token character varying NOT NULL,
    used boolean DEFAULT false NOT NULL,
    expiration timestamp without time zone,
    PRIMARY KEY (id)
);

--cart db
CREATE TABLE cart
(
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    customer_id UUID, -- it can be a logged in user or a random user (not logged in)
    PRIMARY KEY (id)
);

CREATE TABLE cart_item
(
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL, -- it will be user customized product id. image / color 
    quantity integer NOT NULL CHECK (quantity > 0), 
    PRIMARY KEY (id),
    UNIQUE (cart_id, product_id)
);

CREATE TABLE order_item
(
    id SERIAL NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TYPE "payment" AS ENUM (
  'PAYSTACK',
  'STRIPE'
);

CREATE TABLE orders
(
    order_id SERIAL NOT NULL,
    customer_id UUID NOT NULL,
    status character varying(20) NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    amount real,
    total integer,
    ref character varying(100),
    payment_method payment,
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

-- Reviews Table 
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  email VARCHAR(100),
  product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ALTER TABLE reviews ADD COLUMN name VARCHAR(255);
-- ALTER TABLE
-- verceldb=> ALTER TABLE reviews ADD COLUMN email VARCHAR(100);
-- ALTER TABLE
-- verceldb=> ALTER TABLE reviews DROP COLUMN user_id;

CREATE TYPE prod_img_type AS ENUM ('primary', 'secondary');

CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    type prod_img_type
);

-- creating table custom_product

CREATE TABLE custom_product(
    c_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- c_id for custom product id
    product_name VARCHAR(255),
    sku VARCHAR(255)
);

-- Adding thumbnail images
ALTER TABLE custom_product 
ADD COLUMN front_image_src TEXT, 
ADD COLUMN back_image_src TEXT;

-- Adding category id in the custom_product table
ALTER TABLE custom_product
ADD COLUMN category_id UUID REFERENCES category(id) ON DELETE SET NULL;

-- Adding simple product id in the custom_product table
ALTER TABLE custom_product
ADD COLUMN simple_product_id UUID REFERENCES product(id) ON DELETE SET NULL;



CREATE TABLE c_front_objects (
    front_object_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_product_id UUID NOT NULL REFERENCES custom_product(c_id) ON DELETE CASCADE,
    title VARCHAR(255),
    type VARCHAR(255),
    path TEXT,
    color VARCHAR(100),
    id TEXT, 
    date_of_creation: TIMESTAMP DEFAULT NOW()
);


CREATE TABLE c_back_objects (
    back_object_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_product_id UUID NOT NULL REFERENCES custom_product(c_id) ON DELETE CASCADE,
    title VARCHAR(255),
    type VARCHAR(255),
    path TEXT,
    color VARCHAR(100),
    id TEXT,
    date_of_creation: TIMESTAMP DEFAULT NOW()
);

CREATE TABLE c_front_text (
    front_text_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_product_id UUID NOT NULL REFERENCES custom_product(c_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    text VARCHAR(255) NOT NULL,
    strokeWidth FLOAT NOT NULL,
    fontSize FLOAT NOT NULL,
    draggable BOOLEAN NOT NULL,
    align VARCHAR(100) NOT NULL,
    width VARCHAR(100) NOT NULL, 
    height VARCHAR(100) NOT NULL,
    fill VARCHAR(100) NOT NULL,
    stroke VARCHAR(100) NOT NULL,
    fontFamily VARCHAR(255) NOT NULL,
    id TEXT NOT NULL,
    date_of_creation: TIMESTAMP DEFAULT NOW()
);

CREATE TABLE c_back_text (
    back_text_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_product_id UUID NOT NULL REFERENCES custom_product(c_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    text VARCHAR(255) NOT NULL,
    strokeWidth FLOAT NOT NULL,
    fontSize FLOAT NOT NULL,
    draggable BOOLEAN NOT NULL,
    align VARCHAR(100) NOT NULL,
    width VARCHAR(100) NOT NULL, 
    height VARCHAR(100) NOT NULL,
    fill VARCHAR(100) NOT NULL,
    stroke VARCHAR(100) NOT NULL,
    fontFamily VARCHAR(255) NOT NULL,
    id TEXT NOT NULL,
    date_of_creation: TIMESTAMP DEFAULT NOW()
);

CREATE TABLE front_mask_image (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_product_id UUID NOT NULL REFERENCES custom_product(c_id) ON DELETE CASCADE,
    title VARCHAR(255),
    src TEXT NOT NULL,
    date_of_creation: TIMESTAMP DEFAULT NOW()
);

CREATE TABLE back_mask_image (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_product_id UUID NOT NULL REFERENCES custom_product(c_id) ON DELETE CASCADE,
    title VARCHAR(255),
    src TEXT NOT NULL,
    date_of_creation: TIMESTAMP DEFAULT NOW()
);

-- User Custom Product Table
CREATE TABLE user_custom_product(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES customer(id) ON DELETE CASCADE,
    custom_product_id UUID NOT NULL REFERENCES custom_product(c_id) ON DELETE CASCADE,
    user_product JSONB
);

-- -- Rename the column
-- ALTER TABLE order_item
-- RENAME COLUMN product_item_id TO product_id;

-- -- Change the data type
-- ALTER TABLE order_item
-- ALTER COLUMN product_id SET DATA TYPE UUID;

-- -- Add foreign key constraint
-- ALTER TABLE order_item
-- ADD CONSTRAINT fk_order_item_product
-- FOREIGN KEY (product_id) REFERENCES product(id);


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
