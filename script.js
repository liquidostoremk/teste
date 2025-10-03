// Utilidades simples para UX da landing
(function () {
  const lenis = window.Lenis
    ? new window.Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false,
      })
    : null;

  if (lenis) {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

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
    if (lenis) {
      lenis.scrollTo(el, { lock: true });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  // Popup de produtos com galeria
  const productData = {
    'biquini-triangulo-brisa': {
      name: 'Biquíni Triângulo Brisa',
      meta: 'Azul oceano • UV50+',
      price: 'R$ 179',
      description:
        'Top triângulo com regulagem lateral e amarração nas costas para ajustar ao seu conforto. Calcinha asa delta com cintura média e recortes que valorizam as curvas.',
      features: [
        'Proteção solar UV50+ com forro duplo macio',
        'Tecido biodegradável com toque suave que não marca',
        'Alças ajustáveis e bojo removível para diferentes estilos',
      ],
      images: [
        {
          src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
          alt: 'Modelo vestindo biquíni triângulo azul na praia',
        },
        {
          src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
          alt: 'Detalhe da parte superior do biquíni azul com recortes',
        },
        {
          src: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80',
          alt: 'Biquíni azul dobrado sobre canga estampada',
        },
      ],
      cta: 'Adicionar à sacola',
    },
    'maio-classico-mar': {
      name: 'Maiô Clássico Mar',
      meta: 'Preto profundo • Modelagem anatômica',
      price: 'R$ 239',
      description:
        'Maiô clássico com recorte alongado e sustentação interna. Ideal para mergulhos, esportes aquáticos ou para usar como body.',
      features: [
        'Compressão suave que modela sem apertar',
        'Alças largas e decote nas costas com sustentação extra',
        'Acabamento resistente ao cloro e à água salgada',
      ],
      images: [
        {
          src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
          alt: 'Maiô preto em cena de piscina com modelo sentada na borda',
        },
        {
          src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
          alt: 'Detalhe do tecido canelado do maiô preto',
        },
        {
          src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
          alt: 'Maiô preto pendurado próximo a janela com vista para o mar',
        },
      ],
      cta: 'Garantir o meu',
    },
    'sunga-horizonte': {
      name: 'Sunga Horizonte',
      meta: 'Coral • Secagem rápida',
      price: 'R$ 129',
      description:
        'Sunga com caimento anatômico e cordão interno para ajuste perfeito. Tecido leve de secagem rápida para acompanhar toda aventura.',
      features: [
        'Proteção UV e toque geladinho ideal para dias quentes',
        'Cordão interno para ajuste seguro durante o movimento',
        'Forro respirável que não enrola nem marca',
      ],
      images: [
        {
          src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
          alt: 'Sunga coral apoiada em prancha de surfe na areia',
        },
        {
          src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
          alt: 'Detalhe de tecido coral com textura leve',
        },
        {
          src: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
          alt: 'Look praia masculino com sunga coral e camisa leve',
        },
      ],
      cta: 'Adicionar ao carrinho',
    },
    'saida-leveza': {
      name: 'Saída Leveza',
      meta: 'Verde menta • Tecido leve',
      price: 'R$ 159',
      description:
        'Saída de praia fluida com amarração frontal opcional. Caimento leve que acompanha o vento e garante frescor em qualquer hora do dia.',
      features: [
        'Tecelagem em viscose sustentável com toque gelado',
        'Transparência na medida para sobreposições elegantes',
        'Modelagem ampla que veste do PP ao 4G',
      ],
      images: [
        {
          src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
          alt: 'Saída de praia verde menta esvoaçante na areia',
        },
        {
          src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
          alt: 'Detalhe de tecido leve verde com textura suave',
        },
        {
          src: 'https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?auto=format&fit=crop&w=900&q=80',
          alt: 'Modelo usando saída verde sobre biquíni branco próximo ao mar',
        },
      ],
      cta: 'Quero na mala',
    },
  };

  const modal = document.querySelector('[data-product-modal]');
  if (modal) {
    const titleEl = modal.querySelector('[data-product-title]');
    const metaEl = modal.querySelector('[data-product-meta]');
    const priceEl = modal.querySelector('[data-product-price]');
    const descriptionEl = modal.querySelector('[data-product-description]');
    const featuresEl = modal.querySelector('[data-product-features]');
    const actionBtn = modal.querySelector('[data-product-action]');
    const trackEl = modal.querySelector('[data-slider-track]');
    const dotsEl = modal.querySelector('[data-slider-dots]');
    const prevBtn = modal.querySelector('[data-slider-prev]');
    const nextBtn = modal.querySelector('[data-slider-next]');
    const statusEl = modal.querySelector('[data-slider-status]');
    const closeButtons = Array.from(
      modal.querySelectorAll('[data-product-close]')
    );
    const closeBtn = closeButtons[0] || null;
    const overlay = modal.querySelector('[data-product-overlay]');

    let sliderItems = [];
    let sliderDots = [];
    let currentIndex = 0;
    let currentSlug = null;
    let lastTrigger = null;

    const setUrlProduct = (slug, { replace = false } = {}) => {
      const url = new URL(window.location.href);
      if (slug) {
        url.searchParams.set('produto', slug);
      } else {
        url.searchParams.delete('produto');
      }
      const method = replace ? 'replaceState' : 'pushState';
      history[method]({ product: slug }, '', url);
    };

    const announceSlide = () => {
      if (!statusEl || !sliderItems.length) return;
      statusEl.textContent = `Imagem ${currentIndex + 1} de ${sliderItems.length}`;
    };

    const renderSlides = (product) => {
      trackEl.innerHTML = '';
      dotsEl.innerHTML = '';
      currentIndex = 0;

      product.images.forEach((image, idx) => {
        const li = document.createElement('li');
        li.className = 'product-slider__item';

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt || `${product.name} — imagem ${idx + 1}`;
        li.appendChild(img);
        trackEl.appendChild(li);

        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'product-slider__dot';
        dot.setAttribute('aria-label', `Ver imagem ${idx + 1} de ${product.images.length}`);
        dot.dataset.index = String(idx);
        dotsEl.appendChild(dot);
      });

      sliderItems = Array.from(trackEl.children);
      sliderDots = Array.from(dotsEl.querySelectorAll('button'));
      trackEl.style.setProperty('--index', '0');

      sliderDots.forEach((dot, idx) => {
        dot.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
      });

      const controlsHidden = sliderItems.length <= 1;
      prevBtn.disabled = controlsHidden;
      nextBtn.disabled = controlsHidden;
      dotsEl.style.display = controlsHidden ? 'none' : 'flex';

      announceSlide();
    };

    const goToSlide = (index) => {
      if (!sliderItems.length) return;
      const total = sliderItems.length;
      currentIndex = ((index % total) + total) % total;
      trackEl.style.setProperty('--index', String(currentIndex));
      sliderDots.forEach((dot, idx) => {
        dot.setAttribute('aria-pressed', idx === currentIndex ? 'true' : 'false');
      });
      announceSlide();
    };

    const fillModal = (slug) => {
      const product = productData[slug];
      if (!product) return false;
      titleEl.textContent = product.name;
      metaEl.textContent = product.meta;
      priceEl.textContent = product.price;
      descriptionEl.textContent = product.description;

      featuresEl.innerHTML = '';
      if (Array.isArray(product.features) && product.features.length) {
        featuresEl.hidden = false;
        product.features.forEach((feature) => {
          const li = document.createElement('li');
          li.textContent = feature;
          featuresEl.appendChild(li);
        });
      } else {
        featuresEl.hidden = true;
      }

      if (actionBtn) actionBtn.textContent = product.cta || 'Adicionar à sacola';

      renderSlides(product);
      return true;
    };

    const openModal = (slug, { updateHistory = true, replaceHistory = false, focus = true } = {}) => {
      if (!fillModal(slug)) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      currentSlug = slug;

      if (focus && closeBtn) {
        requestAnimationFrame(() => closeBtn.focus());
      }

      if (updateHistory) {
        setUrlProduct(slug, { replace: replaceHistory });
      }
    };

    const closeModal = ({ updateHistory = true, replaceHistory = false, returnFocus = true } = {}) => {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      const slugBeforeClose = currentSlug;
      currentSlug = null;

      if (returnFocus && lastTrigger) {
        lastTrigger.focus();
      }

      if (updateHistory && slugBeforeClose) {
        setUrlProduct(null, { replace: replaceHistory });
      }
    };

    prevBtn?.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    nextBtn?.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });

    dotsEl?.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || !sliderDots.includes(button)) return;
      const idx = Number.parseInt(button.dataset.index || '0', 10);
      goToSlide(idx);
    });

    closeButtons.forEach((button) =>
      button.addEventListener('click', () =>
        closeModal({ returnFocus: true, replaceHistory: true })
      )
    );
    overlay?.addEventListener('click', () =>
      closeModal({ returnFocus: false, replaceHistory: true })
    );

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        event.preventDefault();
        closeModal({ returnFocus: true });
      }
    });

    const triggers = document.querySelectorAll('[data-product-open]');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const slug = trigger.getAttribute('data-product-open');
        if (!slug || !productData[slug]) return;
        lastTrigger = trigger;
        openModal(slug, { replaceHistory: false });
      });
    });

    const syncWithUrl = ({ replaceHistory = false, focus = false } = {}) => {
      const slug = new URLSearchParams(window.location.search).get('produto');
      if (slug && productData[slug]) {
        lastTrigger = null;
        openModal(slug, { updateHistory: false, focus, replaceHistory });
      } else {
        closeModal({ updateHistory: false, returnFocus: false });
      }
    };

    window.addEventListener('popstate', () => {
      syncWithUrl({ focus: false });
    });

    if (history.state === null || typeof history.state !== 'object' || !('product' in history.state)) {
      const current = new URLSearchParams(window.location.search).get('produto');
      history.replaceState({ product: current || null }, '', window.location.href);
    }

    const initialSlug = new URLSearchParams(window.location.search).get('produto');
    if (initialSlug && productData[initialSlug]) {
      openModal(initialSlug, { updateHistory: false, focus: false, replaceHistory: true });
    }
  }
})();

