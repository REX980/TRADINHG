// Enhance logout experience with animation, session clearing, and redirect options

// Fade in the logout container for a smooth effect
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.logout-container');
  if (container) {
    container.style.opacity = 0;
    setTimeout(() => {
      container.style.transition = 'opacity 0.7s';
      container.style.opacity = 1;
    }, 100);
  }

  // Optionally clear sensitive data from storage
  sessionStorage.clear();
  localStorage.removeItem('authToken');
  localStorage.removeItem('userProfile');
  localStorage.removeItem('userSettings');

  // Show a countdown timer before redirecting to login (optional)
  const note = document.querySelector('.logout-note');
  if (note) {
    const countdownSpan = document.createElement('span');
    countdownSpan.style.color = '#00ffd5';
    let seconds = 8;
    countdownSpan.textContent = ` Redirecting to login in ${seconds}s...`;
    note.appendChild(countdownSpan);

    const interval = setInterval(() => {
      seconds--;
      countdownSpan.textContent = ` Redirecting to login in ${seconds}s...`;
      if (seconds <= 0) {
        clearInterval(interval);
        window.location.href = 'login.html';
      }
    }, 1000);
  }

  // Add keyboard accessibility: Press Enter to go to login
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      window.location.href = 'login.html';
    }
  });

  // Add click event to logout button for immediate login redirect
  const btn = document.querySelector('.logout-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }
});

// Optionally, display a toast notification (for future extensibility)
function showToast(message, type = 'info') {
  let toast = document.createElement('div');
  toast.className = `logout-toast logout-toast-${type}`;
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '32px';
  toast.style.right = '32px';
  toast.style.background = type === 'success' ? '#00e676' : '#00bcd4';
  toast.style.color = '#181818';
  toast.style.padding = '16px 32px';
  toast.style.borderRadius = '10px';
  toast.style.fontWeight = '700';
  toast.style.fontSize = '1.1rem';
  toast.style.boxShadow = '0 4px 18px rgba(0,188,212,0.18)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.4s';
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; }, 100);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 400);
  }, 2200);
}