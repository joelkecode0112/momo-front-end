-- MySQL Script generated by MySQL Workbench
-- Mon Jan 10 13:38:08 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema moshop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema moshop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `moshop` DEFAULT CHARACTER SET utf8 ;
USE `moshop` ;

-- -----------------------------------------------------
-- Table `moshop`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(80) NULL COMMENT '密碼\n',
  `gender` VARCHAR(20) NULL COMMENT '性別\n',
  `email` VARCHAR(50) NULL,
  `birthday` DATE NULL COMMENT '生日',
  `phone` INT NULL COMMENT '電話',
  `address` VARCHAR(80) NULL COMMENT '通訊地址',
  `username` VARCHAR(45) NULL COMMENT '使用者名稱',
  `userphoto` VARCHAR(45) NULL COMMENT '使用者照片',
  `isenabled` BIT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moshop`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total` INT NULL COMMENT '總金額',
  `shipping` INT NULL COMMENT '運送方式',
  `payment` INT NULL COMMENT '付款方式',
  `status` INT NULL COMMENT '訂單狀態',
  `shippingadd` VARCHAR(45) NULL COMMENT '運送地址',
  `userid` INT NOT NULL COMMENT '買家帳號',
  `setuptime` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '訂單成立時間',
  PRIMARY KEY (`id`),
  INDEX `fk_orders_user1_idx` (`userid` ASC),
  CONSTRAINT `fk_orders_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `moshop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moshop`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL COMMENT '名稱',
  `price` INT NULL COMMENT '金額',
  `stock` INT NULL COMMENT '庫存',
  `description` TEXT NULL COMMENT '商品描述',
  `category` VARCHAR(50) NULL COMMENT '分類',
  `spec` INT NULL COMMENT '規格',
  `sellerid` INT NOT NULL,
  `createddate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `state` INT NOT NULL DEFAULT 1 COMMENT '商品狀態',
  PRIMARY KEY (`id`),
  INDEX `fk_products_user1_idx` (`sellerid` ASC),
  CONSTRAINT `fk_products_user1`
    FOREIGN KEY (`sellerid`)
    REFERENCES `moshop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moshop`.`productpic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`productpic` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `picname` VARCHAR(100) NULL COMMENT '產品相片',
  `productsid` INT NOT NULL COMMENT '商品id',
  PRIMARY KEY (`id`),
  INDEX `fk_productpic_products1_idx` (`productsid` ASC),
  CONSTRAINT `fk_productpic_products1`
    FOREIGN KEY (`productsid`)
    REFERENCES `moshop`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moshop`.`orderdetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`orderdetail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productsid` INT NOT NULL,
  `ordersid` INT NOT NULL,
  `num` INT NULL DEFAULT NULL COMMENT '商品數量',
  PRIMARY KEY (`id`),
  INDEX `fk_products_has_orders_orders1_idx` (`ordersid` ASC),
  INDEX `fk_products_has_orders_products1_idx` (`productsid` ASC),
  CONSTRAINT `fk_products_has_orders_products1`
    FOREIGN KEY (`productsid`)
    REFERENCES `moshop`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_orders_orders1`
    FOREIGN KEY (`ordersid`)
    REFERENCES `moshop`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moshop`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `broad` TEXT NULL COMMENT '評論',
  `userid` INT NOT NULL COMMENT '評論者',
  `productsid` INT NOT NULL COMMENT '商品',
  `setuptime` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`userid` ASC),
  INDEX `fk_comment_products1_idx` (`productsid` ASC),
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `moshop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_products1`
    FOREIGN KEY (`productsid`)
    REFERENCES `moshop`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moshop`.`Collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`Collection` (
  `id` INT NOT NULL,
  `userid` INT NOT NULL,
  `productsid` INT NOT NULL,
  INDEX `fk_user_has_products_products1_idx` (`productsid` ASC),
  INDEX `fk_user_has_products_user1_idx` (`userid` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_has_products_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `moshop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_products_products1`
    FOREIGN KEY (`productsid`)
    REFERENCES `moshop`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moshop`.`confirmationtokenbean`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`confirmationtokenbean` (
  `tokenid` INT NOT NULL AUTO_INCREMENT,
  `confirmationtoken` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `createddate` DATETIME NULL DEFAULT NULL,
  `userid` INT NULL,
  INDEX `fk_table1_user1_idx` (`userid` ASC),
  PRIMARY KEY (`tokenid`),
  CONSTRAINT `fk_table1_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `moshop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moshop`.`proudspec`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moshop`.`proudspec` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `spec` VARCHAR(45) NULL COMMENT '規格大小',
  `productsid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_proudspec_products1_idx` (`productsid` ASC),
  CONSTRAINT `fk_proudspec_products1`
    FOREIGN KEY (`productsid`)
    REFERENCES `moshop`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
