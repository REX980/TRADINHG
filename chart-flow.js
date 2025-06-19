// Chart Flow: Interactive Trading Chart & Messaging Integration for NAREJ TRADE X

// Example: Render a sample trading chart using Chart.js
function renderTradingChart() {
  const chartContainer = document.getElementById('trading-chart');
  if (!chartContainer) return;

  // Create canvas if not present
  let canvas = chartContainer.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.width = 700;
    canvas.height = 320;
    chartContainer.appendChild(canvas);
  }

  // Sample data for demonstration
  const data = {
    labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [{
      label: 'BTC/USD',
      data: [27300, 27450, 27280, 27500, 27620, 27580, 27700],
      borderColor: '#00ffd5',
      backgroundColor: 'rgba(0,255,213,0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#00ffd5'
    }]
  };

  new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: data,
    options: {
      plugins: { legend: { labels: { color: '#fff' } } },
      scales: {
        x: { ticks: { color: '#fff' }, grid: { color: '#2c3e50' } },
        y: { ticks: { color: '#fff' }, grid: { color: '#2c3e50' } }
      }
    }
  });
}

// Chat Flow: Simple local chat simulation
function setupChatFlow() {
  const chatForm = document.getElementById('chart-chat-form');
  const chatBox = document.getElementById('chart-chat-box');
  if (!chatForm || !chatBox) return;

  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('chart-chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const username = "You";
    const avatar = "https://randomuser.me/api/portraits/men/99.jpg";
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `
      <img src="${avatar}" class="chat-avatar" alt="User" />
      <div class="chat-content">
        <span class="chat-username">${username} <span class="chat-time">${time}</span></span>
        ${msg}
      </div>
    `;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = '';
  });
}

// Utility: Show a toast notification
function showChartToast(message, type = 'info') {
  let toast = document.createElement('div');
  toast.className = `chart-toast chart-toast-${type}`;
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

// Initialization
document.addEventListener('DOMContentLoaded', function() {
  // Render trading chart if container exists 
  renderTradingChart();

  // setup chat flow if chat form exists
  setupChatFlow();

  // Example: show a welcome toast
  showChartToast('Welcome to NAREJ TRADE X! Explore the trading chart and chat with us.', 'success');
});