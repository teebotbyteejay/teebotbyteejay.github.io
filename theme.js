// Theme toggle — persists choice in localStorage
(function() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'dark'); // default dark
  if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
  
  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    
    function update() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      btn.textContent = isLight ? '🌙' : '☀️';
    }
    update();
    
    btn.addEventListener('click', function() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      update();
    });
  });
})();
