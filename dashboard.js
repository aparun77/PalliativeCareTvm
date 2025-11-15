// ==================== DOM Elements ====================
const $ = id => document.getElementById(id);
const inboxToggle = $('inboxToggle'), inboxDropdown = $('inboxDropdown'), msgCount = $('msgCount');
const logoutBtn = $('logoutBtn'), mediaInput = $('mediaUpload'), photoInput = $('photoUpload');
const uploadMsg = $('uploadMessage'), carouselInner = $('carouselInner'), thumbContainer = $('thumbnailContainer');

// ==================== Helpers ====================
const showMsg = (el, txt, type='success') => el.textContent=txt, el.className=type;
const toggleClass = (el, cls) => el.classList.toggle(cls);

// ==================== Inbox ====================
const loadMessages = () => {
    const msgs = JSON.parse(localStorage.getItem('contactMessages')||'[]');
    msgCount.textContent = msgs.length;
    inboxDropdown.innerHTML = msgs.length ? msgs.slice().reverse().map(m=>`<p><strong>${m.name}</strong><br><small>${m.email}</small></p>`).join('') : '<p class="no-messages">No messages</p>';
};
inboxToggle.onclick = e => { e.preventDefault(); toggleClass(inboxDropdown,'show'); };
document.onclick = e => { if(!inboxToggle.contains(e.target)&&!inboxDropdown.contains(e.target)) inboxDropdown.classList.remove('show'); };

// ==================== Auth ====================
if(localStorage.getItem('isLoggedIn')!=='true'){ alert('⚠️ Login first!'); location.href='index.html'; }
logoutBtn.onclick = e => { e.preventDefault(); localStorage.removeItem('isLoggedIn'); location.href='index.html'; };
history.pushState(null,null,location.href); onpopstate=()=>{ if(localStorage.getItem('isLoggedIn')!=='true') location.href='index.html'; };

// ==================== Media Upload ====================
const uploadMedia = () => !mediaInput.files.length?showMsg(uploadMsg,'⚠️ Select a file','error'):(showMsg(uploadMsg,'✅ Media uploaded'), mediaInput.value='');
const clearMedia = () => { mediaInput.value=''; uploadMsg.textContent=''; };

// ==================== Carousel ====================
const addPhoto = () => {
    if(!photoInput.files.length) return showMsg(uploadMsg,'⚠️ Select a photo','error');
    const reader = new FileReader();
    reader.onload = e => {
        const img = Object.assign(document.createElement('img'),{src:e.target.result,className:'carousel-item'});
        carouselInner.appendChild(img);
        const thumb = Object.assign(document.createElement('img'),{src:e.target.result,className:'thumbnail'});
        thumb.onclick = ()=>showSlide(thumb.src);
        thumbContainer.appendChild(thumb);
    };
    reader.readAsDataURL(photoInput.files[0]);
    showMsg(uploadMsg,'✅ Photo added'); photoInput.value='';
};

const showSlide = src => [...carouselInner.children].forEach(img=>img.style.display=(img.src===src?'block':'none'));
const navigateSlide = dir => {
    const slides = [...carouselInner.children], curr = slides.findIndex(s=>s.style.display==='block');
    if(curr===-1){ slides[0]&&(slides[0].style.display='block'); return; }
    slides[curr].style.display='none';
    const idx = dir==='next' ? (curr+1)%slides.length : (curr===0 ? slides.length-1 : curr-1);
    slides[idx].style.display='block';
};

// ==================== Init ====================
loadMessages();
