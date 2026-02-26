// reading.js — progress bar + reading time for blog posts
(function() {
  const content = document.querySelector('.content');
  if (!content) return;

  // Inject styles (for posts with inline CSS that don't load style.css)
  if (!document.querySelector('link[href*="style.css"]')) {
    const s = document.createElement('style');
    s.textContent = '.reading-progress{position:fixed;top:0;left:0;width:0%;height:3px;background:#f0c000;z-index:1000;transition:width 50ms linear}.reading-meta{display:flex;gap:12px;color:#8b949e;font-size:0.82rem;margin-top:4px;margin-bottom:8px}';
    document.head.appendChild(s);
  }

  // Word count + reading time
  const text = content.textContent || '';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  
  const dateEl = document.querySelector('.date');
  if (dateEl) {
    const meta = document.createElement('div');
    meta.className = 'reading-meta';
    meta.innerHTML = `<span>${minutes} min read</span><span>·</span><span>${words.toLocaleString()} words</span>`;
    dateEl.after(meta);
  }

  // Progress bar
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  document.body.prepend(bar);

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        const rect = content.getBoundingClientRect();
        const total = content.scrollHeight - window.innerHeight;
        const scrolled = -rect.top;
        const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
        bar.style.width = pct + '%';
        ticking = false;
      });
      ticking = true;
    }
  });
})();
