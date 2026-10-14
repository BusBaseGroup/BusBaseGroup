import {$, roles, connectLogin, status} from './shared.js';
import {canOpenPage} from './page-access.js';
connectLogin(profile => {
  if (!profile) return;
  if (!canOpenPage(profile.role, 'live')) {
    $('workspace').hidden = true;
    status('Your role cannot access this page. Return to Team home.');
    return;
  }
  $('featureRole').textContent = roles[profile.role] + ' · @' + profile.discordUsername;
  document.querySelectorAll('[data-page-link]').forEach(link => {
    link.hidden = !canOpenPage(profile.role, link.dataset.pageLink);
    link.classList.toggle('active', link.dataset.pageLink === 'live');
    if (link.dataset.pageLink === 'live') link.setAttribute('aria-current', 'page');
  });
});
