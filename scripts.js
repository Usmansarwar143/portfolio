// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').style.opacity = 0;
    setTimeout(() => {
      document.getElementById('preloader').style.display = 'none';
    }, 600);
  }, 1200);
});

// Dark/Light Mode Toggle
const toggleMode = document.getElementById('toggle-mode');
const html = document.documentElement;
const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark') html.setAttribute('data-theme', 'dark');
toggleMode.onclick = () => {
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
};

// Typewriter Animation
function typewriterEffect(element, texts, speed = 60, pause = 1200) {
  let i = 0, j = 0, isDeleting = false, current = '';
  function type() {
    const full = texts[i];
    if (isDeleting) {
      current = full.substring(0, j--);
    } else {
      current = full.substring(0, j++);
    }
    element.textContent = current;
    if (!isDeleting && j === full.length + 1) {
      isDeleting = true;
      setTimeout(type, pause);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? speed / 2 : speed);
    }
  }
  type();
}
const typewriter = document.getElementById('typewriter');
if (typewriter) {
  typewriterEffect(typewriter, [
    "Assalamualaikum Guys!",
    "I'm Usman Sarwar",
    "A Computer Systems Engineer",
    "An AI/ML Enthusiast",
    "Innovative. Passionate. Professional.",
    "A Quantum Computing Enthusiast"
  ]);
}
// Section headers typewriter
Array.from(document.getElementsByClassName('section-title')).forEach(el => {
  if (el.textContent) {
    typewriterEffect(el, [el.textContent], 40, 600);
  }
});

// Soft Particle Background Animation (Hero)
const canvas = document.getElementById('bg-animation');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;
  window.addEventListener('resize', () => {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w; canvas.height = h;
  });
  const particles = Array.from({length: 48}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 1.5 + Math.random() * 3.5,
    dx: -0.5 + Math.random(),
    dy: -0.5 + Math.random(),
    alpha: 0.15 + Math.random() * 0.25
  }));
  function animate() {
    ctx.clearRect(0,0,w,h);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(58,134,255,${p.alpha})`;
      ctx.shadowColor = '#3a86ff';
      ctx.shadowBlur = 12;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Enhanced Scroll Reveal Animations
const revealEls = document.querySelectorAll('.scroll-reveal');
const skillEls = document.querySelectorAll('.skill');
const projectCards = document.querySelectorAll('.project-card');
const serviceCards = document.querySelectorAll('.service-card');
const certificateCards = document.querySelectorAll('.certificate-card');

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;
  
  // Reveal main sections
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add('visible');
    }
  });
  
  // Staggered animation for skills
  skillEls.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100); // 100ms delay between each skill
    }
  });
  
  // Staggered animation for project cards
  projectCards.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 150); // 150ms delay between each project card
    }
  });
  
  // Staggered animation for service cards
  serviceCards.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 150); // 150ms delay between each service card
    }
  });
  
  // Staggered animation for certificate cards
  certificateCards.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 130); // 130ms delay between each certificate
    }
  });
}

// Throttle scroll events for better performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

window.addEventListener('scroll', throttle(revealOnScroll, 16)); // ~60fps
window.addEventListener('load', revealOnScroll);
window.addEventListener('resize', revealOnScroll);

// Achievement Counters
function animateCounter(id, target) {
  let count = 0;
  const el = document.getElementById(id);
  if (!el) return;
  const step = Math.ceil(target / 40);
  function update() {
    count += step;
    if (count > target) count = target;
    el.textContent = count;
    if (count < target) requestAnimationFrame(update);
  }
  update();
}
window.addEventListener('load', () => {
  animateCounter('projects-count', 11);
  animateCounter('workshops-count', 7);
  animateCounter('certificates-count', 10);
});

// Projects Data
const projects = [
  {
    title: "U-Care Bot",
    desc: "A friendly mental health chatbot using sentiment analysis and AI-driven conversation.",
    img: "assets/ucare_bot.png",
    link: "https://github.com/Usmansarwar143/u-care-friendly-chatbot",
    tags: ["ml", "web"]
  },
  {
    title: "Empathy Bot",
    desc: "An AI-powered Empathy Bot designed to provide supportive, human-like conversations using sentiment analysis and NLP.",
    img: "assets/empathy-bot.png",
    link: "https://github.com/Usmansarwar143/developershub-internship-tasks/tree/main/Task%2305",
    tags: ["ml", "web"]
  },
  {
    title: "Context-Aware Chatbot",
    desc: "A context-aware chatbot leveraging LLMs and LangChain to provide dynamic, memory-enabled responses based on user interactions.",
    img: "assets/context_aware.png",
    link: "https://github.com/Usmansarwar143/developers-hub-internship-assignment-2/tree/main/Task04",
    tags: ["ml", "web"]
  },
  {
    title: "Diabetes Prediction Tool",
    desc: "A tool that predicts diabetes based on user input using machine learning.",
    img: "assets/diabetes_prediction.png",
    link: "https://github.com/Usmansarwar143/diabetes-detection",
    tags: ["ml", "web"]
  },
  {
    title: "My portfolio Website",
    desc: "A portfolio website built with HTML, CSS, and JavaScript to showcase my projects and skills.",
    img: "assets/portfolio_website.png",
    link: "https://usmansarwar143.github.io/portfolio",
    tags: ["web"]
  },
  {
    title: "Anti Sleep Glasses",
    desc: "Arduino-based safety gadget using IR sensors and buzzer to prevent driver drowsiness.",
    img: "assets/anti_sleep_glasses.png",
    link: "assets/Anti_Sleep_Glasses_By_Usman_and_Asma_project_report.pdf",
    tags: ["iot-embedded"]
  },
  {
    title: "Smart Home Automation",
    desc: "IoT-based home automation system using ESP32 and various sensors for smart control.",
    img: "assets/home-automation.png",
    link: "https://www.linkedin.com/posts/muhammad-usman-018535253_smarthome-innovation-iot-activity-7190247487411023872-QSFh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6MgNQBNQDogo2uGw8r1errf-OJEuJH4dc",
    tags: ["iot-embedded"]
  },
  {
    title: "OPTIMA OS",
    desc: "A mini operating system with FCFS Scheduling, Mutex Locks, CLI, and more.",
    img: "assets/optima_os.png",
    link: "https://github.com/Usmansarwar143/Optima_OS",
    tags: ["cpp-python"]
  },
  {
    title: "Library Management System",
    desc: "A python-based library management system with user authentication, book management, and borrowing/returning functionality.",
    img: "assets/library_management_system.png",
    link: "https://github.com/Usmansarwar143/library-management-system",
    tags: ["cpp-python"]
  },
  {
    title: "Speech to Text in Python",
    desc: "A python-based speech to text converter using the SpeechRecognition library.",
    img: "assets/speech-to-text.png",
    link: "https://github.com/SoyamKapoor/speech_to_text_using_python",
    tags: ["python"]
  },
  {
    title: "Matrix Calculator in C++",
    desc: "A matrix calculator built in C++ with operations like transpose, adjoint, multiplication, and inverse.",
    img: "assets/matrix_calculator.png",
    link: "https://youtu.be/hyzllS61hUU?si=4PByfwEH8YTcw5gs",
    tags: ["cpp-python"]
  },
  {
    title: "Auto Toll Barrier",
    desc: "An automated toll barrier system using Arduino and sensors for vehicle detection and barrier control.",
    img: "assets/auto_toll_barrier.jpeg",
    link: "https://www.linkedin.com/posts/muhammad-usman-018535253_engineeringexcellence-arduinoprojects-innovationintech-activity-7180985083112132608-jOI5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6MgNQBNQDogo2uGw8r1errf-OJEuJH4dc",
    tags: ["iot-embedded"]
  }
];
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const filteredProjects = projects.filter(p => filter === 'all' || p.tags.includes(filter));
  
  filteredProjects.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <div class="project-info">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-links">
          <a href="${p.link}" target="_blank">View More...</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
    
    // Add staggered animation for newly created cards
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 150);
  });
}
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderProjects(this.dataset.filter);
  };
});
window.addEventListener('load', () => renderProjects());

// Resume Modal
const resumeModalBtn = document.getElementById('resume-modal-btn');
const resumeModal = document.getElementById('resume-modal');
const closeResumeModal = document.getElementById('close-resume-modal');
if (resumeModalBtn && resumeModal && closeResumeModal) {
  resumeModalBtn.onclick = () => resumeModal.classList.add('active');
  closeResumeModal.onclick = () => resumeModal.classList.remove('active');
  window.onclick = e => { if (e.target === resumeModal) resumeModal.classList.remove('active'); };
}

// Certificates Slider
const certificates = [
  { title: "Quantum Computing", img: "assets/cert_quantum.jpeg" },
  { title: "Prompt Engineering", img: "assets/cert_prompt.jpeg" },
  { title: "Machine Learning", img: "assets/cert_ml.jpeg" },
  { title: "Machine Learning", img: "assets/cert_ml2.jpeg" },
  { title: "WordPress", img: "assets/wordpress.jpeg" },
  { title: "Flutter", img: "assets/cert_flutter.jpeg" },
  { title: "C++", img: "assets/cert_cpp.jpeg" },
  { title: "Web Scraping", img: "assets/cert_web_scraping.jpeg" },
  { title: "BootStrap", img: "assets/cert_bootstrap.jpeg" },
  { title: "Git & GitHub", img: "assets/cert_git.jpeg" }

];
function renderCertificates() {
  const slider = document.getElementById('certificates-slider');
  if (!slider) return;
  slider.innerHTML = '';
  certificates.forEach((cert, index) => {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    card.innerHTML = `
      <img src="${cert.img}" alt="${cert.title}" />
      <div>${cert.title}</div>
    `;
    card.onclick = () => {
      const modal = document.createElement('div');
      modal.className = 'modal active';
      modal.innerHTML = `<div class='modal-content'><span class='close-modal'>&times;</span><img src='${cert.img}' alt='${cert.title}' style='width:100%;max-width:500px;'/><div style='margin-top:1rem;'>${cert.title}</div></div>`;
      document.body.appendChild(modal);
      modal.querySelector('.close-modal').onclick = () => document.body.removeChild(modal);
      modal.onclick = e => { if (e.target === modal) document.body.removeChild(modal); };
    };
    slider.appendChild(card);
    
    // Add staggered animation for newly created cards
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 130);
  });
}
window.addEventListener('load', renderCertificates);

// Floating Chat/Mail Icon
const floatingChat = document.getElementById('floating-chat');
if (floatingChat) {
  floatingChat.onclick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };
}

// Contact Form (dummy handler)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.onsubmit = e => {
    e.preventDefault();
    alert('Thank you for reaching out! Usman will get back to you soon.');
    contactForm.reset();
  };
}

// Hamburger Mobile Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.onclick = () => {
    mobileMenu.classList.toggle('active');
  };
  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.onclick = () => mobileMenu.classList.remove('active');
  });
  // Close menu on outside click
  window.addEventListener('click', e => {
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
} 