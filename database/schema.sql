-- ==============================================================================
-- ApoCare - Complete Relational Database Schema
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB / phpMyAdmin
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `apocare_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `apocare_db`;

-- Drop tables in reverse order of foreign keys
DROP TABLE IF EXISTS `audit_logs`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `transactions`;
DROP TABLE IF EXISTS `appointments`;
DROP TABLE IF EXISTS `doctor_availability`;
DROP TABLE IF EXISTS `doctors`;
DROP TABLE IF EXISTS `clinics`;
DROP TABLE IF EXISTS `patients`;
DROP TABLE IF EXISTS `admin_users`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `specializations`;
DROP TABLE IF EXISTS `locations`;

-- -----------------------------------------------------------------------------
-- 1. Table: users (Central Authentication & RBAC)
-- -----------------------------------------------------------------------------
CREATE TABLE `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `mobile` VARCHAR(20) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('patient', 'doctor', 'admin') NOT NULL DEFAULT 'patient',
    `status` ENUM('active', 'inactive', 'pending') NOT NULL DEFAULT 'active',
    `remember_token` VARCHAR(100) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_role_status` (`role`, `status`)
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 2. Table: admin_users
-- -----------------------------------------------------------------------------
CREATE TABLE `admin_users` (
    `admin_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `role` ENUM('superadmin', 'manager') NOT NULL DEFAULT 'superadmin',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_admin_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 3. Table: patients
-- -----------------------------------------------------------------------------
CREATE TABLE `patients` (
    `patient_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `mobile` VARCHAR(20) NOT NULL,
    `date_of_birth` DATE NULL,
    `gender` ENUM('Male', 'Female', 'Other', 'Prefer not to say') DEFAULT 'Prefer not to say',
    `location` VARCHAR(100) NOT NULL DEFAULT 'Bankura',
    `address` VARCHAR(255) NULL,
    `blood_group` VARCHAR(10) NULL DEFAULT 'B+',
    `emergency_contact` VARCHAR(20) NULL,
    `aadhaar_masked` VARCHAR(20) NULL,
    `avatar` VARCHAR(255) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_patient_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
    INDEX `idx_patients_location` (`location`)
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 4. Table: clinics (Clinics and Hospitals)
-- -----------------------------------------------------------------------------
CREATE TABLE `clinics` (
    `clinic_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `type` ENUM('Clinic', 'Hospital', 'Diagnostic Center') NOT NULL DEFAULT 'Clinic',
    `address` VARCHAR(255) NOT NULL,
    `location` VARCHAR(100) NOT NULL DEFAULT 'Bankura',
    `pin_code` VARCHAR(10) NOT NULL DEFAULT '722101',
    `contact` VARCHAR(20) NOT NULL,
    `email` VARCHAR(150) NULL,
    `latitude` DECIMAL(10, 8) DEFAULT 23.2324,
    `longitude` DECIMAL(11, 8) DEFAULT 87.0715,
    `image_url` VARCHAR(255) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_clinics_location` (`location`)
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 5. Table: doctors
-- -----------------------------------------------------------------------------
CREATE TABLE `doctors` (
    `doctor_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `clinic_id` INT NULL,
    `name` VARCHAR(100) NOT NULL,
    `specialization` VARCHAR(80) NOT NULL,
    `qualification` VARCHAR(150) NOT NULL DEFAULT 'MBBS, MD',
    `experience_years` INT NOT NULL DEFAULT 8,
    `registration_number` VARCHAR(50) NOT NULL DEFAULT 'WBMC-84920',
    `clinic_name` VARCHAR(150) NOT NULL,
    `type` ENUM('Clinic', 'Hospital') NOT NULL DEFAULT 'Clinic',
    `location` VARCHAR(100) NOT NULL DEFAULT 'Bankura',
    `address` VARCHAR(255) NOT NULL,
    `contact` VARCHAR(20) NOT NULL,
    `visiting_charge` DECIMAL(8,2) NOT NULL DEFAULT 400.00,
    `online_appointment` TINYINT(1) NOT NULL DEFAULT 1,
    `availability_days` VARCHAR(100) NOT NULL DEFAULT 'Mon, Tue, Wed, Thu, Fri',
    `availability_time` VARCHAR(60) NOT NULL DEFAULT '8:00 AM - 4:00 PM',
    `slot_duration_minutes` INT NOT NULL DEFAULT 20,
    `distance_km` DECIMAL(4,1) NOT NULL DEFAULT 2.5,
    `about` TEXT NULL,
    `avatar_seed` VARCHAR(50) NULL DEFAULT 'doctor-1',
    `rating` DECIMAL(3,2) NOT NULL DEFAULT 4.80,
    `review_count` INT NOT NULL DEFAULT 24,
    `verification_status` ENUM('Pending', 'Verified', 'Rejected', 'Suspended') NOT NULL DEFAULT 'Verified',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_doctor_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_doctor_clinic` FOREIGN KEY (`clinic_id`) REFERENCES `clinics`(`clinic_id`) ON DELETE SET NULL,
    INDEX `idx_doctor_search` (`location`, `specialization`, `verification_status`, `online_appointment`)
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 6. Table: doctor_availability (Weekly schedule editor)
-- -----------------------------------------------------------------------------
CREATE TABLE `doctor_availability` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `doctor_id` INT NOT NULL,
    `day_of_week` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    `is_available` TINYINT(1) NOT NULL DEFAULT 1,
    `start_time` TIME NOT NULL DEFAULT '08:00:00',
    `end_time` TIME NOT NULL DEFAULT '16:00:00',
    `break_start` TIME NULL DEFAULT '13:00:00',
    `break_end` TIME NULL DEFAULT '14:00:00',
    `max_patients` INT NOT NULL DEFAULT 20,
    CONSTRAINT `fk_avail_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE CASCADE,
    UNIQUE KEY `uk_doc_day` (`doctor_id`, `day_of_week`)
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 7. Table: specializations
-- -----------------------------------------------------------------------------
CREATE TABLE `specializations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(80) NOT NULL UNIQUE,
    `slug` VARCHAR(80) NOT NULL UNIQUE,
    `icon` VARCHAR(50) NOT NULL DEFAULT 'stethoscope',
    `description` VARCHAR(255) NULL,
    `doctor_count` INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 8. Table: locations
-- -----------------------------------------------------------------------------
CREATE TABLE `locations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `district` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL DEFAULT 'West Bengal',
    `pin_code` VARCHAR(10) NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 9. Table: appointments
-- -----------------------------------------------------------------------------
CREATE TABLE `appointments` (
    `appointment_id` INT AUTO_INCREMENT PRIMARY KEY,
    `booking_ref` VARCHAR(30) NOT NULL UNIQUE,
    `patient_id` INT NOT NULL,
    `doctor_id` INT NOT NULL,
    `clinic_id` INT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `age` INT NULL,
    `gender` ENUM('Male', 'Female', 'Other', 'Prefer not to say') DEFAULT 'Prefer not to say',
    `mobile` VARCHAR(20) NOT NULL,
    `email` VARCHAR(150) NULL,
    `location` VARCHAR(100) NOT NULL,
    `aadhaar_masked` VARCHAR(20) NULL,
    `appointment_date` DATE NOT NULL,
    `appointment_time` VARCHAR(30) NOT NULL,
    `time_slot` VARCHAR(30) NULL,
    `reason` VARCHAR(255) NULL,
    `status` ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected') NOT NULL DEFAULT 'Pending',
    `payment_status` ENUM('Pending', 'Paid', 'Refunded', 'Failed') NOT NULL DEFAULT 'Pending',
    `amount` DECIMAL(8,2) NOT NULL DEFAULT 400.00,
    `platform_fee` DECIMAL(8,2) NOT NULL DEFAULT 25.00,
    `total_amount` DECIMAL(8,2) NOT NULL DEFAULT 425.00,
    `doctor_notes` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_appt_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`patient_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_appt_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE CASCADE,
    INDEX `idx_appt_date_status` (`appointment_date`, `status`),
    INDEX `idx_appt_patient` (`patient_id`),
    INDEX `idx_appt_doctor` (`doctor_id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 10. Table: transactions
-- -----------------------------------------------------------------------------
CREATE TABLE `transactions` (
    `transaction_id` INT AUTO_INCREMENT PRIMARY KEY,
    `transaction_ref` VARCHAR(40) NOT NULL UNIQUE,
    `appointment_id` INT NOT NULL,
    `patient_id` INT NOT NULL,
    `doctor_id` INT NOT NULL,
    `amount` DECIMAL(8,2) NOT NULL,
    `platform_fee` DECIMAL(8,2) NOT NULL DEFAULT 25.00,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `gateway` VARCHAR(30) NOT NULL DEFAULT 'MockPay',
    `gateway_order_id` VARCHAR(100) NULL,
    `gateway_payment_id` VARCHAR(100) NULL,
    `gateway_signature` VARCHAR(255) NULL,
    `payment_status` ENUM('Pending', 'Processing', 'Successful', 'Failed', 'Refunded') NOT NULL DEFAULT 'Pending',
    `receipt_url` VARCHAR(255) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_txn_appt` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`appointment_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_txn_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`patient_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_txn_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE CASCADE,
    INDEX `idx_txn_status` (`payment_status`)
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 11. Table: notifications
-- -----------------------------------------------------------------------------
CREATE TABLE `notifications` (
    `notification_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `role` ENUM('patient', 'doctor', 'admin') NOT NULL DEFAULT 'patient',
    `title` VARCHAR(150) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `type` ENUM('info', 'success', 'warning', 'danger') NOT NULL DEFAULT 'info',
    `is_read` TINYINT(1) NOT NULL DEFAULT 0,
    `link` VARCHAR(255) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_notif_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
    INDEX `idx_notif_user_read` (`user_id`, `is_read`)
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 12. Table: reviews
-- -----------------------------------------------------------------------------
CREATE TABLE `reviews` (
    `review_id` INT AUTO_INCREMENT PRIMARY KEY,
    `doctor_id` INT NOT NULL,
    `patient_id` INT NOT NULL,
    `appointment_id` INT NULL,
    `rating` INT NOT NULL DEFAULT 5,
    `comment` TEXT NOT NULL,
    `is_approved` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_rev_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_rev_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`patient_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------------------------------
-- 13. Table: audit_logs
-- -----------------------------------------------------------------------------
CREATE TABLE `audit_logs` (
    `log_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NULL,
    `user_email` VARCHAR(150) NULL,
    `role` VARCHAR(30) NULL,
    `action` VARCHAR(100) NOT NULL,
    `details` TEXT NULL,
    `ip_address` VARCHAR(50) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
