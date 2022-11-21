<?php
session_start();
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'company';

$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if($con){
  echo"Connected successfully";
  header('Location: login.php');
}
else {
	
	exit('Failed to connect to MySQL: ' . mysql_connect_error());
}



if ($stmt = $con->prepare('SELECT id, Pwd FROM accounts WHERE UserName = ?')) {
	
	$stmt->bind_param('s', $_POST['UserName']);
	$stmt->execute();
	$stmt->store_result();
  if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $Pwd);
    $stmt->fetch();
    
    if (password_verify($_POST['Pwd'], $Pwd)) {
      
      session_regenerate_id();
      $_SESSION['loggedin'] = TRUE;
      $_SESSION['UserName'] = $_POST['UserName'];
      $_SESSION['id'] = $id;
      header('Location: login.php');
    } else {
      // Incorrect password
      echo 'Incorrect username and/or password!';
    }
  } else {
    // Incorrect username
    echo 'Incorrect username and/or password!';
  }


	$stmt->close();
}

?>