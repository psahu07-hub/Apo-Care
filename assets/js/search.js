/**
 * ApoCare - Advanced Doctor Discovery & Filtering Engine
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const doctorGrid = document.getElementById('doctorResultsGrid');
  if (!doctorGrid) return;

  // Filter Form Elements
  const searchInput = document.getElementById('searchQuery');
  const locationSelect = document.getElementById('filterLocation');
  const specSelect = document.getElementById('filterSpecialization');
  const typeSelect = document.getElementById('filterType');
  const genderSelect = document.getElementById('filterGender');
  const feeSlider = document.getElementById('filterFeeSlider');
  const feeValueDisplay = document.getElementById('feeValueDisplay');
  const sortSelect = document.getElementById('filterSort');
  const resultsCount = document.getElementById('resultsCount');
  const activeFiltersContainer = document.getElementById('activeFiltersList');

  // Read URL query parameters on initial page load (e.g. ?specialization=Cardiologist&location=Bankura)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('specialization') && specSelect) {
    specSelect.value = urlParams.get('specialization');
  }
  if (urlParams.get('location') && locationSelect) {
    locationSelect.value = urlParams.get('location');
  }
  if (urlParams.get('q') && searchInput) {
    searchInput.value = urlParams.get('q');
  }

  function renderDoctors() {
    const filters = {
      query: searchInput ? searchInput.value.trim() : '',
      location: locationSelect ? locationSelect.value : '',
      specialization: specSelect ? specSelect.value : '',
      type: typeSelect ? typeSelect.value : '',
      gender: genderSelect ? genderSelect.value : '',
      max_charge: feeSlider ? feeSlider.value : 1000,
      status: 'Verified'
    };

    let list = window.apoDB.getDoctors(filters);

    // Apply Sorting
    const sortVal = sortSelect ? sortSelect.value : 'rating_desc';
    if (sortVal === 'rating_desc') {
      list.sort((a, b) => b.rating - a.rating || b.review_count - a.review_count);
    } else if (sortVal === 'experience_desc') {
      list.sort((a, b) => b.experience_years - a.experience_years);
    } else if (sortVal === 'fee_asc') {
      list.sort((a, b) => a.visiting_charge - b.visiting_charge);
    } else if (sortVal === 'fee_desc') {
      list.sort((a, b) => b.visiting_charge - a.visiting_charge);
    }

    // Update Results Count
    if (resultsCount) {
      resultsCount.innerText = `${list.length} Specialist${list.length === 1 ? '' : 's'} Found`;
    }

    if (list.length === 0) {
      doctorGrid.innerHTML = `
        <div style="grid-column: 1 / -1; background: #FFFFFF; border: 2px dashed #D2E2F0; border-radius: 16px; padding: 60px 24px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
          <h3 style="font-size: 20px; font-weight: 700; color: #0A1128; margin-bottom: 8px;">No Specialists Match Your Criteria</h3>
          <p style="color: #4D6275; max-width: 460px; margin: 0 auto 24px; font-size: 15px;">Try adjusting your location, clearing specialization filters, or increasing the consultation fee slider.</p>
          <button type="button" class="btn btn-outline" id="clearAllFiltersBtn" style="padding: 10px 22px; font-weight: 700;">Reset All Filters</button>
        </div>
      `;
      document.getElementById('clearAllFiltersBtn')?.addEventListener('click', resetFilters);
      return;
    }

    // Render Cards
    doctorGrid.innerHTML = list.map(doc => {
      const initials = doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      return `
        <div class="doctor-card" style="background: #FFFFFF; border: 1px solid #E1E8EE; border-radius: 18px; padding: 24px; display: flex; flex-direction: column; transition: all 0.25s ease; box-shadow: 0 4px 15px rgba(10, 17, 40, 0.04); position: relative; overflow: hidden;">
          <div style="display: flex; gap: 18px; align-items: flex-start; margin-bottom: 16px;">
            <div style="position: relative;">
              <img src="${doc.image_url}" alt="${doc.name}" style="width: 72px; height: 72px; border-radius: 14px; object-fit: cover; border: 2px solid #E8F0F7;" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=034078&color=fff&size=128';">
              <span style="position: absolute; bottom: -4px; right: -4px; background: #059669; color: #fff; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; border: 2px solid #fff;" title="Medical Council Verified">✓</span>
            </div>
            
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <h3 style="font-size: 18px; font-weight: 700; color: #0A1128; margin: 0;">
                  <a href="./doctor.html?id=${doc.doctor_id}" style="color: inherit; text-decoration: none;">${doc.name}</a>
                </h3>
              </div>
              <div style="display: inline-block; background: #E8F0F7; color: #034078; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 6px; margin: 4px 0 6px;">
                ${doc.specialization}
              </div>
              <div style="font-size: 13px; color: #4D6275; line-height: 1.3;">${doc.qualification} &bull; <strong>${doc.experience_years} yrs exp</strong></div>
            </div>
          </div>

          <div style="background: #F8FAFC; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; font-size: 13px; color: #334155; display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span>🏥</span>
              <strong style="color: #0A1128;">${doc.clinic_name}</strong>
              <span style="background: #E2E8F0; font-size: 11px; padding: 1px 6px; border-radius: 4px;">${doc.type}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; color: #64748B;">
              <span>📍</span> ${doc.address} (${doc.distance_km} km away)
            </div>
            <div style="display: flex; align-items: center; gap: 6px; color: #034078; font-weight: 600;">
              <span>⏱</span> ${doc.availability_days} (${doc.availability_time})
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 14px; border-top: 1px solid #EDF2F7;">
            <div>
              <div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700;">Consultation Fee</div>
              <div style="font-size: 20px; font-weight: 800; color: #0A1128;">₹${doc.visiting_charge.toFixed(0)}</div>
            </div>
            
            <div style="display: flex; gap: 8px;">
              <a href="./doctor.html?id=${doc.doctor_id}" class="btn btn-outline btn-sm" style="padding: 8px 14px; font-weight: 600; border-radius: 8px;">View Profile</a>
              <a href="./book-appointment.html?doctor_id=${doc.doctor_id}" class="btn btn-primary btn-sm" style="padding: 8px 16px; font-weight: 700; border-radius: 8px; box-shadow: 0 4px 10px rgba(3, 64, 120, 0.2);">⚡ Book Slot</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (locationSelect) locationSelect.value = '';
    if (specSelect) specSelect.value = '';
    if (typeSelect) typeSelect.value = '';
    if (genderSelect) genderSelect.value = '';
    if (feeSlider) {
      feeSlider.value = 1000;
      if (feeValueDisplay) feeValueDisplay.innerText = '₹1,000';
    }
    if (sortSelect) sortSelect.value = 'rating_desc';
    renderDoctors();
  }

  // Attach event listeners
  [searchInput, locationSelect, specSelect, typeSelect, genderSelect, sortSelect].forEach(el => {
    if (el) el.addEventListener('change', renderDoctors);
  });

  if (searchInput) {
    searchInput.addEventListener('input', renderDoctors);
  }

  if (feeSlider && feeValueDisplay) {
    feeSlider.addEventListener('input', (e) => {
      feeValueDisplay.innerText = `₹${e.target.value}`;
      renderDoctors();
    });
  }

  // Initial call
  renderDoctors();
});
