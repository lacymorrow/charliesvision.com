/**
 * Galleria init with Flickr-first, local-image fallback.
 *
 * Tries loading from Flickr set 72157629214934718.
 * If the API key is expired, the request fails, or Galleria
 * hits a fatal error (e.g. stage height 0), falls back to a
 * simple image grid rendered directly into the container.
 */
(function () {
  var LOCAL_IMAGES = [
    { image: "img/slideshow/11_6980367959_o.jpg" },
    { image: "img/slideshow/12_6980368097_o.jpg" },
    { image: "img/slideshow/13_6834240556_o.jpg" },
    { image: "img/slideshow/14_6980957137_o.jpg" },
    { image: "img/slideshow/1_6834240006_o.jpg" },
    { image: "img/slideshow/3_6834240504_o.jpg" },
    { image: "img/slideshow/4_6980368189_o.jpg" },
    { image: "img/slideshow/5_6834240076_o.jpg" },
    { image: "img/slideshow/6834240626_7aee2a834a_o.jpg" },
    { image: "img/slideshow/7_6834240692_o.jpg" },
    { image: "img/slideshow/8_6980368029_o.jpg" },
    { image: "img/slideshow/9_6834240338_o.jpg" },
    { image: "img/slideshow/all-good-music-festival-10_6834829310_o.jpg" },
    { image: "img/slideshow/charlie_6980957233_o.jpg" },
    { image: "img/slideshow/dscn0731_7015754857_o.jpg" },
    { image: "img/slideshow/dscn0943_7015756023_o.jpg" },
    { image: "img/slideshow/off-camera-on-022511-005_7015756991_o.jpg" },
    { image: "img/slideshow/off-camera-on-022511-419_6869646152_o.jpg" },
    { image: "img/slideshow/off-camera-on-022511-465_7015762751_o.jpg" },
    { image: "img/slideshow/off-camera-on-022511-491_7015760931_o.jpg" },
    { image: "img/slideshow/off-camera-on-022511-507_7015761743_o.jpg" },
    { image: "img/slideshow/off-camera-on-022511-543_6869654420_o.jpg" },
    { image: "img/slideshow/off-camera-on-022511-546_7015766603_o.jpg" },
    { image: "img/slideshow/summer-09-528_7015767543_o.jpg" },
    { image: "img/slideshow/summer-09-539_6869658950_o.jpg" },
    { image: "img/slideshow/the-butterworth-family_6980957185_o.jpg" }
  ];

  var FLICKR_SET = "72157629214934718";
  var FLICKR_API_KEY = "ed217acfd601abb0b487784100a40335";
  var FLICKR_TIMEOUT_MS = 5000;

  // Static fallback: render a simple image grid when Galleria can't run at all
  function renderStaticGrid(selector) {
    var $el = $(selector);
    // Clear any broken Galleria markup
    $el.find('.galleria-errors').remove();
    $el.empty();
    $el.css({
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      justifyContent: 'center',
      padding: '8px',
      minHeight: 'auto',
      height: 'auto'
    });
    $.each(LOCAL_IMAGES, function (i, img) {
      $('<img>')
        .attr('src', img.image)
        .attr('loading', 'lazy')
        .css({
          width: '200px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px',
          cursor: 'pointer'
        })
        .on('click', function () {
          window.open(img.image, '_blank');
        })
        .appendTo($el);
    });
  }

  // Patch Galleria.raise to catch fatal errors and fall back
  var _originalRaise = null;
  var _activeSelector = null;
  var _activeOpts = null;
  var _fellBack = false;

  function patchGalleriaRaise() {
    if (_originalRaise) return; // already patched
    _originalRaise = Galleria.raise;
    Galleria.raise = function (msg, fatal) {
      if (fatal && !_fellBack) {
        _fellBack = true;
        // Try local dataSource first (might fix the issue if it was Flickr-related)
        try {
          var $el = $(_activeSelector);
          // Ensure the container has a height for Galleria
          if ($el.height() < 10) {
            $el.css('height', '400px');
          }
          $el.empty();
          var opts = $.extend({ dataSource: LOCAL_IMAGES }, _activeOpts || {});
          $el.galleria(opts);
        } catch (e) {
          // Galleria is fully broken, render a plain image grid
          renderStaticGrid(_activeSelector);
        }
        return;
      }
      // Non-fatal errors: call original
      _originalRaise.apply(this, arguments);
    };
  }

  function initWithLocal(selector, extraOpts) {
    _activeSelector = selector;
    _activeOpts = extraOpts;
    _fellBack = false;
    patchGalleriaRaise();

    var $el = $(selector);
    if ($el.height() < 10) {
      $el.css('height', '400px');
    }

    try {
      var opts = $.extend({ dataSource: LOCAL_IMAGES }, extraOpts || {});
      $el.galleria(opts);
    } catch (e) {
      renderStaticGrid(selector);
    }
  }

  function initGalleria(selector, extraOpts) {
    _activeSelector = selector;
    _activeOpts = extraOpts;
    _fellBack = false;
    patchGalleriaRaise();

    // Probe the Flickr API directly before handing off to Galleria.
    var url =
      "https://api.flickr.com/services/rest/?" +
      "method=flickr.photosets.getPhotos" +
      "&api_key=" + FLICKR_API_KEY +
      "&photoset_id=" + FLICKR_SET +
      "&extras=url_t,url_m,url_o,url_s,url_l,url_z" +
      "&format=json&jsoncallback=?";

    var done = false;

    var timer = setTimeout(function () {
      if (!done) {
        done = true;
        initWithLocal(selector, extraOpts);
      }
    }, FLICKR_TIMEOUT_MS);

    $.getJSON(url)
      .done(function (data) {
        if (done) return;
        done = true;
        clearTimeout(timer);

        if (data.stat === "ok" && data.photoset && data.photoset.photo && data.photoset.photo.length) {
          var $el = $(selector);
          if ($el.height() < 10) {
            $el.css('height', '400px');
          }
          try {
            var opts = $.extend({
              flickr: "set:" + FLICKR_SET,
              flickrOptions: { sort: "date-posted-asc" }
            }, extraOpts || {});
            $el.galleria(opts);
          } catch (e) {
            initWithLocal(selector, extraOpts);
          }
        } else {
          initWithLocal(selector, extraOpts);
        }
      })
      .fail(function () {
        if (done) return;
        done = true;
        clearTimeout(timer);
        initWithLocal(selector, extraOpts);
      });
  }

  window.initGalleria = initGalleria;
  window.initGalleriaLocal = initWithLocal;
})();
