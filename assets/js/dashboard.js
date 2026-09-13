/**
 * ApoCare - Unified Dashboard Manager for Patient, Doctor, and Admin Panels
 * ==============================================================================
 */

class ApoCareDashboardManager {
  constructor() {
    this.user = window.apoAuth ? window.apoAuth.getCurrentUser() : null;
  }

  // Generate Reusable Sidebar Navigation
  renderSidebar(role, activeKey) {
    const sidebarEl = document.getElementById('dashboardSidebar');
    if (!sidebarEl) return;

    let navItems = [];

    if (role === 'patient') {
      navItems = [
        { key: 'dashboard', label: '📊 Dashboard', href: './dashboard.html' },
        { key: 'appointments', label: '📅 Appointments', href: './appointments.html' },
        { key: 'transactions', label: '💳 Payment Invoices', href: './transactions.html' },
        { key: 'notifications', label: '🔔 Notifications', href: './notifications.html' },
        { key: 'profile', label: '👤 Medical Profile', href: './profile.html' },
        { key: 'settings', label: '⚙️ Settings', href: './settings.html' }
      ];
    } else if (role === 'doctor') {
      navItems = [
        { key: 'dashboard', label: '📊 Overview', href: './dashboard.html' },
        { key: 'appointments', label: '📅 Patient Queue', href: './appointments.html' },
        { key: 'requests', label: '🔔 Booking Requests', href: './requests.html' },
        { key: 'availability', label: '⏱ Consultation Hours', href: './availability.html' },
        { key: 'earnings', label: '💰 Revenue & Payouts', href: './earnings.html' },
        { key: 'patients', label: '🧑‍🤝‍🧑 Patient Directory', href: './patients.html' },
        { key: 'profile', label: '👨‍⚕️ Public Profile', href: './profile.html' },
        { key: 'settings', label: '⚙️ Settings', href: './settings.html' }
      ];
    } else if (role === 'admin') {
      navItems = [
        { key: 'dashboard', label: '📊 Central Console', href: './dashboard.html' },
        { key: 'doctors', label: '👨‍⚕️ Doctor Approvals', href: './doctors.html' },
        { key: 'appointments', label: '📅 All Appointments', href: './appointments.html' },
        { key: 'patients', label: '🧑‍🤝‍🧑 Registered Patients', href: './patients.html' },
        { key: 'transactions', label: '💰 Financial Hub', href: './transactions.html' },
        { key: 'specializations', label: '🩺 Specializations', href: './specializations.html' },
        { key: 'locations', label: '📍 Service Locations', href: './locations.html' },
        { key: 'audit_logs', label: '🛡️ Audit Security', href: './audit-logs.html' }
      ];
    }

    const unreadCount = window.apoDB ? window.apoDB.getNotifications(this.user ? this.user.user_id : null, role).filter(n => !n.is_read).length : 0;

    sidebarEl.innerHTML = `
      <div class="sidebar-brand">
        <a href="../index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
          <img src="../assets/images/logo.svg" alt="ApoCare" height="40">
        </a>
      </div>

      <div class="sidebar-user-card" style="margin: 16px 12px; padding: 14px; background: rgba(255,255,255,0.06); border-radius: 12px; display: flex; align-items: center; gap: 12px;">
        <div style="width: 38px; height: 38px; border-radius: 50%; background: #1282A2; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px;">
          ${this.user ? this.user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div style="overflow: hidden;">
          <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${this.user ? this.user.name : 'User'}</div>
          <div style="font-size: 11px; color: #67E8F9; text-transform: uppercase; font-weight: 700;">${role} Panel</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
          ${navItems.map(item => `
            <li>
              <a href="${item.href}" class="sidebar-link ${item.key === activeKey ? 'active' : ''}" style="display: flex; align-items: center; justify-content: space-between;">
                <span>${item.label}</span>
                ${item.key === 'notifications' && unreadCount > 0 ? `<span style="background: #EF4444; color: #fff; font-size: 11px; padding: 2px 7px; border-radius: 9999px; font-weight: 700;">${unreadCount}</span>` : ''}
              </a>
            </li>
          `).join('')}
        </ul>
      </nav>

      <div class="sidebar-footer" style="margin-top: auto; padding: 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; gap: 8px;">
        <a href="../index.html" class="sidebar-link" style="color: #94A3B8; font-size: 13px;">🌐 Public Homepage</a>
        <a href="javascript:void(0)" onclick="window.apoAuth.logout(); window.location.href='../auth/login.html';" class="sidebar-link" style="color: #F87171; font-weight: 700;">🚪 Sign Out</a>
      </div>
    `;
  }
}

// Global Dashboard Helper
window.apoDash = new ApoCareDashboardManager();
