/**
 * Image gallery with thumbnail strip and lightbox.
 *
 * Behavior:
 *   - Clicking a non-selected thumbnail selects that image in the main view.
 *   - Clicking the selected (active) image opens the lightbox.
 *   - Clicking the selected (active) thumbnail also opens the lightbox.
 *   - Lightbox has prev/next navigation and closes on overlay click or Escape.
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

  var currentIndex = 0;
  var autoTimer = null;
  var AUTO_INTERVAL = 5000;
  var sliderEl = null;

  function injectStyles() {
    var css = [
      /* Main slider container */
      '.cv-slider{position:relative;width:100%;max-width:360px;background:#111;border-radius:4px;overflow:hidden;user-select:none}',

      /* Main image viewport */
      '.cv-slider-viewport{position:relative;width:100%;padding-top:75%;overflow:hidden;cursor:pointer}',
      '.cv-slider-viewport img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s ease}',
      '.cv-slider-viewport img.active{opacity:1}',

      /* Prev/next buttons */
      '.cv-slider-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.5);color:#fff;border:none;font-size:22px;line-height:1;padding:8px 10px;cursor:pointer;z-index:2;border-radius:2px;transition:background .2s}',
      '.cv-slider-btn:hover{background:rgba(0,0,0,.8)}',
      '.cv-slider-prev{left:6px}',
      '.cv-slider-next{right:6px}',

      /* Counter badge */
      '.cv-slider-counter{position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,.6);color:#fff;font-size:11px;padding:2px 7px;border-radius:3px;z-index:2;font-family:sans-serif}',

      /* Thumbnail strip */
      '.cv-thumbs{display:flex;gap:3px;padding:6px 4px;background:#111;overflow-x:auto;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.3) transparent}',
      '.cv-thumbs::-webkit-scrollbar{height:4px}',
      '.cv-thumbs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.3);border-radius:2px}',
      '.cv-thumb{flex:0 0 44px;height:34px;border-radius:2px;overflow:hidden;cursor:pointer;border:2px solid transparent;opacity:.5;transition:opacity .2s,border-color .2s}',
      '.cv-thumb:hover{opacity:.8}',
      '.cv-thumb.active{opacity:1;border-color:#fff}',
      '.cv-thumb img{width:100%;height:100%;object-fit:cover;display:block}',

      /* Lightbox overlay */
      '.cv-lightbox{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.92);z-index:10000;display:none;align-items:center;justify-content:center;flex-direction:column}',
      '.cv-lightbox.open{display:flex}',
      '.cv-lightbox img{max-width:90vw;max-height:82vh;object-fit:contain;border-radius:4px;box-shadow:0 4px 40px rgba(0,0,0,.6)}',
      '.cv-lightbox-close{position:absolute;top:16px;right:20px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;z-index:10001;line-height:1;padding:4px 8px;opacity:.7;transition:opacity .2s}',
      '.cv-lightbox-close:hover{opacity:1}',
      '.cv-lightbox-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.12);color:#fff;border:none;font-size:36px;line-height:1;padding:12px 16px;cursor:pointer;border-radius:4px;transition:background .2s;z-index:10001}',
      '.cv-lightbox-btn:hover{background:rgba(255,255,255,.25)}',
      '.cv-lightbox-prev{left:12px}',
      '.cv-lightbox-next{right:12px}',
      '.cv-lightbox-counter{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.6);font-size:13px;font-family:sans-serif}'
    ].join('\n');
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---- Main slider ---- */

  function goTo(index) {
    if (index < 0) index = LOCAL_IMAGES.length - 1;
    if (index >= LOCAL_IMAGES.length) index = 0;
    currentIndex = index;

    var imgs = sliderEl.querySelectorAll('.cv-slider-viewport img');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].className = i === currentIndex ? 'active' : '';
    }

    var thumbs = sliderEl.querySelectorAll('.cv-thumb');
    for (var j = 0; j < thumbs.length; j++) {
      thumbs[j].className = j === currentIndex ? 'cv-thumb active' : 'cv-thumb';
    }

    /* Scroll active thumb into view */
    if (thumbs[currentIndex]) {
      thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    var counter = sliderEl.querySelector('.cv-slider-counter');
    if (counter) counter.textContent = (currentIndex + 1) + ' / ' + LOCAL_IMAGES.length;
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(currentIndex + 1); }, AUTO_INTERVAL);
  }

  /* ---- Lightbox ---- */

  var lightboxEl = null;
  var lightboxImg = null;
  var lightboxCounter = null;

  function buildLightbox() {
    lightboxEl = document.createElement('div');
    lightboxEl.className = 'cv-lightbox';

    /* Close button */
    var closeBtn = document.createElement('button');
    closeBtn.className = 'cv-lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.onclick = closeLightbox;
    lightboxEl.appendChild(closeBtn);

    /* Image */
    lightboxImg = document.createElement('img');
    lightboxImg.alt = '';
    lightboxEl.appendChild(lightboxImg);

    /* Prev */
    var prev = document.createElement('button');
    prev.className = 'cv-lightbox-btn cv-lightbox-prev';
    prev.innerHTML = '&#8249;';
    prev.setAttribute('aria-label', 'Previous');
    prev.onclick = function (e) { e.stopPropagation(); lightboxGo(currentIndex - 1); };
    lightboxEl.appendChild(prev);

    /* Next */
    var next = document.createElement('button');
    next.className = 'cv-lightbox-btn cv-lightbox-next';
    next.innerHTML = '&#8250;';
    next.setAttribute('aria-label', 'Next');
    next.onclick = function (e) { e.stopPropagation(); lightboxGo(currentIndex + 1); };
    lightboxEl.appendChild(next);

    /* Counter */
    lightboxCounter = document.createElement('div');
    lightboxCounter.className = 'cv-lightbox-counter';
    lightboxEl.appendChild(lightboxCounter);

    /* Click overlay to close (but not the image or buttons) */
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) closeLightbox();
    });

    document.body.appendChild(lightboxEl);
  }

  function openLightbox() {
    if (!lightboxEl) buildLightbox();
    lightboxImg.src = LOCAL_IMAGES[currentIndex];
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + LOCAL_IMAGES.length;
    lightboxEl.classList.add('open');
    document.body.style.overflow = 'hidden';
    clearInterval(autoTimer);
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('open');
    document.body.style.overflow = '';
    resetAuto();
  }

  function lightboxGo(index) {
    if (index < 0) index = LOCAL_IMAGES.length - 1;
    if (index >= LOCAL_IMAGES.length) index = 0;
    currentIndex = index;
    lightboxImg.src = LOCAL_IMAGES[currentIndex];
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + LOCAL_IMAGES.length;
    /* Sync the slider behind the lightbox */
    goTo(currentIndex);
  }

  function isLightboxOpen() {
    return lightboxEl && lightboxEl.classList.contains('open');
  }

  /* ---- Build ---- */

  function renderSlider(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    sliderEl = el;

    injectStyles();

    el.innerHTML = '';
    el.className = 'cv-slider';
    el.removeAttribute('style');

    /* Viewport */
    var viewport = document.createElement('div');
    viewport.className = 'cv-slider-viewport';

    LOCAL_IMAGES.forEach(function (src, i) {
      var img = document.createElement('img');
      img.src = src;
      img.loading = i < 3 ? 'eager' : 'lazy';
      img.alt = 'Photo ' + (i + 1);
      if (i === 0) img.className = 'active';
      viewport.appendChild(img);
    });

    /* Clicking the main image opens lightbox (it always shows the active image) */
    viewport.addEventListener('click', function (e) {
      if (e.target.tagName === 'BUTTON') return; /* ignore prev/next buttons */
      openLightbox();
    });

    el.appendChild(viewport);

    /* Prev/Next */
    var prev = document.createElement('button');
    prev.className = 'cv-slider-btn cv-slider-prev';
    prev.innerHTML = '&#8249;';
    prev.setAttribute('aria-label', 'Previous');
    prev.onclick = function (e) { e.stopPropagation(); goTo(currentIndex - 1); resetAuto(); };
    viewport.appendChild(prev);

    var next = document.createElement('button');
    next.className = 'cv-slider-btn cv-slider-next';
    next.innerHTML = '&#8250;';
    next.setAttribute('aria-label', 'Next');
    next.onclick = function (e) { e.stopPropagation(); goTo(currentIndex + 1); resetAuto(); };
    viewport.appendChild(next);

    /* Counter */
    var counter = document.createElement('span');
    counter.className = 'cv-slider-counter';
    counter.textContent = '1 / ' + LOCAL_IMAGES.length;
    viewport.appendChild(counter);

    /* Thumbnail strip */
    var thumbsWrap = document.createElement('div');
    thumbsWrap.className = 'cv-thumbs';
    LOCAL_IMAGES.forEach(function (src, i) {
      var thumb = document.createElement('div');
      thumb.className = i === 0 ? 'cv-thumb active' : 'cv-thumb';

      var tImg = document.createElement('img');
      tImg.src = src;
      tImg.loading = 'lazy';
      tImg.alt = 'Thumbnail ' + (i + 1);
      thumb.appendChild(tImg);

      thumb.addEventListener('click', function () {
        if (i === currentIndex) {
          /* Already selected: open lightbox */
          openLightbox();
        } else {
          /* Select this image */
          goTo(i);
          resetAuto();
        }
      });

      thumbsWrap.appendChild(thumb);
    });
    el.appendChild(thumbsWrap);

    /* Keyboard navigation */
    document.addEventListener('keydown', function (e) {
      if (isLightboxOpen()) {
        if (e.key === 'ArrowRight') lightboxGo(currentIndex + 1);
        if (e.key === 'ArrowLeft') lightboxGo(currentIndex - 1);
        if (e.key === 'Escape') closeLightbox();
        return;
      }
      if (e.key === 'ArrowRight') { goTo(currentIndex + 1); resetAuto(); }
      if (e.key === 'ArrowLeft') { goTo(currentIndex - 1); resetAuto(); }
    });

    /* Touch/swipe on main viewport */
    var touchStartX = 0;
    viewport.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
        resetAuto();
      }
    });

    /* Auto-advance */
    resetAuto();

    /* Pause on hover */
    el.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
    el.addEventListener('mouseleave', function () { if (!isLightboxOpen()) resetAuto(); });
  }

  /* Stubs so existing inline scripts don't throw */
  window.Galleria = window.Galleria || {};
  window.Galleria.loadTheme = function () {};
  window.Galleria.run = function () {};

  window.initGalleria = function (selector) { renderSlider(selector); };
  window.initGalleriaLocal = function (selector) { renderSlider(selector); };

  function onReady() { renderSlider('#galleria'); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
