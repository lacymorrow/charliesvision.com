<div id="footer">
	<p class="float-left">Help support our vision! Help <a href="crew.php#support">fund the crew</a>, or <a href="wv.php#support">donate directly to World Vision!</a> Anything you pledge, donate, or contribute will push us one step further towards our goal.</p>
	<?php if($donate==true){ ?>
	<form class="float-right donate" action="https://www.paypal.com/cgi-bin/webscr" method="post">
		<input type="hidden" name="cmd" value="_s-xclick">
		<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
		">
		<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
		<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
	</form>
	<?php } else {?>
	<div class="fb-like float-right" data-href="http://www.charliesvision.com" data-send="true" data-layout="button_count" data-width="200" data-show-faces="true"></div>
	<?php } ?>
	<div class="clear">&nbsp;</div>
</div>
	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-247410-6']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
	
	</script>
  <script type="text/javascript">
jQuery(function($){
	$.supersized({
	// Functionality
	slide_interval          :   12000,		// Length between transitions
	transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
	transition_speed		:	1000,		// Speed of transition
											   
	// Components							
	slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
	slides 					:  	[			// Slideshow Images
										{image : 'img/bg0.jpg', title : 'Hawksbill Mountain; Image Credit: Bill Spruce'},
										{image : 'img/bg1.jpg', title : 'Hawksbill Mountain; Image Credit: Photommo'},  
										{image : 'img/bg2.jpg', title : 'Shenandoah National Park; Image Credit: Photommo'}
								]
	});
});
  </script>
</body>
</html>