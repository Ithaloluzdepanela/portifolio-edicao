/* ================================================
   SANTANA EDITOR — script.js
   Cursor · Navbar · Scroll Reveal · Filtro · Carrossel
================================================ */

/* ── CURSOR CUSTOMIZADO (Alvo + Raios Solares) ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Verificação: só roda em dispositivos com hover real
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasHover) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let posX   = mouseX;
  let posY   = mouseY;

  // Captura posição do mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Suaviza o movimento com lerp
  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateCursor() {
    posX = lerp(posX, mouseX, 0.18);
    posY = lerp(posY, mouseY, 0.18);
    cursor.style.left = posX + 'px';
    cursor.style.top  = posY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // === MODO SOL: ativa raios ao passar em elementos clicáveis ===
  const clickables = document.querySelectorAll(
    'a, button, .filter-btn, .p-card, .metric-card, .s-card, .c-btn, .carousel-btn'
  );

  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('sun'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('sun'));
  });

  // Remove sol se o mouse sair da janela
  document.addEventListener('mouseleave', () => cursor.classList.remove('sun'));

  // === DEADZONE: desativa cursor ao passar sobre iframes (players/embeds) ===
  const embeds = document.querySelectorAll('iframe, .reel-wrap, .video-wrap');
  if (embeds.length > 0) {
    embeds.forEach(embed => {
      embed.addEventListener('mouseenter', () => {
        cursor.classList.add('deadzone');
      });
      embed.addEventListener('mouseleave', () => {
        cursor.classList.remove('deadzone');
      });
    });
  }
})();


/* ── NAVBAR: fundo ao rolar ─────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* ── MENU MOBILE ────────────────────────────── */
(function initMobileMenu() {
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    // Bloqueia scroll do body quando menu aberto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fecha ao clicar em qualquer link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();


/* ── REVEAL ON SCROLL (IntersectionObserver) ── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger suave: delay crescente por elemento visível
        const delay = Math.min(i * 80, 300);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


/* ── FILTRO DO PORTFÓLIO ────────────────────── */
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.p-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza botão ativo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        // Animação de fade ao esconder/mostrar
        if (match) {
          card.style.opacity = '0';
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            setTimeout(() => { card.style.opacity = '1'; }, 20);
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Transição de opacidade nos cards
  cards.forEach(card => {
    card.style.transition = 'opacity 0.35s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
  });
})();


/* ── CARROSSEL DE PRINTS ────────────────────── */
(function initCarousel() {
  const track   = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!track || !prevBtn || !nextBtn) return;

  // Largura de um slide + gap
  function getScrollAmount() {
    const slide = track.querySelector('.c-slide');
    if (!slide) return 300;
    const style = getComputedStyle(track);
    const gap   = parseFloat(style.gap) || 20;
    return slide.offsetWidth + gap;
  }

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  // Swipe no mobile
  let startX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      track.scrollBy({ left: diff > 0 ? getScrollAmount() : -getScrollAmount(), behavior: 'smooth' });
    }
  }, { passive: true });
})();


/* ── ACTIVE LINK na navegação ───────────────── */
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--yellow)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();
