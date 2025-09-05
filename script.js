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
document.addEventListener("DOMContentLoaded", () => {
    // यहाँ अपना नया Google Apps Script URL पेस्ट करें
    const GOOGLE_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbziayIwMemidmkA6DjLRP4H-wBPE-lPgKVMUHM73-CI5t5fyhFA7TULjJn2Czg3luQ/exec';
  
    const form = document.getElementById('contact-form');
    const sendButton = document.getElementById('send-button');
  
    form.addEventListener('submit', function(event) {
        event.preventDefault();
  
        const formData = new FormData(form);
  
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';
  
        fetch(GOOGLE_APP_SCRIPT_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
            if (result.status === 'success') {
                alert('Your message has been sent successfully!');
                form.reset();
            } else {
                alert(`An error occurred: ${result.message}`);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert('An error occurred. Please check your internet connection and try again later.');
        })
        .finally(() => {
            sendButton.disabled = false;
            sendButton.textContent = 'Send';
        });
    });
});

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Skill Bar Animation ---
    const aboutSection = document.querySelector("#about");
    const skillBars = document.querySelectorAll(".skill-bar-container");

    const animateBars = () => {
        skillBars.forEach(bar => {
            const percentValue = parseInt(bar.dataset.percent, 10);
            const progressBar = bar.querySelector(".progress-bar");
            
            // Set the final width for smooth animation
            progressBar.style.width = bar.dataset.percent;

            // Animate the percentage number
            let count = 0;
            const percentageInterval = setInterval(() => {
                if (count <= percentValue) {
                    bar.querySelector(".skill-bar-container::after").textContent = `${count}%`;
                    count++;
                } else {
                    clearInterval(percentageInterval);
                }
            }, 10); // Speed of the counting
        });
    };

    // Use Intersection Observer to trigger animation when the section is visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBars();
                observer.disconnect(); // Stop observing after animation
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    observer.observe(aboutSection);

    // --- Testimonial Slider (No changes needed) ---
    const slides = document.querySelectorAll(".testimonial-slide");
    const controls = document.querySelectorAll(".control-btn");
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
        controls.forEach(control => control.classList.remove("active"));
        
        slides[index].classList.add("active");
        controls[index].classList.add("active");
    };

    controls.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    showSlide(currentSlide);
        // --- 1. लोडर का JavaScript यहाँ जाएगा ---
    const loaderPage = document.getElementById('loader-page');
    const mainContent = document.getElementById('main-content');
    
    // लोडर एनिमेशन के लिए सुरक्षित समय
    const loaderDuration = 7000; // 7 सेकंड (7000 मिलीसेकंड)

    setTimeout(() => {
        loaderPage.classList.add("fade-out");
        
        setTimeout(() => {
            mainContent.style.display = 'block';
            loaderPage.remove(); 
        }, 1000); 
    }, loaderDuration);
});
