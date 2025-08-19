import { SUPABASE_URL, SUPABASE_KEY } from './supabaseConfig.js';

async function submitQueryForm(event) {
  event.preventDefault();
  const name = document.getElementById('query-name').value.trim();
  const email = document.getElementById('query-email').value.trim();
  const message = document.getElementById('query-message').value.trim();
  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  const { createClient } = window.supabase;
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { error } = await supabase.from('queries').insert({ name, email, message });
  if (error) {
    alert('Error sending query: ' + error.message);
  } else {
    document.getElementById('query-form').reset();
    showQuerySentPopup();
  }
}

function showQuerySentPopup() {
  const popup = document.createElement('div');
  popup.className = 'query-popup';
  popup.innerHTML = `<i class="fas fa-check-circle" style="font-size:2.2rem;color:var(--text);margin-bottom:0.7rem;"></i>Query sent!`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2200);
}

window.submitQueryForm = submitQueryForm;
