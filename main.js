function headerHTML(active) {
  const links = [
    ["index.html", "Home"],
    ["freud.html", "Freud"],
    ["jung.html", "Jung"],
    ["compare.html", "Compare"],
    ["methods.html", "Methods"],
    ["tools.html", "Tools"],
    ["cases.html", "Cases"],
    ["library.html", "Library"],
    ["archives.html", "Archives"],
    ["about.html", "About"]
  ];
  return `
  <div class="wrap header-inner">
    <a class="brand" href="index.html">
      <span class="brand-mark">Depth Psychology</span>
      <span class="brand-name">The Consulting Room</span>
    </a>
    <button class="menu-btn" id="menuBtn" aria-label="Menu">Menu</button>
    <nav id="nav">
      ${links.map(([href, label]) =>
        `<a href="${href}" class="${active===href?"active":""}">${label}</a>`
      ).join("")}
    </nav>
  </div>`;
}

function footerHTML() {
  return `
  <div class="wrap footer-grid">
    <div>
      <div class="footer-brand">The Consulting Room</div>
      <p style="margin-top:.7rem;max-width:42ch">An educational archive of Sigmund Freud and C. G. Jung: theories, methods, public-domain texts, and original study tools. Not a clinical service.</p>
    </div>
    <div>
      <strong style="color:#f3ead8">Study</strong>
      <p><a href="library.html">Public-domain library</a><br>
      <a href="tools.html">Workbooks &amp; tools</a><br>
      <a href="methods.html">Methods</a></p>
    </div>
    <div>
      <strong style="color:#f3ead8">Legal</strong>
      <p><a href="about.html">Copyright &amp; disclaimer</a><br>
      Educational use only. Copyrighted collected works are linked, not reproduced.</p>
    </div>
  </div>
  <div class="wrap" style="margin-top:1.6rem;opacity:.7">© ${new Date().getFullYear()} The Consulting Room. Original site content may be reused with attribution. Source texts retain their own rights.</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "index.html";
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) header.innerHTML = headerHTML(page);
  if (footer) footer.innerHTML = footerHTML();
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  if (btn && nav) btn.addEventListener("click", () => nav.classList.toggle("open"));
});

/* Tools */
window.runWordAssoc = function () {
  const cues = ["mother","father","death","water","house","child","dark","gold","snake","journey","blood","door"];
  const rows = cues.map(c => {
    const el = document.getElementById("wa-" + c);
    return { cue: c, resp: (el && el.value.trim()) || "—" };
  });
  const box = document.getElementById("wa-result");
  box.classList.add("show");
  box.innerHTML = `<h3>Session record</h3>
    <p>Jung used timed word association at the Burghölzli to detect <em>complexes</em>: delayed, unusual, or emotionally charged replies. This workbook is a study aid, not a diagnosis.</p>
    <ul>${rows.map(r => `<li><strong>${r.cue}</strong> → ${r.resp}</li>`).join("")}</ul>
    <p>Look for clusters: family words, body/danger words, threshold words (door, journey). Note which replies felt delayed or forced.</p>`;
};

window.saveDream = function () {
  const dream = document.getElementById("dream-text").value.trim();
  const feeling = document.getElementById("dream-feel").value.trim();
  const day = document.getElementById("dream-day").value.trim();
  const box = document.getElementById("dream-result");
  box.classList.add("show");
  if (!dream) { box.innerHTML = "<p>Write the dream first.</p>"; return; }
  box.innerHTML = `<h3>Working notes</h3>
    <p><strong>Manifest content</strong> (what you remember):</p><p>${escapeHtml(dream)}</p>
    <p><strong>Affect:</strong> ${escapeHtml(feeling) || "not noted"}</p>
    <p><strong>Day residue:</strong> ${escapeHtml(day) || "not noted"}</p>
    <h4>Freud path</h4>
    <ol>
      <li>Free-associate to each striking image. Do not stop at the first “sensible” meaning.</li>
      <li>Ask what wish, fear, or forbidden thought the dream might disguise (dream-work: condensation, displacement, symbolization, secondary revision).</li>
      <li>Relate the dream to recent events and older memories.</li>
    </ol>
    <h4>Jung path</h4>
    <ol>
      <li>Treat the dream as a compensation from the unconscious, not only a wish-disguise.</li>
      <li>Amplify images with personal associations, then myth, fairy tale, and cultural parallels.</li>
      <li>Ask what attitude of consciousness the dream is correcting, and what figure (shadow, anima/animus, Self) may be speaking.</li>
    </ol>`;
};

window.scoreDefenses = function () {
  const items = [...document.querySelectorAll("[data-def]")];
  const tallies = {};
  items.forEach(el => {
    if (el.checked) {
      const k = el.dataset.def;
      tallies[k] = (tallies[k] || 0) + 1;
    }
  });
  const names = {
    repression: "Repression",
    projection: "Projection",
    reaction: "Reaction formation",
    sublimation: "Sublimation",
    denial: "Denial",
    intellectual: "Intellectualization"
  };
  const box = document.getElementById("def-result");
  box.classList.add("show");
  const keys = Object.keys(tallies);
  if (!keys.length) { box.innerHTML = "<p>Select any items that felt familiar.</p>"; return; }
  box.innerHTML = `<h3>Reflection</h3>
    <p>These are educational labels for common ego defenses described in the psychoanalytic tradition. They are not a personality test and not a diagnosis.</p>
    <ul>${keys.map(k => `<li><strong>${names[k]||k}</strong>: ${tallies[k]} endorsement(s)</li>`).join("")}</ul>
    <p>A defense is a way the psyche manages conflict. In Freud’s model, the ego mediates id demand, superego prohibition, and external reality. Naming a pattern is only a starting point for curiosity.</p>`;
};

window.scoreTypes = function () {
  const e = num("t-e"), i = num("t-i"), s = num("t-s"), n = num("t-n"), t = num("t-t"), f = num("t-f");
  const att = e >= i ? "Extraverted" : "Introverted";
  const perc = s >= n ? "Sensing" : "Intuiting";
  const judg = t >= f ? "Thinking" : "Feeling";
  const box = document.getElementById("type-result");
  box.classList.add("show");
  box.innerHTML = `<h3>Working sketch (not MBTI)</h3>
    <p>Jung’s 1921 model in <em>Psychological Types</em> describes an attitude (extraversion / introversion) and four functions (thinking, feeling, sensation, intuition). Later inventories such as MBTI are separate, copyrighted instruments. This slider is only a study prompt.</p>
    <p>Your rough emphasis: <strong>${att} ${perc}–${judg}</strong>.</p>
    <p>Jung held that the “inferior” function (the least developed of the four) often appears in dreams, projections, and midlife disturbance. Ask which function you distrust or mock in others—that is often the one asking for development.</p>`;
};

function num(id) { return Number(document.getElementById(id).value); }
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
