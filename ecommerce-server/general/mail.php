<?php
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;
$reciever = $_POST['reciever'];

$mail->isSMTP();                                    
$mail->Host = 'smtp1.gmail.com;smtp2.mail.yahoo.com'; 
$mail->SMTPAuth = false;                               
$mail->Username = $reciever;// add username
$mail->Password = '';                           
$mail->SMTPSecure = 'tls';                           

$mail->From = 'hippoware@gmail.com';
$mail->FromName = 'Hippo ware';
$mail->addAddress($reciever, $reciever); // Add a recipient: email, name
$mail->addReplyTo('hippoware@info.com', 'Information');


$mail->WordWrap = 200;                                
$mail->isHTML(true);                                  

$mail->Subject = 'Reset Password';
$mail->Body    = 'Find below a link to reset your password <b>and dont forget it again!</b> <br> <a href="#"> Reset password<a>';
$mail->AltBody = 'Find below a link to reset your password and dont forget it again!';

$mail->send();
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
