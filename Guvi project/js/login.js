function formsubmit(){
  var emailid=document.getElementById('Email').Value;
  var passcode=document.getElementById('Pwd').value;
  
  var formdata='Email='+emailid+'&Pwd='+passcode;
   if(emailid==""){
    alert("Please enter Email Id" );
    return false;
   }
   if(passcode==""){
    alert("Please enter Password");
    return false;
   }
   else{
   $ajax({
    type:"Post",
    url:"index.php",
    data:formdata,
    Cache:false,
    success:function(html){
      alert(html);
    }
   }) ;

   }
   return false;
   }


