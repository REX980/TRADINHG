// script.js

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // Only prevent default if the target exists
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Chat UI functionality
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

if (chatBox && userInput && sendBtn) {
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Add user message to chat
    appendMessage('user-message', message);

    // Fake bot response for now
    setTimeout(() => {
      const response = generateBotResponse(message);
      appendMessage('bot-message', response);
    }, 600);

    userInput.value = '';
  }

  function appendMessage(className, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function generateBotResponse(userMsg) {
    // Very basic response logic
    if (userMsg.toLowerCase().includes('market')) {
      return 'You can view live markets in the Market section above.';
    } else if (userMsg.toLowerCase().includes('tools')) {
      return 'We offer advanced tools including bots, risk suite, and charts.';
    } else if (userMsg.toLowerCase().includes('sign up')) {
      return 'Click the "Create Account" button above to sign up.';
    } else if (userMsg.toLowerCase().includes('deposit')) {
      return 'To deposit funds, go to your dashboard and click "Add Money".';
    } else if (userMsg.toLowerCase().includes('withdraw')) {
      return 'Withdrawals are processed within 24 hours. Use the "Withdraw" button in your wallet section.';
    } else if (userMsg.toLowerCase().includes('support')) {
      return 'Our support team is available 24/7. Email support@narejtradex.com or use the chat for help.';
    } else if (userMsg.toLowerCase().includes('hello') || userMsg.toLowerCase().includes('hi')) {
      return 'Hello! How can we assist you today?';
    } else {
      return 'Thanks for your message! A support team member will reply soon.';
    }
  }

  // Add a welcome message on load
  window.addEventListener('DOMContentLoaded', () => {
    appendMessage('bot-message', 'Welcome to TradeX! How can we help you today?');
  });

  // Add typing indicator for bot
  function showTypingIndicator() {
    let typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.textContent = 'TradeX is typing...';
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
  }

  // Enhance sendMessage to show typing indicator
  const originalSendMessage = sendMessage;
  sendMessage = function() {
    const message = userInput.value.trim();
    if (message === '') return;
    appendMessage('user-message', message);

    // Show typing indicator
    const typingDiv = showTypingIndicator();

    setTimeout(() => {
      chatBox.removeChild(typingDiv);
      const response = generateBotResponse(message);
      appendMessage('bot-message', response);
    }, 900);

    userInput.value = '';
  };

  // Allow pressing Ctrl+Enter to send multiline messages
  userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      userInput.value += '\n';
    }
  });
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
  // Load theme preference
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
  }
}

// Notification system
function showNotification(message, type = 'info') {
  let notif = document.createElement('div');
  notif.className = `notification ${type}`;
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.classList.add('show');
  }, 10);
  setTimeout(() => {
    notif.classList.remove('show');
    setTimeout(() => notif.remove(), 400);
  }, 3200);
}

// Example: showNotification('Welcome to TradeX!', 'success');

// Accessibility: focus trap for modals (if any modal is present)
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
});
