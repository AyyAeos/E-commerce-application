CREATE TABLE IF NOT EXISTS `logis`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `user_phone` VARCHAR(15) NOT NULL,
  `user_role` ENUM('ADMIN', 'CUSTOMER', 'DRIVER', 'OTHER') NOT NULL,
  `user_create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_last_modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`user_customer_details` (
  `user_id` INT UNSIGNED NOT NULL,
  `customer_age` INT UNSIGNED NOT NULL,
  `customer_gender` ENUM('MALE', 'FEMALE') NOT NULL,
  `customer_account_created_day` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer_employment_status` ENUM('STUDENT', 'EMPLOYED', 'UNEMPLOYED', 'SELF_EMPLOYED') NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_customer_details_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`user_customer_address` (
  `customer_address_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `customer_address_line` VARCHAR(255) NOT NULL,
  `customer_address_city` VARCHAR(100) NOT NULL,
  `customer_address_postal_code` VARCHAR(5) NOT NULL,
  `customer_address_country` VARCHAR(20) NOT NULL,
  `customer_address_state` VARCHAR(100) NOT NULL,
  `customer_default_address` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`customer_address_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`user_emp_department` (
  `department_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department_name` VARCHAR(100) NOT NULL,
  `department_description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`department_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`user_admin_details` (
  `user_id` INT UNSIGNED NOT NULL,
  `admin_role` ENUM('HEAD OF DEPARTMENT', 'MANAGER', 'STAFF') NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `admin_hire_date` DATE NOT NULL,
  `admin_salary` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_user_admin_details_department` (`department_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_admin_details_department`
    FOREIGN KEY (`department_id`)
    REFERENCES `logis`.`user_emp_department` (`department_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_admin_details_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`inventory` (
  `item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(255) NOT NULL,
  `on_sale` TINYINT(1) NULL DEFAULT '0',
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`inventory_sizes` (
  `size_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT UNSIGNED NOT NULL,
  `size` VARCHAR(50) NOT NULL,
  `stock` INT NOT NULL DEFAULT '0',
  `price` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`size_id`),
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `inventory_sizes_ibfk_1`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`inventory_supplier` (
  `supplier_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier_name` VARCHAR(255) NOT NULL,
  `contact_info` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`supplier_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`company_balance` (
  `balance_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `total_balance` DECIMAL(15,2) NOT NULL DEFAULT '0.00',
  `last_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`balance_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`transactions` (
  `transaction_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_type` ENUM('SALE', 'EXPENSE', 'SALARY', 'SUPPLIER_PAYMENT') NOT NULL,
  `item_id` INT UNSIGNED NULL DEFAULT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `transaction_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `transactions_ibfk_1`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`transactions_supplier_payments` (
  `payment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_id` INT UNSIGNED NOT NULL,
  `supplier_id` INT UNSIGNED NOT NULL,
  `item_id` INT UNSIGNED NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `payment_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  INDEX `transaction_id` (`transaction_id` ASC) VISIBLE,
  INDEX `supplier_id` (`supplier_id` ASC) VISIBLE,
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `transactions_supplier_payments_ibfk_1`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `logis`.`transactions` (`transaction_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `transactions_supplier_payments_ibfk_2`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `logis`.`inventory_supplier` (`supplier_id`),
  CONSTRAINT `transactions_supplier_payments_ibfk_3`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`transactions_salaries` (
  `salary_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `salary_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`salary_id`),
  INDEX `transaction_id` (`transaction_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `transactions_salaries_ibfk_1`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `logis`.`transactions` (`transaction_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `transactions_salaries_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`transactions_sales` (
  `sale_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_id` INT UNSIGNED NOT NULL,
  `item_id` INT UNSIGNED NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `sale_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sale_id`),
  INDEX `transaction_id` (`transaction_id` ASC) VISIBLE,
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `transactions_sales_ibfk_1`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `logis`.`transactions` (`transaction_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `transactions_sales_ibfk_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`transactions_expenses` (
  `expense_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_id` INT UNSIGNED NOT NULL,
  `item_id` INT UNSIGNED NULL DEFAULT NULL,
  `expense_type` ENUM('RENT', 'UTILITIES', 'SALARY', 'CLAIMS') NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `expense_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`expense_id`),
  INDEX `transaction_id` (`transaction_id` ASC) VISIBLE,
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `transactions_expenses_ibfk_1`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `logis`.`transactions` (`transaction_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `transactions_expenses_ibfk_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`inventory_stock_tracking` (
  `tracking_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_id` INT UNSIGNED NOT NULL,
  `change_type` ENUM('INCREMENT', 'DECREMENT') NOT NULL,
  `quantity_changed` INT NOT NULL,
  `stock_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tracking_id`),
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `inventory_stock_tracking_ibfk_1`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `logis`.`user_driver_details` (
  `user_id` INT UNSIGNED NOT NULL,
  `driver_license_number` VARCHAR(50) NOT NULL,
  `license_expiry_date` DATE NOT NULL,
  `vehicle_type` ENUM('CAR', 'MOTORCYCLE', 'VAN') NOT NULL,
  `vehicle_plate_number` VARCHAR(20) NOT NULL,
  `driver_status` ENUM('AVAILABLE', 'ON_TRIP', 'OFF_DUTY') NOT NULL DEFAULT 'AVAILABLE',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `driver_license_number` (`driver_license_number` ASC) VISIBLE,
  UNIQUE INDEX `vehicle_plate_number` (`vehicle_plate_number` ASC) VISIBLE,
  CONSTRAINT `fk_user_driver_details_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci


Fake Data
-- Insert users
INSERT INTO `logis`.`user` (`name`, `user_phone`, `user_role`, `username`, `password`, `email`) VALUES
('John Doe', '1234567890', 'ADMIN', 'johndoe', 'password123', 'johndoe@example.com'),
('Alice Smith', '0987654321', 'CUSTOMER', 'alicesmith', 'password456', 'alicesmith@example.com'),
('Bob Johnson', '1122334455', 'DRIVER', 'bobjohnson', 'password789', 'bobjohnson@example.com');

-- Insert user_customer_details
INSERT INTO `logis`.`user_customer_details` (`user_id`, `customer_age`, `customer_gender`, `customer_account_created_day`, `customer_employment_status`) VALUES
(2, 28, 'FEMALE', '2023-05-15 10:00:00', 'EMPLOYED');

-- Insert user_customer_address
INSERT INTO `logis`.`user_customer_address` (`user_id`, `customer_address_line`, `customer_address_city`, `customer_address_postal_code`, `customer_address_country`, `customer_address_state`, `customer_default_address`) VALUES
(2, '123 Main St', 'Cityville', '12345', 'Country', 'State', 1);

-- Insert user_emp_department
INSERT INTO `logis`.`user_emp_department` (`department_name`, `department_description`) VALUES
('HR', 'Human Resources Department'),
('Sales', 'Sales and Marketing Department');

-- Insert user_admin_details
INSERT INTO `logis`.`user_admin_details` (`user_id`, `admin_role`, `department_id`, `admin_hire_date`, `admin_salary`) VALUES
(1, 'MANAGER', 1, '2022-01-01', 50000.00);

-- Insert inventory
INSERT INTO `logis`.`inventory` (`item_name`, `on_sale`, `description`) VALUES
('Laptop', 1, 'High-performance laptop'),
('Headphones', 1, 'Noise-cancelling headphones');

-- Insert inventory_sizes
INSERT INTO `logis`.`inventory_sizes` (`item_id`, `size`, `stock`, `price`) VALUES
(1, '16GB RAM, 512GB SSD', 10, 1200.00),
(2, 'Over-Ear', 20, 200.00);

-- Insert inventory_supplier
INSERT INTO `logis`.`inventory_supplier` (`supplier_name`, `contact_info`) VALUES
('TechSupplier Inc.', 'contact@techsupplier.com'),
('AudioTech Ltd.', 'support@audiotech.com');

-- Insert company_balance
INSERT INTO `logis`.`company_balance` (`total_balance`, `last_updated`) VALUES
(100000.00, '2025-02-24 12:00:00');

-- Insert transactions
INSERT INTO `logis`.`transactions` (`transaction_type`, `item_id`, `amount`, `transaction_date`, `description`) VALUES
('SALE', 1, 1200.00, '2025-02-24 12:00:00', 'Sale of Laptop'),
('EXPENSE', NULL, 500.00, '2025-02-24 12:00:00', 'Office rent');

-- Insert transactions_supplier_payments
INSERT INTO `logis`.`transactions_supplier_payments` (`transaction_id`, `supplier_id`, `item_id`, `amount`, `payment_date`) VALUES
(1, 1, 1, 600.00, '2025-02-24 12:00:00');

-- Insert transactions_salaries
INSERT INTO `logis`.`transactions_salaries` (`transaction_id`, `user_id`, `amount`, `salary_date`) VALUES
(1, 1, 3000.00, '2025-02-24 12:00:00');

-- Insert transactions_sales
INSERT INTO `logis`.`transactions_sales` (`transaction_id`, `item_id`, `amount`, `sale_date`) VALUES
(1, 1, 1200.00, '2025-02-24 12:00:00');

-- Insert transactions_expenses
INSERT INTO `logis`.`transactions_expenses` (`transaction_id`, `item_id`, `expense_type`, `description`, `amount`, `expense_date`) VALUES
(2, NULL, 'RENT', 'Monthly office rent', 500.00, '2025-02-24 12:00:00');

-- Insert inventory_stock_tracking
INSERT INTO `logis`.`inventory_stock_tracking` (`item_id`, `change_type`, `quantity_changed`, `stock_date`) VALUES
(1, 'INCREMENT', 10, '2025-02-24 12:00:00');

-- Insert user_driver_details
INSERT INTO `logis`.`user_driver_details` (`user_id`, `driver_license_number`, `license_expiry_date`, `vehicle_type`, `vehicle_plate_number`, `driver_status`) VALUES
(3, 'DL123456789', '2026-02-24', 'CAR', 'ABC123', 'AVAILABLE');


CREATE TABLE cart_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,  
    item_id INT unsigned NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    size VARCHAR(20) NOT NULL,
    username VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_item_id` FOREIGN KEY (`item_id`) REFERENCES `inventory` (`item_id`) ON DELETE CASCADE,
     CONSTRAINT `fk_username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE
);

CREATE TABLE order_table (
    order_id VARCHAR(255) AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    item_id INT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    size_id INT NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED') DEFAULT 'PENDING',
    placed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    FOREIGN KEY (cart_id) REFERENCES cart_item(cart_id),
    FOREIGN KEY (item_id) REFERENCES inventory(item_id),
    FOREIGN KEY (size_id) REFERENCES inventory_sizes(size_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

ALTER TABLE cart_item
DROP FOREIGN KEY fk_cart_item_user,
ADD CONSTRAINT fk_cart_item_size 
FOREIGN KEY (size_id) REFERENCES inventory_sizes(size_id)
ON DELETE SET NULL;

alter table inventory
drop column
on_sale;

alter table inventory_sizes
add column 
on_sale TINYINT(1) default 0;

CREATE TABLE item_comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT UNSIGNED,
    count INT DEFAULT 1,
    root_count INT DEFAULT 0,
    deleted TINYINT(1) DEFAULT 0,
     create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (item_id) REFERENCES inventory(item_id)
);

-- Table for storing index information of comments
CREATE TABLE item_comment_index (
    index_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT UNSIGNED,
    comment_id INT NOT NULL,
    user_id INT UNSIGNED,
    root INT default 0,
    parent INT default 1,
    like_count INT DEFAULT 0,
    type ENUM('AuthorLiked', 'AuthorPinned', 'AuthorReply'),
   create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (comment_id) REFERENCES item_comment(comment_id),
     FOREIGN KEY (item_id) REFERENCES inventory(item_id)
);
CREATE INDEX idx_item_id ON item_comment_index(item_id);


CREATE TABLE review_details (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    index_id INT,
    placed_at DATETIME,
    quantity INT,
    item_name VARCHAR(255),
    size_name VARCHAR(255),
    FOREIGN KEY (index_id) REFERENCES item_comment_index(index_id) ON DELETE CASCADE
);



-- Table for storing the actual comment content
CREATE TABLE comment (
    index_id INT,
    content TEXT,
   create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (index_id) REFERENCES item_comment_index(index_id) ON DELETE CASCADE
);

CREATE INDEX idx_root ON item_comment_index (root);
CREATE INDEX idx_parent ON item_comment_index (parent);
CREATE INDEX idx_user_id ON item_comment_index (user_id);