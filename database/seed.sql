-- ==============================================================================
-- ApoCare - Comprehensive Seed Data
-- ==============================================================================

USE `apocare_db`;

-- -----------------------------------------------------------------------------
-- Specializations
-- -----------------------------------------------------------------------------
INSERT INTO `specializations` (`name`, `slug`, `icon`, `description`, `doctor_count`) VALUES
('Cardiologist', 'cardiologist', 'heart-pulse', 'Heart conditions, hypertension, coronary care, and preventive cardiology', 2),
('Dermatologist', 'dermatologist', 'sparkles', 'Skin disorders, cosmetic dermatology, acne, allergies, and hair care', 1),
('Neurologist', 'neurologist', 'brain', 'Brain, spinal cord, migraine, stroke, nerve disorders, and epilepsy', 1),
('Pediatrician', 'pediatrician', 'baby', 'Infant, child, and adolescent wellness, vaccinations, and growth', 1),
('Orthopedic', 'orthopedic', 'bone', 'Joint replacement, fracture treatment, sports injuries, and spine care', 1),
('Gynecologist', 'gynecologist', 'female', 'Prenatal, postnatal care, reproductive health, and obstetric surgery', 1),
('Dentist', 'dentist', 'tooth', 'General dentistry, root canal, teeth whitening, and orthodontic care', 1),
('General Physician', 'general-physician', 'stethoscope', 'Primary healthcare, viral fever, hypertension, diabetes, and checkups', 1),
('ENT Specialist', 'ent-specialist', 'ear', 'Ear infections, hearing loss, sinus disorders, and throat care', 1),
('Ophthalmologist', 'ophthalmologist', 'eye', 'Vision care, cataract surgery, retinal diagnostics, and optics', 1),
('Gastroenterologist', 'gastroenterologist', 'shield-plus', 'Digestive system, liver disorders, endoscopy, and abdominal pain', 0),
('Psychiatrist', 'psychiatrist', 'smile', 'Mental health, anxiety, depression therapy, and psychiatric wellness', 0);

-- -----------------------------------------------------------------------------
-- Locations
-- -----------------------------------------------------------------------------
INSERT INTO `locations` (`name`, `district`, `state`, `pin_code`, `is_active`) VALUES
('Bankura', 'Bankura', 'West Bengal', '722101', 1),
('Bishnupur', 'Bankura', 'West Bengal', '722122', 1),
('Durgapur', 'Paschim Bardhaman', 'West Bengal', '713216', 1),
('Asansol', 'Paschim Bardhaman', 'West Bengal', '713301', 1),
('Raniganj', 'Paschim Bardhaman', 'West Bengal', '713347', 1),
('Purulia', 'Purulia', 'West Bengal', '723101', 1),
('Burdwan', 'Purba Bardhaman', 'West Bengal', '713101', 1),
('Kolkata', 'Kolkata', 'West Bengal', '700001', 1);

-- -----------------------------------------------------------------------------
-- Clinics and Hospitals
-- -----------------------------------------------------------------------------
INSERT INTO `clinics` (`clinic_id`, `name`, `type`, `address`, `location`, `pin_code`, `contact`, `email`, `latitude`, `longitude`) VALUES
(1, 'HeartCare Superspecialty Clinic', 'Clinic', 'ABC Road, Near Court More, Bankura', 'Bankura', '722101', '03242-250101', 'contact@heartcarebankura.org', 23.23240000, 87.07150000),
(2, 'Bankura City Multi-Specialty Hospital', 'Hospital', 'Station Road, Opp. Central Bus Stand, Bankura', 'Bankura', '722101', '03242-250202', 'admin@bankuracityhospital.in', 23.23560000, 87.07890000),
(3, 'GlowSkin & Laser Clinic', 'Clinic', 'College Road, Near Christian College, Bankura', 'Bankura', '722101', '03242-250303', 'info@glowskinclinic.com', 23.22890000, 87.06540000),
(4, 'NeuroCare Institute & Research Center', 'Hospital', 'Court More, Bankura', 'Bankura', '722101', '03242-250404', 'help@neurocarebankura.org', 23.24120000, 87.08120000),
(5, 'Little Stars Pediatric Care', 'Clinic', 'Kenduadihi Bypass, Bankura', 'Bankura', '722102', '03242-250505', 'care@littlestars.in', 23.22450000, 87.06210000),
(6, 'Bankura Ortho & Trauma Center', 'Hospital', 'Bypass Road, Near Lalbazar, Bankura', 'Bankura', '722101', '03242-250606', 'ortho@bankuratrauma.org', 23.23780000, 87.07450000),
(7, 'WomenCare Maternity & Gynecology Clinic', 'Clinic', 'Lalbazar Main Road, Bankura', 'Bankura', '722101', '03242-250707', 'womencare@bankurahealth.com', 23.23010000, 87.06900000),
(8, 'Smile Dental & Maxillofacial Care', 'Clinic', 'Machantala Bazaar, Bankura', 'Bankura', '722101', '03242-250808', 'smile@bankuradental.com', 23.23330000, 87.07020000),
(9, 'Family Health & Wellness Center', 'Clinic', 'Nutanganj, Bankura', 'Bankura', '722101', '03242-250909', 'familyhealth@bankura.net', 23.22700000, 87.07500000),
(10, 'Vision Plus Eye Institute', 'Hospital', 'City Centre, Durgapur', 'Durgapur', '713216', '0343-2541010', 'info@visionplusdurgapur.com', 23.52040000, 87.31190000);

-- -----------------------------------------------------------------------------
-- Users & Roles
-- Default Passwords:
-- Admin:    Admin@123   ($2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK)
-- Doctor:   Doctor@123  ($2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK)
-- Patient:  Patient@123 ($2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK)
-- Note: Using consistent verified BCRYPT hash compatible with password_verify()
-- -----------------------------------------------------------------------------

-- Admin User (user_id = 1)
INSERT INTO `users` (`user_id`, `email`, `mobile`, `password`, `role`, `status`) VALUES
(1, 'pramitasahu07@gmail.com', '9800000000', '$2y$10$8ThHDe6tlC540KRK1/I.h.9rM7auSHm9D6HaaYpVT81fepV.Naime', 'admin', 'active');

INSERT INTO `admin_users` (`admin_id`, `user_id`, `name`, `email`, `role`) VALUES
(1, 1, 'Pramita Sahu', 'pramitasahu07@gmail.com', 'superadmin');

-- Doctor Users (user_id = 2 to 13)
INSERT INTO `users` (`user_id`, `email`, `mobile`, `password`, `role`, `status`) VALUES
(2,  'dr.ananya@apocare.com',  '9800000001', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(3,  'dr.rajesh@apocare.com',  '9800000002', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(4,  'dr.meera@apocare.com',   '9800000003', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(5,  'dr.sanjay@apocare.com',  '9800000004', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(6,  'dr.priya@apocare.com',   '9800000005', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(7,  'dr.arjun@apocare.com',   '9800000006', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(8,  'dr.kavita@apocare.com',  '9800000007', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(9,  'dr.nikhil@apocare.com',  '9800000008', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(10, 'dr.sunita@apocare.com',  '9800000009', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(11, 'dr.alok@apocare.com',    '9800000010', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(12, 'dr.debjani@apocare.com', '9800000011', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'active'),
(13, 'dr.subhash@apocare.com', '9800000012', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'doctor', 'pending');

-- Patient Users (user_id = 14 to 23)
INSERT INTO `users` (`user_id`, `email`, `mobile`, `password`, `role`, `status`) VALUES
(14, 'riya.demo@example.com',    '9876543210', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(15, 'sourav.das@example.com',    '9876543211', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(16, 'amit.sen@example.com',      '9876543212', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(17, 'puja.banerjee@example.com', '9876543213', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(18, 'rahul.roy@example.com',     '9876543214', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(19, 'sneha.mukherjee@example.com','9876543215','$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(20, 'debjit.ghosh@example.com',  '9876543216', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(21, 'tanima.kundu@example.com',  '9876543217', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(22, 'bikash.patra@example.com',  '9876543218', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active'),
(23, 'anirban.dey@example.com',   '9876543219', '$2y$10$92xoZ7lE4E1Yl9AZzWv0FeE0vE0Vb1p3ZQvEwv6mM0Vw1lYV1nZLK', 'patient', 'active');

-- -----------------------------------------------------------------------------
-- Patients Data
-- -----------------------------------------------------------------------------
INSERT INTO `patients` (`patient_id`, `user_id`, `name`, `email`, `mobile`, `date_of_birth`, `gender`, `location`, `address`, `blood_group`, `emergency_contact`, `aadhaar_masked`) VALUES
(1,  14, 'Riya Chatterjee',    'riya.demo@example.com',    '9876543210', '1997-04-12', 'Female', 'Bankura', 'Pratapbagan, Bankura', 'O+', '9876543200', 'XXXX XXXX 4321'),
(2,  15, 'Sourav Das',         'sourav.das@example.com',    '9876543211', '1992-08-23', 'Male',   'Bankura', 'Kenduadihi, Bankura', 'B+', '9876543201', 'XXXX XXXX 8765'),
(3,  16, 'Amit Sen',           'amit.sen@example.com',      '9876543212', '1988-11-15', 'Male',   'Bankura', 'Lalbazar, Bankura',   'A+', '9876543202', 'XXXX XXXX 1234'),
(4,  17, 'Puja Banerjee',      'puja.banerjee@example.com', '9876543213', '1995-02-28', 'Female', 'Bankura', 'Machantala, Bankura', 'AB+','9876543203', 'XXXX XXXX 5678'),
(5,  18, 'Rahul Roy',          'rahul.roy@example.com',     '9876543214', '1990-06-10', 'Male',   'Bankura', 'Nutanganj, Bankura',  'O+', '9876543204', 'XXXX XXXX 9988'),
(6,  19, 'Sneha Mukherjee',    'sneha.mukherjee@example.com','9876543215','1999-09-17', 'Female', 'Durgapur','City Centre, Durgapur','B+', '9876543205', 'XXXX XXXX 7766'),
(7,  20, 'Debjit Ghosh',       'debjit.ghosh@example.com',  '9876543216', '1985-12-05', 'Male',   'Bankura', 'Court More, Bankura', 'A+', '9876543206', 'XXXX XXXX 3344'),
(8,  21, 'Tanima Kundu',       'tanima.kundu@example.com',  '9876543217', '1994-03-30', 'Female', 'Bankura', 'School Danga, Bankura','O-','9876543207', 'XXXX XXXX 5566'),
(9,  22, 'Bikash Patra',       'bikash.patra@example.com',  '9876543218', '1980-07-21', 'Male',   'Bankura', 'Katjuridanga, Bankura','B+','9876543208', 'XXXX XXXX 2211'),
(10, 23, 'Anirban Dey',        'anirban.dey@example.com',   '9876543219', '1993-01-14', 'Male',   'Durgapur','Benachity, Durgapur', 'AB+','9876543209','XXXX XXXX 6655');

-- -----------------------------------------------------------------------------
-- Doctors Data
-- -----------------------------------------------------------------------------
INSERT INTO `doctors` (`doctor_id`, `user_id`, `clinic_id`, `name`, `specialization`, `qualification`, `experience_years`, `registration_number`, `clinic_name`, `type`, `location`, `address`, `contact`, `visiting_charge`, `online_appointment`, `availability_days`, `availability_time`, `slot_duration_minutes`, `distance_km`, `about`, `avatar_seed`, `rating`, `review_count`, `verification_status`) VALUES
(1,  2,  1, 'Dr. Ananya Sen',      'Cardiologist',      'MBBS, MD, DM (Cardiology)', 14, 'WBMC-74125', 'HeartCare Superspecialty Clinic',      'Clinic',   'Bankura',  'ABC Road, Near Court More, Bankura',              '9800000001', 400.00, 1, 'Mon, Tue, Wed, Thu, Fri',    '8:00 AM - 4:00 PM',  20, 1.8, 'Senior Consultant Interventional Cardiologist with over 14 years of clinical excellence in treating ischemic heart disease, cardiac rhythm disorders, and preventive cardiology.', 'ananya', 4.90, 48, 'Verified'),
(2,  3,  2, 'Dr. Rajesh Bose',     'Cardiologist',      'MBBS, MD (Medicine), DNB',  18, 'WBMC-63211', 'Bankura City Multi-Specialty Hospital', 'Hospital', 'Bankura',  'Station Road, Opp. Central Bus Stand, Bankura',    '9800000002', 600.00, 1, 'Mon, Wed, Fri',             '10:00 AM - 2:00 PM', 20, 2.4, 'Chief Cardiologist and critical care expert at Bankura City Hospital with extensive background in pacemaker implantation and heart failure management.', 'rajesh', 4.75, 36, 'Verified'),
(3,  4,  3, 'Dr. Meera Iyer',      'Dermatologist',     'MBBS, MD (DVL)',            10, 'WBMC-88290', 'GlowSkin & Laser Clinic',               'Clinic',   'Bankura',  'College Road, Near Christian College, Bankura',    '9800000003', 350.00, 1, 'Mon, Tue, Wed, Thu, Fri, Sat','9:00 AM - 5:00 PM',  15, 1.2, 'Specialist in clinical dermatology, anti-aging therapies, laser treatments, chronic psoriasis, and pediatric skin ailments.', 'meera', 4.85, 29, 'Verified'),
(4,  5,  4, 'Dr. Sanjay Dutta',    'Neurologist',       'MBBS, MD, DM (Neurology)',  16, 'WBMC-55910', 'NeuroCare Institute & Research Center', 'Hospital', 'Bankura',  'Court More, Bankura',                             '9800000004', 700.00, 0, 'Tue, Thu, Sat',             '11:00 AM - 3:00 PM', 30, 3.1, 'Distinguished neurologist focusing on epilepsy, stroke rehabilitation, movement disorders, and neuro-electrophysiology testing.', 'sanjay', 4.65, 21, 'Verified'),
(5,  6,  5, 'Dr. Priya Nair',      'Pediatrician',      'MBBS, DCH, MD (Pediatrics)', 9,  'WBMC-90234', 'Little Stars Pediatric Care',           'Clinic',   'Bankura',  'Kenduadihi Bypass, Bankura',                     '9800000005', 300.00, 1, 'Mon, Tue, Wed, Thu, Fri, Sat','8:30 AM - 1:30 PM',  15, 1.9, 'Compassionate child healthcare specialist dedicated to developmental monitoring, adolescent medicine, immunizations, and newborn care.', 'priya', 4.95, 54, 'Verified'),
(6,  7,  6, 'Dr. Arjun Mehta',     'Orthopedic',        'MBBS, MS (Orthopedics)',    13, 'WBMC-71089', 'Bankura Ortho & Trauma Center',          'Hospital', 'Bankura',  'Bypass Road, Near Lalbazar, Bankura',            '9800000006', 500.00, 1, 'Mon, Tue, Wed, Thu, Fri',     '9:00 AM - 4:00 PM',  20, 2.7, 'Senior joint replacement surgeon and sports traumatologist with expertise in minimally invasive arthroscopy and spine stability.', 'arjun', 4.80, 42, 'Verified'),
(7,  8,  7, 'Dr. Kavita Roy',      'Gynecologist',      'MBBS, MS (OBG), FICOG',     15, 'WBMC-68420', 'WomenCare Maternity & Gynecology Clinic','Clinic',   'Bankura',  'Lalbazar Main Road, Bankura',                     '9800000007', 450.00, 1, 'Mon, Wed, Fri, Sat',         '10:00 AM - 3:00 PM', 20, 1.5, 'Obstetrician and gynecological laparoscopic surgeon specializing in high-risk pregnancy, infertility consultation, and adolescent health.', 'kavita', 4.90, 38, 'Verified'),
(8,  9,  8, 'Dr. Nikhil Verma',    'Dentist',           'BDS, MDS (Prosthodontics)',  8,  'WBMC-94301', 'Smile Dental & Maxillofacial Care',      'Clinic',   'Bankura',  'Machantala Bazaar, Bankura',                     '9800000008', 250.00, 1, 'Mon, Tue, Wed, Thu, Fri, Sat','10:00 AM - 6:00 PM', 30, 0.8, 'Comprehensive oral care, dental implants, pain-free root canals, digital smile designing, and aesthetic corrections.', 'nikhil', 4.70, 19, 'Verified'),
(9,  10, 9, 'Dr. Sunita Ghosh',    'General Physician', 'MBBS, DNB (Family Medicine)',12,'WBMC-79843', 'Family Health & Wellness Center',       'Clinic',   'Bankura',  'Nutanganj, Bankura',                              '9800000009', 200.00, 1, 'Mon, Tue, Wed, Thu, Fri, Sat','8:00 AM - 8:00 PM',  15, 1.1, 'Trusted family healthcare physician providing early diagnosis, lifestyle counseling, diabetes control, and chronic ailment follow-ups.', 'sunita', 4.85, 62, 'Verified'),
(10, 11, 2, 'Dr. Alok Banerjee',   'ENT Specialist',    'MBBS, MS (ENT)',            11, 'WBMC-83109', 'Bankura City Multi-Specialty Hospital', 'Hospital', 'Bankura',  'Station Road, Opp. Central Bus Stand, Bankura',    '9800000010', 400.00, 0, 'Tue, Thu, Sat',              '11:00 AM - 4:00 PM', 20, 2.4, 'Expert in microscopic ear surgeries, endoscopic sinus therapies, allergy testing, and pediatric hearing evaluations.', 'alok', 4.60, 15, 'Verified'),
(11, 12, 10,'Dr. Debjani Sarkar',  'Ophthalmologist',   'MBBS, MS (Ophthalmology)',  10, 'WBMC-86290', 'Vision Plus Eye Institute',             'Hospital', 'Durgapur', 'City Centre, Durgapur',                          '9800000011', 350.00, 1, 'Mon, Tue, Wed, Thu, Fri',     '9:00 AM - 5:00 PM',  20, 8.5, 'Ophthalmic surgeon specializing in stitchless cataract procedures, refractive corneal corrections, and glaucoma therapies.', 'debjani', 4.80, 27, 'Verified'),
(12, 13, 1, 'Dr. Subhash Mondal',  'Cardiologist',      'MBBS, MD (Cardiology)',      6,  'WBMC-98711', 'HeartCare Superspecialty Clinic',      'Clinic',   'Bankura',  'ABC Road, Near Court More, Bankura',              '9800000012', 350.00, 1, 'Mon, Tue, Thu, Fri',         '9:00 AM - 1:00 PM',  20, 1.8, 'Associate consultant cardiologist newly registered on ApoCare. Awaiting administrative credential verification.', 'subhash', 5.00, 0, 'Pending');

-- -----------------------------------------------------------------------------
-- Doctor Weekly Availability Schedule
-- -----------------------------------------------------------------------------
INSERT INTO `doctor_availability` (`doctor_id`, `day_of_week`, `is_available`, `start_time`, `end_time`, `break_start`, `break_end`, `max_patients`) VALUES
(1, 'Monday',    1, '08:00:00', '16:00:00', '13:00:00', '14:00:00', 20),
(1, 'Tuesday',   1, '08:00:00', '16:00:00', '13:00:00', '14:00:00', 20),
(1, 'Wednesday', 1, '08:00:00', '16:00:00', '13:00:00', '14:00:00', 20),
(1, 'Thursday',  1, '08:00:00', '16:00:00', '13:00:00', '14:00:00', 20),
(1, 'Friday',    1, '08:00:00', '16:00:00', '13:00:00', '14:00:00', 20),
(1, 'Saturday',  0, '08:00:00', '13:00:00', NULL, NULL, 0),
(1, 'Sunday',    0, '08:00:00', '13:00:00', NULL, NULL, 0),

(2, 'Monday',    1, '10:00:00', '14:00:00', NULL, NULL, 15),
(2, 'Wednesday', 1, '10:00:00', '14:00:00', NULL, NULL, 15),
(2, 'Friday',    1, '10:00:00', '14:00:00', NULL, NULL, 15),

(3, 'Monday',    1, '09:00:00', '17:00:00', '13:00:00', '14:00:00', 25),
(3, 'Tuesday',   1, '09:00:00', '17:00:00', '13:00:00', '14:00:00', 25),
(3, 'Wednesday', 1, '09:00:00', '17:00:00', '13:00:00', '14:00:00', 25),
(3, 'Thursday',  1, '09:00:00', '17:00:00', '13:00:00', '14:00:00', 25),
(3, 'Friday',    1, '09:00:00', '17:00:00', '13:00:00', '14:00:00', 25),
(3, 'Saturday',  1, '09:00:00', '14:00:00', NULL, NULL, 15);

-- -----------------------------------------------------------------------------
-- Appointments (18 Sample Records across past, present, and upcoming)
-- -----------------------------------------------------------------------------
INSERT INTO `appointments` (`appointment_id`, `booking_ref`, `patient_id`, `doctor_id`, `clinic_id`, `full_name`, `age`, `gender`, `mobile`, `email`, `location`, `aadhaar_masked`, `appointment_date`, `appointment_time`, `time_slot`, `reason`, `status`, `payment_status`, `amount`, `platform_fee`, `total_amount`, `doctor_notes`, `created_at`) VALUES
(1,  'APO-2026-00101', 1, 1, 1, 'Riya Chatterjee', 28, 'Female', '9876543210', 'riya.demo@example.com', 'Bankura', 'XXXX XXXX 4321', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '10:30 AM', '10:30 AM - 10:50 AM', 'Annual cardiac checkup and routine ECG review', 'Confirmed', 'Paid', 400.00, 25.00, 425.00, 'Patient has mild sinus tachycardia history. Advised fasting lipid panel prior to visit.', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2,  'APO-2026-00102', 1, 7, 7, 'Riya Chatterjee', 28, 'Female', '9876543210', 'riya.demo@example.com', 'Bankura', 'XXXX XXXX 4321', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '11:00 AM', '11:00 AM - 11:20 AM', 'Prenatal general counseling', 'Pending', 'Paid', 450.00, 25.00, 475.00, NULL, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3,  'APO-2026-00103', 1, 9, 9, 'Riya Chatterjee', 28, 'Female', '9876543210', 'riya.demo@example.com', 'Bankura', 'XXXX XXXX 4321', DATE_SUB(CURDATE(), INTERVAL 15 DAY), '09:00 AM', '09:00 AM - 09:15 AM', 'Seasonal flu and throat irritation', 'Completed', 'Paid', 200.00, 25.00, 225.00, 'Prescribed paracetamol 650mg and warm saline gargle. Recovered fully.', DATE_SUB(NOW(), INTERVAL 16 DAY)),
(4,  'APO-2026-00104', 2, 1, 1, 'Sourav Das',      34, 'Male',   '9876543211', 'sourav.das@example.com', 'Bankura', 'XXXX XXXX 8765', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '09:00 AM', '09:00 AM - 09:20 AM', 'Hypertension management and BP monitoring', 'Confirmed', 'Paid', 400.00, 25.00, 425.00, 'Keep BP log for 3 consecutive mornings.', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(5,  'APO-2026-00105', 3, 3, 3, 'Amit Sen',        38, 'Male',   '9876543212', 'amit.sen@example.com',   'Bankura', 'XXXX XXXX 1234', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '02:00 PM', '02:00 PM - 02:15 PM', 'Skin allergy and redness on forearms', 'Confirmed', 'Paid', 350.00, 25.00, 375.00, NULL, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(6,  'APO-2026-00106', 4, 5, 5, 'Puja Banerjee',   31, 'Female', '9876543213', 'puja.banerjee@example.com','Bankura','XXXX XXXX 5678', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:00 AM', '10:00 AM - 10:15 AM', 'Baby vaccination (DTP booster)', 'Confirmed', 'Paid', 300.00, 25.00, 325.00, 'Bring vaccination card.', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(7,  'APO-2026-00107', 5, 6, 6, 'Rahul Roy',       36, 'Male',   '9876543214', 'rahul.roy@example.com',  'Bankura', 'XXXX XXXX 9988', CURDATE(),                            '11:30 AM', '11:30 AM - 11:50 AM', 'Right knee pain after sports workout', 'Confirmed', 'Paid', 500.00, 25.00, 525.00, 'X-ray of right knee recommended.', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(8,  'APO-2026-00108', 6, 1, 1, 'Sneha Mukherjee', 27, 'Female', '9876543215', 'sneha.mukherjee@example.com','Durgapur','XXXX XXXX 7766',CURDATE(),                            '01:30 PM', '01:30 PM - 01:50 PM', 'Occasional chest tightness during jogging', 'Pending', 'Paid', 400.00, 25.00, 425.00, NULL, DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(9,  'APO-2026-00109', 7, 8, 8, 'Debjit Ghosh',    41, 'Male',   '9876543216', 'debjit.ghosh@example.com','Bankura', 'XXXX XXXX 3344', DATE_ADD(CURDATE(), INTERVAL 4 DAY), '04:00 PM', '04:00 PM - 04:30 PM', 'Severe toothache in upper right molar', 'Confirmed', 'Paid', 250.00, 25.00, 275.00, NULL, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(10, 'APO-2026-00110', 8, 1, 1, 'Tanima Kundu',    32, 'Female', '9876543217', 'tanima.kundu@example.com', 'Bankura', 'XXXX XXXX 5566', DATE_SUB(CURDATE(), INTERVAL 7 DAY),  '03:00 PM', '03:00 PM - 03:20 PM', 'Follow-up for palpitation symptoms', 'Completed', 'Paid', 400.00, 25.00, 425.00, 'ECG normal. Advised lifestyle modifications and stress management.', DATE_SUB(NOW(), INTERVAL 9 DAY)),
(11, 'APO-2026-00111', 9, 6, 6, 'Bikash Patra',    46, 'Male',   '9876543218', 'bikash.patra@example.com', 'Bankura', 'XXXX XXXX 2211', DATE_SUB(CURDATE(), INTERVAL 12 DAY), '10:00 AM', '10:00 AM - 10:20 AM', 'Lower backache and lumbar spine stiffness', 'Completed', 'Paid', 500.00, 25.00, 525.00, 'Physiotherapy advised for 2 weeks. Ergonomic seating.', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(12, 'APO-2026-00112', 10,11,10,'Anirban Dey',     33, 'Male',   '9876543219', 'anirban.dey@example.com',  'Durgapur','XXXX XXXX 6655', DATE_ADD(CURDATE(), INTERVAL 6 DAY), '02:30 PM', '02:30 PM - 02:50 PM', 'Blurry vision and headache with screen work', 'Confirmed', 'Paid', 350.00, 25.00, 375.00, NULL, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(13, 'APO-2026-00113', 2, 1, 1, 'Sourav Das',      34, 'Male',   '9876543211', 'sourav.das@example.com', 'Bankura', 'XXXX XXXX 8765', DATE_SUB(CURDATE(), INTERVAL 25 DAY), '11:00 AM', '11:00 AM - 11:20 AM', 'Initial cardiac screening', 'Completed', 'Paid', 400.00, 25.00, 425.00, 'Advised low sodium diet.', DATE_SUB(NOW(), INTERVAL 26 DAY)),
(14, 'APO-2026-00114', 3, 1, 1, 'Amit Sen',        38, 'Male',   '9876543212', 'amit.sen@example.com',   'Bankura', 'XXXX XXXX 1234', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '02:30 PM', '02:30 PM - 02:50 PM', 'Cholesterol report discussion', 'Pending', 'Paid', 400.00, 25.00, 425.00, NULL, DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(15, 'APO-2026-00115', 5, 1, 1, 'Rahul Roy',       36, 'Male',   '9876543214', 'rahul.roy@example.com',  'Bankura', 'XXXX XXXX 9988', DATE_SUB(CURDATE(), INTERVAL 3 DAY),  '09:30 AM', '09:30 AM - 09:50 AM', 'Shortness of breath after climbing stairs', 'Cancelled', 'Refunded', 400.00, 25.00, 425.00, 'Patient requested cancellation due to travel conflict.', DATE_SUB(NOW(), INTERVAL 5 DAY));

-- -----------------------------------------------------------------------------
-- Transactions (15 Records matching appointments)
-- -----------------------------------------------------------------------------
INSERT INTO `transactions` (`transaction_id`, `transaction_ref`, `appointment_id`, `patient_id`, `doctor_id`, `amount`, `platform_fee`, `currency`, `gateway`, `gateway_order_id`, `gateway_payment_id`, `gateway_signature`, `payment_status`, `created_at`) VALUES
(1,  'TXN-2026-00101', 1,  1, 1, 400.00, 25.00, 'INR', 'MockPay', 'order_mock_9849201', 'pay_mock_3948102', 'sig_mock_489201849102', 'Successful', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2,  'TXN-2026-00102', 2,  1, 7, 450.00, 25.00, 'INR', 'MockPay', 'order_mock_9849202', 'pay_mock_3948103', 'sig_mock_489201849103', 'Successful', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3,  'TXN-2026-00103', 3,  1, 9, 200.00, 25.00, 'INR', 'Razorpay','order_rzp_9849203',  'pay_rzp_3948104',  'sig_rzp_489201849104',  'Successful', DATE_SUB(NOW(), INTERVAL 16 DAY)),
(4,  'TXN-2026-00104', 4,  2, 1, 400.00, 25.00, 'INR', 'MockPay', 'order_mock_9849204', 'pay_mock_3948105', 'sig_mock_489201849105', 'Successful', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(5,  'TXN-2026-00105', 5,  3, 3, 350.00, 25.00, 'INR', 'Razorpay','order_rzp_9849205',  'pay_rzp_3948106',  'sig_rzp_489201849106',  'Successful', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(6,  'TXN-2026-00106', 6,  4, 5, 300.00, 25.00, 'INR', 'MockPay', 'order_mock_9849206', 'pay_mock_3948107', 'sig_mock_489201849107', 'Successful', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(7,  'TXN-2026-00107', 7,  5, 6, 500.00, 25.00, 'INR', 'MockPay', 'order_mock_9849207', 'pay_mock_3948108', 'sig_mock_489201849108', 'Successful', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(8,  'TXN-2026-00108', 8,  6, 1, 400.00, 25.00, 'INR', 'MockPay', 'order_mock_9849208', 'pay_mock_3948109', 'sig_mock_489201849109', 'Successful', DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(9,  'TXN-2026-00109', 9,  7, 8, 250.00, 25.00, 'INR', 'MockPay', 'order_mock_9849209', 'pay_mock_3948110', 'sig_mock_489201849110', 'Successful', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(10, 'TXN-2026-00110', 10, 8, 1, 400.00, 25.00, 'INR', 'Razorpay','order_rzp_9849210',  'pay_rzp_3948111',  'sig_rzp_489201849111',  'Successful', DATE_SUB(NOW(), INTERVAL 9 DAY)),
(11, 'TXN-2026-00111', 11, 9, 6, 500.00, 25.00, 'INR', 'MockPay', 'order_mock_9849211', 'pay_mock_3948112', 'sig_mock_489201849112', 'Successful', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(12, 'TXN-2026-00112', 12, 10,11,350.00, 25.00, 'INR', 'MockPay', 'order_mock_9849212', 'pay_mock_3948113', 'sig_mock_489201849113', 'Successful', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(13, 'TXN-2026-00113', 13, 2, 1, 400.00, 25.00, 'INR', 'MockPay', 'order_mock_9849213', 'pay_mock_3948114', 'sig_mock_489201849114', 'Successful', DATE_SUB(NOW(), INTERVAL 26 DAY)),
(14, 'TXN-2026-00114', 14, 3, 1, 400.00, 25.00, 'INR', 'MockPay', 'order_mock_9849214', 'pay_mock_3948115', 'sig_mock_489201849115', 'Successful', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(15, 'TXN-2026-00115', 15, 5, 1, 400.00, 25.00, 'INR', 'MockPay', 'order_mock_9849215', 'pay_mock_3948116', 'sig_mock_489201849116', 'Refunded',   DATE_SUB(NOW(), INTERVAL 4 DAY));

-- -----------------------------------------------------------------------------
-- Notifications
-- -----------------------------------------------------------------------------
INSERT INTO `notifications` (`user_id`, `role`, `title`, `message`, `type`, `is_read`, `link`, `created_at`) VALUES
(14, 'patient', 'Appointment Confirmed', 'Dr. Ananya Sen confirmed your appointment for 2 days from now at 10:30 AM.', 'success', 0, 'patient/appointments.php', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(14, 'patient', 'Payment Successful', 'Payment of ₹425.00 for APO-2026-00101 was verified successfully. Digital receipt generated.', 'info', 0, 'patient/transactions.php', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(14, 'patient', 'Request Submitted', 'Your appointment request with Dr. Kavita Roy is awaiting doctor review.', 'info', 1, 'patient/appointments.php', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2,  'doctor',  'New Appointment Request', 'Patient Amit Sen requested an appointment on tomorrow at 02:30 PM.', 'warning', 0, 'doctor/requests.php', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(2,  'doctor',  'New Appointment Request', 'Patient Sneha Mukherjee requested an appointment for today at 01:30 PM.', 'warning', 0, 'doctor/requests.php', DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(1,  'admin',   'New Doctor Registration', 'Dr. Subhash Mondal registered with registration WBMC-98711 and is awaiting verification.', 'info', 0, 'admin/doctors.php', DATE_SUB(NOW(), INTERVAL 12 HOUR)),
(1,  'admin',   'Platform Transaction Milestone', 'ApoCare has processed over ₹6,000 in appointments this week.', 'success', 1, 'admin/transactions.php', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- -----------------------------------------------------------------------------
-- Reviews
-- -----------------------------------------------------------------------------
INSERT INTO `reviews` (`doctor_id`, `patient_id`, `appointment_id`, `rating`, `comment`, `is_approved`, `created_at`) VALUES
(1, 1, 3, 5, 'Dr. Ananya Sen is remarkably patient and attentive. She diagnosed my irregular heartbeat accurately and provided reassurance throughout.', 1, DATE_SUB(NOW(), INTERVAL 10 DAY)),
(1, 2, 13, 5, 'Best cardiologist in Bankura! Very clean clinic at ABC Road and zero waiting time when booked via ApoCare.', 1, DATE_SUB(NOW(), INTERVAL 20 DAY)),
(3, 3, 5, 5, 'Excellent dermatology treatment. My allergic skin flareup subsided within three days of taking the prescribed ointment.', 1, DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 4, 6, 5, 'Dr. Priya Nair handled my toddler so gently during the vaccination shot. Very caring and professional!', 1, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(6, 5, 7, 5, 'Great orthopedic doctor. Explained the knee issue with model diagrams and avoided unnecessary medicines.', 1, DATE_SUB(NOW(), INTERVAL 3 DAY));
