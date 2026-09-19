/**
 * SilverGuide AI — Client-Side Interaction & Streaming Controller
 * Built specifically for senior citizens with voice I/O, large font scaling, and AAA accessibility.
 */

const state = {
  isGenerating: false,
  activeCategory: 'general',
  activeAttachment: null,
  voiceEnabled: true,
  isRecording: false,
  recognition: null,
  lastVerdictText: ""
};

document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('prompt-input');

  promptInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      sendPrompt();
    }
  });

  // Check health
  fetch('/api/health')
    .then(r => r.json())
    .then(d => console.log('SilverGuide Service:', d.service, d.status))
    .catch(err => console.warn('Health check warning:', err));
});

// -----------------------------------------------------------------------------
// Accessibility Helpers: Font Scaling & Contrast
// -----------------------------------------------------------------------------
function setTextSize(size) {
  document.body.classList.remove('font-size-md', 'font-size-lg', 'font-size-xl');
  document.body.classList.add(`font-size-${size}`);

  document.querySelectorAll('.btn-size').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-size-${size}`).classList.add('active');
}

function toggleContrast() {
  document.body.classList.toggle('high-contrast');
  const btn = document.getElementById('contrast-toggle');
  btn.classList.toggle('active');
}

function toggleVoice() {
  state.voiceEnabled = !state.voiceEnabled;
  const btn = document.getElementById('voice-toggle');
  const label = document.getElementById('voice-label');
  const icon = document.getElementById('voice-icon');

  if (state.voiceEnabled) {
    btn.classList.add('active');
    label.textContent = 'Voice: ON';
    icon.textContent = '🔊';
  } else {
    btn.classList.remove('active');
    label.textContent = 'Voice: OFF';
    icon.textContent = '🔇';
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }
}

function speakSenior(text) {
  if (!state.voiceEnabled || !window.speechSynthesis || !text) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Gentle, clear, slow pace for seniors
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn("Speech error:", e);
  }
}

function replayLastVerdict() {
  if (state.lastVerdictText) {
    speakSenior(state.lastVerdictText);
  }
}

function printSeniorSummary() {
  window.print();
}

// -----------------------------------------------------------------------------
// 4 Quick Action Hubs
// -----------------------------------------------------------------------------
function selectAction(type) {
  state.activeCategory = type;
  const input = document.getElementById('prompt-input');

  if (type === 'medicine') {
    input.value = "Please explain my medicine dosage, when to take it, and any food warnings in big clear letters.";
    document.getElementById('file-input').click();
  } else if (type === 'scam') {
    input.value = "I received this suspicious SMS/WhatsApp message claiming my bank account is blocked. Is this a scam?";
    input.focus();
  } else if (type === 'bill') {
    input.value = "Please explain this electricity bill: how much do I need to pay, what is the due date, and how do I pay it safely?";
    input.focus();
  } else if (type === 'emergency') {
    input.value = "Generate my Emergency Medical SOS Card with my blood group, chronic conditions, active medications, and doctor contacts.";
    sendPrompt();
  } else if (type === 'wellness') {
    input.value = "Good morning! Can you check in with me on my daily wellness routine, hydration, and morning medication?";
    sendPrompt();
  } else if (type === 'talk') {
    input.value = "Hello! Can we talk? How is your day going?";
    toggleSpeech();
  }
}

// -----------------------------------------------------------------------------
// Voice Input (Microphone)
// -----------------------------------------------------------------------------
function toggleSpeech() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice microphone is supported in Google Chrome and Microsoft Edge.");
    return;
  }

  const micBtn = document.getElementById('mic-btn');
  const micText = document.getElementById('mic-text');
  const input = document.getElementById('prompt-input');

  if (state.isRecording && state.recognition) {
    state.recognition.stop();
    return;
  }

  try {
    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = true;

    rec.onstart = () => {
      state.isRecording = true;
      state.recognition = rec;
      micBtn.classList.add('recording');
      micText.textContent = 'Listening...';
      input.placeholder = "Listening to your voice... Speak comfortably...";
    };

    rec.onresult = (e) => {
      let transcript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      input.value = transcript;
    };

    rec.onerror = () => stopRecordingUI();
    rec.onend = () => stopRecordingUI();

    rec.start();
  } catch (err) {
    console.error("Speech rec error:", err);
    stopRecordingUI();
  }

  function stopRecordingUI() {
    state.isRecording = false;
    state.recognition = null;
    micBtn.classList.remove('recording');
    micText.textContent = 'Speak Now';
    input.placeholder = "Ask a question or describe your medicine bottle... (or click Speak Now)";
  }
}

// -----------------------------------------------------------------------------
// Photo Attachment Handling
// -----------------------------------------------------------------------------
function handleFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const base64Data = event.target.result.split(',')[1];
    state.activeAttachment = {
      fileName: file.name,
      mimeType: file.type || 'image/jpeg',
      dataBase64: base64Data
    };

    document.getElementById('attachment-name').textContent = `📷 ${file.name} (${Math.round(file.size / 1024)} KB)`;
    document.getElementById('attachment-preview').style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

function clearAttachment() {
  state.activeAttachment = null;
  document.getElementById('attachment-preview').style.display = 'none';
  document.getElementById('file-input').value = '';
}

// -----------------------------------------------------------------------------
// Core Chat Stream Execution
// -----------------------------------------------------------------------------
async function sendPrompt() {
  const input = document.getElementById('prompt-input');
  const query = input.value.trim();
  if (!query && !state.activeAttachment) return;
  if (state.isGenerating) return;

  document.getElementById('welcome-banner').style.display = 'none';

  // Add user bubble
  appendMessage('user', query, state.activeAttachment);

  const payload = {
    message: query || "Please examine my attached photo.",
    category: state.activeCategory,
    attachment: state.activeAttachment
  };

  input.value = '';
  clearAttachment();
  state.isGenerating = true;

  // Add assistant skeleton
  const assistantBubble = appendAssistantSkeleton();
  const bodyEl = assistantBubble.querySelector('.markdown-body');
  const thoughtEl = assistantBubble.querySelector('.thought-box');

  let rawMd = '';

  try {
    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const raw = line.replace('data: ', '').trim();
          if (!raw) continue;

          try {
            const data = JSON.parse(raw);
            if (data.type === 'thought') {
              thoughtEl.textContent = `💭 ${data.content}`;
              thoughtEl.style.display = 'block';
            } else if (data.type === 'content') {
              rawMd += data.delta;
              if (window.marked) {
                bodyEl.innerHTML = marked.parse(rawMd);
              } else {
                bodyEl.textContent = rawMd;
              }
            } else if (data.type === 'critic') {
              renderCriticCard(assistantBubble, data.data);
            } else if (data.type === 'verdict') {
              state.lastVerdictText = data.speech_text;
              renderVoicePill(assistantBubble, data.speech_text);
              speakSenior(data.speech_text);
            }
          } catch (e) {
            console.error('JSON SSE parse error:', e);
          }
        }
      }
      scrollFeed();
    }
  } catch (err) {
    bodyEl.innerHTML += `<div class="alert-box danger">⚠️ Service notice: ${err.message}</div>`;
  } finally {
    state.isGenerating = false;
    state.activeCategory = 'general';
  }
}

function appendMessage(role, text, attachment) {
  const list = document.getElementById('messages-list');
  const bubble = document.createElement('div');
  bubble.className = `msg-bubble ${role}`;

  let attHtml = '';
  if (attachment) {
    attHtml = `<div style="font-size:14px; margin-bottom:6px; font-weight:600; color:var(--accent-blue);">📎 Attached: ${escapeHtml(attachment.fileName)}</div>`;
  }

  bubble.innerHTML = `
    <div class="bubble-role">👤 You</div>
    ${attHtml}
    <div>${escapeHtml(text)}</div>
  `;
  list.appendChild(bubble);
  scrollFeed();
}

function appendAssistantSkeleton() {
  const list = document.getElementById('messages-list');
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble assistant';
  bubble.innerHTML = `
    <div class="bubble-role">👴 SilverGuide AI</div>
    <div class="thought-box" style="display:none;"></div>
    <div class="markdown-body"></div>
  `;
  list.appendChild(bubble);
  scrollFeed();
  return bubble;
}

function renderCriticCard(container, data) {
  const card = document.createElement('div');
  card.className = 'senior-critic-card';

  const checks = data?.checks || [];
  const checksHtml = checks.map(c => `
    <div class="critic-item">
      <span style="color:var(--accent-green); font-weight:700;">✓</span>
      <span><strong>${escapeHtml(c.name)}:</strong> ${escapeHtml(c.detail)}</span>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="critic-title">🛡️ Senior Safety & Reliability Verification (Passed)</div>
    <div class="critic-grid">${checksHtml}</div>
  `;
  container.appendChild(card);
}

function renderVoicePill(container, text) {
  const pill = document.createElement('div');
  pill.className = 'voice-verdict-pill';
  pill.innerHTML = `
    <span>🗣️ <strong>Spoken Summary:</strong> "${escapeHtml(text)}"</span>
    <button class="replay-btn" onclick="replayLastVerdict()">🔊 Hear Again</button>
  `;
  container.appendChild(pill);
}

function scrollFeed() {
  const feed = document.getElementById('feed-container');
  feed.scrollTop = feed.scrollHeight;
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// API Key Modal
function openKeyModal() { document.getElementById('key-modal').style.display = 'flex'; }
function closeKeyModal() { document.getElementById('key-modal').style.display = 'none'; }
async function saveApiKey() {
  const key = document.getElementById('api-key-input').value.trim();
  await fetch('/api/config/key', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: key })
  });
  closeKeyModal();
  alert("Key saved! SilverGuide is ready with live Gemini 2.5 Flash.");
}
