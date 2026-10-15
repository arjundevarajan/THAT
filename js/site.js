/* ============================================================
   They Have a Theory — site content
   ------------------------------------------------------------
   EVERYTHING YOU'LL WANT TO EDIT LIVES IN THIS TOP BLOCK.
   No build step: save the file, refresh the page.
   ============================================================ */

/* Where people can listen.
   Leave `url` as null and the card renders greyed out as "Soon".
   Fill the url in and it becomes a real link automatically. */
const PLATFORMS = [
  /* live — first row */
  { name: "YouTube",        url: "https://www.youtube.com/@ThaTheoryPod",   icon: "youtube" },
  { name: "TikTok",         url: "https://www.tiktok.com/@thatheorypod",    icon: "tiktok" },
  { name: "Instagram",      url: "https://www.instagram.com/thatheorypod/", icon: "instagram" },
  /* coming — second row */
  { name: "Spotify",        url: "https://open.spotify.com/show/20YnxhALS0WU5YiJzWqEmj?si=fc5796f71a67499d", icon: "spotify" },
  { name: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/they-have-a-theory/id6823307753",   icon: "apple" },
  { name: "RSS feed",       url: "https://api.riverside.com/hosting/OGfJS47W.rss",                           icon: "rss" },
];

/* Episodes. Add newest last — they're numbered in order.
   Example of a filled-in one:

   {
     title: "Why every tutorial level is a lie",
     url:   "https://open.spotify.com/episode/xxxx",
     date:  "March 3, 2026",
     length: "48 min",
     blurb: "A short line about what you two got into."
   }
*/
const EPISODES = [];

/* Shown in the Episodes section while EPISODES is still empty. */
const EPISODES_EMPTY = "Episode 1 coming shortly!";

/* ============================================================
   Below here is just rendering — you shouldn't need to touch it.
   ============================================================ */

const ICONS = {
  spotify: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.2"/><path d="M7.3 9.4c3-.8 6.2-.5 8.9.9"/>
    <path d="M7.8 12.5c2.5-.6 5.1-.4 7.3.8"/><path d="M8.4 15.4c2-.5 4-.3 5.8.6"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="7.6" r="2.5"/><path d="M12 12.4c1.5 0 2.6 1 2.4 2.4l-.7 4.3c-.15 1-.85 1.6-1.7 1.6s-1.55-.6-1.7-1.6l-.7-4.3c-.2-1.4.9-2.4 2.4-2.4Z"/>
    <path d="M5.6 16.2A8 8 0 1 1 18.4 16.2"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2.5" y="5.2" width="19" height="13.6" rx="4"/><path d="M10.2 9.3v5.4l4.6-2.7z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14 3.2v11.4a4 4 0 1 1-3.4-3.96"/>
    <path d="M14 3.2c.5 2.6 2.2 4.2 5 4.5"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
    <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5"/>
    <circle cx="12" cy="12" r="4"/><circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  wave: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
    <path d="M4 10v4M8 7.5v9M12 5v14M16 8.5v7M20 10.5v3"/></svg>`,
  rss: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
    <path d="M5 18.5h.01"/><path d="M5 12.5a6 6 0 0 1 6 6"/><path d="M5 6.5a12 12 0 0 1 12 12"/></svg>`,
  dot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
    <circle cx="12" cy="12" r="8"/></svg>`,
};

function renderPlatforms() {
  const list = document.getElementById("platform-list");
  if (!list) return;

  list.innerHTML = PLATFORMS.map((p) => {
    const icon = `<span class="platform__icon">${ICONS[p.icon] || ICONS.dot}</span>`;
    const name = `<span class="platform__name">${p.name}</span>`;

    if (!p.url) {
      return `<li><div class="platform platform--pending">
        ${icon}${name}<span class="platform__tag">Soon</span>
      </div></li>`;
    }
    return `<li><a class="platform" href="${p.url}" target="_blank" rel="noopener">
      ${icon}${name}<span class="platform__tag" aria-hidden="true">&rarr;</span>
    </a></li>`;
  }).join("");
}

function renderEpisodes() {
  const list = document.getElementById("episode-list");
  if (!list) return;

  if (!EPISODES.length) {
    list.classList.remove("episodes");
    list.innerHTML = `<li class="empty"><strong>${EPISODES_EMPTY}</strong></li>`;
    return;
  }

  list.innerHTML = EPISODES.map((ep, i) => {
    const n = String(i + 1).padStart(2, "0");
    const title = ep.url
      ? `<a href="${ep.url}" target="_blank" rel="noopener">${ep.title}</a>`
      : ep.title;
    const meta = [ep.date, ep.length].filter(Boolean).join(" · ");

    return `<li class="episode">
      <span class="episode__num">Episode ${n}</span>
      <h3 class="episode__title">${title}</h3>
      ${ep.blurb ? `<p class="episode__blurb">${ep.blurb}</p>` : ""}
      ${meta ? `<span class="episode__meta">${meta}</span>` : ""}
    </li>`;
  }).join("");
}

function stampYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

renderPlatforms();
renderEpisodes();
stampYear();
