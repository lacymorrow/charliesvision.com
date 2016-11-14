		<?php include('header.php'); ?>
		<div id="wrapper" class="support">
			<div id="donate-img"><a href="http://donate.worldvision.org/OA_HTML/xxwvibeCZzpEntry.jsp?go=donate&campaign=21507326" target="_blank"><img src="img/support.png" alt="" width="450" height="180" /></a></div>
			<h4 class="center large"><a href="http://donate.worldvision.org/OA_HTML/xxwvibeCZzpEntry.jsp?go=donate&campaign=21507326" target="_blank">DONATE DIRECTLY TO WORLD VISION</a></h4>
			<h4>OR MAIL TO:<br />World Vision<br />PO Box 9716<br />Federal Way, WA 98063<br  />Reference code 21507326</h4>
			<div id="pledge">
			<?php
		if($_POST['fname']){
$con = mysql_connect("localhost","lacymorr_admin","musical0");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("lacymorr_butter", $con);

$sql="INSERT INTO `pledge`(`fname`, `lname`, `email`, `amount`, `hiker`, `state`) VALUES ('$_POST[fname]','$_POST[lname]','$_POST[email]','$_POST[amount]','$_POST[hiker]','$_POST[state]')";

if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
mysql_close($con);
echo '<h4 class="center green">YOUR PLEDGE HAS BEEN ADDED</h4>';
}
?> 
					<!-- 
					<h4 class="center large">OR</h4>
					<h4>PLEDGE A DONATION PER MILE</h4>
					<p class="tiny right">ANY AMOUNT FROM $0.01 and up per mile. 2000mi x $0.10 = $200</p>
					<form id="pledge-form" action="/support.php" method="POST">
						<label class="tiny" for="fname">First Name <input class="input" type="text" id="fname" name="fname" maxlength="255" size="12" value="" /></label>
						<label class="tiny" for="lname">Last Name <input class="input" type="text" id="lname" name="lname" maxlength="255" size="12" value="" /></label>
						<label class="tiny" for="email">Email <input class="input" type="text" id="email" name="email" maxlength="255" size="12" value="" /></label>
						<label class="tiny nom" for="amount">$ / mile<input class="input" type="text" id="amount" name="amount" maxlength="255" size="5" value="0.00" /></label>
						<label class="tiny right20" for="hiker">Pledge to 
						<select class="select" id="crew" name="hiker"> 
							<option value="Full Crew" selected="selected">Full Crew</option>
							<option value="Bill" >Bill</option>
							<option value="Daniel" >Daniel</option>
							<option value="Holden" >Holden</option>
							<option value="Lacy" >Lacy</option>
							<option value="Peter" >Peter</option>
							<option value="Sarah" >Sarah</option>			
						</select>
						</label>
						<label class="tiny right20" for="state">Section
						<select class="select" id="state" name="state"> 
							<option value="Full Trail" selected="selected">Full Trail</option>
							<option value="Georgia" >Georgia</option>
							<option value="North Carolina" >North Carolina</option>
							<option value="Tennesee" >Tennesee</option>
							<option value="Virginia" >Virginia</option>
							<option value="West Virginia" >West Virginia</option>
							<option value="Maryland" >Maryland</option>
							<option value="Pennsylvania" >Pennsylvania</option>
							<option value="New Jersey" >New Jersey</option>			
							<option value="New York" >New York</option>			
							<option value="Connecticut" >Connecticut</option>			
							<option value="Massachusetts" >Massachusetts</option>			
							<option value="Vermont" >Vermont</option>			
							<option value="New Hampshire" >New Hampshire</option>			
							<option value="Maine" >Maine</option>			
						</select>
						</label>
						<input class="submit" type="image" src="img/arrow.png" value="Submit" alt="Submit" />
					</form> -->
				</div>
				<p class="tiny right">DONATIONS ARE TAX DEDUCTABLE AND ARE DONATED TO SUPPORT THE CHARLIE BUTTERWORTH MEMORIAL</p>
			<div class="sep">&nbsp;</div>
			<a name="shirt">&nbsp;</a>
			<h3 class="center strikethrough">BUY A T&ndash;SHIRT!</h3>
			<h3 class="center large orange">T&ndash;SHIRTS ARE SOLD OUT!</h3>
			<h4 class="center">ALL T&ndash;SHIRT PROFITS GO TO WORLD VISION TO SUPPORT THE CHARLIE BUTTERWORTH MEMORIAL</h4>
			<div class="right20 float-left">
					<!-- 
					<a href="http://www.charliesvision.yokaboo.com/"><img src="img/shirt.png" alt="" width="440" height="519" /></a>
					<h3 class="center"><a href="http://www.charliesvision.yokaboo.com/">GET YOURS NOW!</a></h3>
					-->
					<img src="img/shirt.png" alt="" width="440" height="519" />
					<h3 class="center strikethrough">GET YOURS NOW!</h3>
			</div>
			<p>The Charlie&rsquo;s Vision tshirts are now accepting pre&ndash;orders</p>
			<h3>last date for pre&ndash;orders is Thursday, April 5th.</h3>
			<p>After gathering ideas from many of Charlie&rsquo;s friends, Jane Hall designed this t&ndash;shirt to help raise money for World Vision. The sun is a subwoofer, representing Charlie&rsquo;s love for music. Within the mountains is the phrase &ldquo;carpe diem,&rdquo; which was the theme of his eulogy given by Brian Silldorff. To the right is a map of the Appalachian Trail, which represents the journey that seven of Charlie&rsquo;s friends are making in his honor this summer. The left edge of the painting includes a harmonica, one of Charlie&rsquo;s favorite hobbies. The right edge includes the Boy Scouts of America logo, acknowledging his accomplishments as an eagle scout. Along the bottom is the phrase &ldquo;discover your own trail&rdquo;, which his friends think describes the way Charlie addressed life in a nonconformist and spontaneous way, along with his initials CGB (Charles Gardner Butterworth). The painting is done in bright hues as an attempt to represent the vibrancy in Charlie&rsquo;s personality and all of the color he brought to our lives. We are hoping to sell many of these shirts to raise money for World Vision, one of Charlie&rsquo;s favorite humanitarian organizations.<br /><span class="bold">All Profits Go To World Vision.</span></p>
			<!-- 
			<h4 class="center strikethrough"><a href="http://www.charliesvision.yokaboo.com/">&laquo; CLICK TO ORDER &raquo;</a></h4><br />
			-->
			<h4 class="center strikethrough">&laquo; CLICK TO ORDER &raquo;</h4><br />
			<div class="tiny center marquee">
				<marquee behavior="scroll" direction="left" scrollamount="2.6" width="920"><p class="center">Recent Contributors: 
					<span class="bold">Steve Pool</span> &mdash; 
					<span class="bold">Rebekah Wood</span> &mdash; 
					<span class="bold">Christopher Grunewold</span> &mdash; 
					<span class="bold">Anna Maria Medvid</span> &mdash; 
					<span class="bold">Elizabeth Carlson</span> &mdash; 
					<span class="bold">William Ford</span> &mdash; 
					<span class="bold">Edward Long</span> &mdash; 
					<span class="bold">Taylor Fiedler&ndash;Heck</span> &mdash; 
					<span class="bold">Sara Green</span> &mdash; 
					<span class="bold">Andrew Johnston</span> &mdash; 
					<span class="bold">Julian Love</span> &mdash; 
					<span class="bold">Hannah Vieregg</span> &mdash; 
					<span class="bold">Elizabeth Schell</span> &mdash; 
					<span class="bold">Emily Hazelton</span> &mdash; 
					<span class="bold">Alison Lee</span> &mdash; 
					<span class="bold">Joanna Krohn</span> &mdash; 
					<span class="bold">Douglas Austin</span> &mdash; 
					<span class="bold">Amanda Harris</span> &mdash; 
					<span class="bold">Megan Bates</span> &mdash; 
					<span class="bold">Stephanie Rhodes</span> &mdash; 
					<span class="bold">Tanner Bass</span> &mdash; 
					<span class="bold">Shelly Read</span> &mdash; 
					<span class="bold">Tracy Murden</span> &mdash; 
					<span class="bold">Joy Groya</span> &mdash; 
					<span class="bold">James Keesler</span> &mdash; 
					<span class="bold">Clayton Lineberger</span> &mdash; 
					<span class="bold">The Schattenfield Family</span> &mdash; 
					<span class="bold">Chris Wiggins</span> &mdash; 
					<span class="bold">Madison Haslam</span> &mdash; 
					<span class="bold">Cathleen Harvey</span> &mdash; 
					<span class="bold">Alexander Grier</span> &mdash; 
					<span class="bold">Elise Johnson</span> &mdash; 
					<span class="bold">Josie Skinner</span> &mdash; 
					<span class="bold">Anita Griffin</span> &mdash; 
					<span class="bold">Elizabeth Walker</span> &mdash; 
					<span class="bold">Andrew Johnston</span> &mdash; 
					<span class="bold">Charlotte Walker</span> &mdash; 
					<span class="bold">Stephanie Shanklin</span> &mdash; 
					<span class="bold">Sarah Leonard</span> &mdash; 
					<span class="bold">James Williams</span> &mdash; 
					<span class="bold">Sarah Drobka</span> &mdash; 
					<span class="bold">The Pappas Family</span> &mdash; 
					<span class="bold">Sarah Geer</span> &mdash; 
					<span class="bold">The Colavita Family</span> &mdash; 
					<span class="bold">Pender Ibach</span> &mdash; 
					<span class="bold">Wallis Lewis</span> &mdash; 
					<span class="bold">The Rorie Family</span> &mdash; 
					<span class="bold">Tonya Lackey</span> &mdash; 
					<span class="bold">Katherine Johnston</span> &mdash; 
					<span class="bold">Jordan Allen</span> &mdash; 
					<span class="bold">Mary Blake Warren</span> &mdash; 
					<span class="bold">Charles Miles</span> &mdash; 
					<span class="bold">Catie Shonts</span> &mdash; 
					<span class="bold">Rebecca Smyth</span> &mdash; 
					<span class="bold">Caroline Mayberry</span> &mdash; 
					<span class="bold">Pauline Ramsey</span> &mdash; 
					<span class="bold">Kristen Rushe</span> &mdash; 
					<span class="bold">The Milton Family</span> &mdash; 
					<span class="bold">Katina Long</span> &mdash; 
					<span class="bold">Megan Gravely</span> &mdash; 
					<span class="bold">Susan Morrow</span></span> &mdash; 
					<span class="bold">Douglas Keesler</span> &mdash; 
					<span class="bold">Meghan Coltrane</span> &mdash; 
					<span class="bold">Chandler Pace</span> &mdash; 
					<span class="bold">Ristie Askew</span> &mdash; 
					<span class="bold">Dove Long</span> &mdash; 
					<span class="bold">Katya Roytburd</span> &mdash; 
					<span class="bold">The Moore Family</span> &mdash; 
					<span class="bold">Richard Moore</span> &mdash; 
					<span class="bold">David Nichols</span> &mdash; 
					<span class="bold">Claire Younts</span> &mdash; 
					<span class="bold">Elizabeth Pfeifer</span> &mdash; 
					<span class="bold">Austin Long</span> &mdash; 
					<span class="bold">Claudia Irvine</span> &mdash; 
					<span class="bold">Peter Wegener</span> &mdash; 
					<span class="bold">Holden Moore</span> &mdash; 
					<span class="bold">Lacy Morrow</span> &mdash; 
					<span class="bold">Sarah Schattenfield</span> &mdash; 
					<span class="bold">Grayson Hearn</span> &mdash; 
					<span class="bold">Daniel Gaspari</span> &mdash; 
					<span class="bold">Mason Todd</span> &mdash; 
					<span class="bold">Sam Osier</span> &mdash; 
					<span class="bold">Carol Staten</span> &mdash; 
					<span class="bold">Anne Cochran</span> &mdash; 
					<span class="bold">Stuart Moore</span> &mdash; 
					<span class="bold">Ellen Burkhart</span> &mdash; 
					<span class="bold">Rebecca Schick</span> &mdash; 
					<span class="bold">Laurie Weddington</span> &mdash; 
					<span class="bold">Liza Gellman</span> &mdash; 
					<span class="bold">Debra Wingard</span> &mdash; 
					<span class="bold">Madison Chandley</span> &mdash; 
					<span class="bold">Jennifer Shawver</span> &mdash; 
					<span class="bold">Jeanne Lindquist</span> &mdash; 
					<span class="bold">Melissa Nash</span> &mdash; 
					<span class="bold">Emma Wilkie</span> &mdash; 
					<span class="bold">Ben MacBain</span> &mdash; 
					<span class="bold">Marsha Gaspari</span> &mdash; 
					<span class="bold">Angus Menzies</span> &mdash; 
					<span class="bold">Emma Blackman</span> &mdash; 
					<span class="bold">Clay Beaver</span> &mdash; 
					<span class="bold">Mary Beaver</span> &mdash; 
					<span class="bold">Laura Winslow</span> &mdash; 
					<span class="bold">Michelle Skipper</span> &mdash; 
					<span class="bold">Alexandra Skipper</span> &mdash; 
					<span class="bold">Victoria Wolbert</span> &mdash; 
					<span class="bold">Lindsay Steelman</span> &mdash; 
					<span class="bold">Mary Kate Gladstone</span> &mdash; 
					<span class="bold">Kimber Corson</span> &mdash; 
					<span class="bold">Jacqueline Kirby</span> &mdash; 
					<span class="bold">Derek Espinosa</span> &mdash; 
					<span class="bold">Spencer Stipp</span> &mdash; 
					<span class="bold">Rhett Postal</span> &mdash; 
					<span class="bold">Emma Huggins</span> &mdash; 
					<span class="bold">Janice Garton</span> &mdash; 
					<span class="bold">Emma Huggins</span> &mdash; 
					<span class="bold">Erin Greear</span> &mdash; 
					<span class="bold">Lauren Biles</span> &mdash; 
					<span class="bold">Whitney Caudle</span> &mdash; 
					<span class="bold">Lauren Biles</span> &mdash; 
					<span class="bold">Celia England</span> &mdash; 
					<span class="bold">Sara Robinson</span> &mdash; 
					<span class="bold">Laura Colavita</span> &mdash; 
					<span class="bold">Kira Kurc</span> &mdash; 
					<span class="bold">Justin Davis</span> &mdash; 
					<span class="bold">Taylor James</span> &mdash; 
					<span class="bold">The Butterworth Family</span> &mdash; 
					<span class="bold">David Prim</span> &mdash; 
					<span class="bold">Michelle Pfingstag</span> &mdash; 
					<span class="bold">Nick Tymann</span> &mdash; 
					<span class="bold">Holly Bryant</span> &mdash; 
					<span class="bold">Katharine Oweida</span> &mdash; 
					<span class="bold">Stacy Joseph</span> &mdash; 
					<span class="bold">Deborah Snyder</span> &mdash; 
					<span class="bold">Bridgette Ewing</span> &mdash; 
					<span class="bold">Margaret Butler</span> &mdash; 
					<span class="bold">Ashton Ratcliffe</span> &mdash; 
					<span class="bold">Patrick McKinney</span> &mdash; 
					<span class="bold">Emily Reynolds</span> &mdash; 
					<span class="bold">Laurie Weddington</span> &mdash; 
					<span class="bold">Jane Hall</span> &mdash; 
					<span class="bold">Joan Thomas</span> &mdash; 
					<span class="bold">John Gray</span> &mdash; 
					<span class="bold">Angie Gray</span> &mdash; 
					<span class="bold">Jessica Harvey</span> &mdash; 
					<span class="bold">Barrett Day</span> &mdash; 
					<span class="bold">Lauren Garrett</span> &mdash; 
					<span class="bold">David Knuckles</span> &mdash; 
					<span class="bold">Kaelyn Malkoski</span> &mdash; 
					<span class="bold">Pamela Johnson</span> &mdash; 
					<span class="bold">Emily Claire Marie Bennett</span> &mdash; 
					<span class="bold">Anna Lawrence Barringer</span> &mdash; 
					<span class="bold">Paul Taylor</span> &mdash; 
					<span class="bold">Tonya Everett</span> &mdash; 
					<span class="bold">Molly Staton</span> &mdash; 
					<span class="bold">Lucy Lewis</span> &mdash; 
					<span class="bold">Hannah Comstock</span> &mdash; 
					<span class="bold">Amanda Hudson</span> &mdash; 
					<span class="bold">Erin Green</span> &mdash; 
					<span class="bold">Sarah Gaspari</span> &mdash; 
					<span class="bold">Kathryn Horn</span> &mdash; 
					<span class="bold">Madelyn Newman</span> &mdash; 
					<span class="bold">Katherine Fisher</span> &mdash; 
					<span class="bold">Sam Myers</span> &mdash; 
					<span class="bold">Lindsay Albright</span> &mdash; 
					<span class="bold">Avery Steelman</span> &mdash; 
					<span class="bold">Anna Colavita</span> &mdash; 
					<span class="bold">Mary Tomlinson</span> &mdash; 
					<span class="bold">James Moore</span> &mdash; 
					<span class="bold">Laura Weisner</span> &mdash; 
					<span class="bold">Mary Cameron Grice</span> &mdash; 
					<span class="bold">Angie Gray</span> &mdash; 
					<span class="bold">Margaret McKinney</span> &mdash; 
					<span class="bold">Benjamin Cheeseman</span> &mdash; 
					<span class="bold">Carlson</span> &mdash; 
					<span class="bold">Aaron Gooding</span> &mdash; 
					<span class="bold">Ellen Weddington</span> &mdash; 
					<span class="bold">Carole Warrer</span> &mdash; 
					<span class="bold">The Hall Family</span> &mdash; 
					<span class="bold">Jessica Blossfield</span> &mdash; 
					<span class="bold">Caroline Rorie</span> &mdash; 
					<span class="bold">Nona Patterson</span>
				</p></marquee>
			</div><br />	
			<!-- 
			<div class="sep">&nbsp;</div>
			<h4 class="large center">DONATE DIRECTLY TO THE ADVENTURE CREW</h4>
			<p class="right tiny">DONATIONS GO DIRECTLY TO THE HIKERS FOR FOOD, GEAR, SHELTER, AND AIRFARE.</p><br />
			<div id="donate-img"><a name="support"><img src="img/support.png" alt="" width="450" height="180" /></a></div>
				<form id="donate-form" action="https://www.paypal.com/cgi-bin/webscr" method="post">
					<input type="hidden" name="cmd" value="_s-xclick">
					<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
					">
					<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
					<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
				</form>
				<br />
				<h1 class="center">Feel the love!</h1>
				<div class="clear">&nbsp;</div>
			</div>
			-->
		<script>
		jQuery(function($){
		    $('marquee').marquee('pointer').mouseover(function () {
		    	$(this).trigger('stop');
		    }).mouseout(function () {
		    	$(this).trigger('start');
		    }).mousemove(function (event) {
		    	if ($(this).data('drag') == true) {
		    		this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
		    	}
		   	}).mousedown(function (event) {
		   		$(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
		   	}).mouseup(function () {
		   		$(this).data('drag', false);
		   	});
		});
		</script>
		<?php include_once('footer.php'); ?>