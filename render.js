// Shared rendering helpers. Reads from the global POSTS array (posts.js)
// and CATEGORIES array (categories.js).

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const AUTHOR_NAME = "Deepak Chigal";

/* ---------- cards ---------- */

function featuredCardHTML(post) {
  return `
    <article class="card-featured">
      <div class="card-featured-media" style="background: linear-gradient(135deg, var(--accent), var(--accent-teal));">
        <span>${escapeHTML(post.category)}</span>
      </div>
      <div class="card-featured-body">
        <div class="card-meta">${formatDate(post.date)}<span class="dot">·</span>${AUTHOR_NAME}</div>
        <h3><a href="post.html?slug=${encodeURIComponent(post.slug)}">${escapeHTML(post.title)}</a></h3>
        <p class="card-subtitle">${escapeHTML(post.subtitle || post.excerpt)}</p>
      </div>
    </article>
  `;
}

function postCardHTML(post) {
  return `
    <article class="card">
      <span class="card-tag">${escapeHTML(post.category)}</span>
      <h3><a href="post.html?slug=${encodeURIComponent(post.slug)}">${escapeHTML(post.title)}</a></h3>
      <p class="card-subtitle">${escapeHTML(post.subtitle || post.excerpt)}</p>
      <div class="card-meta">${formatDate(post.date)}<span class="dot">·</span>${AUTHOR_NAME}</div>
    </article>
  `;
}

/* ---------- homepage ---------- */

function renderHome() {
  const featured = POSTS.filter((p) => p.featured).slice(0, 2);
  const featuredEl = document.getElementById("featured-posts");
  if (featuredEl) {
    featuredEl.innerHTML = featured.length
      ? featured.map(featuredCardHTML).join("")
      : "";
    if (!featured.length) {
      document.getElementById("featured-section").style.display = "none";
    }
  }

  const rest = POSTS.filter((p) => !featured.includes(p));
  renderTabs("home-tabs", rest, "home-grid");
}

/* ---------- archive page ---------- */

function renderArchive() {
  renderTabs("archive-tabs", POSTS, "archive-grid");
}

/* ---------- shared tab + grid logic ---------- */

function renderTabs(tabsContainerId, posts, gridContainerId) {
  const tabsEl = document.getElementById(tabsContainerId);
  const gridEl = document.getElementById(gridContainerId);
  if (!tabsEl || !gridEl) return;

  const present = CATEGORIES.filter((c) => posts.some((p) => p.category === c));

  function draw(activeCategory) {
    tabsEl.innerHTML =
      `<button class="tab ${activeCategory === "All" ? "active" : ""}" data-cat="All">All</button>` +
      present.map((c) => `<button class="tab ${activeCategory === c ? "active" : ""}" data-cat="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");

    const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
    gridEl.innerHTML = filtered.length
      ? filtered.map(postCardHTML).join("")
      : `<div class="empty-state">No entries in this category yet.</div>`;

    tabsEl.querySelectorAll(".tab").forEach((btn) => {
      btn.addEventListener("click", () => draw(btn.dataset.cat));
    });
  }

  draw("All");
}

/* ---------- single post ---------- */

function renderPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const idx = POSTS.findIndex((p) => p.slug === slug);
  const container = document.getElementById("post-container");

  if (idx === -1) {
    container.innerHTML = `
      <div class="post-header wrap-narrow">
        <h1>Entry not found</h1>
        <p><a href="index.html" style="color: var(--accent-teal);">&larr; Back to the homepage</a></p>
      </div>
    `;
    return;
  }

  const post = POSTS[idx];
  const prev = POSTS[idx + 1]; // older
  const next = POSTS[idx - 1]; // newer
  document.title = post.title + " — " + AUTHOR_NAME;

  container.innerHTML = `
    <div class="post-header wrap-narrow">
      <div class="post-meta-row">
        <a href="archive.html">${escapeHTML(post.category)}</a>
        <span class="dot">·</span>
        <span>${formatDate(post.date)}</span>
        <span class="dot">·</span>
        <span>${AUTHOR_NAME}</span>
      </div>
      <h1>${escapeHTML(post.title)}</h1>
      ${post.subtitle ? `<p class="subtitle">${escapeHTML(post.subtitle)}</p>` : ""}
    </div>
    <div class="post-body wrap-narrow">${post.contentHTML}</div>
    <div class="post-nav wrap-narrow">
      <div>${prev ? `<a href="post.html?slug=${encodeURIComponent(prev.slug)}">&larr; ${escapeHTML(prev.title)}</a>` : ""}</div>
      <div>${next ? `<a href="post.html?slug=${encodeURIComponent(next.slug)}">${escapeHTML(next.title)} &rarr;</a>` : ""}</div>
    </div>
  `;
}
