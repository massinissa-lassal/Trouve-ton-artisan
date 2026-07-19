CREATE DATABASE IF NOT EXISTS trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trouve_ton_artisan;

DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialties;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    note DECIMAL(2,1) NOT NULL,
    location VARCHAR(100) NOT NULL,
    about TEXT NOT NULL,
    email VARCHAR(150) NOT NULL,
    website VARCHAR(255) NULL,
    is_top BOOLEAN DEFAULT FALSE,
    specialty_id INT NOT NULL,
    FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE CASCADE
) ENGINE=InnoDB;