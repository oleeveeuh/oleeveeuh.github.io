const projects = window.portfolioProjects || [];
const gallery = document.querySelector("#gallery");
const filters = [...document.querySelectorAll(".filter-button")];
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
const storyRail = document.querySelector("#story-rail");
const contactDialog = document.querySelector("#contact-dialog");
let activeFilter = "all";

const esc = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const roleName = role => ({ai:"AI research & agents",data:"Data science",ml:"Machine learning"}[role] || role);
const roleTags = project => (project.roleLabels || project.roles.map(role => roleName(role).toUpperCase())).join(" · ");
const techMark = tech => {
  const name = tech.toLowerCase();
  if (name.includes("python")) return "Py";
  if (name.includes("pandas")) return "pd";
  if (name.includes("numpy")) return "np";
  if (name.includes("scipy")) return "Σ";
  if (name.includes("statsmodels")) return "sm";
  if (name.includes("sql")) return "▤";
  if (name.includes("jupyter")) return "◉";
  if (name.includes("scikit-image")) return "ski";
  if (name.includes("scikit")) return "✳";
  if (name.includes("resnet")) return "rn";
  if (name.includes("lightgbm")) return "lgb";
  if (name.includes("chronos")) return "c2";
  if (name.includes("nhits")) return "nh";
  if (name.includes("neuralforecast")) return "nf";
  if (name.includes("mlflow")) return "mlf";
  if (name.includes("databricks")) return "dbx";
  if (name.includes("delta")) return "Δ";
  if (name.includes("pytorch")) return "pt";
  if (name.includes("tensorflow")) return "tf";
  if (name.includes("xgboost")) return "xgb";
  if (name.startsWith("r (")) return "R";
  if (name.includes("github actions")) return "ci";
  if (name.includes("silver")) return "Ag";
  if (name.includes("dpo")) return "⇅";
  if (name.includes("lora")) return "Λ";
  if (name.includes("qwen")) return "qw";
  if (name.includes("transformers")) return "hf";
  if (name.includes("fastapi")) return "fa";
  if (name.includes("streamlit")) return "st";
  if (name.includes("duckdb")) return "db";
  if (name.includes("pytest")) return "✓";
  if (name.includes("llm") || name.includes("agent")) return "◎";
  if (name.includes("matplotlib")) return "∿";
  return "⌘";
};
const techChip = tech => `<span class="tech-chip"><span aria-hidden="true">${esc(techMark(tech))}</span>${esc(tech)}</span>`;

function artSVG(type, detailed = false) {
  const view = detailed ? 'viewBox="0 0 640 300"' : 'viewBox="0 0 320 180"';
  const common = `xmlns="http://www.w3.org/2000/svg" ${view} preserveAspectRatio="xMidYMid meet"`;
  if (type === "agent") return `<svg ${common}><rect width="100%" height="100%" fill="#e4e4d7"/><path d="M60 150H260M150 58v40m0 45v18M60 90h180" stroke="#a43b36" stroke-width="2" stroke-dasharray="4 5" fill="none"/><g fill="#f5f1e8" stroke="#89927a" stroke-width="2"><rect x="24" y="62" width="72" height="56" rx="2"/><rect x="124" y="28" width="72" height="56" rx="2"/><rect x="224" y="62" width="72" height="56" rx="2"/></g><g fill="#55564d" font-family="sans-serif" font-size="10" text-anchor="middle"><text x="60" y="93">Plan</text><text x="160" y="59">Agent</text><text x="260" y="93">Tool</text></g><circle cx="160" cy="150" r="13" fill="#a43b36" opacity=".75"/></svg>`;
  if (type === "trend") return `<svg ${common}><rect width="100%" height="100%" fill="#e4e4d7"/><path d="M34 145H292M46 35V145" stroke="#9c988a" stroke-width="1"/><path d="M48 125 C78 114 82 80 112 92 S153 116 177 75 S220 64 240 51 270 61 290 34" fill="none" stroke="#a43b36" stroke-width="3"/><path d="M48 125 C78 114 82 80 112 92 S153 116 177 75 S220 64 240 51 270 61 290 34 V145H48Z" fill="#a43b36" opacity=".08"/><g fill="#89927a"><circle cx="112" cy="92" r="4"/><circle cx="177" cy="75" r="4"/><circle cx="240" cy="51" r="4"/></g><text x="50" y="164" font-family="monospace" font-size="8" fill="#77776c">TIME →</text></svg>`;
  if (type === "distribution") return `<svg ${common}><rect width="100%" height="100%" fill="#e4e4d7"/><path d="M35 145H292M42 30V145" stroke="#9c988a"/><path d="M45 144 C70 143 73 130 83 108 C98 75 108 52 130 51 C151 50 166 107 181 127 C194 143 219 144 290 145" fill="#89927a" opacity=".65" stroke="#657052" stroke-width="2"/><path d="M58 144 C110 143 128 130 143 101 C158 72 176 67 190 87 C208 113 209 142 280 145" fill="#a43b36" opacity=".3" stroke="#a43b36" stroke-width="2"/><text x="45" y="164" font-family="monospace" font-size="8" fill="#77776c">OBSERVATIONS →</text></svg>`;
  return `<svg ${common}><rect width="100%" height="100%" fill="#e4e4d7"/><path d="M36 145H292M42 30V145" stroke="#9c988a"/><g fill="#89927a"><rect x="66" y="90" width="30" height="55"/><rect x="126" y="61" width="30" height="84"/><rect x="186" y="44" width="30" height="101"/></g><g fill="#a43b36"><rect x="101" y="105" width="16" height="40" opacity=".7"/><rect x="161" y="81" width="16" height="64" opacity=".7"/><rect x="221" y="69" width="16" height="76" opacity=".7"/></g><path d="M53 51h12" stroke="#89927a" stroke-width="4"/><path d="M53 61h12" stroke="#a43b36" stroke-width="4"/><text x="69" y="55" font-family="monospace" font-size="8" fill="#77776c">BASELINE</text><text x="69" y="65" font-family="monospace" font-size="8" fill="#77776c">MODEL</text></svg>`;
}

function renderGallery() {
  const visible = projects.filter(p => activeFilter === "all" || p.roles.includes(activeFilter));
  gallery.innerHTML = visible.length ? visible.map((p, i) => `<button class="project-card" type="button" data-project="${esc(p.id)}" aria-label="Open ${esc(p.title)} project details">
    <span class="string-line" aria-hidden="true"></span><span class="clip" aria-hidden="true"></span>
    <span class="print"><span class="project-art">${p.previewImage ? `<img class="project-preview" src="${esc(p.previewImage)}" alt="${esc(p.previewAlt || "")}" loading="lazy">` : artSVG(p.visuals?.[0]?.type || "bars")}${p.previewImage ? "" : `<span class="art-label">${esc(p.year || "FIELD NOTE")}</span>`}</span>
    <span class="print-caption"><span class="card-meta"><span class="role-tag">${esc(roleTags(p))}</span><span class="open-mark" aria-hidden="true">↗</span></span>
    <span class="print-title"><h3>${esc(p.title)}</h3></span><span class="print-desc"><p>${esc(p.subtitle)}</p></span></span></button>`).join("") : `<p class="empty-gallery">No projects in this section yet. Add a project in <code>projects.js</code>.</p>`;
  document.querySelector(".results-status").textContent = `${visible.length} ${visible.length === 1 ? "project" : "projects"} shown`;
  filters.forEach(button => {
    const key = button.dataset.filter;
    const count = key === "all" ? projects.length : projects.filter(p => p.roles.includes(key)).length;
    button.querySelector(".filter-count").textContent = count;
    button.setAttribute("aria-pressed", String(key === activeFilter));
    button.classList.toggle("is-active", key === activeFilter);
  });
}

function openProject(project) {
  const n = String(projects.indexOf(project) + 1).padStart(2, "0");
  document.querySelector("#dialog-number").textContent = `${n} / ${String(projects.length).padStart(2, "0")}`;
  const visuals = project.visuals?.length ? `<div class="visual-grid">${project.visuals.map(v => `<figure><div class="visual-frame">${artSVG(v.type, true)}</div><figcaption class="visual-caption">${esc(v.caption || "Project visual")}</figcaption></figure>`).join("")}</div>` : `<div class="note-placeholder">Add charts, diagrams, screenshots, or links to artifacts here.</div>`;
  // A `story` project reads in blog flow: chapter headers, paragraphs, and
  // figures placed where they belong, instead of text-then-visuals blocks.
  const storyBlocks = project.story?.length ? `<section class="dialog-block"><h3>field notes — the full story</h3><div class="story-flow">${project.story.map(block => {
    if (block.k) return `<p class="story-kicker">${esc(block.k)}</p><h4 class="story-title">${esc(block.t || "")}</h4>`;
    if (block.img) return `<figure class="story-figure"><img src="${esc(block.img)}" alt="${esc(block.alt || "")}" loading="lazy"><figcaption>${esc(block.caption || "")}</figcaption></figure>`;
    if (block.embed) return `<figure class="story-figure"><div class="story-embed"><iframe src="https://public.tableau.com/views/${esc(block.embed)}?:embed=y&amp;:showVizHome=no&amp;:tabs=yes&amp;:toolbar=yes" title="${esc(block.alt || "Tableau view")}" loading="lazy" style="width:100%;height:420px;border:0"></iframe></div><figcaption>${esc(block.caption || "")}</figcaption></figure>`;
    return `<p>${esc(block.p || "")}</p>`;
  }).join("")}</div></section>` : `
  <section class="dialog-block"><h3>The question &amp; approach</h3><p>${esc(project.narration || project.subtitle)}</p></section>
  <section class="dialog-block"><h3>Visual notes</h3>${visuals}</section>`;
  const techMarkup = project.technologyGroups?.length
    ? project.technologyGroups.map(group => group.v1
      ? `<div class="tech-group v1"><p class="tech-group-label"><span class="v1-sticker" aria-label="version 1, retired">v1</span>${esc(group.label)}</p><div class="tech-list">${(group.skills || []).map(techChip).join("")}</div></div>`
      : `<div class="tech-group"><p class="tech-group-label">${esc(group.label)}</p><div class="tech-list">${(group.skills || []).map(techChip).join("")}</div></div>`).join("")
    : `<div class="tech-list">${(project.technologies || []).map(techChip).join("")}</div>`;
  const rolesMarkup = project.technologyGroups?.length ? "" : `<div class="dialog-roles">${project.roleLabels.map(label => `<span>${esc(label)}</span>`).join(" · ")}</div>`;
  const linksMarkup = project.links?.length ? `<div class="dialog-links">${project.links.map(link => `<a href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">${esc(link.label)} <span aria-hidden="true">↗</span></a>`).join("")}</div>` : "";
  dialogContent.innerHTML = `<section class="dialog-summary"><p class="eyebrow">${esc(project.year || "PROJECT NOTES")}</p><h2 id="dialog-title">${esc(project.title)}</h2><p class="summary-copy">${esc(project.summary || project.subtitle)}</p>${linksMarkup}${techMarkup}${rolesMarkup}</section>
  ${storyBlocks}
  <section class="dialog-block"><h3>Takeaway</h3><p>${esc(project.result || "Add what you learned, what changed, and what you would explore next.")}</p></section>
  <button class="dialog-close-bottom close-dialog" type="button">Close this note ↑</button>`;
  dialog.showModal();
  dialogContent.dataset.lastProject = project.id;
  dialog.scrollTop = 0;
  dialogContent.scrollTop = 0;
  updateStoryRailPosition();
  updateStoryRailProgress();
}

function updateStoryRailPosition() {
  if (!dialog.open) return;
  const bounds = dialog.getBoundingClientRect();
  storyRail.style.left = `${bounds.right - 43}px`;
  storyRail.style.top = `${bounds.top + 76}px`;
  storyRail.style.height = `${Math.max(120, bounds.height - 101)}px`;
}

function updateStoryRailProgress() {
  const maxScroll = dialog.scrollHeight - dialog.clientHeight;
  const progress = maxScroll > 0 ? dialog.scrollTop / maxScroll : 0;
  const inset = 10;
  storyRail.querySelector(".rail-bird").style.top = `${inset + progress * Math.max(0, storyRail.clientHeight - inset * 2)}px`;
  storyRail.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
  storyRail.setAttribute("aria-valuetext", `${Math.round(progress * 100)}% through project`);
}

function moveStoryTo(clientY) {
  const bounds = storyRail.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, (clientY - bounds.top - 10) / Math.max(1, bounds.height - 20)));
  dialog.scrollTop = progress * (dialog.scrollHeight - dialog.clientHeight);
  updateStoryRailProgress();
}

filters.forEach(button => button.addEventListener("click", () => { activeFilter = button.dataset.filter; renderGallery(); }));
gallery.addEventListener("click", event => { const card = event.target.closest("[data-project]"); if (card) { const project = projects.find(p => p.id === card.dataset.project); if (project) openProject(project); } });
dialog.addEventListener("click", event => { if (event.target === dialog || event.target.closest(".close-dialog")) dialog.close(); });
dialog.addEventListener("close", () => { const active = document.querySelector(`[data-project="${CSS.escape(dialogContent.dataset.lastProject || "")}"]`); if (active) active.focus(); });
dialog.addEventListener("keydown", event => { if (event.key === "Escape") dialog.close(); });
dialog.addEventListener("scroll", updateStoryRailProgress, {passive:true});
storyRail.addEventListener("pointerdown", event => { storyRail.setPointerCapture(event.pointerId); moveStoryTo(event.clientY); });
storyRail.addEventListener("pointermove", event => { if (storyRail.hasPointerCapture(event.pointerId)) moveStoryTo(event.clientY); });
storyRail.addEventListener("keydown", event => {
  const current = Number(storyRail.getAttribute("aria-valuenow"));
  let next = current;
  if (event.key === "ArrowDown" || event.key === "ArrowRight") next += 5;
  else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next -= 5;
  else if (event.key === "PageDown") next += 15;
  else if (event.key === "PageUp") next -= 15;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = 100;
  else return;
  event.preventDefault();
  dialog.scrollTop = Math.max(0, Math.min(100, next)) / 100 * (dialog.scrollHeight - dialog.clientHeight);
  updateStoryRailProgress();
});
window.addEventListener("resize", () => { updateStoryRailPosition(); updateStoryRailProgress(); });
const contactTriggers = document.querySelectorAll(".contact-trigger");
contactTriggers.forEach(trigger => trigger.addEventListener("click", () => contactDialog.showModal()));
contactDialog.addEventListener("click", event => { if (event.target === contactDialog || event.target.closest(".close-contact")) contactDialog.close(); });
const resumeDialog = document.querySelector("#resume-dialog");
document.querySelectorAll(".resume-trigger").forEach(trigger => trigger.addEventListener("click", () => resumeDialog.showModal()));
resumeDialog.addEventListener("click", event => { if (event.target === resumeDialog || event.target.closest(".close-resume")) resumeDialog.close(); });
renderGallery();
