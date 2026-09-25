/* ═══════════════════════════════════════════════
   ARSALA KHAN — PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Trigger hero reveals after loader
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 180);
    });
  }, 1400);
});

/* ── CUSTOM CURSOR ── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .ach-card, .exp-card, .highlight-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursor.style.opacity = '0.6';
    cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.opacity = '1';
    cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ── MOBILE NAV TOGGLE ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

/* ── ACTIVE NAV LINK ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        a.style.fontWeight = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = 'var(--accent)';
      }
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => observerNav.observe(s));

/* ── INTERSECTION OBSERVER: GENERIC REVEALS ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      /* Clear any inline opacity/transform so the CSS .visible class wins */
      entry.target.style.opacity = '';
      entry.target.style.transform = '';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.timeline-item, .exp-card, .ach-card, .pub-card, .pub-interest-card, .skill-bar-item, .contact-item, .highlight-item').forEach(el => {
  revealObserver.observe(el);
});

/* Stagger ach-card & exp-card delays via transitionDelay only — opacity/transform handled in CSS */
document.querySelectorAll('.ach-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 80) + 'ms';
  revealObserver.observe(el);
});

document.querySelectorAll('.exp-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 100) + 'ms';
  revealObserver.observe(el);
});

/* ── STAT COUNTER ANIMATION ── */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(num => animateCounter(num));
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statObserver.observe(statsSection);

function animateCounter(el) {
  const target   = parseFloat(el.getAttribute('data-target'));
  const isFloat  = target % 1 !== 0;
  const duration = 1600;
  const step     = 16;
  const steps    = duration / step;
  let current    = 0;
  const inc      = target / steps;

  const timer = setInterval(() => {
    current += inc;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
  }, step);
}

/* ── SKILL BAR ANIMATION ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-width');
        bar.style.width = w + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) skillObserver.observe(skillsSection);

/* ── TIMELINE ITEMS (staggered) ── */
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 0);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 120) + 'ms';
  timelineObserver.observe(el);
});

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Sending…';
    btn.style.opacity = '0.7';

    // Simulate send
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.opacity = '1';
      btn.style.background = 'linear-gradient(135deg, var(--teal), #6ec6c2)';
      contactForm.reset();

      // Add success note inline
      let successEl = contactForm.querySelector('.form-success');
      if (!successEl) {
        successEl = document.createElement('div');
        successEl.className = 'form-success';
        successEl.textContent = 'Thank you! Your message has been sent. Arsala will get back to you soon.';
        contactForm.appendChild(successEl);
      }
      successEl.classList.add('show');

      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.opacity = '1';
      }, 3000);
    }, 1200);
  });
}

/* ── SMOOTH ANCHOR SCROLL WITH OFFSET ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── PARALLAX ON HERO ── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }
});

/* ── TILT EFFECT ON ACH CARDS ── */
document.querySelectorAll('.ach-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-8px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── GLITTER ON HERO CLICK ── */
document.querySelector('.hero')?.addEventListener('click', (e) => {
  for (let i = 0; i < 14; i++) {
    const spark = document.createElement('div');
    spark.style.cssText = `
      position:fixed;
      left:${e.clientX}px;
      top:${e.clientY}px;
      width:6px;height:6px;
      border-radius:50%;
      background:${['#c49a6c','#8b6fd4','#4da8a4','#e8c99a','#5ab4d4','#e8945a'][Math.floor(Math.random()*6)]};
      pointer-events:none;
      z-index:9000;
      opacity:1;
    `;
    document.body.appendChild(spark);
    const angle = (Math.PI * 2 * i) / 14;
    const dist  = 40 + Math.random() * 50;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    spark.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
    ], { duration: 500 + Math.random() * 300, easing: 'ease-out', fill: 'forwards' })
      .addEventListener('finish', () => spark.remove());
  }
});

/* ── TYPING SUBTITLE IN HERO ── */
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
  const texts = [
    'Assistant Professor · Educator · Literary Scholar',
    'UGC NET 99.7 Percentile · 2025',
    'M.A. English Literature · RDVV, Jabalpur',
    'Jolly Phonics Instructor · Published Author',
  ];
  let tIdx = 0, cIdx = 0, deleting = false;

  function typeSubtitle() {
    const current = texts[tIdx];
    if (!deleting) {
      subtitleEl.textContent = current.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(typeSubtitle, 2200);
        return;
      }
    } else {
      subtitleEl.textContent = current.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
      }
    }
    setTimeout(typeSubtitle, deleting ? 40 : 60);
  }

  // Start after loader disappears
  setTimeout(typeSubtitle, 1800);
}

/* ── RIPPLE EFFECT ON BUTTONS ── */
function addRipple(btn) {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}
document.querySelectorAll('.btn-primary, .btn-submit').forEach(addRipple);

/* ── MAGNETIC NAV LINKS ── */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('mousemove', (e) => {
    const rect = link.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    link.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  link.addEventListener('mouseleave', () => {
    link.style.transform = '';
  });
});

/* ── SECTION LABEL LINE-REVEAL ── */
const labelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      labelObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.section-header').forEach(h => labelObserver.observe(h));
