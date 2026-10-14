/* Shared theme: run before styles to avoid a light flash. */
(() => {
  const key = 'goahead-theme';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem(key); } catch (_) {}
  const valid = value => value === 'light' || value === 'dark';
  if (!valid(choice)) choice = null;
  let button;
  function apply(theme) {
    root.dataset.theme = theme;
    if (button) {
      const dark = theme === 'dark';
      button.textContent = dark ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = button.getAttribute('aria-label');
    }
  }
  apply(choice || (system.matches ? 'dark' : 'light'));
  system.addEventListener('change', event => { if (!choice) apply(event.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    choice = valid(event.newValue) ? event.newValue : null;
    apply(choice || (system.matches ? 'dark' : 'light'));
  });
  document.addEventListener('DOMContentLoaded', () => {
    button = document.createElement('button');
    button.type = 'button';
    button.id = 'themeToggle';
    button.className = 'theme-toggle';
    button.addEventListener('click', () => {
      choice = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, choice); } catch (_) {}
      apply(choice);
    });
    document.querySelector('.top-actions').prepend(button);
    apply(root.dataset.theme);
  });
})();
