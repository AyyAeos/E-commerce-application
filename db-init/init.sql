-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema logis
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema logis
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `logis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `logis` ;

-- -----------------------------------------------------
-- Table `logis`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`inventory` (
  `item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`item_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`inventory_sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`inventory_sizes` (
  `size_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT UNSIGNED NOT NULL,
  `size` VARCHAR(50) NOT NULL,
  `stock` INT NOT NULL DEFAULT '0',
  `price` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `on_sale` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`size_id`),
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `inventory_sizes_ibfk_1`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 86
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `user_phone` VARCHAR(15) NOT NULL,
  `role` ENUM('admin', 'CUSTOMER', 'DRIVER', 'OTHER') NOT NULL,
  `user_create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_last_modified_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`cart_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`cart_item` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL DEFAULT NULL,
  `item_id` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL DEFAULT '1',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `size_id` INT NULL DEFAULT NULL,
  `status` VARCHAR(20) NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`cart_id`),
  INDEX `fk_user_id` (`user_id` ASC) VISIBLE,
  INDEX `fk_item_id` (`item_id` ASC) VISIBLE,
  INDEX `fk_size_id` (`size_id` ASC) VISIBLE,
  CONSTRAINT `fk_item_id`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_size_id`
    FOREIGN KEY (`size_id`)
    REFERENCES `logis`.`inventory_sizes` (`size_id`),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`item_comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`item_comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT UNSIGNED NULL DEFAULT NULL,
  `count` INT NULL DEFAULT '1',
  `root_count` INT NULL DEFAULT '0',
  `create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `item_comment_ibfk_1`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`item_comment_index`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`item_comment_index` (
  `index_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT UNSIGNED NULL DEFAULT NULL,
  `comment_id` INT NOT NULL,
  `user_id` INT UNSIGNED NULL DEFAULT NULL,
  `root` INT NULL DEFAULT '0',
  `parent` INT NULL DEFAULT NULL,
  `like_count` INT NULL DEFAULT '0',
  `type` ENUM('AuthorLiked', 'AuthorPinned', 'AuthorReply', 'AuthorSend') NULL DEFAULT NULL,
  `create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`index_id`),
  INDEX `comment_id` (`comment_id` ASC) VISIBLE,
  INDEX `idx_root` (`root` ASC) VISIBLE,
  INDEX `idx_parent` (`parent` ASC) VISIBLE,
  INDEX `idx_user_id` (`user_id` ASC) VISIBLE,
  INDEX `idx_item_id` (`item_id` ASC) VISIBLE,
  CONSTRAINT `item_comment_index_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`),
  CONSTRAINT `item_comment_index_ibfk_2`
    FOREIGN KEY (`comment_id`)
    REFERENCES `logis`.`item_comment` (`comment_id`),
  CONSTRAINT `item_comment_index_ibfk_3`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 69
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`comment` (
  `index_id` INT NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  `create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `index_id` (`index_id` ASC) VISIBLE,
  CONSTRAINT `comment_ibfk_1`
    FOREIGN KEY (`index_id`)
    REFERENCES `logis`.`item_comment_index` (`index_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`comment_liked_count`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`comment_liked_count` (
  `index_id` INT NOT NULL,
  `user_id` INT UNSIGNED NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`company_balance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`company_balance` (
  `balance_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `total_balance` DECIMAL(15,2) NOT NULL DEFAULT '0.00',
  `last_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`balance_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`inventory_stock_tracking`
-- -----------------------------------------------------
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
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`inventory_supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`inventory_supplier` (
  `supplier_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier_name` VARCHAR(255) NOT NULL,
  `contact_info` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`supplier_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`order_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`order_table` (
  `order_id` VARCHAR(255) NOT NULL,
  `cart_id` INT NOT NULL,
  `item_id` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL,
  `size_id` INT NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `placed_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` ENUM('PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED') NULL DEFAULT 'PENDING',
  PRIMARY KEY (`order_id`, `cart_id`),
  INDEX `cart_id` (`cart_id` ASC) VISIBLE,
  INDEX `item_id` (`item_id` ASC) VISIBLE,
  INDEX `size_id` (`size_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `order_table_ibfk_1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `logis`.`cart_item` (`cart_id`),
  CONSTRAINT `order_table_ibfk_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `logis`.`inventory` (`item_id`),
  CONSTRAINT `order_table_ibfk_3`
    FOREIGN KEY (`size_id`)
    REFERENCES `logis`.`inventory_sizes` (`size_id`),
  CONSTRAINT `order_table_ibfk_4`
    FOREIGN KEY (`user_id`)
    REFERENCES `logis`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`review_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`review_details` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `index_id` INT NULL DEFAULT NULL,
  `placed_at` DATETIME NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `item_name` VARCHAR(255) NULL DEFAULT NULL,
  `size_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `index_id` (`index_id` ASC) VISIBLE,
  CONSTRAINT `review_details_ibfk_1`
    FOREIGN KEY (`index_id`)
    REFERENCES `logis`.`item_comment_index` (`index_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 48
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`transactions`
-- -----------------------------------------------------
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
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`transactions_expenses`
-- -----------------------------------------------------
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
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`transactions_salaries`
-- -----------------------------------------------------
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
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`transactions_sales`
-- -----------------------------------------------------
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
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`transactions_supplier_payments`
-- -----------------------------------------------------
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
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`user_emp_department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logis`.`user_emp_department` (
  `department_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department_name` VARCHAR(100) NOT NULL,
  `department_description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`department_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`user_admin_details`
-- -----------------------------------------------------
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


-- -----------------------------------------------------
-- Table `logis`.`user_customer_address`
-- -----------------------------------------------------
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
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logis`.`user_customer_details`
-- -----------------------------------------------------
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


-- -----------------------------------------------------
-- Table `logis`.`user_driver_details`
-- -----------------------------------------------------
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
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
