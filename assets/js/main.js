// Modern JavaScript for WikiLeirão
class WikiLeiráo {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupSearch();
    this.setupMobileMenu();
    this.setupAnimations();
  }

  setupEventListeners() {
    // Search toggle
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    
    if (searchToggle && searchBar) {
      searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('search-bar--active');
        if (searchBar.classList.contains('search-bar--active')) {
          document.getElementById('searchInput')?.focus();
        }
      });
    }

    // Close search on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchBar?.classList.contains('search-bar--active')) {
        searchBar.classList.remove('search-bar--active');
      }
    });

    // Header scroll effect
    this.setupHeaderScroll();
  }

  setupHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header?.classList.add('header--scrolled');
      } else {
        header?.classList.remove('header--scrolled');
      }

      lastScrollY = currentScrollY;
    };

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        const isActive = nav.classList.contains('nav--active');
        
        nav.classList.toggle('nav--active');
        menuToggle.classList.toggle('menu-toggle--active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
        
        // Update ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', (!isActive).toString());
      });

      // Close menu on outside click
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
          nav.classList.remove('nav--active');
          menuToggle.classList.remove('menu-toggle--active');
          document.body.style.overflow = '';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu on window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          nav.classList.remove('nav--active');
          menuToggle.classList.remove('menu-toggle--active');
          document.body.style.overflow = '';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
      // Basic search functionality - can be extended with actual search logic
      searchInput.addEventListener('input', this.debounce((e) => {
        const query = e.target.value.trim();
        if (query.length > 2) {
          this.performSearch(query);
        }
      }, 300));
    }
  }

  performSearch(query) {
    // Placeholder for search functionality
    console.log('Searching for:', query);
    // This would integrate with your search backend or static search index
  }

  setupScrollEffects() {
    // Intersection Observer for scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Remove observer after revealing to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
  }

  setupAnimations() {
    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add smooth hover effects to interactive elements
    this.setupHoverEffects();
  }

  setupHoverEffects() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', this.createRipple);
    });
  }

  createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 600ms linear;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Utility functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// CSS for ripple animation
const rippleCSS = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// Add ripple CSS to document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new WikiLeiráo());
} else {
  new WikiLeiráo();
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
  });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WikiLeiráo;
}