<?php 
	$username="lacymorr_admin";
	$password="8ecc36c";
	$database="lacymorr_butter";
	mysql_connect(localhost,$username,$password);
	@mysql_select_db($database) or die( "Unable to select database");
	
	if($_POST['fname']){ $fn = $_POST['fname'];
	} else { $fn = 'john'; }
	if($_POST['lname']){ $ln = $_POST['lname'];
	} else { $ln = 'doe'; }
	if($_POST['email']){ $em = $_POST['email'];
	} else { $em = 'anony@mo.us'; }
	if($_POST['amount']){ $am = $_POST['amount'];
	} else { $am = '00.00'; }
	if($_POST['crew']){ $cw = $_POST['crew'];
	} else { $cw = 'Full Crew'; }
	if($_POST['state']){ $st = $_POST['state'];
	} else { $st = 'Full Trail'; }
	$query = "INSERT INTO 'pledge'('fname', 'lname', 'email', 'amount', 'hiker', 'state') VALUES ('$fn','$ln','$em','$am','$cw','$st');";
	
	$err = mysql_query($query);
	$err = 'hello';
	$uid = 0;
	$response['error'] = $err;
	$response['element'] = '';
	$response['uid'] = $uid;
	$ret=json_encode($response);
	echo $ret;
	mysql_close();
?>