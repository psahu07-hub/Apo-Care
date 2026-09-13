# Apo-Care
# ApoCare — World-Class Doctor Discovery & Appointment Platform
### 100% Client-Side Static Edition (Ready for GitHub Pages)

ApoCare is a modern, responsive healthcare and doctor discovery web platform designed for Bankura, Durgapur, Kolkata, and South Bengal. This updated edition is built with **pure HTML5, CSS3, Vanilla JavaScript, and LocalStorage data engine**, completely eliminating the need for PHP or MySQL servers, so you can host and run it directly on **GitHub Pages**!

---

## 🚀 Live Demo & 1-Click Accounts

You can test every role immediately using the built-in 1-Click Demo buttons on the [Sign In Page](auth/login.html):

| Role | Demo Email | Password | Access Highlights |
| :--- | :--- | :--- | :--- |
| **🛡️ Super Admin** | `pramitasahu07@gmail.com` | `Admin@123` | KPI analytics, doctor verification approvals, master appointment management, revenue ledger |
| **🩺 Doctor** | `dr.ananya@apocare.com` | `Doctor@123` | Patient queue, weekly consultation timetable editor, prescription notes, payout ledger |
| **👤 Patient** | `riya.demo@example.com` | `Patient@123` | Doctor search, real-time slot booking, digital pass QR code, medical profile editor |

---

## 🌟 Key Features

1. **Public Doctor Discovery (`find-doctors.html`)**:
   - Filter by City (Bankura, Durgapur, Kolkata, etc.), Specialization, Facility Type (Clinic/Hospital), Gender, and Fee slider.
   - Real-time search and sorting by rating, experience, and fee.

2. **Interactive Doctor Profiles (`doctor.html?id=1`)**:
   - Medical qualifications, experience years, clinic address, weekly consultation timetable, and patient reviews.

3. **Zero-Wait Appointment Booking Flow (`book-appointment.html`)**:
   - Date picker, live time slot generator based on doctor availability, patient contact info, masked Aadhaar shield.

4. **Payment Gateway Simulator (`checkout.html`)**:
   - Realistic UPI QR Code, Credit/Debit Card, and Net Banking options with simulated authorization and automated confirmation.

5. **Printable Digital Passes & Invoices (`receipt.html`)**:
   - Scannable desk check-in QR code, itemized billing, and instant print/PDF download.

6. **Full Multi-Role Portals**:
   - **Patient Portal** (`patient/`): Active/Completed/Cancelled passes, profile editor, in-app notifications, transaction history.
   - **Doctor Portal** (`doctor/`): Patient queue, request approvals, weekly schedule editor, earnings & payouts.
   - **Admin Console** (`admin/`): Global KPI dashboard, Chart.js specialization distribution, doctor approvals, audit trail.

7. **Persistent Client-Side Database (`assets/js/db.js`)**:
   - Preloaded with 12 specialists, 10 clinics, 15+ appointments, reviews, and transactions. Persisted in `localStorage` with a 1-click database reset button.

---

## 📦 How to Deploy to GitHub Pages (Step-by-Step)

1. **Push this project to a new GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ApoCare static web app"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on **GitHub.com**.
   - Click **Settings** (top right tab).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`. Click **Save**.

3. **Your site is LIVE!**
   - GitHub will provide your live URL: `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`
   - Everything runs 100% in the browser with zero server setup required!

---

## 💻 Running Locally

You can simply double-click `index.html` to open it in any modern browser, or run a lightweight local static web server:

```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve .
```

Then visit: `http://localhost:8000`

---

## 📁 Project Structure

```
ApoCare/
├── index.html                     # Public Landing Page & Hero Search
├── find-doctors.html              # Doctor Discovery & Filtering Catalog
├── doctor.html                    # Doctor Profile & Weekly Timetable
├── book-appointment.html         # Interactive Slot Selection & Booking
├── checkout.html                  # Realistic Payment Gateway Simulation
├── receipt.html                   # Printable Digital Appointment Pass & Invoice
├── auth/
│   ├── login.html                 # Multi-role Login with 1-Click Demo Accounts
│   ├── register.html              # Patient Registration Form
│   └── forgot-password.html       # Password Reset Flow
├── patient/
│   ├── dashboard.html             # Patient Overview & Metrics
│   ├── appointments.html          # Appointment Passes (Active, Completed, Cancelled)
│   ├── appointment-details.html   # Single Pass Detail & Prescription Advice
│   ├── profile.html               # Medical Profile Editor
│   ├── notifications.html         # In-App Notifications Center
│   ├── transactions.html          # Payment Invoices & Receipts
│   └── settings.html              # Security & Notification Settings
├── doctor/
│   ├── dashboard.html             # Doctor Overview & Active Queue
│   ├── appointments.html          # Patient Roster & Clinical Notes
│   ├── requests.html              # Pending Appointment Requests (Accept/Decline)
│   ├── availability.html          # Weekly Consultation Timetable Editor
│   ├── earnings.html              # Revenue & Payout Settlements Ledger
│   ├── patients.html              # Patient Records Directory
│   ├── profile.html               # Doctor Public Profile & Fees Editor
│   ├── settings.html              # Doctor Settings
│   └── register.html              # Doctor Application & Onboarding
├── admin/
│   ├── dashboard.html             # Central Console, KPIs & Chart.js Analytics
│   ├── doctors.html               # Doctor Approvals & Management
│   ├── appointments.html          # Master Platform Appointments Monitor
│   ├── patients.html              # Master Patient Registry
│   ├── transactions.html          # Platform Financial Ledger & Commissions
│   ├── specializations.html       # Medical Departments & Specialties
│   ├── locations.html             # City Coverage & PIN Codes
│   ├── audit-logs.html            # System Security & Activity Audit Trail
│   └── login.html                 # Dedicated Administrator Sign In
├── assets/
│   ├── css/
│   │   ├── style.css              # Core Design System & Tokens
│   │   └── dashboard.css          # Unified Dashboard Styles
│   ├── js/
│   │   ├── db.js                  # Central LocalStorage Data Engine
│   │   ├── auth.js                # Auth State, Sessions & Role Guards
│   │   ├── main.js                # Shared UI Components & Alerts
│   │   ├── search.js              # Doctor Discovery Filtering Engine
│   │   ├── booking.js             # Slot Selection & Fee Calculator
│   │   ├── payment.js             # Payment Gateway Simulation
│   │   └── dashboard.js           # Shared Dashboard Navigation
│   └── images/                    # Logos & SVG Icons
├── .nojekyll                      # GitHub Pages Jekyll bypass
└── README.md                      # Project Documentation
```

---

&copy; 2026 ApoCare Healthcare Network. All rights reserved.
