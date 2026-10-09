/* AI CORE portfolio — rendering and interactions. Content lives in content.js. */
(function () {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ext = 'target="_blank" rel="noopener"';

  /* ---------- Hero & static fields ---------- */
  const P = D.person;
  $("#hero-label").textContent = P.roleLabel;
  $("#hero-name").textContent = P.name;
  $("#hero-headline").textContent = P.headline;
  $("#hero-intro").textContent = P.intro;
  $("#hero-loc").textContent = "◎ " + P.location + " · open to " + P.openTo;
  $("#hero-github").href = D.links.github;
  $("#hero-linkedin").href = D.links.linkedin;
  $("#cv-download").href = P.cv;
  $("#id-role").textContent = P.role;
  $("#id-loc").textContent = P.location;
  $("#about-summary").textContent = D.about.summary;
  $("#year").textContent = new Date().getFullYear();

  // HUD tick marks
  const ticks = $(".hud-ticks");
  if (ticks) {
    let t = "";
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2, r1 = i % 6 === 0 ? 270 : 276, r2 = 282;
      t += `<line x1="${300 + r1 * Math.cos(a)}" y1="${300 + r1 * Math.sin(a)}" x2="${300 + r2 * Math.cos(a)}" y2="${300 + r2 * Math.sin(a)}"/>`;
    }
    ticks.innerHTML = t;
  }

  /* ---------- About accordion ---------- */
  $("#about-cards").innerHTML = D.about.cards.map((c, i) => `
    <article class="module acc" data-reveal>
      <button class="acc-btn" type="button" aria-expanded="false" aria-controls="acc-${c.id}" id="accb-${c.id}">
        ${esc(c.title)}<span class="plus" aria-hidden="true">+</span></button>
      <div class="acc-body" id="acc-${c.id}" role="region" aria-labelledby="accb-${c.id}"><div><ul>${c.body.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div></div>
    </article>`).join("");
  $$(".acc-btn").forEach((btn) => btn.addEventListener("click", () => {
    const card = btn.closest(".acc"), open = !card.classList.contains("open");
    card.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open));
  }));
  // open the first card so the section is informative at rest
  const firstAcc = $(".acc-btn"); if (firstAcc) firstAcc.click();

  /* ---------- Skills ---------- */
  const LEVELS = ["Learning", "Foundational", "Project experience", "Professional use"];
  const levelClass = (l) => "st-" + ({ "Professional use": "professional", "Project experience": "project", "Foundational": "foundational", "Learning": "learning" }[l] || "project");
  $("#skill-legend").innerHTML = LEVELS.slice().reverse().map((l) => `<span class="status ${levelClass(l)}">${esc(l)}</span>`).join("");
  $("#skills-grid").innerHTML = D.skills.map((s) => {
    const n = LEVELS.indexOf(s.level) + 1;
    return `<article class="module skill" data-reveal>
      <div class="skill-top"><h3>${esc(s.name)}</h3><span class="status ${levelClass(s.level)}">${esc(s.level)}</span></div>
      <div><div class="meter" aria-hidden="true">${[1, 2, 3, 4].map((k) => `<i class="${k <= n ? "on" : ""}"></i>`).join("")}</div>
      <div class="meter-cap" aria-hidden="true"><span>learning</span><span>professional</span></div></div>
      <p>${esc(s.what)}</p>
      <div class="tags">${s.tools.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      <p class="where">APPLIED IN · <b>${esc(s.where)}</b></p>
    </article>`;
  }).join("");

  /* ---------- Experience ---------- */
  $("#experience-list").innerHTML = D.experience.map((e) => `
    <article class="module mission" data-reveal>
      <div class="mission-head"><div><h3>${esc(e.role)}</h3><p class="org">${esc(e.org)}</p></div><span class="dates">${esc(e.dates)}</span></div>
      <p class="product">${esc(e.product)}</p>
      <p class="log-label">MISSION LOG</p>
      <ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <p class="log-label">SKILLS USED</p>
      <div class="tags">${e.skills.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      <span class="screw s2" aria-hidden="true"></span><span class="screw s4" aria-hidden="true"></span>
    </article>`).join("");

  /* ---------- Education ---------- */
  $("#education-list").innerHTML = D.education.map((e) => `
    <article class="module doc" data-reveal>
      <span class="holo" aria-hidden="true"></span>
      <span class="status ${e.status === "Completed" ? "st-completed" : "st-in-progress"}">${esc(e.status)}</span>
      <h3>${esc(e.title)}</h3><p class="org">${esc(e.org)}</p><p class="dates">${esc(e.dates)}</p>
      ${e.note ? `<p class="note">${esc(e.note)}</p>` : ""}
    </article>`).join("");

  /* ---------- Certifications ---------- */
  $("#cert-list").innerHTML = D.certifications.map((c) => `
    <article class="module cert" data-reveal>
      <span class="cert-seal" aria-hidden="true">${esc(c.issuer.slice(0, 2).toUpperCase())}</span>
      <div><h3>${esc(c.title)}</h3><p>${esc(c.issuer)}</p></div>
    </article>`).join("") +
    `<p class="section-note" style="grid-column:1/-1;margin-top:6px">The IIT Patna programme certificate will be added here after completion (expected 25 October 2026).</p>`;

  /* ---------- Projects ---------- */
  const VIS = {
    rag: `<svg viewBox="0 0 400 240" aria-hidden="true"><g fill="none" stroke="rgba(195,203,212,.35)" stroke-width="1.2">
      <rect x="22" y="48" width="58" height="72" rx="5"/><rect x="30" y="58" width="58" height="72" rx="5" fill="#111820"/><path d="M40 76h36M40 86h30M40 96h36M40 106h24"/>
      <g stroke="#45d8ef"><path class="flow-dash" d="M92 96 C130 96 130 120 168 120"/><path class="flow-dash" d="M262 120 C300 120 300 96 336 96"/></g>
      <circle cx="215" cy="120" r="44" stroke="rgba(69,216,239,.5)"/><circle cx="215" cy="120" r="30" stroke="rgba(69,216,239,.25)" stroke-dasharray="3 5"/>
      <rect x="318" y="72" width="64" height="48" rx="8" fill="#111820"/><path d="M328 88h44M328 98h30"/><path d="M332 120l-6 10 14-10"/></g>
      <circle cx="215" cy="120" r="12" fill="#45d8ef" opacity=".85"/><g font-family="IBM Plex Mono" font-size="10" fill="#8b96a3"><text x="22" y="150">DOCS</text><text x="190" y="184">RETRIEVE</text><text x="322" y="146">ANSWER+SRC</text></g></svg>`,
    pipeline: `<svg viewBox="0 0 400 240" aria-hidden="true"><g font-family="IBM Plex Mono" font-size="10" fill="#8b96a3">${["COLLECT", "CLEAN", "ANALYSE", "CHART"].map((s, i) => `<g transform="translate(${18 + i * 96},92)"><rect width="76" height="52" rx="7" fill="#111820" stroke="${i === 3 ? "#45d8ef" : "rgba(195,203,212,.35)"}"/><text x="38" y="31" text-anchor="middle">${s}</text></g>`).join("")}</g>
      <g stroke="#45d8ef" stroke-width="1.4">${[0, 1, 2].map((i) => `<path class="flow-dash" d="M${94 + i * 96} 118h20"/>`).join("")}</g>
      <g fill="#45d8ef" opacity=".7">${[30, 48, 22, 60, 40, 70].map((h, i) => `<rect x="${300 + i * 12}" y="${200 - h}" width="8" height="${h}" rx="1"/>`).join("")}</g></svg>`,
    ml: `<svg viewBox="0 0 400 240" aria-hidden="true"><g stroke="rgba(195,203,212,.18)">${[0, 1, 2].map((c) => [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((r2) => c < 2 ? `<line x1="${110 + c * 90}" y1="${60 + r * 40}" x2="${200 + c * 90}" y2="${60 + r2 * 40}"/>` : "").join("")).join("")).join("")}</g>
      <g>${[0, 1, 2].map((c) => [0, 1, 2, 3].map((r) => `<circle cx="${110 + c * 90}" cy="${60 + r * 40}" r="9" fill="#111820" stroke="${c === 2 ? "#45d8ef" : "rgba(195,203,212,.45)"}"/>`).join("")).join("")}</g>
      <g font-family="IBM Plex Mono" font-size="10" fill="#8b96a3"><text x="40" y="225">RF · SVM · LR · XGB</text><text x="270" y="225">NORMAL / ANOMALY</text></g></svg>`,
    invoice: `<svg viewBox="0 0 400 240" aria-hidden="true"><rect x="140" y="30" width="120" height="170" rx="6" fill="#111820" stroke="rgba(195,203,212,.35)"/><g stroke="rgba(195,203,212,.3)"><path d="M155 60h90M155 80h70M155 100h90M155 120h60"/></g><path d="M155 150h90" stroke="#45d8ef"/><g font-family="IBM Plex Mono" font-size="11" fill="#45d8ef"><text x="155" y="176">GST ✓</text></g></svg>`,
    flow: `<svg viewBox="0 0 400 240" aria-hidden="true"><g font-family="IBM Plex Mono" font-size="10" fill="#8b96a3" stroke-dasharray="4 4">${["EMAIL", "AI SORT", "DRAFT", "HUMAN ✓"].map((s, i) => `<g transform="translate(${16 + i * 96},92)"><rect width="78" height="50" rx="25" fill="none" stroke="#f0a93a" opacity=".6"/><text x="39" y="30" text-anchor="middle" stroke="none">${s}</text></g>`).join("")}</g><text x="200" y="200" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#f0a93a">PLANNED</text></svg>`,
  };
  const stClass = (s) => "st-" + slug(s);
  const filters = ["All", "Professional", "Completed", "Planned"];
  $("#project-filters").innerHTML = filters.map((f, i) => `<button type="button" aria-pressed="${i === 0}" data-filter="${f}">${f}</button>`).join("");
  $("#projects-grid").innerHTML = D.projects.map((p, i) => `
    <article class="module project ${i === 0 ? "featured" : ""}" data-status="${esc(p.status)}" id="project-${p.id}" data-reveal>
      <div class="p-visual">${VIS[p.visual] || ""}</div>
      <div class="p-body">
        <div class="p-top"><div><h3>${esc(p.name)}</h3><p class="p-tag">${esc(p.tagline)}</p></div><span class="status ${stClass(p.status)}">${esc(p.status)}</span></div>
        <p class="p-context">${esc(p.context)}</p>
        <p class="p-problem"><b style="color:var(--cool-white)">Problem:</b> ${esc(p.problem)}</p>
        ${p.tech.length ? `<div class="tags">${p.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
        <div class="p-details" id="pd-${p.id}"><div>
          <h4>My contribution</h4><p class="p-problem">${esc(p.contribution)}</p>
          <h4>Key features</h4><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        </div></div>
        <div class="p-actions">
          <button type="button" class="btn btn-metal btn-sm" data-expand="${p.id}" aria-expanded="false" aria-controls="pd-${p.id}">View project details</button>
          ${p.source ? `<a class="btn btn-ghost btn-sm" href="${esc(p.source)}" ${ext}>View source code ↗</a>` : ""}
          ${p.demo ? `<a class="btn btn-ghost btn-sm" href="${esc(p.demo)}" ${ext}>Live demo ↗</a>` : ""}
          ${!p.source && p.sourceNote ? `<p class="p-note">${esc(p.sourceNote)}</p>` : ""}
        </div>
      </div>
    </article>`).join("");
  $$("[data-expand]").forEach((b) => b.addEventListener("click", () => {
    const card = b.closest(".project"), open = !card.classList.contains("open");
    card.classList.toggle("open", open); b.setAttribute("aria-expanded", String(open));
    b.textContent = open ? "Hide details" : "View project details";
  }));
  $$("#project-filters button").forEach((b) => b.addEventListener("click", () => {
    $$("#project-filters button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    const f = b.dataset.filter;
    $$(".project").forEach((c) => { c.hidden = f !== "All" && c.dataset.status !== f; });
  }));
  // subtle 3D tilt (pointer devices only)
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$(".project").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- GitHub ---------- */
  $("#gh-buttons").innerHTML = D.githubUsers.map((u) => `<a class="btn btn-metal btn-sm" href="https://github.com/${esc(u)}" ${ext}>github.com/${esc(u)} ↗</a>`).join("");
  const repoCard = (r) => `<a class="module repo" href="${esc(r.url)}" ${ext}>
      <h3>${esc(r.name)}</h3><p>${esc(r.desc || "No description yet.")}</p>
      <div class="meta">${r.lang ? `<span class="lang">${esc(r.lang)}</span>` : ""}${r.updated ? `<span>updated ${esc(r.updated)}</span>` : ""}</div></a>`;
  async function loadRepos() {
    const grid = $("#repo-grid");
    const key = "aicore-repos-v2";
    try {
      const cached = JSON.parse(sessionStorage.getItem(key) || "null");
      if (cached && Date.now() - cached.t < 30 * 60 * 1000) return render(cached.repos, true);
    } catch (_) { /* storage unavailable */ }
    try {
      const lists = await Promise.all(D.githubUsers.map((u) =>
        fetch(`https://api.github.com/users/${encodeURIComponent(u)}/repos?per_page=100&sort=pushed`, { headers: { Accept: "application/vnd.github+json" } })
          .then((res) => { if (!res.ok) throw new Error(res.status === 403 ? "rate" : "http " + res.status); return res.json(); })));
      const known = new Map(D.featuredRepos.map((f) => [f.name.toLowerCase(), f]));
      const hidden = new Set((D.hiddenRepos || []).map((n) => n.toLowerCase()));
      const repos = lists.flat().filter((r) => !r.fork && r.size > 0 && !hidden.has(r.name.toLowerCase()))
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 9)
        .map((r) => ({ name: r.name, url: r.html_url, desc: r.description || known.get(r.name.toLowerCase())?.desc, lang: r.language, updated: new Date(r.pushed_at).toLocaleDateString(undefined, { month: "short", year: "numeric" }) }));
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), repos })); } catch (_) {}
      render(repos, true);
    } catch (err) {
      grid.innerHTML = `<p class="state warn" style="grid-column:1/-1">${err.message === "rate" ? "GitHub's rate limit was reached, so here are the featured repositories." : "GitHub couldn't be reached, so here are the featured repositories."}</p>` + D.featuredRepos.map(repoCard).join("");
    }
    function render(repos) {
      grid.innerHTML = repos.length ? repos.map(repoCard).join("") : `<p class="state">No public repositories found.</p>` + D.featuredRepos.map(repoCard).join("");
    }
  }
  const ghSection = $("#github");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => { if (en.some((e) => e.isIntersecting)) { loadRepos(); io.disconnect(); } }, { rootMargin: "400px" });
    io.observe(ghSection);
  } else loadRepos();

  /* ---------- Contact ---------- */
  $("#contact-links").innerHTML = [
    ["Email", D.person.email, "mailto:" + D.person.email, false],
    ["LinkedIn", "refeena-refath", D.links.linkedin, true],
    ["GitHub", "refinah20 · Refinah", D.links.github, true],
    ["CV", "Download PDF", D.person.cv, false],
  ].map(([k, v, h, isExt]) => `<li><a href="${esc(h)}" ${isExt ? ext : ""} ${k === "CV" ? "download" : ""}><span>${esc(k)}</span><small>${esc(v)} ${isExt ? "↗" : "→"}</small></a></li>`).join("");
  const form = $("#contact-form"), status = $("#form-status");
  $("#form-mode").textContent = D.formEndpoint
    ? "Your message is sent securely through a form service."
    : "Sending opens your email app with this message filled in, addressed to " + D.person.email + ".";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status"; status.textContent = "";
    const fields = { name: $("#cf-name"), email: $("#cf-email"), message: $("#cf-message") };
    let bad = null;
    for (const [k, el] of Object.entries(fields)) {
      const v = el.value.trim();
      const ok = k === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) : v.length >= (k === "message" ? 10 : 2);
      el.setAttribute("aria-invalid", String(!ok)); if (!ok && !bad) bad = [k, el];
    }
    if (bad) {
      status.className = "form-status err";
      status.textContent = { name: "Please enter your name.", email: "Please enter a valid email address.", message: "Please write a message of at least 10 characters." }[bad[0]];
      bad[1].focus(); return;
    }
    const name = fields.name.value.trim(), email = fields.email.value.trim(), message = fields.message.value.trim();
    if (D.formEndpoint) {
      const btn = $("#cf-submit"); btn.disabled = true; btn.textContent = "Sending…";
      try {
        const res = await fetch(D.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name, email, message }) });
        if (!res.ok) throw new Error();
        form.reset(); status.className = "form-status ok"; status.textContent = "Message sent. Thank you, I'll reply by email.";
      } catch (_) {
        status.className = "form-status err"; status.innerHTML = `The message couldn't be sent. Please email <a href="mailto:${esc(D.person.email)}">${esc(D.person.email)}</a> directly.`;
      } finally { btn.disabled = false; btn.textContent = "Send message"; }
    } else {
      const subject = encodeURIComponent("Portfolio enquiry from " + name);
      const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = `mailto:${D.person.email}?subject=${subject}&body=${body}`;
      status.className = "form-status ok";
      status.innerHTML = `Your email app should open with the message ready to send. If it doesn't, email <a href="mailto:${esc(D.person.email)}">${esc(D.person.email)}</a>.`;
    }
  });

  /* ---------- Navigation ---------- */
  const navList = $("#nav-list"), toggle = $("#nav-toggle");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open)); navList.classList.toggle("open", open);
  });
  navList.addEventListener("click", (e) => { if (e.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); navList.classList.remove("open"); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { toggle.setAttribute("aria-expanded", "false"); navList.classList.remove("open"); closeBot(); } });
  const links = new Map($$("[data-nav]").map((a) => [a.dataset.nav, a]));
  const setActive = (id) => links.forEach((a, k) => { a.classList.toggle("active", k === id); if (k === id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const so = new IntersectionObserver((entries) => {
      entries.forEach((en) => visible.set(en.target.id, en.intersectionRatio));
      let best = null, bestR = 0; visible.forEach((r, id) => { if (r > bestR) { best = id; bestR = r; } });
      if (best) setActive(best);
    }, { threshold: [0, .15, .3, .5, .7], rootMargin: "-80px 0px -35% 0px" });
    $$("[data-section]").forEach((s) => so.observe(s));
  }
  setActive("home");

  /* ---------- Reveal & back-to-top ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-ready");
    const ro = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$("[data-reveal]").forEach((el) => ro.observe(el));
  }
  const toTop = $("#to-top");
  window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 700), { passive: true });

  /* ---------- Boot sequence (≤ 1.6 s, once per session) ---------- */
  (function boot() {
    let seen = false; try { seen = sessionStorage.getItem("aicore-booted") === "1"; } catch (_) {}
    if (reduceMotion || seen) return;
    const el = $("#boot"), log = $("#boot-log"); el.hidden = false;
    const lines = ["Initialising neural core", "Loading verified profile", "Calibrating interface"];
    let i = 0;
    const step = setInterval(() => { if (i < lines.length) { const li = document.createElement("li"); li.textContent = lines[i]; li.className = "ok"; log.appendChild(li); i++; } }, 380);
    const finish = () => { clearInterval(step); el.classList.add("done"); setTimeout(() => (el.hidden = true), 500); try { sessionStorage.setItem("aicore-booted", "1"); } catch (_) {} };
    $("#boot-skip").addEventListener("click", finish);
    setTimeout(finish, 1600);
  })();

  /* ---------- Robot assistant (local FAQ, no live AI) ---------- */
  const fab = $("#bot-fab"), panel = $("#bot-panel"), logEl = $("#bot-log"), input = $("#bot-input");
  const proj = D.projects.filter((p) => p.status !== "Planned");
  const KB = [
    { q: "Who is Refeena?", k: ["who", "about", "introduce", "candidate", "tell me", "person", "herself", "refeena"],
      a: () => `${P.name} is an ${P.role.toLowerCase()} based in ${P.location}. ${D.about.summary}` },
    { q: "What AI/ML training?", k: ["training", "course", "iit", "patna", "masai", "certificate", "programme", "program", "learn", "study"],
      a: () => `She is completing the <b>Applied Artificial Intelligence and Machine Learning Essentials</b> programme from Vishlesan i-Hub, IIT Patna, in collaboration with Masai School. It's an online certificate programme that started in May 2026, with expected completion on 25 October 2026. It is a training programme, not an IIT degree.` },
    { q: "Work experience?", k: ["experience", "work", "job", "cloudroits", "employ", "freelance", "campus assist", "company"],
      a: () => { const e = D.experience[0]; return `Since ${e.dates.split(" –")[0]} she has worked as <b>${e.role}</b> at ${e.org}, developing ${e.product}. Highlights: RAG with ChromaDB and the Gemini API, REST APIs with JWT, role-based access with institution-level data isolation, and Odoo integration. <a href="#experience">See the mission log</a>.`; } },
    { q: "Technical skills?", k: ["skill", "stack", "tech", "tools", "python", "fastapi", "know", "language"],
      a: () => `Professional use: ${D.skills.filter((s) => s.level === "Professional use").map((s) => s.name).join(", ")}. Project experience: ${D.skills.filter((s) => s.level === "Project experience").map((s) => s.name).join(", ")}. Currently learning: low-code workflow automation (n8n, Power Automate). <a href="#skills">Open diagnostics</a>.` },
    { q: "What projects?", k: ["project", "built", "build", "portfolio", "work sample", "trendpulse", "intrusion"],
      a: () => `Projects: ${proj.map((p) => `<a href="#project-${p.id}">${esc(p.name)}</a> (${esc(p.tagline.toLowerCase())})`).join("; ")}. A workflow-automation project is planned next.` },
    { q: "Automation / low-code?", k: ["low code", "low-code", "no code", "no-code", "automation", "automate", "n8n", "zapier", "power automate", "copilot studio", "workflow"],
      a: () => `Honest answer: she hasn't shipped a low-code automation project yet. n8n and Power Automate are listed as <b>Learning</b>, and an AI email-triage workflow is <a href="#project-automation">planned</a>. Her automation experience so far is in code: at Cloudroits she built the Campus Assist document workflow (upload, chunking, indexing, retrieval) and its integration with Odoo and OdooBot.` },
    { q: "GitHub?", k: ["github", "code", "repo", "source"],
      a: () => `Her GitHub accounts are <a href="${D.links.github}" ${ext}>github.com/refinah20</a> and <a href="${D.links.githubSecondary}" ${ext}>github.com/Refinah</a>. Campus Assist's code is private to Cloudroits.` },
    { q: "Roles she wants?", k: ["role", "looking", "hire", "position", "open to", "relocat", "country", "visa", "uk", "uae", "dubai", "australia"],
      a: () => `She is looking for early-career roles in AI integration, AI implementation and AI application development, for example AI Integration Associate, Junior AI Application Developer or Graduate AI Solutions Consultant. She is open to ${P.openTo}.` },
    { q: "Education?", k: ["education", "degree", "b.tech", "btech", "college", "university", "cgpa", "saveetha"],
      a: () => `B.Tech in Information Technology from Saveetha School of Engineering (SIMATS), Chennai, completed December 2025 with a CGPA of 8.0. She also completed a Java Full Stack Development training course at Besant Technologies (2024).` },
    { q: "How to contact?", k: ["contact", "email", "reach", "hire her", "linkedin", "cv", "resume", "message"],
      a: () => `Email <a href="mailto:${P.email}">${P.email}</a>, connect on <a href="${D.links.linkedin}" ${ext}>LinkedIn</a>, or <a href="${P.cv}" download>download the CV</a>. You can also use the <a href="#contact">contact form</a>.` },
  ];
  const addMsg = (html, who) => { const d = document.createElement("div"); d.className = "msg " + who; d.innerHTML = html; logEl.appendChild(d); logEl.scrollTop = logEl.scrollHeight; };
  const answer = (text) => {
    const t = text.toLowerCase();
    let best = null, score = 0;
    KB.forEach((item) => { const s = item.k.reduce((n, k) => n + (t.includes(k) ? k.length : 0), 0); if (s > score) { score = s; best = item; } });
    return best ? best.a() : `I can only answer from this portfolio. Try asking about her <b>experience</b>, <b>skills</b>, <b>projects</b>, <b>training</b>, <b>GitHub</b> or <b>contact</b> details.`;
  };
  const ask = (text) => { if (!text.trim()) return; addMsg(esc(text), "user"); setTimeout(() => addMsg(answer(text), "bot"), reduceMotion ? 0 : 260); };
  $("#bot-chips").innerHTML = KB.map((k, i) => `<button type="button" data-q="${i}">${esc(k.q)}</button>`).join("");
  $("#bot-chips").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) ask(KB[+b.dataset.q].q); });
  $("#bot-form").addEventListener("submit", (e) => { e.preventDefault(); ask(input.value); input.value = ""; });
  logEl.addEventListener("click", (e) => { if (e.target.closest('a[href^="#"]')) closeBot(); });
  let greeted = false;
  function openBot() {
    panel.hidden = false; fab.setAttribute("aria-expanded", "true"); fab.setAttribute("aria-label", "Close portfolio assistant");
    if (!greeted) { addMsg(`Welcome to the AI CORE interface. I'm a guide built from this portfolio's content, so I can tell you about ${esc(P.shortName)}'s experience, AI/ML training, projects and how to get in touch. Pick a question below or type your own.`, "bot"); greeted = true; }
    input.focus();
  }
  function closeBot() { if (panel.hidden) return; panel.hidden = true; fab.setAttribute("aria-expanded", "false"); fab.setAttribute("aria-label", "Open portfolio assistant"); }
  fab.addEventListener("click", () => (panel.hidden ? openBot() : closeBot()));

  /* ---------- Deep links (e.g. /#projects): content is rendered by JS, so jump after rendering ---------- */
  if (location.hash.length > 1) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant", block: "start" }));
  }

  /* ---------- 3D fallback: if the WebGL module hasn't rendered in 6 s (CDN blocked, old device), show the CSS robot ---------- */
  setTimeout(() => {
    if (!window.__robotReady) { const c = $("#robot-canvas"), f = $("#robot-fallback"); if (c) c.hidden = true; if (f) f.hidden = false; }
  }, 6000);
  $("#bot-close").addEventListener("click", () => { closeBot(); fab.focus(); });
})();
