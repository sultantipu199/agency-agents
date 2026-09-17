// AgencyFlow - Full Stack Software Developer State & Runtime Engine

const STORAGE_KEYS = {
  LEADS: 'agencyflow_leads',
  THEME: 'agencyflow_theme'
};

const INITIAL_DEMO_LEADS = [
  { id: 'LD-101', name: 'Alex Rivera', email: 'alex@novacloud.io', company: 'NovaCloud Systems', stage: 'WON', channel: 'LinkedIn Thought Leadership', createdAt: '2026-09-17 11:20' },
  { id: 'LD-102', name: 'Dr. Elena Rostova', email: 'elena@biogenix.org', company: 'BioGenix Labs', stage: 'SQL', channel: 'SEO High-Intent Search', createdAt: '2026-09-17 12:45' },
  { id: 'LD-103', name: 'Marcus Vance', email: 'mvance@fintechapex.com', company: 'Apex Financial', stage: 'MQL', channel: 'K-Factor Viral Referral', createdAt: '2026-09-17 14:10' },
  { id: 'LD-104', name: 'Sophia Chen', email: 'sophia@hyperflow.dev', company: 'HyperFlow AI', stage: 'SQL', channel: 'Meta Growth Ad', createdAt: '2026-09-17 15:02' }
];

let appState = {
  leads: [],
  theme: 'dark',
  isExecutingWorkflow: false
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLeads();
  updateWorkflowDescription();
  renderLeadsTable();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  setTheme(savedTheme);
}

function toggleTheme() {
  const newTheme = appState.theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

function setTheme(theme) {
  appState.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.textContent = theme === 'dark' ? '🌓' : '☀️';
  }
}

// Navigation Helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Developer Tab Switching
function switchDevTab(tab) {
  const tabs = ['workflow', 'api', 'arch'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`dev-tab-${t}`);
    if (btn) btn.classList.toggle('active', t === tab);
    if (content) content.style.display = t === tab ? 'block' : 'none';
  });
}

// Workflow Description Updates
function updateWorkflowDescription() {
  const select = document.getElementById('workflow-select');
  const desc = document.getElementById('workflow-desc');
  if (!select || !desc) return;

  const map = {
    'lead-ingest': 'Executes full-stack data pipeline: sanitizes inputs, assigns territorial rep, fires webhook event, and commits to persistent store.',
    'auth-audit': 'Simulates Zero-Trust session validation: checks JWT token signature, evaluates RBAC role permissions, and verifies audit logs.',
    'perf-optimize': 'Analyzes asset bundle sizes, inlines critical CSS tokens, and triggers server-side subpixel cache warming under 50ms.',
    'deploy-sync': 'Orchestrates blue-green zero-downtime container rollout with automatic healthcheck verification and instant rollback guardrail.'
  };

  desc.textContent = map[select.value] || 'Executes autonomous software developer pipeline.';
}

// Workflow Execution Simulator
function executeDeveloperWorkflow() {
  if (appState.isExecutingWorkflow) return;
  appState.isExecutingWorkflow = true;

  const btn = document.getElementById('btn-trigger-workflow');
  const select = document.getElementById('workflow-select');
  const terminal = document.getElementById('dev-terminal');
  
  btn.disabled = true;
  btn.innerHTML = '<span>⏳</span> Executing Pipeline...';

  const selectedName = select.options[select.selectedIndex].text;
  appendLog('dev-terminal', 'info', `[DISPATCH] Launching pipeline: ${selectedName}`);

  const steps = [
    { delay: 300, type: 'agent', text: '[FullStackDev] Validating runtime environment and schema constraints...' },
    { delay: 800, type: 'info', text: '[Engine] Compiling TypeScript AST to optimized production bytecode...' },
    { delay: 1300, type: 'warn', text: '[SecurityGate] Verifying sanitization on all input payloads... (100% Passed)' },
    { delay: 1900, type: 'info', text: '[Database] Performing atomic commit to transaction pool with 12ms round-trip...' },
    { delay: 2500, type: 'success', text: `[SUCCESS] ${selectedName} completed with zero errors (HTTP 200 OK)!` }
  ];

  steps.forEach(step => {
    setTimeout(() => {
      appendLog('dev-terminal', step.type, step.text);
      if (step === steps[steps.length - 1]) {
        btn.disabled = false;
        btn.innerHTML = '<span>▶️</span> Run Full Stack Pipeline';
        appState.isExecutingWorkflow = false;
        showToast('Pipeline executed successfully!');
      }
    }, step.delay);
  });
}

function appendLog(terminalId, level, message) {
  const terminal = document.getElementById(terminalId);
  if (!terminal) return;

  const entry = document.createElement('div');
  entry.className = 'log-entry';

  const time = new Date().toLocaleTimeString();
  const timeSpan = `<span class="log-time">[${time}]</span> `;
  
  let contentSpan = '';
  if (level === 'info') contentSpan = `<span class="log-info">${escapeHtml(message)}</span>`;
  else if (level === 'success') contentSpan = `<span class="log-success">${escapeHtml(message)}</span>`;
  else if (level === 'agent') contentSpan = `<span class="log-agent">${escapeHtml(message)}</span>`;
  else if (level === 'warn') contentSpan = `<span class="log-warn">${escapeHtml(message)}</span>`;
  else contentSpan = `<span>${escapeHtml(message)}</span>`;

  entry.innerHTML = timeSpan + contentSpan;
  terminal.appendChild(entry);
  terminal.scrollTop = terminal.scrollHeight;
}

function clearDevTerminal() {
  const terminal = document.getElementById('dev-terminal');
  if (terminal) {
    terminal.innerHTML = `<div class="log-entry"><span class="log-time">[${new Date().toLocaleTimeString()}]</span> <span class="log-info">Console cleared by developer.</span></div>`;
  }
}

// Mock REST API Explorer
function testMockApi() {
  const method = document.getElementById('api-method').value;
  const endpoint = document.getElementById('api-endpoint-select').value;
  const outputPre = document.getElementById('api-output-pre');

  outputPre.textContent = `// Dispatching ${method} ${endpoint} (Awaiting response...)\n`;

  setTimeout(() => {
    let mockData = {};
    const timestamp = new Date().toISOString();

    if (endpoint === '/api/v1/leads') {
      mockData = {
        status: 200,
        route: endpoint,
        method: method,
        latency_ms: 32,
        timestamp: timestamp,
        data: {
          total_records: appState.leads.length,
          leads: appState.leads
        }
      };
    } else if (endpoint === '/api/v1/agents') {
      mockData = {
        status: 200,
        route: endpoint,
        latency_ms: 18,
        active_agents: [
          { role: 'Full Stack Senior Developer', division: 'Engineering', vibe: 'Premium full-stack craftsperson' },
          { role: 'Growth Hacker Marketer', division: 'Marketing', vibe: 'Finds the growth channel nobody exploited' }
        ]
      };
    } else {
      mockData = {
        status: 200,
        route: endpoint,
        latency_ms: 24,
        telemetry: {
          uptime_seconds: 48920,
          memory_usage_mb: 84.6,
          active_connections: 128,
          error_rate_pct: 0.001
        }
      };
    }

    outputPre.textContent = JSON.stringify(mockData, null, 2);
    showToast(`Received 200 OK from ${endpoint}`);
  }, 220);
}

// Leads / CRM Management
function initLeads() {
  const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
  if (raw) {
    try {
      appState.leads = JSON.parse(raw);
    } catch (e) {
      appState.leads = INITIAL_DEMO_LEADS;
    }
  } else {
    appState.leads = INITIAL_DEMO_LEADS;
    saveLeads();
  }
  updateStatsCount();
}

function saveLeads() {
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(appState.leads));
  updateStatsCount();
}

function updateStatsCount() {
  const counter = document.getElementById('stat-active-leads');
  if (counter) counter.textContent = appState.leads.length;
}

function renderLeadsTable() {
  const tbody = document.getElementById('crm-table-body');
  if (!tbody) return;

  if (appState.leads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No active leads in pipeline. Add a lead using the form above.</td></tr>`;
    return;
  }

  tbody.innerHTML = appState.leads.map(lead => {
    let stageClass = 'status-mql';
    if (lead.stage === 'SQL') stageClass = 'status-sql';
    if (lead.stage === 'WON') stageClass = 'status-won';

    return `<tr>
      <td><code>${escapeHtml(lead.id)}</code></td>
      <td><strong>${escapeHtml(lead.name)}</strong></td>
      <td>${escapeHtml(lead.email)}</td>
      <td>${escapeHtml(lead.company || '—')}</td>
      <td><span class="badge-status ${stageClass}">${escapeHtml(lead.stage)}</span></td>
      <td><span style="font-size: 12px; color: var(--text-secondary);">${escapeHtml(lead.channel || 'Direct Inbound')}</span></td>
      <td><span style="font-size: 12px; color: var(--text-muted);">${escapeHtml(lead.createdAt)}</span></td>
      <td>
        <button class="btn-copy" onclick="deleteLead('${lead.id}')" style="color: var(--brand-rose); border-color: rgba(244,63,94,0.3);">
          Delete
        </button>
      </td>
    </tr>`;
  }).join('');
}

function handleLeadSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('lead-name');
  const emailInput = document.getElementById('lead-email');
  const companyInput = document.getElementById('lead-company');
  const stageSelect = document.getElementById('lead-status');

  const newLead = {
    id: `LD-${Math.floor(100 + Math.random() * 900)}`,
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    company: companyInput.value.trim() || 'Direct Customer',
    stage: stageSelect.value,
    channel: 'AgencyFlow Web Form',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  appState.leads.unshift(newLead);
  saveLeads();
  renderLeadsTable();

  nameInput.value = '';
  emailInput.value = '';
  companyInput.value = '';

  showToast(`Added lead: ${newLead.name} (${newLead.stage})`);
}

function deleteLead(id) {
  appState.leads = appState.leads.filter(l => l.id !== id);
  saveLeads();
  renderLeadsTable();
  showToast(`Lead ${id} removed from pipeline.`);
}

function resetDemoLeads() {
  appState.leads = [...INITIAL_DEMO_LEADS];
  saveLeads();
  renderLeadsTable();
  showToast('Reset leads to initial demo dataset.');
}

function exportLeadsCsv() {
  if (appState.leads.length === 0) {
    showToast('No leads to export.');
    return;
  }

  const headers = ['Lead ID', 'Name', 'Email', 'Company', 'Funnel Stage', 'Channel', 'Created At'];
  const rows = appState.leads.map(l => [
    `"${l.id}"`,
    `"${l.name}"`,
    `"${l.email}"`,
    `"${l.company}"`,
    `"${l.stage}"`,
    `"${l.channel}"`,
    `"${l.createdAt}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `agencyflow_leads_${new Date().toISOString().substring(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Exported CSV successfully!');
}

// Toast Helper
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('AgencyFlow Service Worker active:', reg.scope);
    }).catch(err => console.error('SW registration failed:', err));
  });
}

// Canvas Analytics Charts Engine
window.addEventListener('load', () => {
  renderAllCharts();
});

window.addEventListener('resize', () => {
  renderAllCharts();
});

function renderAllCharts() {
  drawMrrChart();
  drawFunnelChart();
}

function drawMrrChart() {
  const canvas = document.getElementById('mrrChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Data: Months 1-6
  const labels = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
  const mrrData = [3.0, 7.5, 14.2, 22.8, 36.5, 58.0]; // in $k
  const adSpend = [3.0, 3.0, 3.2, 3.5, 3.5, 4.0];    // in $k

  const padLeft = 40;
  const padBottom = 30;
  const padTop = 20;
  const padRight = 20;

  const chartW = w - padLeft - padRight;
  const chartH = h - padBottom - padTop;
  const maxVal = 65;

  // Grid Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padTop + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - padRight, y);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    const val = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillText(`$${val}k`, padLeft - 6, y + 3);
  }

  // Draw X labels
  labels.forEach((lbl, i) => {
    const x = padLeft + (chartW / (labels.length - 1)) * i;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(lbl, x, h - 10);
  });

  // Plot Area Gradient Fill for MRR
  const grad = ctx.createLinearGradient(0, padTop, 0, h - padBottom);
  grad.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
  grad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

  ctx.beginPath();
  mrrData.forEach((val, i) => {
    const x = padLeft + (chartW / (mrrData.length - 1)) * i;
    const y = padTop + chartH - (val / maxVal) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(padLeft + chartW, padTop + chartH);
  ctx.lineTo(padLeft, padTop + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // MRR Line
  ctx.beginPath();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 3;
  mrrData.forEach((val, i) => {
    const x = padLeft + (chartW / (mrrData.length - 1)) * i;
    const y = padTop + chartH - (val / maxVal) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Points
  mrrData.forEach((val, i) => {
    const x = padLeft + (chartW / (mrrData.length - 1)) * i;
    const y = padTop + chartH - (val / maxVal) * chartH;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0e1a';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#06b6d4';
    ctx.stroke();
  });

  // Ad Spend Line (Dashed Orange)
  ctx.beginPath();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  adSpend.forEach((val, i) => {
    const x = padLeft + (chartW / (adSpend.length - 1)) * i;
    const y = padTop + chartH - (val / maxVal) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawFunnelChart() {
  const canvas = document.getElementById('funnelChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const stages = [
    { label: 'Impressions', count: 125000, color: '#3b82f6' },
    { label: 'Clicks (8%)', count: 10000, color: '#60a5fa' },
    { label: 'Leads (14%)', count: 1400, color: '#06b6d4' },
    { label: 'MQL (30%)', count: 420, color: '#8b5cf6' },
    { label: 'SQL (42%)', count: 180, color: '#a855f7' },
    { label: 'Won Deals', count: 42, color: '#10b981' }
  ];

  const padLeft = 90;
  const padRight = 60;
  const barHeight = 22;
  const gap = 12;
  const startY = 16;
  const maxW = w - padLeft - padRight;

  stages.forEach((st, idx) => {
    const y = startY + idx * (barHeight + gap);
    // Logarithmic or relative ratio for clear visual representation
    const ratio = Math.max(0.12, Math.pow((stages.length - idx) / stages.length, 1.2));
    const barW = maxW * ratio;

    // Label
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(st.label, padLeft - 10, y + 15);

    // Bar background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(padLeft, y, maxW, barHeight, 4) : ctx.rect(padLeft, y, maxW, barHeight);
    ctx.fill();

    // Bar fill
    ctx.fillStyle = st.color;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(padLeft, y, barW, barHeight, 4) : ctx.rect(padLeft, y, barW, barHeight);
    ctx.fill();

    // Count text
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(st.count.toLocaleString(), padLeft + barW + 8, y + 15);
  });
}

// Copilot Drawer & Chatbot System
let currentCopilotAgent = 'dev';

function toggleCopilotDrawer() {
  const drawer = document.getElementById('copilot-drawer');
  if (!drawer) return;
  drawer.classList.toggle('open');
  if (drawer.classList.contains('open')) {
    const input = document.getElementById('copilot-input');
    if (input) input.focus();
  }
}

function setCopilotAgent(agentType) {
  currentCopilotAgent = agentType;
  document.getElementById('copilot-btn-dev').classList.toggle('active', agentType === 'dev');
  document.getElementById('copilot-btn-mktg').classList.toggle('active', agentType === 'mktg');

  const chatBody = document.getElementById('copilot-chat-body');
  const greeting = agentType === 'dev' 
    ? { sender: 'EngineeringSeniorDeveloper', text: "Switched to Full Stack Developer. Ask me for architecture patterns, database schemas, performance tuning, or code snippets!" }
    : { sender: 'MarketingGrowthHacker', text: "Switched to Growth Marketer. Ask me for conversion funnels, viral hooks, ad copy variations, or CAC:LTV analysis!" };

  appendChatMessage(greeting.sender, greeting.text, 'ai');
}

function handleCopilotSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('copilot-input');
  if (!input || !input.value.trim()) return;

  const query = input.value.trim();
  input.value = '';

  appendChatMessage('You', query, 'user');

  // AI Response Simulator
  setTimeout(() => {
    let reply = '';
    const sender = currentCopilotAgent === 'dev' ? 'EngineeringSeniorDeveloper' : 'MarketingGrowthHacker';

    const qLower = query.toLowerCase();
    if (currentCopilotAgent === 'dev') {
      if (qLower.includes('api') || qLower.includes('route')) {
        reply = "Here's a production REST route structure:\n`GET /api/v1/leads?stage=SQL&limit=50`\nReturns JSON schema with sub-45ms execution, JWT bearer auth header, and CORS preflight cached.";
      } else if (qLower.includes('database') || qLower.includes('schema') || qLower.includes('sql')) {
        reply = "Database Schema Recommendation:\n```sql\nCREATE TABLE leads (\n  id VARCHAR(32) PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  stage VARCHAR(16) DEFAULT 'MQL',\n  mrr_value NUMERIC(10,2) DEFAULT 0.00\n);\n```";
      } else {
        reply = `Analyzing request: "${query}".\nAs your Senior Developer agent, I recommend modularizing into pure ES6 functions, isolating state in localStorage, and keeping page weight under 50KB for sub-second FID.`;
      }
    } else {
      if (qLower.includes('ad') || qLower.includes('copy') || qLower.includes('meta')) {
        reply = "High-Converting Ad Hook:\n🔥 'Why burn $10k/month on disconnected software teams? Deploy your full-stack app + growth engine in hours with AgencyFlow.'\nCTA: Test Free Live Interactive Prototype.";
      } else if (qLower.includes('viral') || qLower.includes('referral')) {
        reply = "To push your viral K-factor past 1.2, trigger the referral prompt immediately after a user adds their first 3 leads, offering 1 month of premium workflows for each invite.";
      } else {
        reply = `Growth Strategy for "${query}": Focus on Bottom-of-Funnel (BOFU) high-intent search keywords with conversion landing pages, paired with automated 4-stage email followups.`;
      }
    }

    appendChatMessage(sender, reply, 'ai');
  }, 450);
}

function appendChatMessage(sender, text, type) {
  const chatBody = document.getElementById('copilot-chat-body');
  if (!chatBody) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg msg-${type}`;

  if (type === 'ai') {
    msgDiv.innerHTML = `<div class="msg-sender">${escapeHtml(sender)}</div><div style="white-space: pre-wrap;">${escapeHtml(text)}</div>`;
  } else {
    msgDiv.innerHTML = `<div style="white-space: pre-wrap;">${escapeHtml(text)}</div>`;
  }

  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

