/**
 * Nirvighna Clinic – Shared JavaScript
 * Navigation, scroll animations, form handling
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Navigation Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── Scroll Reveal Animations ──
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Appointment Form Handling ──
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('aptName');
      const phone = document.getElementById('aptPhone');
      const age = document.getElementById('aptAge');
      const reason = document.getElementById('aptReason');
      
      // Basic validation
      let isValid = true;
      [name, phone, age, reason].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e53e3e';
          isValid = false;
        } else {
          field.style.borderColor = 'var(--grey-200)';
        }
      });

      // Phone validation
      if (phone.value && !/^[\d\s+\-()]{10,14}$/.test(phone.value.replace(/\s/g, ''))) {
        phone.style.borderColor = '#e53e3e';
        isValid = false;
      }

      if (isValid) {
        // Show success message
        const successMsg = document.getElementById('appointmentSuccess');
        if (successMsg) {
          successMsg.classList.add('show');
        }
        
        // Reset form
        appointmentForm.reset();
        
        // Hide success after 5 seconds
        setTimeout(() => {
          if (successMsg) successMsg.classList.remove('show');
        }, 5000);
      }
    });
  }

  // ── Contact Form Handling ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName');
      const phone = document.getElementById('contactPhone');
      const message = document.getElementById('contactMessage');
      
      let isValid = true;
      [name, phone, message].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e53e3e';
          isValid = false;
        } else {
          field.style.borderColor = 'var(--grey-200)';
        }
      });

      if (isValid) {
        const successMsg = document.getElementById('contactSuccess');
        if (successMsg) {
          successMsg.classList.add('show');
        }
        contactForm.reset();
        setTimeout(() => {
          if (successMsg) successMsg.classList.remove('show');
        }, 5000);
      }
    });
  }

  // ── Form field reset border on focus ──
  document.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('focus', () => {
      field.style.borderColor = '';
    });
  });

  // ── Set minimum date for appointment ──
  const aptDate = document.getElementById('aptDate');
  if (aptDate) {
    const today = new Date().toISOString().split('T')[0];
    aptDate.setAttribute('min', today);
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Fast Logo Scroll to Top ──
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      // Check if we are on the homepage by looking for the hero section
      const isHomePage = document.querySelector('.hero') !== null;
      
      if (isHomePage) {
        e.preventDefault();
        
        const startY = window.scrollY || document.documentElement.scrollTop;
        if (startY <= 0) return;
        
        const duration = 500; // 500ms so it's very clearly visible
        const startTime = performance.now();
        
        // Remove smooth scroll temporarily so JS can control exactly
        document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
        
        function scrollAnimation(currentTime) {
          const elapsed = currentTime - startTime;
          let progress = elapsed / duration;
          if (progress > 1) progress = 1;
          
          // Easing function (easeOutQuart) for a fast start and smooth end
          const easeOut = 1 - Math.pow(1 - progress, 4);
          
          window.scrollTo(0, startY * (1 - easeOut));
          
          if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
          } else {
            document.documentElement.style.removeProperty('scroll-behavior');
          }
        }
        
        requestAnimationFrame(scrollAnimation);
      }
    });
  }

});
