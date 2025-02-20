create database logis;
use logis;

CREATE TABLE IF NOT EXISTS `logis`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `user_phone` VARCHAR(15) NOT NULL,
  `user_role` ENUM('ADMIN', 'CUSTOMER', 'DRIVER', 'OTHER') NOT NULL,
  `user_create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_last_modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

INSERT INTO `logis`.`user` (`name`, `user_phone`, `user_role`, `username`, `password`, `email`)
VALUES
  ('John Doe', '1234567890', 'ADMIN', 'johndoe', 'password123', 'johndoe@example.com'),
  ('Jane Smith', '2345678901', 'CUSTOMER', 'janesmith', 'password123', 'janesmith@example.com'),
  ('Alice Johnson', '3456789012', 'DRIVER', 'alicejohnson', 'password123', 'alicejohnson@example.com'),
  ('Bob Brown', '4567890123', 'OTHER', 'bobbrown', 'password123', 'bobbrown@example.com'),
  ('Charlie Davis', '5678901234', 'ADMIN', 'charliedavis', 'password123', 'charliedavis@example.com'),
  ('David Wilson', '6789012345', 'CUSTOMER', 'davidwilson', 'password123', 'davidwilson@example.com'),
  ('Eva Thomas', '7890123456', 'DRIVER', 'evathomas', 'password123', 'evathomas@example.com'),
  ('Frank Taylor', '8901234567', 'OTHER', 'franktaylor', 'password123', 'franktaylor@example.com'),
  ('Grace Moore', '9012345678', 'ADMIN', 'gracemoore', 'password123', 'gracemoore@example.com'),
  ('Hank Lee', '0123456789', 'CUSTOMER', 'hanklee', 'password123', 'hanklee@example.com'),
  ('Ivy Clark', '1234509876', 'DRIVER', 'ivyclark', 'password123', 'ivyclark@example.com'),
  ('Jack Walker', '2345610987', 'OTHER', 'jackwalker', 'password123', 'jackwalker@example.com'),
  ('Kathy Scott', '3456721098', 'ADMIN', 'kathyscott', 'password123', 'kathyscott@example.com'),
  ('Leo Harris', '4567832109', 'CUSTOMER', 'leoharris', 'password123', 'leoharris@example.com'),
  ('Mona Young', '5678943210', 'DRIVER', 'monayoung', 'password123', 'monayoung@example.com'),
  ('Nathan King', '6789054321', 'OTHER', 'nathanking', 'password123', 'nathanking@example.com'),
  ('Olivia Green', '7890165432', 'ADMIN', 'oliviagreen', 'password123', 'oliviagreen@example.com'),
  ('Paul Adams', '8901276543', 'CUSTOMER', 'pauladams', 'password123', 'pauladams@example.com'),
  ('Quincy Baker', '9012387654', 'DRIVER', 'quincybaker', 'password123', 'quincybaker@example.com'),
  ('Rachel Nelson', '0123498765', 'OTHER', 'rachelnelson', 'password123', 'rachelnelson@example.com'),
  ('Steve Carter', '1234509870', 'ADMIN', 'stevecarter', 'password123', 'stevecarter@example.com'),
  ('Tina Mitchell', '2345610980', 'CUSTOMER', 'tinamitchell', 'password123', 'tinamitchell@example.com'),
  ('Ursula Robinson', '3456721090', 'DRIVER', 'ursularobinson', 'password123', 'ursularobinson@example.com'),
  ('Victor Parker', '4567832100', 'OTHER', 'victorparker', 'password123', 'victorparker@example.com'),
  ('Wendy Evans', '5678943211', 'ADMIN', 'wendyevans', 'password123', 'wendyevans@example.com'),
  ('Xander Turner', '6789054322', 'CUSTOMER', 'xanderturner', 'password123', 'xanderturner@example.com'),
  ('Yvonne Lewis', '7890165433', 'DRIVER', 'yvonnelewis', 'password123', 'yvonnelewis@example.com'),
  ('Zane Hall', '8901276544', 'OTHER', 'zanehall', 'password123', 'zanehall@example.com');

CREATE TABLE IF NOT EXISTS `logis`.`user_customer_details` (
  `user_id` INT UNSIGNED NOT NULL,
  `customer_age` INT UNSIGNED NOT NULL,
  `customer_gender` ENUM('MALE', 'FEMALE') NOT NULL,
  `customer_account_created_day` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer_employment_status` ENUM('STUDENT', 'EMPLOYED', 'UNEMPLOYED', 'SELF_EMPLOYED') NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_customer_details_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `logis`.`user_customer_address` (
  `customer_address_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `customer_full_name` VARCHAR(255) NOT NULL,
  `customer_phone_number` VARCHAR(45) NOT NULL,
  `customer_address_line` VARCHAR(255) NOT NULL,
  `customer_address_city` VARCHAR(100) NOT NULL,
  `customer_address_postal_code` VARCHAR(5) NOT NULL,
  `customer_address_country` VARCHAR(20) NOT NULL,
  `customer_address_state` VARCHAR(100) NOT NULL,
  `customer_default_address` TINYINT NOT NULL DEFAULT 0,
  `customer_address_type` ENUM('HOME', 'WORK', 'OTHER') NULL,
  PRIMARY KEY (`customer_address_id`),
  UNIQUE INDEX `customer_phone_number_UNIQUE` (`customer_phone_number` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `logis`.`user_emp_department` (
  `department_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department_name` VARCHAR(100) NOT NULL,
  `department_description` TEXT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `logis`.`user_admin_details` (
  `user_id` INT UNSIGNED NOT NULL,
  `admin_role` ENUM('HEAD OF DEPARTMENT', 'MANAGER', 'STAFF') NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `admin_hire_date` DATE NOT NULL,
  `admin_salary` DECIMAL(10,2) NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_admin_details_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_admin_details_department`
    FOREIGN KEY (`department_id`)
    REFERENCES `logis`.`user_emp_department` (`department_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `logis`.`user_driver_details` (
  `user_id` INT UNSIGNED NOT NULL,
  `driver_license_number` VARCHAR(50) NOT NULL UNIQUE,
  `license_expiry_date` DATE NOT NULL,
  `vehicle_type` ENUM('CAR', 'MOTORCYCLE', 'VAN') NOT NULL,
  `vehicle_plate_number` VARCHAR(20) NOT NULL UNIQUE,
  `driver_status` ENUM('AVAILABLE', 'ON_TRIP', 'OFF_DUTY') NOT NULL DEFAULT 'AVAILABLE',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_driver_details_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE inventory (
  item_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(255) NOT NULL,
  item_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
) ENGINE = InnoDB;

CREATE TABLE inventory_supplier (
  supplier_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  supplier_name VARCHAR(255) NOT NULL,
  contact_info VARCHAR(255),
  PRIMARY KEY (supplier_id)
) ENGINE = InnoDB;

CREATE TABLE inventory_supplier_stock_info (
  item_id INT UNSIGNED NOT NULL,
  supplier_id INT UNSIGNED NOT NULL,
  supply_price DECIMAL(10,2) NOT NULL, 
  PRIMARY KEY (item_id, supplier_id),
  FOREIGN KEY (item_id) REFERENCES inventory(item_id) ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES inventory_supplier(supplier_id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE inventory_stock_tracking (
  tracking_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  item_id INT UNSIGNED NOT NULL,
  change_type ENUM('INCREMENT', 'DECREMENT') NOT NULL,
  quantity_changed INT NOT NULL,
  stock_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tracking_id),
  FOREIGN KEY (item_id) REFERENCES inventory(item_id) 
) ENGINE = InnoDB;

CREATE TABLE company_balance (
  balance_id INT UNSIGNED NOT NULL AUTO_INCREMENT, -- wont show up just for easy locate 
  total_balance DECIMAL(15,2) NOT NULL DEFAULT 0, 
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (balance_id)
) ENGINE = InnoDB;

CREATE TABLE transactions (
  transaction_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  transaction_type ENUM('SALE', 'EXPENSE', 'SALARY', 'SUPPLIER_PAYMENT') NOT NULL,
  item_id INT UNSIGNED NULL, -- Only for sale/expense transactions
  amount DECIMAL(10,2) NOT NULL,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description TEXT NULL,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (item_id) REFERENCES inventory(item_id) ON DELETE SET NULL 
) ENGINE = InnoDB;

CREATE TABLE transactions_sales (
  sale_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  transaction_id INT UNSIGNED NOT NULL,  -- Links to transactions table
  item_id INT UNSIGNED NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (sale_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES inventory(item_id) ON DELETE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE transactions_expenses (
  expense_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  transaction_id INT UNSIGNED NOT NULL,
  item_id INT UNSIGNED NULL,
  expense_type ENUM('RENT', 'UTILITIES', 'SALARY', 'CLAIMS') NOT NULL,
  description TEXT NULL,
  amount DECIMAL(10,2) NOT NULL,
  expense_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (expense_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES inventory(item_id) ON DELETE SET NULL
) ENGINE = InnoDB;

CREATE TABLE transactions_salaries (
  salary_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  transaction_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  salary_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (salary_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(user_id) 
) ENGINE = InnoDB;

CREATE TABLE transactions_supplier_payments (
  payment_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  transaction_id INT UNSIGNED NOT NULL,
  supplier_id INT UNSIGNED NOT NULL,
  item_id INT UNSIGNED NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (payment_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES inventory_supplier(supplier_id) ,
  FOREIGN KEY (item_id) REFERENCES inventory(item_id) ON DELETE CASCADE
) ENGINE = InnoDB;







