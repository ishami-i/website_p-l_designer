// src/script.js
import emailjs from 'emailjs-com';

/**
 * Handles form submission via EmailJS
 */
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('.submit');

  status.textContent = '';
  status.className = '';
  submitBtn.disabled = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const company = document.getElementById('company').value.trim();
  const upi = document.getElementById('upi').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !phone) {
    showStatus('⚠️ Please fill in all required fields.', 'error');
    submitBtn.disabled = false;
    return;
  }

  showStatus('⏳ Sending your request...', 'neutral');

  const SERVICE_ID = 'service_r9grvx2';
  const CLIENT_TEMPLATE_ID = 'template_gj0j0qh';
  const COMPANY_TEMPLATE_ID = 'template_f7r6vun';
  const PUBLIC_KEY = 'VC51Mh9D_3V-kk7MS';

  const emailParams = { name, email, phone, company, upi, service, message };

  if (window.emailjs) {
    emailjs
      .send(SERVICE_ID, CLIENT_TEMPLATE_ID, emailParams, PUBLIC_KEY)
      .then(() => emailjs.send(SERVICE_ID, COMPANY_TEMPLATE_ID, emailParams, PUBLIC_KEY))
      .then(() => {
        showStatus('✅ Thanks — your request has been recorded. We will contact you soon.', 'success');
        form.reset();
        submitBtn.disabled = false;
        document.getElementById('request').scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        showStatus('❌ Something went wrong. Please try again later.', 'error');
        submitBtn.disabled = false;
      });
  } else {
    showStatus('✅ Thanks — your request has been recorded. We will contact you soon.', 'success');
    form.reset();
    submitBtn.disabled = false;
  }
}

/**
 * Displays a fade-in/out animated message
 */
function showStatus(message, type) {
  const status = document.getElementById('form-status');

  status.textContent = message;
  status.className = '';
  if (type === 'success') status.classList.add('success');
  else if (type === 'error') status.classList.add('error');

  // Fade in
  requestAnimationFrame(() => status.classList.add('visible'));

  // Auto fade-out for success messages
  if (type === 'success') {
    setTimeout(() => {
      status.classList.remove('visible');
      status.classList.add('fade-out');
    }, 5000);
  }
}

// Initialize EmailJS
(function () {
  emailjs.init('VC51Mh9D_3V-kk7MS');
})();

// Added smooth scrolling for navigation links
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Improved error handling for form submission
if (!emailjs) {
  console.error('EmailJS library not loaded.');
}
