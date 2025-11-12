// ===== Modal Handling =====
const modal = document.getElementById("loginModal");
const loginBtn = document.querySelector(".login-btn");
const closeBtn = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
loginBtn?.addEventListener("click", () => modal.style.display = "flex");
closeBtn?.addEventListener("click", () => modal.style.display = "none");

// Default credentials
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "12345";

document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginMessage = document.getElementById('loginMessage');

    if(username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD){
        // Store login session in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        loginMessage.textContent = "❌ Invalid username or password";
    }
});

// ===== Carousel, Gallery, Videos =====
window.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("imageContainer");
  const videoContainer = document.getElementById("videoContainer");
  const carouselContainer = document.getElementById("carouselContainer");

  const images = JSON.parse(localStorage.getItem("images") || "[]");
  const videos = JSON.parse(localStorage.getItem("videos") || "[]");

  // Gallery
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    imageContainer?.appendChild(img);
  });

  // Videos
  videos.forEach(link => {
    const iframe = document.createElement("iframe");
    iframe.src = link.includes("youtube")
      ? link.replace("watch?v=", "embed/")
      : link;
    iframe.allowFullscreen = true;
    videoContainer?.appendChild(iframe);
  });

  // Carousel
  if (carouselContainer) {
    const imgs = images.length ? images : ["https://via.placeholder.com/1920x1080?text=Palliative+Care"];
    imgs.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      carouselContainer.appendChild(img);
    });
    startCarousel(carouselContainer);
  }
});

// ===== Carousel Function =====
function startCarousel(container) {
  let index = 0;
  const slides = container.querySelectorAll("img");
  const total = slides.length;
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  function showSlide(i) {
    container.style.transform = `translateX(-${i * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    showSlide(index);
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % total;
    showSlide(index);
  }, 5000);
}

// ===== Responsive Navbar Toggle =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===== Carousel Logic =====
const carouselContainer = document.getElementById("carouselContainer");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let index = 0;

function showSlide(i) {
  carouselContainer.style.transform = `translateX(-${i * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % 3;
  showSlide(index);
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + 3) % 3;
  showSlide(index);
});

// Auto-slide every 5 seconds
setInterval(() => {
  index = (index + 1) % 3;
  showSlide(index);
}, 5000);

// ===== Footer Contact Form Submission =====
const footerForm = document.getElementById("footerContactForm");
footerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for reaching out! We will contact you soon.");
  footerForm.reset();
});

const learnMoreBtn = document.getElementById("learnMoreBtn");
const aboutTeam = document.querySelector(".about-team");
