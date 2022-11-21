<?php

session_start();

if (!isset($_SESSION['loggedin'])) {
	header('Location: login.html');
	exit;
}
?>