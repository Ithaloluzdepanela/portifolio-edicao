/* ================================================
   SANTANA EDITOR — script.js
   Cursor · Navbar · Scroll Reveal · Filtro · Carrossel · i18n
================================================ */

/* ── i18n: Detecção automática + toggle PT/EN ── */
const I18N = {
  pt: {
    'meta.title': 'Santana Editor — Edição com Foco',
    'meta.description': 'Santana Editor — Edição com Foco. Editor de vídeo especializado em YouTube e Reels com estilo dinâmico e acelerado.',
    'nav.about': 'Sobre',
    'nav.portfolio': 'Portfólio',
    'nav.results': 'Resultados',
    'nav.contact': 'Contato',
    'nav.openMenu': 'Abrir menu',
    'hero.badge': '✦ Editor de Vídeo Profissional',
    'hero.title1': 'EDIÇÃO',
    'hero.title2': 'COM FOCO',
    'hero.sub': 'YouTube · Reels · Shorts · Conteúdo que para o scroll',
    'hero.btnPortfolio': 'Ver Portfólio',
    'hero.btnContact': 'Falar Comigo',
    'hero.videoLabel': '▶ Trabalho em destaque — vídeo mais visto do canal em 3 dias',
    'about.tag': 'Quem sou eu',
    'about.title': 'CRIANDO<br><span class="text-yellow">IMPACTO</span><br>VISUAL',
    'about.p1': 'Meu nome é Santana, edito vídeos a 5 anos, e procuro sempre te trazer foco total no que realmente importa: <strong>Retenção e conversão — atenção é moeda.</strong>',
    'about.p2': 'Cada corte, cada transição, cada efeito é pensado com foco em <strong>retenção e resultado</strong>.',
    'about.m1': 'Vídeos Editados',
    'about.m2': 'Visualizações Geradas',
    'about.m3': 'Anos de Experiência',
    'about.m4': 'Foco no Resultado',
    'portfolio.tag': 'Trabalhos',
    'portfolio.title': 'PORTFÓLIO',
    'portfolio.filterAll': 'Todos',
    'portfolio.tagYt1': 'Vídeo mais visto em 3 dias',
    'portfolio.tagYt2': '3° Vídeo mais visto do canal',
    'portfolio.tagYt3': 'Vídeo recente',
    'portfolio.reelTag': 'Instagram Reel',
    'testimonials.tag': 'Resultados',
    'testimonials.title': 'O QUE<br><span class="text-yellow">DIZEM</span>',
    'testimonials.carouselTitle': 'Prints de resultados <span class="text-yellow">↓</span>',
    'testimonials.prev': 'Anterior',
    'testimonials.next': 'Próximo',
    'contact.tag': 'Vamos trabalhar juntos',
    'contact.title': 'VAMOS CRIAR<br>ALGO INCRÍVEL?',
    'contact.sub': 'Edição com foco — do roteiro ao corte final.',
    'footer.slogan': 'Edição com Foco',
    'footer.copy': '© 2025 Santana Editor. Todos os direitos reservados.'
  },
  en: {
    'meta.title': 'Santana Editor — Editing with Focus',
    'meta.description': 'Santana Editor — Editing with Focus. Video editor specialized in YouTube and Reels with a dynamic, fast-paced style.',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.results': 'Results',
    'nav.contact': 'Contact',
    'nav.openMenu': 'Open menu',
    'hero.badge': '✦ Professional Video Editor',
    'hero.title1': 'EDITING',
    'hero.title2': 'WITH FOCUS',
    'hero.sub': 'YouTube · Reels · Shorts · Content that stops the scroll',
    'hero.btnPortfolio': 'See Portfolio',
    'hero.btnContact': 'Talk to Me',
    'hero.videoLabel': '▶ Featured work — most-viewed channel video in 3 days',
    'about.tag': 'Who I am',
    'about.title': 'CREATING<br><span class="text-yellow">VISUAL</span><br>IMPACT',
    'about.p1': "My name is Santana, I've been editing videos for 5 years, and I always aim to bring total focus to what really matters: <strong>retention and conversion — attention is currency.</strong>",
    'about.p2': 'Every cut, every transition, every effect is designed with focus on <strong>retention and results</strong>.',
    'about.m1': 'Videos Edited',
    'about.m2': 'Views Generated',
    'about.m3': 'Years of Experience',
    'about.m4': 'Result-Focused',
    'portfolio.tag': 'Work',
    'portfolio.title': 'PORTFOLIO',
    'portfolio.filterAll': 'All',
    'portfolio.tagYt1': 'Most-viewed video in 3 days',
    'portfolio.tagYt2': '3rd most-viewed video on the channel',
    'portfolio.tagYt3': 'Recent video',
    'portfolio.reelTag': 'Instagram Reel',
    'testimonials.tag': 'Results',
    'testimonials.title': 'WHAT THEY<br><span class="text-yellow">SAY</span>',
    'testimonials.carouselTitle': 'Result screenshots <span class="text-yellow">↓</span>',
    'testimonials.prev': 'Previous',
    'testimonials.next': 'Next',
    'contact.tag': "Let's work together",
    'contact.title': "LET'S CREATE<br>SOMETHING AMAZING?",
    'contact.sub': 'Editing with focus — from script to final cut.',
    'footer.slogan': 'Editing with Focus',
    'footer.copy': '© 2025 Santana Editor. All rights reserved.'
  }
};

(function initI18n() {
  const STORAGE_KEY = 'santana-lang';

  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') return saved;
    const nav = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.pt;

    // textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key === 'meta.title') {
        document.title = dict[key] || el.textContent;
      } else if (key === 'meta.description') {
        el.setAttribute('content', dict[key] || el.getAttribute('content'));
      } else if (dict[key] != null) {
        el.textContent = dict[key];
      }
    });

    // innerHTML (for content with <br>, <strong>, <span>)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    // attributes (e.g., aria-label)
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr'); // "attr:key"
      const [attr, key] = spec.split(':');
      if (attr && key && dict[key] != null) el.setAttribute(attr, dict[key]);
    });

    // <html lang>
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    // toggle button visual state
    document.querySelectorAll('#langSwitch .lang-opt').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
  }

  const current = detectLang();
  applyLang(current);

  // Toggle button
  const switchBtn = document.getElementById('langSwitch');
  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      const now = document.documentElement.getAttribute('lang').startsWith('pt') ? 'pt' : 'en';
      const next = now === 'pt' ? 'en' : 'pt';
      localStorage.setItem(STORAGE_KEY, next);
      applyLang(next);
    });
  }
})();


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
