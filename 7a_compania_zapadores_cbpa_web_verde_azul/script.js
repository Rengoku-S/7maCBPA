const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

function showNotice(){
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 2800);
}

function filterCalls(){
  const calls = document.getElementById('calls');
  calls.classList.toggle('filtered');
  showNotice();
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id=a.getAttribute('href');
    if(id && id!=='#'){
      const el=document.querySelector(id);
      if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. CARRUSEL AUTOMÁTICO
  // ==========================================
  const track = document.querySelector('.carousel-track');
  const delay = 3000; // Tiempo en milisegundos (3 segundos)
  let autoScrollInterval;

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      // Si llegamos al final del carrusel, volvemos al principio
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Movemos el ancho de una imagen hacia la derecha
        const itemWidth = track.querySelector('.carousel-item').clientWidth + 16; // 16px es el gap aproximado
        track.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }, delay);
  }

  // Pausar el movimiento si el usuario pone el mouse encima
  track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  track.addEventListener('mouseleave', startAutoScroll);
  
  startAutoScroll(); // Iniciar automáticamente

  // ==========================================
  // 2. VISOR AMPLIADO (LIGHTBOX)
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const nextBtn = document.getElementById('lightbox-next');
  const prevBtn = document.getElementById('lightbox-prev');
  
  // Obtenemos todas las imágenes del carrusel
  const images = Array.from(document.querySelectorAll('.carousel-item img'));
  let currentIndex = 0;

  // Abrir imagen al hacer click
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  // Función para cambiar de imagen
  function changeImage(direction) {
    currentIndex += direction;
    // Si pasamos la última, volvemos a la primera y viceversa
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    
    lightboxImg.src = images[currentIndex].src;
  }

  // Botones de siguiente y anterior
  nextBtn.addEventListener('click', () => changeImage(1));
  prevBtn.addEventListener('click', () => changeImage(-1));

  // Cerrar lightbox con la X
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Cerrar lightbox si se hace click fuera de la imagen
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Poder usar las flechas del teclado para cambiar de foto
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') changeImage(1);
      if (e.key === 'ArrowLeft') changeImage(-1);
      if (e.key === 'Escape') lightbox.classList.remove('active');
    }
  });
});