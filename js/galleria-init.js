/**
 * Galleria init with Flickr-first, local-image fallback.
 *
 * Tries loading from Flickr set 72157629214934718.
 * If the API key is expired or the request fails,
 * falls back to local images in img/slideshow/.
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
  var FLICKR_API_KEY = "2a2ce06c15780ebeb0b706650fc890b2";
  var FLICKR_TIMEOUT_MS = 5000;

  function initWithLocal(selector, extraOpts) {
    var opts = $.extend({ dataSource: LOCAL_IMAGES }, extraOpts || {});
    $(selector).galleria(opts);
  }

  function initGalleria(selector, extraOpts) {
    // Probe the Flickr API directly before handing off to Galleria.
    // This avoids Galleria.raise throwing an uncatchable error.
    var url =
      "https://api.flickr.com/services/rest/?" +
      "method=flickr.photosets.getPhotos" +
      "&api_key=" + FLICKR_API_KEY +
      "&photoset_id=" + FLICKR_SET +
      "&extras=url_t,url_m,url_o,url_s,url_l,url_z" +
      "&format=json&jsoncallback=?";

    var done = false;

    // Timeout: if Flickr doesn't respond in time, use local
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
          // Flickr works, let Galleria use it natively
          var opts = $.extend({
            flickr: "set:" + FLICKR_SET,
            flickrOptions: { sort: "date-posted-asc" }
          }, extraOpts || {});
          $(selector).galleria(opts);
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

  // Expose globally
  window.initGalleria = initGalleria;
  window.initGalleriaLocal = initWithLocal;
})();
