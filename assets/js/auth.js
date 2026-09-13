/**
 * ApoCare - Authentication & Session Management Module
 * Supports 1-Click Demo Accounts, Role Guards, and LocalStorage Session State
 * ==============================================================================
 */

const APOCARE_AUTH_KEY = 'apocare_auth_session';

class ApoCareAuth {
  constructor() {
    this.currentUser = this.loadSession();
  }

  loadSession() {
    try {
      const stored = localStorage.getItem(APOCARE_AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  saveSession(user) {
    this.currentUser = user;
    try {
      if (user) {
        localStorage.setItem(APOCARE_AUTH_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(APOCARE_AUTH_KEY);
      }
    } catch (e) {
      console.error('Session save error', e);
    }
    this.updateUI();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  login(email, password) {
    const user = window.apoDB.data.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      const sessionUser = {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        doctor_id: user.doctor_id || null,
        patient_id: user.patient_id || null
      };

      this.saveSession(sessionUser);

      // Audit log
      window.apoDB.addAuditLog({
        action: 'User Logged In',
        actor: user.email,
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
        ip: 'Client Browser',
        status: 'Success'
      });

      return { success: true, user: sessionUser };
    }

    return { success: false, message: 'Invalid email or password. Try demo credentials!' };
  }

  loginDemo(role) {
    let email = '';
    let password = '';

    if (role === 'admin') {
      email = 'pramitasahu07@gmail.com';
      password = 'Admin@123';
    } else if (role === 'doctor') {
      email = 'dr.ananya@apocare.com';
      password = 'Doctor@123';
    } else if (role === 'patient') {
      email = 'riya.demo@example.com';
      password = 'Patient@123';
    }

    return this.login(email, password);
  }

  register(userData) {
    const exists = window.apoDB.data.users.some(
      u => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const nextUserId = Math.max(...window.apoDB.data.users.map(u => u.user_id), 0) + 1;
    const nextPatientId = Math.max(...window.apoDB.data.patients.map(p => p.patient_id), 0) + 1;

    const newUser = {
      user_id: nextUserId,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile || '9876543210',
      password: userData.password,
      role: 'patient',
      status: 'active',
      patient_id: nextPatientId,
      created_at: new Date().toISOString()
    };

    const newPatient = {
      patient_id: nextPatientId,
      user_id: nextUserId,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile || '',
      date_of_birth: userData.date_of_birth || '1995-01-01',
      gender: userData.gender || 'Other',
      location: userData.location || 'Bankura',
      address: userData.address || '',
      blood_group: userData.blood_group || 'O+',
      emergency_contact: userData.emergency_contact || '',
      aadhaar_masked: 'XXXX XXXX ' + Math.floor(1000 + Math.random() * 9000)
    };

    window.apoDB.data.users.push(newUser);
    window.apoDB.data.patients.push(newPatient);
    window.apoDB.save();

    // Log in newly registered user
    return this.login(userData.email, userData.password);
  }

  logout() {
    if (this.currentUser) {
      window.apoDB.addAuditLog({
        action: 'User Logged Out',
        actor: this.currentUser.email,
        role: this.currentUser.role,
        ip: 'Client Browser',
        status: 'Success'
      });
    }
    this.saveSession(null);
  }

  requireAuth(allowedRoles = []) {
    const user = this.getCurrentUser();
    if (!user) {
      // Get relative path to login
      const prefix = window.location.pathname.includes('/patient/') || 
                     window.location.pathname.includes('/doctor/') || 
                     window.location.pathname.includes('/admin/') ? '../' : './';
      window.location.href = `${prefix}auth/login.html?redirect=${encodeURIComponent(window.location.href)}`;
      return false;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      alert(`Access Restricted. This section requires ${allowedRoles.join(' or ')} privileges.`);
      if (user.role === 'admin') window.location.href = '../admin/dashboard.html';
      else if (user.role === 'doctor') window.location.href = '../doctor/dashboard.html';
      else window.location.href = '../patient/dashboard.html';
      return false;
    }

    return true;
  }

  updateUI() {
    // Dynamic Header State synchronization if public header exists
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    const user = this.getCurrentUser();
    const isSubdir = window.location.pathname.includes('/patient/') || 
                     window.location.pathname.includes('/doctor/') || 
                     window.location.pathname.includes('/admin/') ||
                     window.location.pathname.includes('/auth/');
    const basePath = isSubdir ? '../' : './';

    const existingAuthBlock = document.getElementById('navAuthContainer');
    if (existingAuthBlock) {
      if (user) {
        let dashboardLink = `${basePath}patient/dashboard.html`;
        let roleBadge = '👤 Patient';
        if (user.role === 'doctor') {
          dashboardLink = `${basePath}doctor/dashboard.html`;
          roleBadge = '🩺 Doctor';
        } else if (user.role === 'admin') {
          dashboardLink = `${basePath}admin/dashboard.html`;
          roleBadge = '🛡️ Admin';
        }

        existingAuthBlock.innerHTML = `
          <div class="nav-user-dropdown" style="position: relative; display: inline-block;">
            <button type="button" class="user-menu-btn" id="userMenuBtn" style="display: flex; align-items: center; gap: 8px; background: #E8F0F7; border: 1px solid #D2E2F0; padding: 6px 14px; border-radius: 9999px; cursor: pointer; font-weight: 600; color: #034078;">
              <span class="user-avatar-sm" style="background: #034078; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px;">${user.name.charAt(0).toUpperCase()}</span>
              <span>${user.name.split(' ')[0]}</span>
              <span style="font-size: 11px; opacity: 0.7;">▼</span>
            </button>
            <div class="dropdown-menu" id="userDropdownMenu" style="display: none; position: absolute; right: 0; top: calc(100% + 8px); background: #FFFFFF; min-width: 220px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); border-radius: 12px; border: 1px solid #E1E8EE; z-index: 1000; padding: 8px 0;">
              <div style="padding: 10px 16px; border-bottom: 1px solid #EDF2F7;">
                <div style="font-weight: 700; color: #0A1128; font-size: 14px;">${user.name}</div>
                <div style="font-size: 12px; color: #1282A2; font-weight: 600;">${roleBadge}</div>
              </div>
              <a href="${dashboardLink}" class="dropdown-item" style="display: block; padding: 10px 16px; color: #0A1128; text-decoration: none; font-size: 14px; font-weight: 500;">📊 My Dashboard</a>
              ${user.role === 'patient' ? `<a href="${basePath}patient/appointments.html" class="dropdown-item" style="display: block; padding: 10px 16px; color: #0A1128; text-decoration: none; font-size: 14px;">📅 My Appointments</a>` : ''}
              ${user.role === 'doctor' ? `<a href="${basePath}doctor/appointments.html" class="dropdown-item" style="display: block; padding: 10px 16px; color: #0A1128; text-decoration: none; font-size: 14px;">🩺 Patient Queue</a>` : ''}
              ${user.role === 'admin' ? `<a href="${basePath}admin/doctors.html" class="dropdown-item" style="display: block; padding: 10px 16px; color: #0A1128; text-decoration: none; font-size: 14px;">👨‍⚕️ Manage Doctors</a>` : ''}
              <div style="height: 1px; background: #EDF2F7; margin: 6px 0;"></div>
              <a href="javascript:void(0)" onclick="window.apoAuth.logout(); location.reload();" class="dropdown-item" style="display: block; padding: 10px 16px; color: #EF4444; text-decoration: none; font-size: 14px; font-weight: 600;">🚪 Sign Out</a>
            </div>
          </div>
        `;

        const menuBtn = document.getElementById('userMenuBtn');
        const menu = document.getElementById('userDropdownMenu');
        if (menuBtn && menu) {
          menuBtn.onclick = (e) => {
            e.stopPropagation();
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
          };
          document.addEventListener('click', () => {
            menu.style.display = 'none';
          });
        }
      } else {
        existingAuthBlock.innerHTML = `
          <a href="${basePath}auth/login.html" class="btn btn-outline btn-sm" style="padding: 8px 16px; font-weight: 600;">Sign In</a>
          <a href="${basePath}auth/register.html" class="btn btn-primary btn-sm" style="padding: 8px 16px; font-weight: 600;">Register Free</a>
        `;
      }
    }
  }
}

// Global Single Instance
window.apoAuth = new ApoCareAuth();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.apoAuth.updateUI();
});
