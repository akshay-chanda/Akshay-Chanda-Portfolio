    const scriptURL = 'https://script.google.com/macros/s/AKfycbwRbz8nrvIm7Eolg_PS4syWX8J22Yx0y2KXR5DTGpQSxpdhygsHtYEQ8XUad8_2ywMScg/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(() => {
          msg.textContent = "Message sent successfully!";
          setTimeout(() => msg.textContent = "", 3000);
          form.reset();
        })
        .catch(error => console.error('Error!', error.message));
    });

    // Functional Menu Bar for Smaller Screen

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');

    function openSidebar() {
      hamburger.classList.add('active');
      navMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
    overlay.addEventListener('click', closeSidebar);
    document.querySelectorAll('.nav_right ul li a').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });

    // See more (About)

    const btn = document.querySelector('.see-more-btn');
    const moreText = document.querySelector('.more-text');
    if (btn && moreText) {
      btn.addEventListener('click', () => {
        if (moreText.style.display === "inline") {
          moreText.style.display = "none";
          btn.textContent = "See more";
        } else {
          moreText.style.display = "inline";
          btn.textContent = "See less";
        }
      });
    }


    // Fade-in on Scroll + Scroll Spy

    // Fade-in on scroll
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // For timeline vertical line draw
          if (entry.target.id === 'experiences') {
            entry.target.querySelector('.timeline')?.classList.add('show-line');
          }
          // Unobserve after first reveal for performance
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));

    // Scroll spy - highlight active nav link
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav_right a');

    const sectionMap = {};
    navLinks.forEach(link => {
      const id = link.getAttribute('href');
      if (id?.startsWith('#')) sectionMap[id] = link;
    });

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + entry.target.id;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          sectionMap[id]?.classList.add('active');
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(sec => spyObserver.observe(sec));

    // Also update on hashchange (when clicking)
    window.addEventListener('hashchange', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = sectionMap[location.hash];
      if (active) active.classList.add('active');
    });
