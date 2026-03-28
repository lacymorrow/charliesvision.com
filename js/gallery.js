/**
 * Image slider/carousel — replaces Galleria.
 * Shows one image at a time with prev/next arrows, dots, and auto-advance.
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

  function injectStyles() {
    var css = [
      '.cv-slider{position:relative;width:100%;max-width:360px;background:#111;border-radius:4px;overflow:hidden;user-select:none}',
      '.cv-slider-viewport{position:relative;width:100%;padding-top:75%;overflow:hidden}',
      '.cv-slider-viewport img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s ease}',
      '.cv-slider-viewport img.active{opacity:1}',
      '.cv-slider-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.5);color:#fff;border:none;font-size:22px;line-height:1;padding:8px 10px;cursor:pointer;z-index:2;border-radius:2px;transition:background .2s}',
      '.cv-slider-btn:hover{background:rgba(0,0,0,.8)}',
      '.cv-slider-prev{left:6px}',
      '.cv-slider-next{right:6px}',
      '.cv-slider-dots{display:flex;justify-content:center;gap:5px;padding:8px 0;background:#111}',
      '.cv-slider-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.3);border:none;padding:0;cursor:pointer;transition:background .2s}',
      '.cv-slider-dot.active{background:#fff}',
      '.cv-slider-counter{position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,.6);color:#fff;font-size:11px;padding:2px 7px;border-radius:3px;z-index:2;font-family:sans-serif}'
    ].join('\n');
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function goTo(index, slider) {
    if (index < 0) index = LOCAL_IMAGES.length - 1;
    if (index >= LOCAL_IMAGES.length) index = 0;
    currentIndex = index;

    var imgs = slider.querySelectorAll('.cv-slider-viewport img');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].className = i === currentIndex ? 'active' : '';
    }

    var dots = slider.querySelectorAll('.cv-slider-dot');
    for (var j = 0; j < dots.length; j++) {
      dots[j].className = j === currentIndex ? 'cv-slider-dot active' : 'cv-slider-dot';
    }

    var counter = slider.querySelector('.cv-slider-counter');
    if (counter) counter.textContent = (currentIndex + 1) + ' / ' + LOCAL_IMAGES.length;
  }

  function resetAuto(slider) {
    clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(currentIndex + 1, slider); }, AUTO_INTERVAL);
  }

  function renderSlider(selector) {
    var el = document.querySelector(selector);
    if (!el) return;

    injectStyles();

    el.innerHTML = '';
    el.className = 'cv-slider';
    el.removeAttribute('style');

    // Viewport
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

    el.appendChild(viewport);

    // Prev/Next buttons
    var prev = document.createElement('button');
    prev.className = 'cv-slider-btn cv-slider-prev';
    prev.innerHTML = '&#8249;';
    prev.setAttribute('aria-label', 'Previous');
    prev.onclick = function () { goTo(currentIndex - 1, el); resetAuto(el); };
    viewport.appendChild(prev);

    var next = document.createElement('button');
    next.className = 'cv-slider-btn cv-slider-next';
    next.innerHTML = '&#8250;';
    next.setAttribute('aria-label', 'Next');
    next.onclick = function () { goTo(currentIndex + 1, el); resetAuto(el); };
    viewport.appendChild(next);

    // Counter
    var counter = document.createElement('span');
    counter.className = 'cv-slider-counter';
    counter.textContent = '1 / ' + LOCAL_IMAGES.length;
    viewport.appendChild(counter);

    // Dots
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'cv-slider-dots';
    LOCAL_IMAGES.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = i === 0 ? 'cv-slider-dot active' : 'cv-slider-dot';
      dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
      dot.onclick = function () { goTo(i, el); resetAuto(el); };
      dotsWrap.appendChild(dot);
    });
    el.appendChild(dotsWrap);

    // Keyboard nav
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { goTo(currentIndex + 1, el); resetAuto(el); }
      if (e.key === 'ArrowLeft') { goTo(currentIndex - 1, el); resetAuto(el); }
    });

    // Touch/swipe support
    var touchStartX = 0;
    viewport.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(currentIndex + 1, el);
        else goTo(currentIndex - 1, el);
        resetAuto(el);
      }
    });

    // Auto-advance
    resetAuto(el);

    // Pause on hover
    el.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
    el.addEventListener('mouseleave', function () { resetAuto(el); });
  }

  // Stub out Galleria so existing inline scripts don't throw
  window.Galleria = window.Galleria || {};
  window.Galleria.loadTheme = function () {};
  window.Galleria.run = function () {};

  window.initGalleria = function (selector) { renderSlider(selector); };
  window.initGalleriaLocal = function (selector) { renderSlider(selector); };

  // Auto-init on DOM ready
  function onReady() { renderSlider('#galleria'); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
