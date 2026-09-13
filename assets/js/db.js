/**
 * ApoCare - Client-Side Central Database & State Management Engine
 * Preloaded with comprehensive healthcare data and persisted via LocalStorage
 * ==============================================================================
 */

const APOCARE_STORAGE_KEY = 'apocare_app_db_v2';

const INITIAL_DATABASE = {
  version: '2.0.0',
  
  // 1. Specializations
  specializations: [
    { id: 1, name: 'Cardiologist', slug: 'cardiologist', icon: '❤️', description: 'Heart conditions, hypertension, coronary care, and preventive cardiology', doctor_count: 2 },
    { id: 2, name: 'Dermatologist', slug: 'dermatologist', icon: '✨', description: 'Skin disorders, cosmetic dermatology, acne, allergies, and hair care', doctor_count: 1 },
    { id: 3, name: 'Neurologist', slug: 'neurologist', icon: '🧠', description: 'Brain, spinal cord, migraine, stroke, nerve disorders, and epilepsy', doctor_count: 1 },
    { id: 4, name: 'Pediatrician', slug: 'pediatrician', icon: '👶', description: 'Infant, child, and adolescent wellness, vaccinations, and growth', doctor_count: 1 },
    { id: 5, name: 'Orthopedic', slug: 'orthopedic', icon: '🦴', description: 'Joint replacement, fracture treatment, sports injuries, and spine care', doctor_count: 1 },
    { id: 6, name: 'Gynecologist', slug: 'gynecologist', icon: '🌸', description: 'Prenatal, postnatal care, reproductive health, and obstetric surgery', doctor_count: 1 },
    { id: 7, name: 'Dentist', slug: 'dentist', icon: '🦷', description: 'General dentistry, root canal, teeth whitening, and orthodontic care', doctor_count: 1 },
    { id: 8, name: 'General Physician', slug: 'general-physician', icon: '🩺', description: 'Primary healthcare, viral fever, hypertension, diabetes, and checkups', doctor_count: 1 },
    { id: 9, name: 'ENT Specialist', slug: 'ent-specialist', icon: '👂', description: 'Ear infections, hearing loss, sinus disorders, and throat care', doctor_count: 1 },
    { id: 10, name: 'Ophthalmologist', slug: 'ophthalmologist', icon: '👁️', description: 'Vision care, cataract surgery, retinal diagnostics, and optics', doctor_count: 1 },
    { id: 11, name: 'Gastroenterologist', slug: 'gastroenterologist', icon: '🛡️', description: 'Digestive system, liver disorders, endoscopy, and abdominal pain', doctor_count: 0 },
    { id: 12, name: 'Psychiatrist', slug: 'psychiatrist', icon: '😊', description: 'Mental health, anxiety, depression therapy, and psychiatric wellness', doctor_count: 0 }
  ],

  // 2. Locations
  locations: [
    { id: 1, name: 'Bankura', district: 'Bankura', state: 'West Bengal', pin_code: '722101', is_active: 1 },
    { id: 2, name: 'Bishnupur', district: 'Bankura', state: 'West Bengal', pin_code: '722122', is_active: 1 },
    { id: 3, name: 'Durgapur', district: 'Paschim Bardhaman', state: 'West Bengal', pin_code: '713216', is_active: 1 },
    { id: 4, name: 'Asansol', district: 'Paschim Bardhaman', state: 'West Bengal', pin_code: '713301', is_active: 1 },
    { id: 5, name: 'Raniganj', district: 'Paschim Bardhaman', state: 'West Bengal', pin_code: '713347', is_active: 1 },
    { id: 6, name: 'Purulia', district: 'Purulia', state: 'West Bengal', pin_code: '723101', is_active: 1 },
    { id: 7, name: 'Burdwan', district: 'Purba Bardhaman', state: 'West Bengal', pin_code: '713101', is_active: 1 },
    { id: 8, name: 'Kolkata', district: 'Kolkata', state: 'West Bengal', pin_code: '700001', is_active: 1 }
  ],

  // 3. Clinics & Hospitals
  clinics: [
    { clinic_id: 1, name: 'HeartCare Superspecialty Clinic', type: 'Clinic', address: 'ABC Road, Near Court More, Bankura', location: 'Bankura', pin_code: '722101', contact: '03242-250101', email: 'contact@heartcarebankura.org', rating: 4.9 },
    { clinic_id: 2, name: 'Bankura City Multi-Specialty Hospital', type: 'Hospital', address: 'Station Road, Opp. Central Bus Stand, Bankura', location: 'Bankura', pin_code: '722101', contact: '03242-250202', email: 'admin@bankuracityhospital.in', rating: 4.7 },
    { clinic_id: 3, name: 'GlowSkin & Laser Clinic', type: 'Clinic', address: 'College Road, Near Christian College, Bankura', location: 'Bankura', pin_code: '722101', contact: '03242-250303', email: 'info@glowskinclinic.com', rating: 4.8 },
    { clinic_id: 4, name: 'NeuroCare Institute & Research Center', type: 'Hospital', address: 'Court More, Bankura', location: 'Bankura', pin_code: '722101', contact: '03242-250404', email: 'help@neurocarebankura.org', rating: 4.6 },
    { clinic_id: 5, name: 'Little Stars Pediatric Care', type: 'Clinic', address: 'Kenduadihi Bypass, Bankura', location: 'Bankura', pin_code: '722102', contact: '03242-250505', email: 'care@littlestars.in', rating: 4.9 },
    { clinic_id: 6, name: 'Bankura Ortho & Trauma Center', type: 'Hospital', address: 'Bypass Road, Near Lalbazar, Bankura', location: 'Bankura', pin_code: '722101', contact: '03242-250606', email: 'ortho@bankuratrauma.org', rating: 4.8 },
    { clinic_id: 7, name: 'WomenCare Maternity & Gynecology Clinic', type: 'Clinic', address: 'Lalbazar Main Road, Bankura', location: 'Bankura', pin_code: '722101', contact: '03242-250707', email: 'womencare@bankurahealth.com', rating: 4.9 },
    { clinic_id: 8, name: 'Smile Dental & Maxillofacial Care', type: 'Clinic', address: 'Machantala Bazaar, Bankura', location: 'Bankura', pin_code: '722101', contact: '03242-250808', email: 'smile@bankuradental.com', rating: 4.7 },
    { clinic_id: 9, name: 'Family Health & Wellness Center', type: 'Clinic', address: 'Nutanganj, Bankura', location: 'Bankura', pin_code: '722101', contact: '03242-250909', email: 'familyhealth@bankura.net', rating: 4.8 },
    { clinic_id: 10, name: 'Vision Plus Eye Institute', type: 'Hospital', address: 'City Centre, Durgapur', location: 'Durgapur', pin_code: '713216', contact: '0343-2541010', email: 'info@visionplusdurgapur.com', rating: 4.8 }
  ],

  // 4. Doctors
  doctors: [
    {
      doctor_id: 1,
      user_id: 2,
      clinic_id: 1,
      name: 'Dr. Ananya Sen',
      gender: 'Female',
      specialization: 'Cardiologist',
      qualification: 'MBBS, MD, DM (Cardiology)',
      experience_years: 14,
      registration_number: 'WBMC-74125',
      clinic_name: 'HeartCare Superspecialty Clinic',
      type: 'Clinic',
      location: 'Bankura',
      address: 'ABC Road, Near Court More, Bankura',
      contact: '9800000001',
      email: 'dr.ananya@apocare.com',
      visiting_charge: 400.00,
      online_appointment: 1,
      availability_days: 'Mon, Tue, Wed, Thu, Fri',
      availability_time: '8:00 AM - 4:00 PM',
      slot_duration_minutes: 20,
      distance_km: 1.8,
      about: 'Senior Consultant Interventional Cardiologist with over 14 years of clinical excellence in treating ischemic heart disease, cardiac rhythm disorders, and preventive cardiology. Trained at premier medical institutions with high patient trust index.',
      avatar_seed: 'ananya',
      image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      rating: 4.90,
      review_count: 48,
      verification_status: 'Verified',
      languages: ['English', 'Bengali', 'Hindi'],
      services: ['Echocardiogram', 'ECG Review', 'Hypertension Management', 'Coronary Angiography', 'Holter Monitoring'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '08:00', end_time: '16:00', max_patients: 20 },
        { day: 'Tuesday', is_available: true, start_time: '08:00', end_time: '16:00', max_patients: 20 },
        { day: 'Wednesday', is_available: true, start_time: '08:00', end_time: '16:00', max_patients: 20 },
        { day: 'Thursday', is_available: true, start_time: '08:00', end_time: '16:00', max_patients: 20 },
        { day: 'Friday', is_available: true, start_time: '08:00', end_time: '16:00', max_patients: 20 },
        { day: 'Saturday', is_available: false, start_time: '09:00', end_time: '13:00', max_patients: 0 },
        { day: 'Sunday', is_available: false, start_time: '09:00', end_time: '13:00', max_patients: 0 }
      ]
    },
    {
      doctor_id: 2,
      user_id: 3,
      clinic_id: 2,
      name: 'Dr. Rajesh Bose',
      gender: 'Male',
      specialization: 'Cardiologist',
      qualification: 'MBBS, MD (Medicine), DNB (Cardiology)',
      experience_years: 18,
      registration_number: 'WBMC-63211',
      clinic_name: 'Bankura City Multi-Specialty Hospital',
      type: 'Hospital',
      location: 'Bankura',
      address: 'Station Road, Opp. Central Bus Stand, Bankura',
      contact: '9800000002',
      email: 'dr.rajesh@apocare.com',
      visiting_charge: 600.00,
      online_appointment: 1,
      availability_days: 'Mon, Wed, Fri',
      availability_time: '10:00 AM - 2:00 PM',
      slot_duration_minutes: 20,
      distance_km: 2.4,
      about: 'Chief Cardiologist and critical care expert at Bankura City Hospital with extensive background in pacemaker implantation, heart failure management, and lipid clinics.',
      avatar_seed: 'rajesh',
      image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      rating: 4.75,
      review_count: 36,
      verification_status: 'Verified',
      languages: ['English', 'Bengali'],
      services: ['Cardiac Pacemaker', 'Angioplasty Follow-up', 'Heart Failure Clinic', 'Stress Echo'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '10:00', end_time: '14:00', max_patients: 15 },
        { day: 'Wednesday', is_available: true, start_time: '10:00', end_time: '14:00', max_patients: 15 },
        { day: 'Friday', is_available: true, start_time: '10:00', end_time: '14:00', max_patients: 15 }
      ]
    },
    {
      doctor_id: 3,
      user_id: 4,
      clinic_id: 3,
      name: 'Dr. Meera Iyer',
      gender: 'Female',
      specialization: 'Dermatologist',
      qualification: 'MBBS, MD (DVL)',
      experience_years: 10,
      registration_number: 'WBMC-88290',
      clinic_name: 'GlowSkin & Laser Clinic',
      type: 'Clinic',
      location: 'Bankura',
      address: 'College Road, Near Christian College, Bankura',
      contact: '9800000003',
      email: 'dr.meera@apocare.com',
      visiting_charge: 350.00,
      online_appointment: 1,
      availability_days: 'Mon, Tue, Wed, Thu, Fri, Sat',
      availability_time: '9:00 AM - 5:00 PM',
      slot_duration_minutes: 15,
      distance_km: 1.2,
      about: 'Specialist in clinical dermatology, anti-aging therapies, laser treatments, chronic psoriasis, eczema management, and pediatric skin ailments.',
      avatar_seed: 'meera',
      image_url: 'https://images.unsplash.com/photo-1594824813589-3221973ef841?auto=format&fit=crop&q=80&w=400',
      rating: 4.85,
      review_count: 29,
      verification_status: 'Verified',
      languages: ['English', 'Bengali', 'Hindi'],
      services: ['Acne Treatment', 'Laser Hair Reduction', 'Chemical Peels', 'Psoriasis Clinic', 'Hair Loss Therapy'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 25 },
        { day: 'Tuesday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 25 },
        { day: 'Wednesday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 25 },
        { day: 'Thursday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 25 },
        { day: 'Friday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 25 },
        { day: 'Saturday', is_available: true, start_time: '09:00', end_time: '14:00', max_patients: 15 }
      ]
    },
    {
      doctor_id: 4,
      user_id: 5,
      clinic_id: 4,
      name: 'Dr. Sanjay Dutta',
      gender: 'Male',
      specialization: 'Neurologist',
      qualification: 'MBBS, MD, DM (Neurology)',
      experience_years: 16,
      registration_number: 'WBMC-55910',
      clinic_name: 'NeuroCare Institute & Research Center',
      type: 'Hospital',
      location: 'Bankura',
      address: 'Court More, Bankura',
      contact: '9800000004',
      email: 'dr.sanjay@apocare.com',
      visiting_charge: 700.00,
      online_appointment: 1,
      availability_days: 'Tue, Thu, Sat',
      availability_time: '11:00 AM - 3:00 PM',
      slot_duration_minutes: 30,
      distance_km: 3.1,
      about: 'Distinguished neurologist focusing on epilepsy, stroke rehabilitation, movement disorders, Parkinsonism, and neuro-electrophysiology testing (EEG/EMG/NCV).',
      avatar_seed: 'sanjay',
      image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      rating: 4.65,
      review_count: 21,
      verification_status: 'Verified',
      languages: ['English', 'Bengali'],
      services: ['Epilepsy Clinic', 'Stroke Rehab', 'Migraine Care', 'Nerve Conduction Test', 'Tremor Analysis'],
      schedule: [
        { day: 'Tuesday', is_available: true, start_time: '11:00', end_time: '15:00', max_patients: 12 },
        { day: 'Thursday', is_available: true, start_time: '11:00', end_time: '15:00', max_patients: 12 },
        { day: 'Saturday', is_available: true, start_time: '11:00', end_time: '15:00', max_patients: 12 }
      ]
    },
    {
      doctor_id: 5,
      user_id: 6,
      clinic_id: 5,
      name: 'Dr. Priya Nair',
      gender: 'Female',
      specialization: 'Pediatrician',
      qualification: 'MBBS, DCH, MD (Pediatrics)',
      experience_years: 9,
      registration_number: 'WBMC-90234',
      clinic_name: 'Little Stars Pediatric Care',
      type: 'Clinic',
      location: 'Bankura',
      address: 'Kenduadihi Bypass, Bankura',
      contact: '9800000005',
      email: 'dr.priya@apocare.com',
      visiting_charge: 300.00,
      online_appointment: 1,
      availability_days: 'Mon, Tue, Wed, Thu, Fri, Sat',
      availability_time: '8:30 AM - 1:30 PM',
      slot_duration_minutes: 15,
      distance_km: 1.9,
      about: 'Compassionate child healthcare specialist dedicated to developmental milestone monitoring, pediatric immunizations, adolescent medicine, and newborn care.',
      avatar_seed: 'priya',
      image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
      rating: 4.95,
      review_count: 54,
      verification_status: 'Verified',
      languages: ['English', 'Bengali', 'Hindi'],
      services: ['Baby Vaccinations', 'Growth Assessment', 'Neonatal Care', 'Pediatric Asthma', 'Nutritional Counseling'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '08:30', end_time: '13:30', max_patients: 20 },
        { day: 'Tuesday', is_available: true, start_time: '08:30', end_time: '13:30', max_patients: 20 },
        { day: 'Wednesday', is_available: true, start_time: '08:30', end_time: '13:30', max_patients: 20 },
        { day: 'Thursday', is_available: true, start_time: '08:30', end_time: '13:30', max_patients: 20 },
        { day: 'Friday', is_available: true, start_time: '08:30', end_time: '13:30', max_patients: 20 },
        { day: 'Saturday', is_available: true, start_time: '08:30', end_time: '13:30', max_patients: 20 }
      ]
    },
    {
      doctor_id: 6,
      user_id: 7,
      clinic_id: 6,
      name: 'Dr. Arjun Mehta',
      gender: 'Male',
      specialization: 'Orthopedic',
      qualification: 'MBBS, MS (Orthopedics)',
      experience_years: 13,
      registration_number: 'WBMC-71089',
      clinic_name: 'Bankura Ortho & Trauma Center',
      type: 'Hospital',
      location: 'Bankura',
      address: 'Bypass Road, Near Lalbazar, Bankura',
      contact: '9800000006',
      email: 'dr.arjun@apocare.com',
      visiting_charge: 500.00,
      online_appointment: 1,
      availability_days: 'Mon, Tue, Wed, Thu, Fri',
      availability_time: '9:00 AM - 4:00 PM',
      slot_duration_minutes: 20,
      distance_km: 2.7,
      about: 'Senior joint replacement surgeon and sports traumatologist with expertise in minimally invasive arthroscopy, fracture repair, and spine stability.',
      avatar_seed: 'arjun',
      image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      rating: 4.80,
      review_count: 42,
      verification_status: 'Verified',
      languages: ['English', 'Bengali', 'Hindi'],
      services: ['Knee Replacement', 'Arthroscopic Surgery', 'Spine Disorders', 'Sports Injury Rehab', 'Fracture Care'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '09:00', end_time: '16:00', max_patients: 18 },
        { day: 'Tuesday', is_available: true, start_time: '09:00', end_time: '16:00', max_patients: 18 },
        { day: 'Wednesday', is_available: true, start_time: '09:00', end_time: '16:00', max_patients: 18 },
        { day: 'Thursday', is_available: true, start_time: '09:00', end_time: '16:00', max_patients: 18 },
        { day: 'Friday', is_available: true, start_time: '09:00', end_time: '16:00', max_patients: 18 }
      ]
    },
    {
      doctor_id: 7,
      user_id: 8,
      clinic_id: 7,
      name: 'Dr. Kavita Roy',
      gender: 'Female',
      specialization: 'Gynecologist',
      qualification: 'MBBS, MS (OBG), FICOG',
      experience_years: 15,
      registration_number: 'WBMC-68420',
      clinic_name: 'WomenCare Maternity & Gynecology Clinic',
      type: 'Clinic',
      location: 'Bankura',
      address: 'Lalbazar Main Road, Bankura',
      contact: '9800000007',
      email: 'dr.kavita@apocare.com',
      visiting_charge: 450.00,
      online_appointment: 1,
      availability_days: 'Mon, Wed, Fri, Sat',
      availability_time: '10:00 AM - 3:00 PM',
      slot_duration_minutes: 20,
      distance_km: 1.5,
      about: 'Obstetrician and gynecological laparoscopic surgeon specializing in high-risk pregnancy management, PCOS therapy, infertility consultation, and adolescent health.',
      avatar_seed: 'kavita',
      image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      rating: 4.90,
      review_count: 38,
      verification_status: 'Verified',
      languages: ['English', 'Bengali'],
      services: ['Antenatal Care', 'PCOS Management', 'Infertility Counseling', 'Laparoscopy', 'Menopause Health'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '10:00', end_time: '15:00', max_patients: 15 },
        { day: 'Wednesday', is_available: true, start_time: '10:00', end_time: '15:00', max_patients: 15 },
        { day: 'Friday', is_available: true, start_time: '10:00', end_time: '15:00', max_patients: 15 },
        { day: 'Saturday', is_available: true, start_time: '10:00', end_time: '15:00', max_patients: 15 }
      ]
    },
    {
      doctor_id: 8,
      user_id: 9,
      clinic_id: 8,
      name: 'Dr. Nikhil Verma',
      gender: 'Male',
      specialization: 'Dentist',
      qualification: 'BDS, MDS (Prosthodontics)',
      experience_years: 8,
      registration_number: 'WBMC-94301',
      clinic_name: 'Smile Dental & Maxillofacial Care',
      type: 'Clinic',
      location: 'Bankura',
      address: 'Machantala Bazaar, Bankura',
      contact: '9800000008',
      email: 'dr.nikhil@apocare.com',
      visiting_charge: 250.00,
      online_appointment: 1,
      availability_days: 'Mon, Tue, Wed, Thu, Fri, Sat',
      availability_time: '10:00 AM - 6:00 PM',
      slot_duration_minutes: 30,
      distance_km: 0.8,
      about: 'Comprehensive oral care, dental implants, pain-free root canals, digital smile designing, orthodontic corrections, and cosmetic teeth whitening.',
      avatar_seed: 'nikhil',
      image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      rating: 4.70,
      review_count: 19,
      verification_status: 'Verified',
      languages: ['English', 'Bengali', 'Hindi'],
      services: ['Root Canal Treatment', 'Dental Implants', 'Teeth Whitening', 'Invisible Aligners', 'Gum Surgery'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '10:00', end_time: '18:00', max_patients: 16 },
        { day: 'Tuesday', is_available: true, start_time: '10:00', end_time: '18:00', max_patients: 16 },
        { day: 'Wednesday', is_available: true, start_time: '10:00', end_time: '18:00', max_patients: 16 },
        { day: 'Thursday', is_available: true, start_time: '10:00', end_time: '18:00', max_patients: 16 },
        { day: 'Friday', is_available: true, start_time: '10:00', end_time: '18:00', max_patients: 16 },
        { day: 'Saturday', is_available: true, start_time: '10:00', end_time: '18:00', max_patients: 16 }
      ]
    },
    {
      doctor_id: 9,
      user_id: 10,
      clinic_id: 9,
      name: 'Dr. Sunita Ghosh',
      gender: 'Female',
      specialization: 'General Physician',
      qualification: 'MBBS, DNB (Family Medicine)',
      experience_years: 12,
      registration_number: 'WBMC-79843',
      clinic_name: 'Family Health & Wellness Center',
      type: 'Clinic',
      location: 'Bankura',
      address: 'Nutanganj, Bankura',
      contact: '9800000009',
      email: 'dr.sunita@apocare.com',
      visiting_charge: 200.00,
      online_appointment: 1,
      availability_days: 'Mon, Tue, Wed, Thu, Fri, Sat',
      availability_time: '8:00 AM - 8:00 PM',
      slot_duration_minutes: 15,
      distance_km: 1.1,
      about: 'Trusted family healthcare physician providing early diagnosis, lifestyle disease management, diabetes control, thyroid regulation, and preventive wellness checkups.',
      avatar_seed: 'sunita',
      image_url: 'https://images.unsplash.com/photo-1594824813589-3221973ef841?auto=format&fit=crop&q=80&w=400',
      rating: 4.85,
      review_count: 62,
      verification_status: 'Verified',
      languages: ['English', 'Bengali', 'Hindi'],
      services: ['Diabetes Clinic', 'Hypertension Check', 'Viral Fever Treatment', 'Thyroid Assessment', 'Full Body Checkup'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '08:00', end_time: '20:00', max_patients: 30 },
        { day: 'Tuesday', is_available: true, start_time: '08:00', end_time: '20:00', max_patients: 30 },
        { day: 'Wednesday', is_available: true, start_time: '08:00', end_time: '20:00', max_patients: 30 },
        { day: 'Thursday', is_available: true, start_time: '08:00', end_time: '20:00', max_patients: 30 },
        { day: 'Friday', is_available: true, start_time: '08:00', end_time: '20:00', max_patients: 30 },
        { day: 'Saturday', is_available: true, start_time: '08:00', end_time: '20:00', max_patients: 30 }
      ]
    },
    {
      doctor_id: 10,
      user_id: 11,
      clinic_id: 2,
      name: 'Dr. Alok Banerjee',
      gender: 'Male',
      specialization: 'ENT Specialist',
      qualification: 'MBBS, MS (ENT)',
      experience_years: 11,
      registration_number: 'WBMC-83109',
      clinic_name: 'Bankura City Multi-Specialty Hospital',
      type: 'Hospital',
      location: 'Bankura',
      address: 'Station Road, Opp. Central Bus Stand, Bankura',
      contact: '9800000010',
      email: 'dr.alok@apocare.com',
      visiting_charge: 400.00,
      online_appointment: 1,
      availability_days: 'Tue, Thu, Sat',
      availability_time: '11:00 AM - 4:00 PM',
      slot_duration_minutes: 20,
      distance_km: 2.4,
      about: 'Expert in microscopic ear surgeries, endoscopic sinus therapies, allergy testing, tonsillitis treatment, and pediatric hearing evaluations.',
      avatar_seed: 'alok',
      image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      rating: 4.60,
      review_count: 15,
      verification_status: 'Verified',
      languages: ['English', 'Bengali'],
      services: ['Sinus Surgery', 'Tympanoplasty', 'Hearing Loss Test', 'Allergy Management', 'Throat Endoscopy'],
      schedule: [
        { day: 'Tuesday', is_available: true, start_time: '11:00', end_time: '16:00', max_patients: 15 },
        { day: 'Thursday', is_available: true, start_time: '11:00', end_time: '16:00', max_patients: 15 },
        { day: 'Saturday', is_available: true, start_time: '11:00', end_time: '16:00', max_patients: 15 }
      ]
    },
    {
      doctor_id: 11,
      user_id: 12,
      clinic_id: 10,
      name: 'Dr. Debjani Sarkar',
      gender: 'Female',
      specialization: 'Ophthalmologist',
      qualification: 'MBBS, MS (Ophthalmology)',
      experience_years: 10,
      registration_number: 'WBMC-86290',
      clinic_name: 'Vision Plus Eye Institute',
      type: 'Hospital',
      location: 'Durgapur',
      address: 'City Centre, Durgapur',
      contact: '9800000011',
      email: 'dr.debjani@apocare.com',
      visiting_charge: 350.00,
      online_appointment: 1,
      availability_days: 'Mon, Tue, Wed, Thu, Fri',
      availability_time: '9:00 AM - 5:00 PM',
      slot_duration_minutes: 20,
      distance_km: 8.5,
      about: 'Ophthalmic surgeon specializing in stitchless cataract phaco-emulsification procedures, refractive corneal corrections, glaucoma monitoring, and diabetic retinopathy.',
      avatar_seed: 'debjani',
      image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
      rating: 4.80,
      review_count: 27,
      verification_status: 'Verified',
      languages: ['English', 'Bengali', 'Hindi'],
      services: ['Phaco Cataract Surgery', 'Glaucoma Screening', 'Diabetic Eye Care', 'Refractive Vision Check', 'Dry Eye Therapy'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 20 },
        { day: 'Tuesday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 20 },
        { day: 'Wednesday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 20 },
        { day: 'Thursday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 20 },
        { day: 'Friday', is_available: true, start_time: '09:00', end_time: '17:00', max_patients: 20 }
      ]
    },
    {
      doctor_id: 12,
      user_id: 13,
      clinic_id: 1,
      name: 'Dr. Subhash Mondal',
      gender: 'Male',
      specialization: 'Cardiologist',
      qualification: 'MBBS, MD (Cardiology)',
      experience_years: 6,
      registration_number: 'WBMC-98711',
      clinic_name: 'HeartCare Superspecialty Clinic',
      type: 'Clinic',
      location: 'Bankura',
      address: 'ABC Road, Near Court More, Bankura',
      contact: '9800000012',
      email: 'dr.subhash@apocare.com',
      visiting_charge: 350.00,
      online_appointment: 1,
      availability_days: 'Mon, Tue, Thu, Fri',
      availability_time: '9:00 AM - 1:00 PM',
      slot_duration_minutes: 20,
      distance_km: 1.8,
      about: 'Associate consultant cardiologist newly registered on ApoCare. Awaiting administrative credential verification.',
      avatar_seed: 'subhash',
      image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      rating: 5.00,
      review_count: 0,
      verification_status: 'Pending',
      languages: ['English', 'Bengali'],
      services: ['Preventive Cardiology', 'Hypertension', 'ECG Analysis'],
      schedule: [
        { day: 'Monday', is_available: true, start_time: '09:00', end_time: '13:00', max_patients: 12 },
        { day: 'Tuesday', is_available: true, start_time: '09:00', end_time: '13:00', max_patients: 12 },
        { day: 'Thursday', is_available: true, start_time: '09:00', end_time: '13:00', max_patients: 12 },
        { day: 'Friday', is_available: true, start_time: '09:00', end_time: '13:00', max_patients: 12 }
      ]
    }
  ],

  // 5. Users
  users: [
    { user_id: 1, name: 'Pramita Sahu', email: 'pramitasahu07@gmail.com', mobile: '9800000000', password: 'Admin@123', role: 'admin', status: 'active', created_at: '2026-01-01T00:00:00Z' },
    { user_id: 2, name: 'Dr. Ananya Sen', email: 'dr.ananya@apocare.com', mobile: '9800000001', password: 'Doctor@123', role: 'doctor', status: 'active', doctor_id: 1, created_at: '2026-01-01T00:00:00Z' },
    { user_id: 3, name: 'Dr. Rajesh Bose', email: 'dr.rajesh@apocare.com', mobile: '9800000002', password: 'Doctor@123', role: 'doctor', status: 'active', doctor_id: 2, created_at: '2026-01-01T00:00:00Z' },
    { user_id: 4, name: 'Dr. Meera Iyer', email: 'dr.meera@apocare.com', mobile: '9800000003', password: 'Doctor@123', role: 'doctor', status: 'active', doctor_id: 3, created_at: '2026-01-01T00:00:00Z' },
    { user_id: 14, name: 'Riya Chatterjee', email: 'riya.demo@example.com', mobile: '9876543210', password: 'Patient@123', role: 'patient', status: 'active', patient_id: 1, created_at: '2026-01-01T00:00:00Z' },
    { user_id: 15, name: 'Sourav Das', email: 'sourav.das@example.com', mobile: '9876543211', password: 'Patient@123', role: 'patient', status: 'active', patient_id: 2, created_at: '2026-01-01T00:00:00Z' },
    { user_id: 16, name: 'Amit Sen', email: 'amit.sen@example.com', mobile: '9876543212', password: 'Patient@123', role: 'patient', status: 'active', patient_id: 3, created_at: '2026-01-01T00:00:00Z' }
  ],

  // 6. Patients Data
  patients: [
    { patient_id: 1, user_id: 14, name: 'Riya Chatterjee', email: 'riya.demo@example.com', mobile: '9876543210', date_of_birth: '1997-04-12', gender: 'Female', location: 'Bankura', address: 'Pratapbagan, Bankura', blood_group: 'O+', emergency_contact: '9876543200', aadhaar_masked: 'XXXX XXXX 4321', allergies: 'Penicillin', chronic_conditions: 'Mild asthma' },
    { patient_id: 2, user_id: 15, name: 'Sourav Das', email: 'sourav.das@example.com', mobile: '9876543211', date_of_birth: '1992-08-23', gender: 'Male', location: 'Bankura', address: 'Kenduadihi, Bankura', blood_group: 'B+', emergency_contact: '9876543201', aadhaar_masked: 'XXXX XXXX 8765', allergies: 'None', chronic_conditions: 'Hypertension' },
    { patient_id: 3, user_id: 16, name: 'Amit Sen', email: 'amit.sen@example.com', mobile: '9876543212', date_of_birth: '1988-11-15', gender: 'Male', location: 'Bankura', address: 'Lalbazar, Bankura', blood_group: 'A+', emergency_contact: '9876543202', aadhaar_masked: 'XXXX XXXX 1234', allergies: 'Dust', chronic_conditions: 'None' }
  ],

  // 7. Appointments
  appointments: [
    {
      appointment_id: 1,
      booking_ref: 'APO-2026-00101',
      patient_id: 1,
      doctor_id: 1,
      clinic_id: 1,
      full_name: 'Riya Chatterjee',
      age: 28,
      gender: 'Female',
      mobile: '9876543210',
      email: 'riya.demo@example.com',
      location: 'Bankura',
      aadhaar_masked: 'XXXX XXXX 4321',
      emergency_contact: '9876543200',
      appointment_date: '2026-09-15',
      appointment_time: '10:30 AM',
      time_slot: '10:30 AM - 10:50 AM',
      reason: 'Annual cardiac checkup and routine ECG review',
      status: 'Confirmed',
      payment_status: 'Paid',
      amount: 400.00,
      platform_fee: 25.00,
      total_amount: 425.00,
      payment_method: 'UPI',
      doctor_notes: 'Patient has mild sinus tachycardia history. Advised fasting lipid panel prior to visit.',
      created_at: '2026-09-12T10:00:00Z'
    },
    {
      appointment_id: 2,
      booking_ref: 'APO-2026-00102',
      patient_id: 1,
      doctor_id: 7,
      clinic_id: 7,
      full_name: 'Riya Chatterjee',
      age: 28,
      gender: 'Female',
      mobile: '9876543210',
      email: 'riya.demo@example.com',
      location: 'Bankura',
      aadhaar_masked: 'XXXX XXXX 4321',
      emergency_contact: '9876543200',
      appointment_date: '2026-09-18',
      appointment_time: '11:00 AM',
      time_slot: '11:00 AM - 11:20 AM',
      reason: 'Prenatal general counseling',
      status: 'Pending',
      payment_status: 'Paid',
      amount: 450.00,
      platform_fee: 25.00,
      total_amount: 475.00,
      payment_method: 'Card',
      doctor_notes: '',
      created_at: '2026-09-12T14:30:00Z'
    },
    {
      appointment_id: 3,
      booking_ref: 'APO-2026-00103',
      patient_id: 1,
      doctor_id: 9,
      clinic_id: 9,
      full_name: 'Riya Chatterjee',
      age: 28,
      gender: 'Female',
      mobile: '9876543210',
      email: 'riya.demo@example.com',
      location: 'Bankura',
      aadhaar_masked: 'XXXX XXXX 4321',
      emergency_contact: '9876543200',
      appointment_date: '2026-08-28',
      appointment_time: '09:00 AM',
      time_slot: '09:00 AM - 09:15 AM',
      reason: 'Seasonal flu and throat irritation',
      status: 'Completed',
      payment_status: 'Paid',
      amount: 200.00,
      platform_fee: 25.00,
      total_amount: 225.00,
      payment_method: 'UPI',
      doctor_notes: 'Prescribed Paracetamol 650mg TDS and warm saline gargles. Patient recovered completely.',
      created_at: '2026-08-27T08:00:00Z'
    },
    {
      appointment_id: 4,
      booking_ref: 'APO-2026-00104',
      patient_id: 2,
      doctor_id: 1,
      clinic_id: 1,
      full_name: 'Sourav Das',
      age: 34,
      gender: 'Male',
      mobile: '9876543211',
      email: 'sourav.das@example.com',
      location: 'Bankura',
      aadhaar_masked: 'XXXX XXXX 8765',
      emergency_contact: '9876543201',
      appointment_date: '2026-09-14',
      appointment_time: '09:00 AM',
      time_slot: '09:00 AM - 09:20 AM',
      reason: 'Hypertension management and BP monitoring',
      status: 'Confirmed',
      payment_status: 'Paid',
      amount: 400.00,
      platform_fee: 25.00,
      total_amount: 425.00,
      payment_method: 'UPI',
      doctor_notes: 'Keep BP log for 3 consecutive mornings.',
      created_at: '2026-09-10T11:00:00Z'
    },
    {
      appointment_id: 5,
      booking_ref: 'APO-2026-00105',
      patient_id: 3,
      doctor_id: 3,
      clinic_id: 3,
      full_name: 'Amit Sen',
      age: 38,
      gender: 'Male',
      mobile: '9876543212',
      email: 'amit.sen@example.com',
      location: 'Bankura',
      aadhaar_masked: 'XXXX XXXX 1234',
      emergency_contact: '9876543202',
      appointment_date: '2026-09-16',
      appointment_time: '02:00 PM',
      time_slot: '02:00 PM - 02:15 PM',
      reason: 'Skin allergy and redness on forearms',
      status: 'Confirmed',
      payment_status: 'Paid',
      amount: 350.00,
      platform_fee: 25.00,
      total_amount: 375.00,
      payment_method: 'Card',
      doctor_notes: '',
      created_at: '2026-09-12T16:00:00Z'
    }
  ],

  // 8. Transactions
  transactions: [
    {
      transaction_id: 1,
      transaction_ref: 'TXN-2026-00101',
      appointment_id: 1,
      booking_ref: 'APO-2026-00101',
      patient_name: 'Riya Chatterjee',
      doctor_name: 'Dr. Ananya Sen',
      amount: 400.00,
      platform_fee: 25.00,
      total_amount: 425.00,
      currency: 'INR',
      gateway: 'MockPay UPI',
      gateway_payment_id: 'pay_mock_3948102',
      payment_status: 'Successful',
      created_at: '2026-09-12T10:05:00Z'
    },
    {
      transaction_id: 2,
      transaction_ref: 'TXN-2026-00102',
      appointment_id: 2,
      booking_ref: 'APO-2026-00102',
      patient_name: 'Riya Chatterjee',
      doctor_name: 'Dr. Kavita Roy',
      amount: 450.00,
      platform_fee: 25.00,
      total_amount: 475.00,
      currency: 'INR',
      gateway: 'MockPay Card',
      gateway_payment_id: 'pay_mock_3948103',
      payment_status: 'Successful',
      created_at: '2026-09-12T14:35:00Z'
    },
    {
      transaction_id: 3,
      transaction_ref: 'TXN-2026-00103',
      appointment_id: 3,
      booking_ref: 'APO-2026-00103',
      patient_name: 'Riya Chatterjee',
      doctor_name: 'Dr. Sunita Ghosh',
      amount: 200.00,
      platform_fee: 25.00,
      total_amount: 225.00,
      currency: 'INR',
      gateway: 'Razorpay NetBanking',
      gateway_payment_id: 'pay_rzp_3948104',
      payment_status: 'Successful',
      created_at: '2026-08-27T08:05:00Z'
    },
    {
      transaction_id: 4,
      transaction_ref: 'TXN-2026-00104',
      appointment_id: 4,
      booking_ref: 'APO-2026-00104',
      patient_name: 'Sourav Das',
      doctor_name: 'Dr. Ananya Sen',
      amount: 400.00,
      platform_fee: 25.00,
      total_amount: 425.00,
      currency: 'INR',
      gateway: 'MockPay UPI',
      gateway_payment_id: 'pay_mock_3948105',
      payment_status: 'Successful',
      created_at: '2026-09-10T11:05:00Z'
    },
    {
      transaction_id: 5,
      transaction_ref: 'TXN-2026-00105',
      appointment_id: 5,
      booking_ref: 'APO-2026-00105',
      patient_name: 'Amit Sen',
      doctor_name: 'Dr. Meera Iyer',
      amount: 350.00,
      platform_fee: 25.00,
      total_amount: 375.00,
      currency: 'INR',
      gateway: 'MockPay Card',
      gateway_payment_id: 'pay_mock_3948106',
      payment_status: 'Successful',
      created_at: '2026-09-12T16:05:00Z'
    }
  ],

  // 9. Notifications
  notifications: [
    { id: 1, user_id: 14, role: 'patient', title: 'Appointment Confirmed', message: 'Dr. Ananya Sen confirmed your appointment for Sept 15, 2026 at 10:30 AM.', type: 'success', is_read: false, link: 'patient/appointments.html', created_at: '2026-09-12T10:10:00Z' },
    { id: 2, user_id: 14, role: 'patient', title: 'Payment Successful', message: 'Payment of ₹425.00 for APO-2026-00101 was verified. Digital receipt generated.', type: 'info', is_read: false, link: 'patient/transactions.html', created_at: '2026-09-12T10:06:00Z' },
    { id: 3, user_id: 14, role: 'patient', title: 'Request Submitted', message: 'Your appointment request with Dr. Kavita Roy is awaiting doctor review.', type: 'info', is_read: true, link: 'patient/appointments.html', created_at: '2026-09-12T14:36:00Z' },
    { id: 4, user_id: 2, role: 'doctor', title: 'New Appointment Booked', message: 'Patient Sourav Das has a confirmed appointment for tomorrow at 09:00 AM.', type: 'info', is_read: false, link: 'doctor/appointments.html', created_at: '2026-09-10T11:06:00Z' },
    { id: 5, user_id: 1, role: 'admin', title: 'New Doctor Registration', message: 'Dr. Subhash Mondal registered with registration WBMC-98711 and is awaiting verification.', type: 'warning', is_read: false, link: 'admin/doctors.html', created_at: '2026-09-13T08:00:00Z' },
    { id: 6, user_id: 1, role: 'admin', title: 'Platform Milestone', message: 'ApoCare has processed over ₹12,000 in verified bookings this week.', type: 'success', is_read: true, link: 'admin/transactions.html', created_at: '2026-09-12T18:00:00Z' }
  ],

  // 10. Reviews
  reviews: [
    { review_id: 1, doctor_id: 1, patient_name: 'Riya Chatterjee', rating: 5, date: '2026-08-30', comment: 'Dr. Ananya Sen is remarkably patient and attentive. She diagnosed my irregular heartbeat accurately and provided reassurance throughout.' },
    { review_id: 2, doctor_id: 1, patient_name: 'Sourav Das', rating: 5, date: '2026-08-20', comment: 'Best cardiologist in Bankura! Very clean clinic at ABC Road and zero waiting time when booked via ApoCare digital pass.' },
    { review_id: 3, doctor_id: 3, patient_name: 'Amit Sen', rating: 5, date: '2026-09-02', comment: 'Excellent dermatology treatment. My allergic skin flareup subsided within three days of taking the prescribed ointment.' },
    { review_id: 4, doctor_id: 5, patient_name: 'Puja Banerjee', rating: 5, date: '2026-09-05', comment: 'Dr. Priya Nair handled my toddler so gently during the vaccination shot. Very caring and compassionate!' },
    { review_id: 5, doctor_id: 6, patient_name: 'Rahul Roy', rating: 5, date: '2026-09-08', comment: 'Great orthopedic doctor. Explained the knee issue with model diagrams and avoided unnecessary surgeries.' }
  ],

  // 11. Audit Logs
  audit_logs: [
    { log_id: 1, action: 'User Sign In', actor: 'pramitasahu07@gmail.com', role: 'Superadmin', ip: '103.21.144.12', timestamp: '2026-09-13T10:14:00Z', status: 'Success' },
    { log_id: 2, action: 'Appointment Booked', actor: 'riya.demo@example.com', role: 'Patient', ip: '103.21.144.89', timestamp: '2026-09-12T10:00:00Z', status: 'Success' },
    { log_id: 3, action: 'Payment Verified', actor: 'System (MockPay Gateway)', role: 'System', ip: 'Gateway Webhook', timestamp: '2026-09-12T10:05:00Z', status: 'Success' },
    { log_id: 4, action: 'Doctor Registered', actor: 'dr.subhash@apocare.com', role: 'Doctor', ip: '103.21.144.45', timestamp: '2026-09-13T08:00:00Z', status: 'Pending Review' }
  ]
};

// Central Data Layer Implementation
class ApoCareDatabase {
  constructor() {
    this.init();
  }

  init() {
    try {
      const stored = localStorage.getItem(APOCARE_STORAGE_KEY);
      if (!stored) {
        this.data = JSON.parse(JSON.stringify(INITIAL_DATABASE));
        this.save();
      } else {
        this.data = JSON.parse(stored);
        // Version check or schema migration if needed
        if (!this.data.version || this.data.version !== INITIAL_DATABASE.version) {
          this.data = Object.assign({}, INITIAL_DATABASE, this.data, { version: INITIAL_DATABASE.version });
          this.save();
        }
      }
    } catch (e) {
      console.warn('ApoCare DB Init Fallback:', e);
      this.data = JSON.parse(JSON.stringify(INITIAL_DATABASE));
    }
  }

  save() {
    try {
      localStorage.setItem(APOCARE_STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Error saving ApoCare database to localStorage', e);
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATABASE));
    this.save();
    return this.data;
  }

  // --- Doctors CRUD ---
  getDoctors(filters = {}) {
    let list = [...this.data.doctors];
    if (filters.specialization) {
      list = list.filter(d => d.specialization.toLowerCase() === filters.specialization.toLowerCase());
    }
    if (filters.location) {
      list = list.filter(d => d.location.toLowerCase() === filters.location.toLowerCase());
    }
    if (filters.status) {
      list = list.filter(d => d.verification_status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.gender) {
      list = list.filter(d => d.gender && d.gender.toLowerCase() === filters.gender.toLowerCase());
    }
    if (filters.type) {
      list = list.filter(d => d.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.max_charge) {
      list = list.filter(d => Number(d.visiting_charge) <= Number(filters.max_charge));
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      list = list.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.specialization.toLowerCase().includes(q) || 
        d.clinic_name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getDoctorById(id) {
    return this.data.doctors.find(d => Number(d.doctor_id) === Number(id)) || null;
  }

  updateDoctor(id, updates) {
    const idx = this.data.doctors.findIndex(d => Number(d.doctor_id) === Number(id));
    if (idx !== -1) {
      this.data.doctors[idx] = { ...this.data.doctors[idx], ...updates };
      this.save();
      return this.data.doctors[idx];
    }
    return null;
  }

  addDoctor(doctor) {
    const nextId = Math.max(...this.data.doctors.map(d => d.doctor_id), 0) + 1;
    const newDoc = {
      doctor_id: nextId,
      rating: 5.0,
      review_count: 0,
      verification_status: 'Pending',
      created_at: new Date().toISOString(),
      ...doctor
    };
    this.data.doctors.push(newDoc);
    this.save();
    return newDoc;
  }

  // --- Clinics & Hospitals ---
  getClinics() {
    return this.data.clinics;
  }

  // --- Specializations ---
  getSpecializations() {
    return this.data.specializations;
  }

  // --- Locations ---
  getLocations() {
    return this.data.locations;
  }

  // --- Appointments CRUD ---
  getAppointments(filters = {}) {
    let list = [...this.data.appointments];
    if (filters.patient_id) {
      list = list.filter(a => Number(a.patient_id) === Number(filters.patient_id));
    }
    if (filters.doctor_id) {
      list = list.filter(a => Number(a.doctor_id) === Number(filters.doctor_id));
    }
    if (filters.status) {
      list = list.filter(a => a.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.booking_ref) {
      list = list.filter(a => a.booking_ref === filters.booking_ref);
    }
    // Return sorted newest first
    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  getAppointmentById(id) {
    return this.data.appointments.find(a => Number(a.appointment_id) === Number(id) || a.booking_ref === id) || null;
  }

  createAppointment(apptData) {
    const nextId = Math.max(...this.data.appointments.map(a => a.appointment_id), 0) + 1;
    const refNumber = 'APO-2026-' + String(10000 + nextId);
    
    const newAppt = {
      appointment_id: nextId,
      booking_ref: refNumber,
      status: 'Confirmed',
      payment_status: 'Paid',
      created_at: new Date().toISOString(),
      doctor_notes: '',
      ...apptData
    };
    
    this.data.appointments.unshift(newAppt);

    // Create corresponding transaction
    const txnId = Math.max(...this.data.transactions.map(t => t.transaction_id), 0) + 1;
    const doctor = this.getDoctorById(newAppt.doctor_id);
    
    const newTxn = {
      transaction_id: txnId,
      transaction_ref: 'TXN-2026-' + String(10000 + txnId),
      appointment_id: newAppt.appointment_id,
      booking_ref: newAppt.booking_ref,
      patient_name: newAppt.full_name,
      doctor_name: doctor ? doctor.name : 'Consulting Doctor',
      amount: newAppt.amount,
      platform_fee: newAppt.platform_fee || 25.0,
      total_amount: newAppt.total_amount || (newAppt.amount + 25.0),
      currency: 'INR',
      gateway: newAppt.payment_method || 'MockPay UPI',
      gateway_payment_id: 'pay_mock_' + Math.floor(Math.random() * 8999999 + 1000000),
      payment_status: 'Successful',
      created_at: new Date().toISOString()
    };
    this.data.transactions.unshift(newTxn);

    // Create notification for patient
    this.addNotification({
      user_id: newAppt.user_id || 14,
      role: 'patient',
      title: 'Appointment Booked',
      message: `Your appointment with ${doctor ? doctor.name : 'Doctor'} on ${newAppt.appointment_date} at ${newAppt.appointment_time} is confirmed. Ref: ${newAppt.booking_ref}`,
      type: 'success',
      link: 'patient/appointments.html'
    });

    // Create notification for doctor
    if (doctor && doctor.user_id) {
      this.addNotification({
        user_id: doctor.user_id,
        role: 'doctor',
        title: 'New Patient Booking',
        message: `Patient ${newAppt.full_name} booked a consultation for ${newAppt.appointment_date} at ${newAppt.appointment_time}.`,
        type: 'info',
        link: 'doctor/appointments.html'
      });
    }

    // Add audit log
    this.addAuditLog({
      action: 'Appointment Created & Paid',
      actor: newAppt.email || 'Guest Patient',
      role: 'Patient',
      ip: 'Client Browser',
      status: 'Success'
    });

    this.save();
    return newAppt;
  }

  updateAppointmentStatus(id, newStatus, notes = null) {
    const idx = this.data.appointments.findIndex(a => Number(a.appointment_id) === Number(id) || a.booking_ref === id);
    if (idx !== -1) {
      this.data.appointments[idx].status = newStatus;
      if (notes !== null) {
        this.data.appointments[idx].doctor_notes = notes;
      }
      this.save();
      return this.data.appointments[idx];
    }
    return null;
  }

  // --- Transactions ---
  getTransactions(filters = {}) {
    let list = [...this.data.transactions];
    if (filters.booking_ref) {
      list = list.filter(t => t.booking_ref === filters.booking_ref);
    }
    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // --- Notifications ---
  getNotifications(userId = null, role = null) {
    let list = [...this.data.notifications];
    if (userId) {
      list = list.filter(n => Number(n.user_id) === Number(userId));
    } else if (role) {
      list = list.filter(n => n.role === role);
    }
    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  addNotification(notif) {
    const nextId = Math.max(...this.data.notifications.map(n => n.id), 0) + 1;
    this.data.notifications.unshift({
      id: nextId,
      is_read: false,
      created_at: new Date().toISOString(),
      ...notif
    });
    this.save();
  }

  markAllNotificationsRead(userId) {
    this.data.notifications.forEach(n => {
      if (!userId || Number(n.user_id) === Number(userId)) {
        n.is_read = true;
      }
    });
    this.save();
  }

  // --- Reviews ---
  getReviews(doctorId) {
    return this.data.reviews.filter(r => Number(r.doctor_id) === Number(doctorId));
  }

  addReview(review) {
    const nextId = Math.max(...this.data.reviews.map(r => r.review_id), 0) + 1;
    const newRev = {
      review_id: nextId,
      date: new Date().toISOString().split('T')[0],
      ...review
    };
    this.data.reviews.unshift(newRev);
    this.save();
    return newRev;
  }

  // --- Audit Logs ---
  getAuditLogs() {
    return this.data.audit_logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  addAuditLog(log) {
    const nextId = Math.max(...this.data.audit_logs.map(l => l.log_id), 0) + 1;
    this.data.audit_logs.unshift({
      log_id: nextId,
      timestamp: new Date().toISOString(),
      ...log
    });
    this.save();
  }

  // --- Patients Profile ---
  getPatientProfile(patientId) {
    return this.data.patients.find(p => Number(p.patient_id) === Number(patientId) || Number(p.user_id) === Number(patientId)) || null;
  }

  updatePatientProfile(patientId, updates) {
    const idx = this.data.patients.findIndex(p => Number(p.patient_id) === Number(patientId) || Number(p.user_id) === Number(patientId));
    if (idx !== -1) {
      this.data.patients[idx] = { ...this.data.patients[idx], ...updates };
      // Also sync name in users table if updated
      if (updates.name) {
        const user = this.data.users.find(u => Number(u.user_id) === Number(this.data.patients[idx].user_id));
        if (user) user.name = updates.name;
      }
      this.save();
      return this.data.patients[idx];
    }
    return null;
  }

  // --- Platform Aggregate KPI Stats ---
  getPlatformStats() {
    const totalDoctors = this.data.doctors.length;
    const verifiedDoctors = this.data.doctors.filter(d => d.verification_status === 'Verified').length;
    const pendingDoctors = this.data.doctors.filter(d => d.verification_status === 'Pending').length;
    const totalPatients = this.data.patients.length + 45000; // Scaled platform baseline
    const totalAppts = this.data.appointments.length;
    
    const grossRevenue = this.data.transactions
      .filter(t => t.payment_status === 'Successful')
      .reduce((sum, t) => sum + Number(t.total_amount), 0);

    const platformCommission = this.data.transactions
      .filter(t => t.payment_status === 'Successful')
      .reduce((sum, t) => sum + Number(t.platform_fee), 0);

    return {
      totalDoctors,
      verifiedDoctors,
      pendingDoctors,
      totalPatients,
      totalAppts,
      grossRevenue,
      platformCommission,
      totalClinics: this.data.clinics.length,
      totalSpecializations: this.data.specializations.length
    };
  }
}

// Global Single Instance
window.apoDB = new ApoCareDatabase();
