// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// ===== Mobile menu =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== Active nav on scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ===== Scroll animations =====
const animateElements = document.querySelectorAll(
  '.about-label, .about-main, .feature-card, .section-header, .episode-card, ' +
  '.plan-card, .podcast-info, .podcast-visual, .testimonial-quote, ' +
  '.community-card, .newsletter-inner, .support-content, .support-visual'
);

animateElements.forEach((el, i) => {
  el.classList.add('fade-up');
  // Stagger cards within grids
  const siblings = el.parentElement.children;
  const index = Array.from(siblings).indexOf(el);
  if (index > 0 && index <= 3) {
    el.classList.add(`delay-${index}`);
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

animateElements.forEach(el => observer.observe(el));

// ===== Stat counter animation =====
const heroStats = document.querySelectorAll('.hero-stat strong');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;

  heroStats.forEach(el => {
    const text = el.textContent;
    const hasPlus = text.includes('+');
    const hasK = text.includes('K');
    const numStr = text.replace(/[^0-9]/g, '');
    const target = parseInt(numStr);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(eased * target);

      let display = hasK ? current + 'K' : String(current);
      if (hasPlus) display += '+';
      el.textContent = display;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// Trigger stats when hero is in view (on load)
setTimeout(animateStats, 600);

// ===== Reading plan progress animation =====
const planFills = document.querySelectorAll('.plan-fill');
const planObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.style.width;
        fill.style.width = '0%';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fill.style.width = width;
          });
        });
        planObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);

planFills.forEach(fill => planObserver.observe(fill));

// ===== Newsletter form =====
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = 'Subscribed!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      newsletterForm.reset();
    }, 2500);
  });
}

// ===== Smooth reveal for hero content =====
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      });
    });
  }
});
