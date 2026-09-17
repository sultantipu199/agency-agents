// AgencyFlow - Full Stack Digital Marketer Engine & Growth Calculator

document.addEventListener('DOMContentLoaded', () => {
  calculateMarketingMetrics();
});

// Marketing Sub-Tab Switching
function switchMktgTab(tab) {
  const tabs = ['calc', 'campaigns', 'viral'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`mktg-tab-${t}`);
    if (btn) btn.classList.toggle('active', t === tab);
    if (content) content.style.display = t === tab ? 'block' : 'none';
  });
}

// Interactive CAC, LTV & Campaign ROI Calculator
function calculateMarketingMetrics() {
  const budgetInput = document.getElementById('calc-ad-budget');
  const cpcInput = document.getElementById('calc-cpc');
  const crInput = document.getElementById('calc-cr');
  const dealSizeInput = document.getElementById('calc-deal-size');

  if (!budgetInput || !cpcInput || !crInput || !dealSizeInput) return;

  const budget = parseFloat(budgetInput.value) || 0;
  const cpc = parseFloat(cpcInput.value) || 0.1;
  const cr = parseFloat(crInput.value) || 1;
  const dealSize = parseFloat(dealSizeInput.value) || 500;

  // Unit Economics Formulas
  const totalClicks = budget / cpc;
  const totalLeads = Math.round(totalClicks * (cr / 100));
  const effectiveCac = totalLeads > 0 ? (budget / totalLeads) : 0;
  
  // Assuming standard B2B SQL to Win conversion benchmark: 15%
  const closeRate = 0.15;
  const closedWins = Math.round(totalLeads * closeRate);
  const totalRevenue = closedWins * dealSize;
  const netProfit = totalRevenue - budget;
  const roiPct = budget > 0 ? Math.round((netProfit / budget) * 100) : 0;

  // Update Result DOM elements
  const cacEl = document.getElementById('res-cac');
  const mqlsEl = document.getElementById('res-mqls');
  const revEl = document.getElementById('res-revenue');
  const roiEl = document.getElementById('res-roi');

  if (cacEl) cacEl.textContent = `$${effectiveCac.toFixed(2)}`;
  if (mqlsEl) mqlsEl.textContent = totalLeads.toLocaleString();
  if (revEl) revEl.textContent = `$${totalRevenue.toLocaleString()}`;
  if (roiEl) {
    roiEl.textContent = `${roiPct > 0 ? '+' : ''}${roiPct}%`;
    roiEl.style.color = roiPct >= 0 ? 'var(--brand-emerald)' : 'var(--brand-rose)';
  }

  // Reflect in Hero stat
  const heroRoi = document.getElementById('stat-roi-projected');
  if (heroRoi) heroRoi.textContent = `${roiPct}%`;
}

// Campaign Copying
function copyCampaignText(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  navigator.clipboard.writeText(el.innerText || el.textContent).then(() => {
    showToast('Campaign copy copied to clipboard!');
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = el.innerText || el.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Campaign copy copied to clipboard!');
  });
}

// Viral Referral Link Generator & Social Sharing
function copyReferralLink() {
  const input = document.getElementById('ref-code-input');
  if (!input) return;

  navigator.clipboard.writeText(input.value).then(() => {
    showToast('Referral link copied to clipboard!');
  });
}

function shareOnSocial(platform) {
  const url = encodeURIComponent('http://localhost:5050/agencyflow/');
  const text = encodeURIComponent('Check out AgencyFlow — Dual AI Engine for Full-Stack Development and Autonomous Growth Marketing:');

  let shareUrl = '';
  if (platform === 'twitter') {
    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
  } else if (platform === 'linkedin') {
    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  } else if (platform === 'whatsapp') {
    shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=500');
  }
}
