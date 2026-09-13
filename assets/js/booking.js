/**
 * ApoCare - Interactive Appointment Booking & Slot Selector Engine
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('appointmentBookingForm');
  if (!bookingForm) return;

  const urlParams = new URLSearchParams(window.location.search);
  const doctorId = urlParams.get('doctor_id') || 1;
  const doctor = window.apoDB.getDoctorById(doctorId);

  if (!doctor) {
    alert('Doctor profile not found.');
    window.location.href = './find-doctors.html';
    return;
  }

  // Populate Doctor Mini Info Card
  const docSummaryEl = document.getElementById('doctorBookingSummary');
  if (docSummaryEl) {
    docSummaryEl.innerHTML = `
      <div style="display: flex; gap: 16px; align-items: center;">
        <img src="${doctor.image_url}" alt="${doctor.name}" style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover; border: 2px solid #E8F0F7;">
        <div>
          <div style="font-size: 18px; font-weight: 700; color: #0A1128;">${doctor.name}</div>
          <div style="color: #034078; font-weight: 600; font-size: 13px;">${doctor.specialization} &bull; ${doctor.qualification}</div>
          <div style="font-size: 12px; color: #64748B;">🏥 ${doctor.clinic_name} &bull; ${doctor.location}</div>
        </div>
      </div>
    `;
  }

  // Fee Calculation
  const visitingCharge = Number(doctor.visiting_charge);
  const platformFee = 25.0;
  const totalPayable = visitingCharge + platformFee;

  document.getElementById('summaryDoctorFee')?.replaceChildren(document.createTextNode(`₹${visitingCharge.toFixed(2)}`));
  document.getElementById('summaryPlatformFee')?.replaceChildren(document.createTextNode(`₹${platformFee.toFixed(2)}`));
  document.getElementById('summaryTotalPayable')?.replaceChildren(document.createTextNode(`₹${totalPayable.toFixed(2)}`));

  // Date Picker Setup (Restricted to next 14 days)
  const dateInput = document.getElementById('bookingDate');
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const maxDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  if (dateInput) {
    dateInput.min = todayStr;
    dateInput.max = maxDate;
    dateInput.value = todayStr;
  }

  // Generate Slots
  const slotContainer = document.getElementById('timeSlotsContainer');
  let selectedSlot = '';

  function generateSlotsForDate(dateStr) {
    if (!slotContainer) return;

    const chosenDate = new Date(dateStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[chosenDate.getDay()];

    const sampleSlots = [
      '09:00 AM - 09:20 AM',
      '09:30 AM - 09:50 AM',
      '10:00 AM - 10:20 AM',
      '10:30 AM - 10:50 AM',
      '11:15 AM - 11:35 AM',
      '11:45 AM - 12:05 PM',
      '02:00 PM - 02:20 PM',
      '02:30 PM - 02:50 PM',
      '03:15 PM - 03:35 PM',
      '04:00 PM - 04:20 PM',
      '04:30 PM - 04:50 PM'
    ];

    slotContainer.innerHTML = sampleSlots.map((slot, i) => {
      const isBooked = (i === 2 || i === 6); // Mock some booked slots for realistic experience
      return `
        <button type="button" class="time-slot-pill ${isBooked ? 'slot-disabled' : ''}" 
          data-slot="${slot}" 
          ${isBooked ? 'disabled' : ''}
          style="padding: 10px 14px; border-radius: 10px; border: 1.5px solid ${isBooked ? '#E2E8F0' : '#D2E2F0'}; background: ${isBooked ? '#F1F5F9' : '#FFFFFF'}; color: ${isBooked ? '#94A3B8' : '#0A1128'}; font-weight: 600; font-size: 13px; cursor: ${isBooked ? 'not-allowed' : 'pointer'}; transition: all 0.2s ease;">
          ${slot} ${isBooked ? '<span style="font-size: 10px; display: block; color: #EF4444;">Booked</span>' : ''}
        </button>
      `;
    }).join('');

    // Attach click events
    slotContainer.querySelectorAll('.time-slot-pill:not([disabled])').forEach(btn => {
      btn.addEventListener('click', function() {
        slotContainer.querySelectorAll('.time-slot-pill').forEach(b => {
          b.style.background = '#FFFFFF';
          b.style.borderColor = '#D2E2F0';
          b.style.color = '#0A1128';
        });
        this.style.background = '#034078';
        this.style.borderColor = '#034078';
        this.style.color = '#FFFFFF';
        selectedSlot = this.getAttribute('data-slot');
        document.getElementById('selectedSlotDisplay')?.replaceChildren(document.createTextNode(selectedSlot));
      });
    });

    // Auto-select first available slot
    const firstAvailable = slotContainer.querySelector('.time-slot-pill:not([disabled])');
    if (firstAvailable) {
      firstAvailable.click();
    }
  }

  if (dateInput) {
    dateInput.addEventListener('change', (e) => generateSlotsForDate(e.target.value));
    generateSlotsForDate(dateInput.value);
  }

  // Pre-fill patient details if logged in
  const currentUser = window.apoAuth.getCurrentUser();
  if (currentUser) {
    const profile = window.apoDB.getPatientProfile(currentUser.patient_id || currentUser.user_id);
    if (document.getElementById('patientName')) document.getElementById('patientName').value = currentUser.name || '';
    if (document.getElementById('patientEmail')) document.getElementById('patientEmail').value = currentUser.email || '';
    if (document.getElementById('patientMobile') && profile) document.getElementById('patientMobile').value = profile.mobile || '';
    if (document.getElementById('patientGender') && profile) document.getElementById('patientGender').value = profile.gender || 'Female';
    if (document.getElementById('patientAge') && profile) document.getElementById('patientAge').value = '28';
    if (document.getElementById('patientEmergency') && profile) document.getElementById('patientEmergency').value = profile.emergency_contact || '';
  }

  // Form Submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert('Please select an appointment time slot.');
      return;
    }

    const patientName = document.getElementById('patientName').value.trim();
    const patientEmail = document.getElementById('patientEmail').value.trim();
    const patientMobile = document.getElementById('patientMobile').value.trim();
    const patientAge = document.getElementById('patientAge').value.trim();
    const patientGender = document.getElementById('patientGender').value;
    const patientReason = document.getElementById('patientReason').value.trim();
    const patientLocation = document.getElementById('patientLocation') ? document.getElementById('patientLocation').value : doctor.location;
    const patientAadhaar = document.getElementById('patientAadhaar') ? document.getElementById('patientAadhaar').value : 'XXXX XXXX 4321';
    const emergencyContact = document.getElementById('patientEmergency') ? document.getElementById('patientEmergency').value : '';

    if (!patientName || !patientEmail || !patientMobile) {
      alert('Please fill in all required patient contact fields.');
      return;
    }

    // Save temporary booking draft to sessionStorage for payment screen
    const draftId = 'DRAFT_' + Date.now();
    const bookingDraft = {
      draft_id: draftId,
      doctor_id: doctor.doctor_id,
      doctor_name: doctor.name,
      doctor_specialization: doctor.specialization,
      clinic_id: doctor.clinic_id,
      clinic_name: doctor.clinic_name,
      appointment_date: dateInput.value,
      appointment_time: selectedSlot.split(' - ')[0],
      time_slot: selectedSlot,
      full_name: patientName,
      email: patientEmail,
      mobile: patientMobile,
      age: Number(patientAge) || 28,
      gender: patientGender,
      reason: patientReason || 'General Consultation',
      location: patientLocation,
      aadhaar_masked: patientAadhaar,
      emergency_contact: emergencyContact,
      amount: visitingCharge,
      platform_fee: platformFee,
      total_amount: totalPayable,
      patient_id: currentUser ? (currentUser.patient_id || 1) : 1,
      user_id: currentUser ? currentUser.user_id : 14
    };

    sessionStorage.setItem('apocare_booking_draft', JSON.stringify(bookingDraft));

    // Redirect to checkout
    window.location.href = `./checkout.html?draft_id=${draftId}`;
  });
});
