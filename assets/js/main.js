/**
 * ApoCare - Global Application Interactions & Shared UI Utilities
 * ==============================================================================
 */

// Toast Notifications Helper
window.showToast = function(message, type = 'info') {
  let container = document.getElementById('apocareToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'apocareToastContainer';
    container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; max-width: 380px; pointer-events: none;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgColors = {
    success: '#059669',
    error: '#DC2626',
    warning: '#D97706',
    info: '#034078'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  toast.style.cssText = `
    background: ${bgColors[type] || bgColors.info};
    color: #FFFFFF;
    padding: 14px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.25);
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    pointer-events: auto;
    animation: slideInToast 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-left: 4px solid rgba(255,255,255,0.4);
  `;

  toast.innerHTML = `
    <span style="background: rgba(255,255,255,0.2); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800;">${icons[type] || 'ℹ'}</span>
    <span style="flex: 1; line-height: 1.4;">${message}</span>
    <button type="button" style="background: none; border: none; color: #fff; opacity: 0.7; font-size: 18px; cursor: pointer; padding: 0 4px;" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// Add Toast Animation Style
if (!document.getElementById('toastStyleElement')) {
  const style = document.createElement('style');
  style.id = 'toastStyleElement';
  style.textContent = `
    @keyframes slideInToast {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// Global Demo Data Reset Helper
window.resetDemoData = function() {
  if (confirm('Are you sure you want to reset all demo appointments, doctor schedules, and transactions back to the initial sample state?')) {
    window.apoDB.resetToDefault();
    window.showToast('Database reset to default seed data successfully!', 'success');
    setTimeout(() => location.reload(), 800);
  }
};

// DOM Initializer for Global UI Components
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Drawer Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileClose = document.getElementById('mobileNavClose');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.style.display = 'block';
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.style.display = 'none';
    });
  }

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
