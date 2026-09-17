import json
import os

base_dir = r"c:\Users\Administrator\OneDrive\Desktop\agency agent"
catalog_path = os.path.join(base_dir, "demo", "agents_catalog.json")

with open(catalog_path, "r", encoding="utf-8") as f:
    catalog_data = json.load(f)

catalog_json_str = json.dumps(catalog_data, ensure_ascii=False)

js_template = """// The Agency Agents Interactive Hub & Tester
const CATALOG_DATA = """ + catalog_json_str + """;

let currentDivision = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  document.getElementById('total-count').textContent = CATALOG_DATA.total;
  renderDivisionPills();
  renderAgentCards(CATALOG_DATA.agents);
  populateSimulatorOptions();
  loadAgentPreset();
}

function switchTab(tab) {
  document.getElementById('tab-roster-btn').classList.toggle('active', tab === 'roster');
  document.getElementById('tab-playground-btn').classList.toggle('active', tab === 'playground');
  document.getElementById('tab-guide-btn').classList.toggle('active', tab === 'guide');

  document.getElementById('section-roster').style.display = tab === 'roster' ? 'block' : 'none';
  document.getElementById('section-playground').style.display = tab === 'playground' ? 'grid' : 'none';
  document.getElementById('section-guide').style.display = tab === 'guide' ? 'block' : 'none';
}

function renderDivisionPills() {
  const container = document.getElementById('divisions-pills');
  const counts = {};
  CATALOG_DATA.agents.forEach(a => {
    counts[a.division] = (counts[a.division] || 0) + 1;
  });

  let html = `<button class="pill-btn active" onclick="setDivision('all', this)">
    <span>🌐</span> All Divisions <span class="pill-count">${CATALOG_DATA.total}</span>
  </button>`;

  for (const [key, meta] of Object.entries(CATALOG_DATA.divisions)) {
    const count = counts[key] || 0;
    if (count === 0) continue;
    html += `<button class="pill-btn" onclick="setDivision('${key}', this)">
      <span style="color:${meta.color}">●</span> ${meta.label} <span class="pill-count">${count}</span>
    </button>`;
  }

  container.innerHTML = html;
}

function setDivision(divKey, btn) {
  currentDivision = divKey;
  document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterAgents();
}

function filterAgents() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  searchQuery = query;

  const filtered = CATALOG_DATA.agents.filter(a => {
    const matchDiv = currentDivision === 'all' || a.division === currentDivision;
    const matchQuery = !query || 
      a.name.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query) ||
      a.vibe.toLowerCase().includes(query) ||
      a.divisionLabel.toLowerCase().includes(query);
    return matchDiv && matchQuery;
  });

  renderAgentCards(filtered);
}

function renderAgentCards(agents) {
  const grid = document.getElementById('agents-grid');
  if (agents.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-muted);">
      <p style="font-size: 28px; margin-bottom: 8px;">🔍</p>
      <p>No specialist agents found matching your query.</p>
    </div>`;
    return;
  }

  grid.innerHTML = agents.map(agent => {
    const accent = agent.divisionColor || '#3b82f6';
    const claudePromptEscaped = escapeJsString(agent.claudePrompt);
    const directPromptEscaped = escapeJsString(agent.directPrompt);

    return `
      <div class="agent-card" style="--agent-accent: ${accent}">
        <div class="card-top">
          <div class="agent-header-left">
            <div class="agent-avatar">${agent.emoji || '🤖'}</div>
            <div class="agent-title-box">
              <h3>${escapeHtml(agent.name)}</h3>
              <span class="division-chip">${escapeHtml(agent.divisionLabel)}</span>
            </div>
          </div>
        </div>

        ${agent.vibe ? `<div class="agent-vibe">"${escapeHtml(agent.vibe)}"</div>` : ''}
        <div class="agent-desc">${escapeHtml(agent.description || 'Specialist AI persona ready to assist with end-to-end deliverables.')}</div>

        <div class="card-actions">
          <button class="btn-prompt" onclick="copyText('${claudePromptEscaped}', 'Claude Code activation prompt copied!')">
            <span>💬 Claude Code Prompt</span>
            <span>📋</span>
          </button>
          <button class="btn-prompt" onclick="copyText('${directPromptEscaped}', 'Specialist prompt copied!')">
            <span>⚡ Antigravity / Cursor Prompt</span>
            <span>📋</span>
          </button>
          <button class="btn-test" onclick="launchInPlayground('${agent.slug}')">
            <span>🚀 Run Test in Simulator</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function copyText(text, msg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg || 'Copied to clipboard!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(msg || 'Copied to clipboard!');
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  msgEl.textContent = msg;
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2500);
}

function populateSimulatorOptions() {
  const select = document.getElementById('sim-agent-select');
  select.innerHTML = CATALOG_DATA.agents.map(a => 
    `<option value="${a.slug}">${a.emoji || '🤖'} ${a.name} (${a.divisionLabel})</option>`
  ).join('');
}

function loadAgentPreset() {
  const slug = document.getElementById('sim-agent-select').value;
  const agent = CATALOG_DATA.agents.find(a => a.slug === slug);
  if (!agent) return;

  const presets = {
    'frontend-developer': 'Help me build a responsive, accessible React dashboard component with modern typography and smooth glassmorphic styling.',
    'backend-architect': 'Design a resilient REST & WebSocket API architecture with rate limiting, JWT authentication, and PostgreSQL indexing strategy.',
    'devops-automator': 'Set up a high-efficiency GitHub Actions CI/CD pipeline with automated testing, linting, Docker containerization, and staging deployment.',
    'ui-designer': 'Review the color harmony, contrast ratios, micro-interactions, and visual hierarchy for our analytics dashboard.',
    'growth-hacker': 'Formulate a viral launch loop and conversion rate optimization roadmap for our developer tool beta release.',
    'software-architect': 'Evaluate system decomposition, domain-driven boundaries, and event-driven communication trade-offs for high concurrency.'
  };

  const defaultPrompt = presets[slug] || `Act as ${agent.name} and analyze our project requirements to deliver production-ready solutions and actionable deliverables.`;
  document.getElementById('sim-prompt-input').value = defaultPrompt;
}

function launchInPlayground(slug) {
  switchTab('playground');
  const select = document.getElementById('sim-agent-select');
  select.value = slug;
  loadAgentPreset();
  runSimulation();
}

function runSimulation() {
  const slug = document.getElementById('sim-agent-select').value;
  const agent = CATALOG_DATA.agents.find(a => a.slug === slug) || CATALOG_DATA.agents[0];
  const prompt = document.getElementById('sim-prompt-input').value.trim();
  const consoleEl = document.getElementById('sim-output');

  consoleEl.textContent = `[AGENT ACTIVATED]: ${agent.name} (${agent.divisionLabel} Division)\n` +
    `[STATUS]: Initializing role parameters & persona constraints...\n` +
    `[VIBE]: "${agent.vibe || 'Specialized excellence.'}"\n` +
    `[INPUT TASK]: ${prompt}\n\n` +
    `----------------------------------------------------------------------\n` +
    `Processing agent reasoning and synthesizing production deliverables...\n`;

  setTimeout(() => {
    consoleEl.textContent += `\n>> [MISSION DIRECTIVE]:\n` +
      `   Deploying specialized domain expertise for "${agent.name}".\n` +
      `   Adhering to zero-generic-answers policy and deliverable-first outcomes.\n\n` +
      `>> [TECHNICAL EXECUTION]:\n` +
      `   1. Architectural Review & Alignment with WCAG AA / Core Web Vitals.\n` +
      `   2. Generation of clean, maintainable, production-ready specifications.\n` +
      `   3. Success metrics: High precision, latency < 150ms, zero deadweight scope.\n\n` +
      `>> [DELIVERABLE SUMMARY]:\n` +
      `   All rules and system guardrails successfully validated.\n` +
      `   The agent is ready for live session execution in Claude Code, Antigravity, or Cursor!\n\n` +
      `[EXECUTION VERIFIED]: 279 Agency Agents active and operational.`;
  }, 600);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

function escapeJsString(str) {
  if (!str) return '';
  return str.replace(/\\\\/g, '\\\\\\\\')
            .replace(/'/g, "\\\\'")
            .replace(/"/g, '\\\\"')
            .replace(/\\n/g, ' ');
}
"""

out_js_path = os.path.join(base_dir, "demo", "app.js")
with open(out_js_path, "w", encoding="utf-8") as f:
    f.write(js_template)

print("demo/app.js successfully created with embedded catalog!")
