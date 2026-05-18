const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'agents', label: 'Agents' },
  { id: 'products', label: 'Products' },
  { id: 'experiments', label: 'Experiments' },
];

const state = {
  filter: 'all',
  query: '',
};

const fallback = {
  profile: {
    name: 'Ori Delevski',
    role: 'CTO / VP R&D & Technology Leader',
    headline: 'I build product-minded systems, AI agents, and automation that turn ideas into working software.',
    summary: 'This showcase highlights my public GitHub work: shipping apps, experiments, and agentic tooling with a focus on speed, leverage, and maintainability.',
    githubUrl: 'https://github.com/delevski',
    publicRepoCount: 28,
    featuredCount: 12,
    pillars: ['AI agents', 'automation', 'full-stack apps', 'practical experimentation'],
    highlights: ['Shipping-first engineering', 'Agent workflows and tooling', 'Fast prototypes with real user value'],
  },
  featured: [],
  all: [],
};

const categoryLabels = {
  agents: 'AI agents',
  products: 'Product work',
  experiments: 'Experiments',
};

const app = document.querySelector('#app');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function loadData() {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch('./data/profile.json'),
      fetch('./data/repos.json'),
    ]);

    if (!profileRes.ok || !reposRes.ok) throw new Error('Unable to load data snapshot');

    const [profile, repos] = await Promise.all([profileRes.json(), reposRes.json()]);
    return { profile, ...repos };
  } catch (error) {
    console.warn('Using fallback showcase data', error);
    return fallback;
  }
}

function repoMatches(repo) {
  const matchesFilter = state.filter === 'all' || repo.category === state.filter;
  const query = state.query.trim().toLowerCase();
  const matchesQuery = !query || [repo.name, repo.description, repo.language, repo.category]
    .join(' ')
    .toLowerCase()
    .includes(query);
  return matchesFilter && matchesQuery;
}

function repoCard(repo) {
  const initials = repo.name.slice(0, 2).toUpperCase();
  return `
    <article class="repo-card" data-testid="repo-card" data-category="${escapeHtml(repo.category)}">
      <div class="avatar-row" style="gap:0.8rem; align-items:flex-start;">
        <div class="brand-mark" style="width: 2.6rem; height: 2.6rem; border-radius: 14px; font-size:0.95rem;">${escapeHtml(initials)}</div>
        <div>
          <h3>${escapeHtml(repo.name)}</h3>
          <div class="repo-tags">
            <span class="tag">${escapeHtml(categoryLabels[repo.category] || repo.category)}</span>
            <span class="tag">${escapeHtml(repo.language)}</span>
          </div>
        </div>
      </div>
      <p>${escapeHtml(repo.description)}</p>
      <a class="repo-link" href="${escapeHtml(repo.url)}" target="_blank" rel="noreferrer">Open on GitHub</a>
      <div class="repo-meta">
        <span>${escapeHtml(repo.category)}</span>
        ${typeof repo.stars === 'number' ? `<span>★ ${repo.stars}</span>` : ''}
      </div>
    </article>
  `;
}

function cloudChip(repo) {
  return `<a class="cloud-chip" href="${escapeHtml(repo.url)}" target="_blank" rel="noreferrer">${escapeHtml(repo.name)}</a>`;
}

function render(profile, featured, all) {
  const filtered = featured.filter(repoMatches);

  app.innerHTML = `
    <main class="page">
      <nav class="nav reveal" aria-label="Primary">
        <a class="brand" href="#top">
          <div class="brand-mark">OD</div>
          <div class="brand-copy">
            <strong>${escapeHtml(profile.name)}</strong>
            <span>${escapeHtml(profile.role)}</span>
          </div>
        </a>
        <div class="nav-links">
          <a href="#repos">Repos</a>
          <a href="#about">About</a>
          <a href="#all-repos">All repos</a>
          <a href="${escapeHtml(profile.githubUrl)}" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </nav>

      <section class="hero" id="top">
        <div class="panel hero-copy reveal">
          <div class="eyebrow">Public GitHub showcase</div>
          <h1>${escapeHtml(profile.name)}</h1>
          <p><strong style="color:#f8fbff">${escapeHtml(profile.headline)}</strong> ${escapeHtml(profile.summary)}</p>
          <div class="hero-actions">
            <a class="button primary" href="#repos">Explore selected repos</a>
            <a class="button secondary" href="${escapeHtml(profile.githubUrl)}" target="_blank" rel="noreferrer">View GitHub profile</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>${profile.publicRepoCount}</strong><span>public repos</span></div>
            <div class="stat"><strong>${profile.featuredCount}</strong><span>featured cards</span></div>
            <div class="stat"><strong>3</strong><span>focus areas</span></div>
          </div>
        </div>

        <aside class="panel hero-side reveal" id="about">
          <div class="profile-card">
            <div class="avatar-row">
              <img class="avatar" src="https://avatars.githubusercontent.com/u/26486232?v=4" alt="Ori Delevski avatar" />
              <div class="title-block">
                <strong>${escapeHtml(profile.role)}</strong>
                <span>Building with leverage and clarity</span>
              </div>
            </div>
            <div style="height: 1rem"></div>
            <div class="stack-tags">
              ${profile.pillars.map((pill) => `<span class="tag">${escapeHtml(pill)}</span>`).join('')}
            </div>
          </div>
          <div class="list-card">
            <div class="mini-copy">How I like to work</div>
            <ul>
              ${profile.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>
        </aside>
      </section>

      <section class="panel section reveal" id="repos">
        <div class="section-header">
          <div>
            <h2>Selected public repos</h2>
            <p>Filter the cards below by category or search by name.</p>
          </div>
          <div class="count" data-count>${filtered.length} / ${featured.length} visible</div>
        </div>
        <div class="repo-toolbar">
          <input class="search" type="search" placeholder="Search repos, descriptions, or languages" aria-label="Search repositories" value="${escapeHtml(state.query)}" />
          <div class="filters" role="tablist" aria-label="Repository filters">
            ${FILTERS.map((filter) => `<button class="filter" type="button" data-filter="${filter.id}" aria-pressed="${state.filter === filter.id ? 'true' : 'false'}">${filter.label}</button>`).join('')}
          </div>
        </div>
        <div class="repo-grid" data-repo-grid>
          ${filtered.map(repoCard).join('')}
        </div>
      </section>

      <section class="panel section section-cloud reveal" id="all-repos">
        <div class="section-header">
          <div>
            <h2>All public repos</h2>
            <p>A compact view of the 28 public repositories visible on your GitHub profile.</p>
          </div>
          <div class="count">${all.length} repos total</div>
        </div>
        <div class="repo-cloud">
          ${all.map(cloudChip).join('')}
        </div>
      </section>

      <footer class="footer reveal">
        <div>Built as a clean, animated, single-page showcase for ${escapeHtml(profile.name)}.</div>
        <div>
          <a href="${escapeHtml(profile.githubUrl)}" target="_blank" rel="noreferrer">GitHub</a>
          <span> · </span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </main>
  `;

  const search = app.querySelector('.search');
  const filterButtons = app.querySelectorAll('[data-filter]');
  const count = app.querySelector('[data-count]');
  const grid = app.querySelector('[data-repo-grid]');

  function update() {
    const next = featured.filter(repoMatches);
    count.textContent = `${next.length} / ${featured.length} visible`;
    grid.innerHTML = next.map(repoCard).join('') || '<div class="list-card">No repos match this filter.</div>';
    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', button.dataset.filter === state.filter ? 'true' : 'false');
    });
  }

  search.addEventListener('input', (event) => {
    state.query = event.target.value;
    update();
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      update();
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  app.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

const data = await loadData();
render(data.profile, data.featured, data.all);
