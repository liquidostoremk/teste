// Utilidades simples para UX da landing
(function () {
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Header sombra e botão voltar ao topo
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    header?.classList.toggle('scrolled', y > 8);
    toTop?.classList.toggle('show', y > 280);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll suave para âncoras
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (!id || id === '#' || id === '#!') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });

  // Newsletter fake submit
  const form = document.getElementById('news-form');
  const email = document.getElementById('news-email');
  const msg = form?.querySelector('.form-msg');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = (email?.value || '').trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      if (msg) {
        msg.textContent = 'Por favor, insira um e-mail válido.';
        msg.style.color = '#ef4444';
      }
      email?.focus();
      return;
    }
    if (msg) {
      msg.textContent = 'Inscrição confirmada! Confira seu e-mail para validar.';
      msg.style.color = 'inherit';
    }
    form.reset();
  });
})();

