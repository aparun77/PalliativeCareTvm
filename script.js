// Utility
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

// Modal toggle
const toggle = (el, show) => el.style.display = show ? "flex" : "none";
$(".login-btn")?.addEventListener("click", () => toggle($("#loginModal"), true));
$("#closeModal")?.addEventListener("click", () => toggle($("#loginModal"), false));

// Login
$("#loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const u = $("#username").value.trim(), p = $("#password").value.trim();
  u === "admin" && p === "12345" ? (localStorage.setItem("isLoggedIn", "true"), location.href = "dashboard.html") 
                                   : $("#loginMessage").textContent = "❌ Invalid username or password";
});

// Contact forms
["footerContactForm","ContactForm"].forEach(id => {
  const f = $(`#${id}`); const fb = $("#footerFormMessage");
  f?.addEventListener("submit", e => {
    e.preventDefault();
    const n = $(`#${id}Name`).value.trim(), em = $(`#${id}Email`).value.trim(), m = $(`#${id}Message`).value.trim();
    if(!n||!em||!m){ fb.style.color="red"; fb.textContent="❌ Please fill all fields."; return; }
    const msgs = JSON.parse(localStorage.getItem("contactMessages")||"[]");
    msgs.push({name:n,email:em,message:m,date:new Date().toLocaleString()});
    localStorage.setItem("contactMessages",JSON.stringify(msgs));
    fb.style.color="green"; fb.textContent="✅ Message sent successfully!"; f.reset();
  });
});

// Gallery
$$(".gallery-container img, .gallery-container video").forEach(el =>
  el.addEventListener("click", () => {
    const modal = $("#modal"), img = $("#modalImage"), vid = $("#modalVideo");
    modal.style.display="block";
    if(el.tagName==="IMG"){ img.src=el.src; img.style.display="block"; vid.style.display="none"; }
    else{ vid.src=el.src; vid.style.display="block"; img.style.display="none"; }
  })
);
$("#modalClose")?.addEventListener("click", () => $("#modal").style.display="none");

// Carousel
const images = JSON.parse(localStorage.getItem("images")||'["https://via.placeholder.com/1920x1080?text=Palliative+Care"]'), c=$("#carouselContainer");
let index=0;
images.forEach(src=>{ const i=document.createElement("img"); i.src=src; c.appendChild(i); });
const show=i=>c.style.transform=`translateX(-${i*100}%)`;
$("#nextBtn")?.addEventListener("click",()=>show(index=(index+1)%images.length));
$("#prevBtn")?.addEventListener("click",()=>show(index=(index-1+images.length)%images.length));
setInterval(()=>show(index=(index+1)%images.length),5000);

// Navigation & Dropdown
$("#menuToggle")?.addEventListener("click",()=>$("#navLinks").classList.toggle("active"));
$("#donateToggle")?.addEventListener("click",()=>{ const d=$("#donateDropdown"); d.style.maxHeight=d.style.maxHeight&&d.style.maxHeight!=="0px"?"0px":`${d.scrollHeight}px`; });
