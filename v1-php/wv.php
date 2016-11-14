		<?php include('header.php'); ?>
		<div id="wrapper">
			<div class="clear">&nbsp;</div>
			<div class="details charlie">
				<div class="vid">
					<video width="426" height="320" poster="img/thumb.png" controls="controls" preload="none">
					    <!-- MP4 for Safari, IE9, iPhone, iPad, Android, and Windows Phone 7 -->
					    <source type="video/mp4" src="video/30hf.mp4" />
					    <!-- WebM/VP8 for Firefox4, Opera, and Chrome -->
					    <source type="video/webm" src="video/30hf.webm" />
					    <!-- Ogg/Vorbis for older Firefox and Opera versions -->
					    <source type="video/ogg" src="video/30hf.ogv" />
					    <!-- Flash fallback for non-HTML5 browsers without JavaScript -->
					    <object width="426" height="320" type="application/x-shockwave-flash" data="flashmediaelement.swf">
					        <param name="movie" value="flashmediaelement.swf" />
					        <param name="flashvars" value="controls=true&file=video/30hf.mp4" />
					        <!-- Image as a last resort -->
					        <img src="img/thumb.png" width="426" height="320" title="No video playback capabilities" />
					    </object>
					</video>
					<p class="vid-details">30 Hour Famine Fundraiser</p>
				</div>
				<h4><a href="#support">&raquo; DONATE DIRECTLY TO WORLD VISION &laquo;</a></h4>
				<p>Inspired by Christian humanitarian values, World Vision is an international organization that promotes justice and provides emergency relief, education, food, and health care to impoverished children and their communities around the world. In 2007 Charlie was chosen to be the youth national spokesperson for World Vision&rsquo;s 30 Hour Famine. He was featured on the promotional video (adjacent) along with Ronald, a 13 year old boy from Uganda. Following the making of the video, Charlie was chosen to travel to Uganda as a representative of World Vision. There, he worked to feed malnourished refugee children from Sudan and built a lasting relationship with Ronald. Funds donated to World Vision in Charlie Butterworth&rsquo;s name go Africa to help Ronald and the village Charlie worked with in Uganda. Please reference code: 21507326 when making a donation. A link to donate directly to World Vision through this site is soon to come. Currently donations can be directed towards the World Vision Charlie Butterworth memorial fund by calling 888&ndash;511&ndash;6461 or send checks to:<br />World Vision, PO Box 9716, Federal Way, WA 98063. <br />Please reference code: 21507326 when making a donation.</p>
				<p>The following options will soon be available.</p>
				<ul>
					<li>Thru-hiker Promise</li>
					<li>State Promise</li>
					<li>Lump Donation</li>
				</ul>
				<div class="clear">&nbsp;</div>
				<h4>Thru-hiker Promise</h4>
				<ol>
					<li>Pick a hiker and motivate them!  Pledge to sponsor them through every mile trudged ; ). Help us keep our momentum on the 2,184 mile hike. (2,000 miles x 50 cents/mile = $1,000 donation) All donations to World Vision.</li>
					<li>Sponsor the Group! Pledge an amount for every mile the group completes as a whole. 2000 miles x 10 cents/mile = $200.00 donation &ndash;&ndash;  All donations go to World Vision.</li>
				</ol>
				<p>Feel 2,000 miles is too much? Go for the State Promise!</p>
				<h4>State Promise</h4>
				<ol>
					<li>Choose a hiker and 1 state of 14 the Appalachian Trail traverses. Just like the Thru&ndash;Hiker Promise, sponsor your hiker for every mile they complete in GA, NC, VA, etc. All donations to World Vision.</li>
					<li>Sponsor the Group! Choose your favorite section/state of the Appalachian Trail to sponsor the group for every mile they complete within your chosen state. All donations to World Vision.</li>
				</ol>
				<h4>Lump Donation</h4>
				<p>Lump Sum Promise; Click here to donate directly to World Vision!</p>
				<p>Thank you Charlie Butterworth community! Every dollar takes an ounce off our pack.</p>
				<a name="support"></a>
				<div id="donate-img"><a href="http://donate.worldvision.org/OA_HTML/xxwvibeCZzpEntry.jsp?go=donate&campaign=21507326" target="_blank"><img src="img/support.png" alt="" width="450" height="180" /></a></div>
				<h4 class="center"><a href="http://donate.worldvision.org/OA_HTML/xxwvibeCZzpEntry.jsp?go=donate&campaign=21507326" target="_blank">&laquo; DONATE! &raquo;</a></h4>
				<br />
			</div>
		</div>
		<div class="clear">&nbsp;</div>
		<script>
		    $('video,audio').mediaelementplayer(/* Options */);
		    jQuery(function($){
		    	$('#pledge-form').submit(function(e){
		    		e.preventDefault();
		    		var loadurl = 'pledge.php';
		    		jQuery.post(
				        loadurl,  
				        jQuery(this).serialize(),
				        function(responseText){
				        	alert(responseText);
				        	if(responseText.error===""){
				        		alert('asdf');
							} else {
								alert('awfv');
							}
				        },  
				        "json"  
				    );
		    		return false;
		    	});
		    });
	    </script>
		<?php include_once('footer.php'); ?>