/**
 * Static image gallery — replaces Galleria entirely.
 * Renders a responsive CSS grid with click-to-lightbox.
 */
(function () {
  var LOCAL_IMAGES = [
    "img/slideshow/charlie_6980957233_o.jpg",
    "img/slideshow/1_6834240006_o.jpg",
    "img/slideshow/the-butterworth-family_6980957185_o.jpg",
    "img/slideshow/6834240626_7aee2a834a_o.jpg",
    "img/slideshow/7_6834240692_o.jpg",
    "img/slideshow/13_6834240556_o.jpg",
    "img/slideshow/3_6834240504_o.jpg",
    "img/slideshow/9_6834240338_o.jpg",
    "img/slideshow/4_6980368189_o.jpg",
    "img/slideshow/all-good-music-festival-10_6834829310_o.jpg",
    "img/slideshow/11_6980367959_o.jpg",
    "img/slideshow/8_6980368029_o.jpg",
    "img/slideshow/12_6980368097_o.jpg",
    "img/slideshow/14_6980957137_o.jpg",
    "img/slideshow/5_6834240076_o.jpg",
    "img/slideshow/dscn0731_7015754857_o.jpg",
    "img/slideshow/off-camera-on-022511-419_6869646152_o.jpg",
    "img/slideshow/dscn0943_7015756023_o.jpg",
    "img/slideshow/off-camera-on-022511-005_7015756991_o.jpg",
    "img/slideshow/off-camera-on-022511-491_7015760931_o.jpg",
    "img/slideshow/off-camera-on-022511-507_7015761743_o.jpg",
    "img/slideshow/off-camera-on-022511-465_7015762751_o.jpg",
    "img/slideshow/off-camera-on-022511-543_6869654420_o.jpg",
    "img/slideshow/off-camera-on-022511-546_7015766603_o.jpg",
    "img/slideshow/summer-09-528_7015767543_o.jpg",
    "img/slideshow/summer-09-539_6869658950_o.jpg"
  ];

  var currentIndex = -1;
  var overlay = null;
  var lbImg = null;

  function createLightbox() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.id = 'gallery-lightbox';
    overlay.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;' +
      'background:rgba(0,0,0,.9);z-index:9999;cursor:pointer;' +
      'justify-content:center;align-items:center;';
    lbImg = document.createElement('img');
    lbImg.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain;border-radius:4px;box-shadow:0 4px 30px rgba(0,0,0,.5);';
    overlay.appendChild(lbImg);
    overlay.addEventListener('click', function () { overlay.style.display = 'none'; });
    document.body.appendChild(overlay);

    document.addEventListener('keydown', function (e) {
      if (overlay.style.display === 'none') return;
      if (e.key === 'Escape') { overlay.style.display = 'none'; return; }
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % LOCAL_IMAGES.length; lbImg.src = LOCAL_IMAGES[currentIndex]; }
      if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + LOCAL_IMAGES.length) % LOCAL_IMAGES.length; lbImg.src = LOCAL_IMAGES[currentIndex]; }
    });
  }

  function renderGallery(selector) {
    var el = document.querySelector(selector);
    if (!el) return;

    createLightbox();

    el.innerHTML = '';
    el.className = '';
    el.removeAttribute('style');

    el.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);' +
      'gap:3px;padding:0;width:100%;max-width:360px;box-sizing:border-box;max-height:400px;overflow-y:auto;';

    LOCAL_IMAGES.forEach(function (src, i) {
      var img = document.createElement('img');
      img.src = src;
      img.loading = 'lazy';
      img.alt = 'Photo ' + (i + 1);
      img.style.cssText = 'width:100%;height:80px;object-fit:cover;border-radius:2px;cursor:pointer;transition:opacity .2s;';
      img.onmouseenter = function () { img.style.opacity = '0.8'; };
      img.onmouseleave = function () { img.style.opacity = '1'; };
      img.onclick = function () {
        currentIndex = i;
        lbImg.src = src;
        overlay.style.display = 'flex';
      };
      el.appendChild(img);
    });
  }

  // Stub out Galleria so existing inline scripts don't throw
  window.Galleria = window.Galleria || {};
  window.Galleria.loadTheme = function () {};
  window.Galleria.run = function () {};

  window.initGalleria = function (selector) { renderGallery(selector); };
  window.initGalleriaLocal = function (selector) { renderGallery(selector); };

  // Auto-init on DOM ready
  function onReady() { renderGallery('#galleria'); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
