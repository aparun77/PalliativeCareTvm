// ===== Modal Handling =====
const modal = document.getElementById("loginModal"),
      loginBtn = document.querySelector(".login-btn"),
      closeBtn = document.getElementById("closeModal"),
      loginForm = document.getElementById("loginForm"),
      loginMessage = document.getElementById("loginMessage");

loginBtn?.addEventListener("click", () => modal.style.display = "flex");
closeBtn?.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });

// Default credentials
const DEFAULT_USERNAME = "admin", DEFAULT_PASSWORD = "12345";

loginForm?.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim(),
          password = document.getElementById("password").value.trim();

    if(username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD){
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else loginMessage.textContent = "❌ Invalid username or password";
});

// ===== Gallery & Carousel =====
window.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("imageContainer"),
          videoContainer = document.getElementById("videoContainer"),
          carouselContainer = document.getElementById("carouselContainer"),
          images = JSON.parse(localStorage.getItem("images") || "[]"),
          videos = JSON.parse(localStorage.getItem("videos") || "[]");

    // Images
    images.forEach(src => { const img = document.createElement("img"); img.src = src; imageContainer?.appendChild(img); });

    // Videos
    videos.forEach(link => {
        const iframe = document.createElement("iframe");
        iframe.src = link.includes("youtube") ? link.replace("watch?v=", "embed/") : link;
        iframe.allowFullscreen = true;
        videoContainer?.appendChild(iframe);
    });

    // Carousel
    if(carouselContainer){
        const imgs = images.length ? images : ["https://via.placeholder.com/1920x1080?text=Palliative+Care"];
        imgs.forEach(src => { const img = document.createElement("img"); img.src = src; carouselContainer.appendChild(img); });
        startCarousel(carouselContainer);
    }
});

// ===== Carousel Function =====
function startCarousel(container){
    let index = 0;
    const slides = container.querySelectorAll("img"),
          total = slides.length,
          nextBtn = document.getElementById("nextBtn"),
          prevBtn = document.getElementById("prevBtn");

    function showSlide(i){ container.style.transform = `translateX(-${i*100}%)`; }

    nextBtn?.addEventListener("click", () => { index = (index + 1) % total; showSlide(index); });
    prevBtn?.addEventListener("click", () => { index = (index - 1 + total) % total; showSlide(index); });

    setInterval(() => { index = (index + 1) % total; showSlide(index); }, 5000);
}

// ===== Responsive Navbar Toggle =====
document.getElementById("menuToggle")?.addEventListener("click", () => {
    document.getElementById("navLinks")?.classList.toggle("active");
});

// ===== Footer Contact Form =====
document.getElementById("ContactForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("footerName").value.trim(),
          email = document.getElementById("footerEmail").value.trim(),
          message = document.getElementById("footerMessage").value.trim(),
          feedback = document.getElementById("footerFormMessage");

    if(!name || !email || !message){
        feedback.style.color = "red";
        feedback.textContent = "❌ Please fill all fields.";
        return;
    }

    try{
        const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
        messages.push({ name, email, message, date: new Date().toLocaleString() });
        localStorage.setItem("contactMessages", JSON.stringify(messages));
        feedback.style.color = "green";
        feedback.textContent = "✅ Message sent successfully!";
        this.reset();
    } catch(err){
        feedback.style.color = "red";
        feedback.textContent = "❌ Error sending message. Try again.";
        console.error(err);
    }
});

// Simple footer alert form (if separate)
document.getElementById("footerContactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for reaching out! We will contact you soon.");
    e.target.reset();
});

// ===== Learn More & Dropdown =====
const btn = document.querySelector('.donate-btn');
const dropdown = document.querySelector('.dropdown');

  btn.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

window.addEventListener('click', () => dropdown.classList.remove('show'));
