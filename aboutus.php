<?php
include("./connection.php");


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$errors = array();


if (isset($_POST["sendmail"])) {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  $metch = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
  if (empty($name)) {
    array_push($errors, "Full name is Required");
  }
  if (empty($email)) {
    array_push($errors, "Email is Required");
  }
  if (empty($message)) {
    array_push($errors, "Message is Required");
  }
  // if ((preg_match($email, $match))) {
  //   array_push($errors, "Please Enter the Correct Email!");
  // }

 
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>About Us</title>
 
  <style>

  </style>
  <?php include("./links.php") ?>
 
</head>

<body class="b">

  <?php include("./header.php") ?>
  <?php include("./navigation.php") ?>

 
  <section id="about_us" class="about">
    <img src="./assets/about.png" alt="">
   


  </section>

  <?php include("./footer.php") ?>
 
  <script src="./js/scripts.js"></script>
  <script src="./js/bootstrap.min.js"></script>
	<script src="./js/jquery.min.js"></script>
    <script src="./js/bootstrap.bundle.min.js"></script>
    <script src="./js/slick.min.js"></script>
    <script src="./js/nouislider.min.js"></script>
    <script src="./js/jquery.zoom.min.js"></script>
    <script src="./js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> <!-- 

</body>

</html>