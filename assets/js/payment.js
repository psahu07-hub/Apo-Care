/**
 * ApoCare - Realistic Payment Gateway Simulator & Transaction Engine
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const checkoutContainer = document.getElementById('checkoutContainer');
  if (!checkoutContainer) return;

  const rawDraft = sessionStorage.getItem('apocare_booking_draft');
  if (!rawDraft) {
    alert('No active booking found. Please choose a specialist first.');
    window.location.href = './find-doctors.html';
    return;
  }

  const draft = JSON.parse(rawDraft);

  // Populate Order Summary
  document.getElementById('checkoutDoctorName')?.replaceChildren(document.createTextNode(draft.doctor_name));
  document.getElementById('checkoutDoctorSpec')?.replaceChildren(document.createTextNode(`${draft.doctor_specialization} • ${draft.clinic_name}`));
  document.getElementById('checkoutDate')?.replaceChildren(document.createTextNode(draft.appointment_date));
  document.getElementById('checkoutTimeSlot')?.replaceChildren(document.createTextNode(draft.time_slot));
  document.getElementById('checkoutPatientName')?.replaceChildren(document.createTextNode(draft.full_name));
  document.getElementById('checkoutDoctorFee')?.replaceChildren(document.createTextNode(`₹${draft.amount.toFixed(2)}`));
  document.getElementById('checkoutPlatformFee')?.replaceChildren(document.createTextNode(`₹${draft.platform_fee.toFixed(2)}`));
  document.getElementById('checkoutTotalAmount')?.replaceChildren(document.createTextNode(`₹${draft.total_amount.toFixed(2)}`));
  document.getElementById('payButtonAmount')?.replaceChildren(document.createTextNode(`₹${draft.total_amount.toFixed(2)}`));

  // Payment Method Switching Tabs
  const paymentTabs = document.querySelectorAll('.payment-tab');
  const paymentPanels = document.querySelectorAll('.payment-panel');
  let selectedMethod = 'UPI';

  paymentTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      paymentTabs.forEach(t => t.classList.remove('active'));
      paymentPanels.forEach(p => p.style.display = 'none');
      
      this.classList.add('active');
      selectedMethod = this.getAttribute('data-method');
      const targetPanel = document.getElementById(`panel_${selectedMethod.toLowerCase()}`);
      if (targetPanel) {
        targetPanel.style.display = 'block';
      }
    });
  });

  // Modal and Process Handler
  const payBtn = document.getElementById('processPaymentBtn');
  const modal = document.getElementById('paymentProcessingModal');
  const modalStatusText = document.getElementById('modalStatusText');

  if (payBtn && modal) {
    payBtn.addEventListener('click', () => {
      // Validate card form if card is selected
      if (selectedMethod === 'Card') {
        const cardNumber = document.getElementById('cardNumber')?.value.trim();
        const cardExpiry = document.getElementById('cardExpiry')?.value.trim();
        const cardCvv = document.getElementById('cardCvv')?.value.trim();
        if (!cardNumber || !cardExpiry || !cardCvv) {
          alert('Please enter complete mock card details.');
          return;
        }
      }

      // Show processing modal
      modal.style.display = 'flex';
      modalStatusText.innerText = 'Connecting to Secure Banking Gateway...';

      setTimeout(() => {
        modalStatusText.innerText = 'Authorizing & Verifying Digital Payment...';
      }, 1200);

      setTimeout(() => {
        modalStatusText.innerText = 'Generating Digital Consultation Pass & QR Ref...';
      }, 2200);

      setTimeout(() => {
        // Complete the appointment booking in LocalStorage DB
        draft.payment_method = selectedMethod;
        const newAppt = window.apoDB.createAppointment(draft);

        // Clear draft from sessionStorage
        sessionStorage.removeItem('apocare_booking_draft');

        // Redirect to receipt
        window.location.href = `./receipt.html?ref=${newAppt.booking_ref}`;
      }, 3200);
    });
  }
});
