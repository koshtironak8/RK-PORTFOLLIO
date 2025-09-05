  // Loading Page Removal
  window.addEventListener('load', () => {
    const loadingPage = document.getElementById('loading-page');
    loadingPage.style.opacity = '0';
    setTimeout(() => loadingPage.style.display = 'none', 600);
  });

  // Smooth Scroll with active link highlight
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      // Scroll handled by HTML scroll-behavior css
    });
  });
  // Additional helper for Hire Me button-scroll
  function scrollToSection(sel) {
    document.querySelector(sel).scrollIntoView({behavior: 'smooth'});
    navLinks.forEach(l => l.classList.remove('active'));
    const link = document.querySelector('nav a[href="' + sel + '"]');
    if(link) link.classList.add('active');
  }

  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projects.forEach(project => {
        if(filter === 'all' || project.getAttribute('data-category') === filter) {
          project.style.display = 'block';
          project.style.animation = 'fadeInUp 0.6s ease forwards';
          project.style.opacity = '1';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });

  // Testimonials Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialControls = document.querySelectorAll('.control-btn');
  let currentSlide = 0;

  function showTestimonial(index) {
    testimonialSlides.forEach((slide,i) => {
      slide.classList.toggle('active', i === index);
      testimonialControls[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  testimonialControls.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      showTestimonial(idx);
    });
  });

  // Auto slide every 8 seconds
  setInterval(() => {
    let nextSlide = (currentSlide +1) % testimonialSlides.length;
    showTestimonial(nextSlide);
  }, 8000);


  //collect user's data
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  const email = form.email.value;

  fetch("https://script.google.com/macros/s/AKfycby5OLGbjmtuf9sS0q7ByBZPFNlVcd2ylp7SGEf2heY6awHm2jUpTG5Gz7seAmiX9hQ/exec", {   // <-- Yaha Web App URL paste karo
    method: "POST",
    body: new URLSearchParams({ email: email })
  })
  .then(response => response.text())
  .then(data => {
    form.innerHTML = "<p style='color:green; font-weight:bold;'>Thank you! Your email has been saved.</p>";
  })
  .catch(error => {
    form.innerHTML = "<p style='color:red; font-weight:bold;'>Oops! Something went wrong.</p>";
    console.error(error);
  });
});

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('show');
});


