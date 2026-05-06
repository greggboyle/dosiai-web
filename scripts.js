/**
 * DOSI.AI Marketing Site - JavaScript
 * Minimal, SEO-friendly interactions
 */

(function() {
  'use strict';

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================
  
  const header = document.querySelector('.header');
  
  if (header) {
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
      const scrollY = window.scrollY;
      
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollY = scrollY;
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================
  
  const mobileMenuBtn = document.querySelector('.hamburger-btn');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
  
  function openMobileMenu() {
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeMobileMenu() {
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }
  
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  }
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================
  
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(function(item) {
    const trigger = item.querySelector('.faq-trigger');
    
    if (trigger) {
      trigger.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');
        
        // Close all other items (optional - remove for multi-open)
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
          }
        });
        
        // Toggle current item
        item.classList.toggle('open', !isOpen);
      });
    }
  });

  // ==========================================================================
  // Billing Toggle (Pricing Page)
  // ==========================================================================
  
  const billingToggle = document.querySelector('.billing-toggle');
  
  if (billingToggle) {
    const buttons = billingToggle.querySelectorAll('button');
    const priceElements = document.querySelectorAll('[data-price-monthly][data-price-annual]');
    const periodElements = document.querySelectorAll('[data-period]');
    
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        const cycle = this.dataset.cycle;
        
        // Update button states
        buttons.forEach(function(btn) {
          btn.classList.toggle('active', btn.dataset.cycle === cycle);
        });
        
        // Update prices
        priceElements.forEach(function(el) {
          const price = cycle === 'annual' ? el.dataset.priceAnnual : el.dataset.priceMonthly;
          el.textContent = price;
        });
        
        // Update period text
        periodElements.forEach(function(el) {
          const periodText = cycle === 'annual' ? '/month, billed annually' : '/month';
          el.textContent = periodText;
        });
      });
    });
  }

  // ==========================================================================
  // Category Filters (Resources Page)
  // ==========================================================================
  
  const categoryFilters = document.querySelectorAll('.category-filter');
  const resourceCards = document.querySelectorAll('.resource-card');
  
  if (categoryFilters.length > 0 && resourceCards.length > 0) {
    categoryFilters.forEach(function(filter) {
      filter.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active state
        categoryFilters.forEach(function(f) {
          f.classList.toggle('active', f === filter);
        });
        
        // Filter cards
        resourceCards.forEach(function(card) {
          const cardCategory = card.dataset.category;
          
          if (category === 'all' || cardCategory === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // Form Handling
  // ==========================================================================
  
  const forms = document.querySelectorAll('form[data-form]');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formType = this.dataset.form;
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      
      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }
      
      // Simulate form submission (replace with actual endpoint)
      setTimeout(function() {
        if (submitBtn) {
          submitBtn.textContent = 'Success!';
          submitBtn.style.backgroundColor = '#10b981';
        }
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(function() {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
          }
        }, 2000);
      }, 1000);
    });
  });

  // ==========================================================================
  // Intersection Observer for Animations (Optional)
  // ==========================================================================
  
  if ('IntersectionObserver' in window) {
    const animateOnScroll = document.querySelectorAll('[data-animate]');
    
    if (animateOnScroll.length > 0) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animateOnScroll.forEach(function(el) {
        observer.observe(el);
      });
    }
  }

  // ==========================================================================
  // Dropdown Keyboard Navigation
  // ==========================================================================
  
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(function(dropdown) {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    const content = dropdown.querySelector('.nav-dropdown-content');
    const items = dropdown.querySelectorAll('.nav-dropdown-item');
    
    if (trigger && content && items.length > 0) {
      // Open on Enter/Space
      trigger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          content.style.opacity = '1';
          content.style.visibility = 'visible';
          content.style.transform = 'translateY(0)';
          items[0].focus();
        }
      });
      
      // Arrow key navigation
      items.forEach(function(item, index) {
        item.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = items[index + 1] || items[0];
            next.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = items[index - 1] || items[items.length - 1];
            prev.focus();
          } else if (e.key === 'Escape') {
            content.style.opacity = '';
            content.style.visibility = '';
            content.style.transform = '';
            trigger.focus();
          }
        });
      });
    }
  });

  // ==========================================================================
  // Current Year in Footer
  // ==========================================================================
  
  const yearElements = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(function(el) {
    el.textContent = currentYear;
  });

})();
