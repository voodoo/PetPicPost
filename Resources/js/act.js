$(function()
{

  //populate input fields from properties
  var u = Prop.get('username');
  var p = Prop.get('password');
  
  if (u !== '') {
    $("#username").val(u);
  }
  if (p !== '') {
    $("#password").val(p);
  }
  
	$('#noAccount').click(function() { 
    Titanium.Platform.openURL(url(''))
	});
	
	$("#saveAccount").click(function() {
	  var username = $("#username").val();
	  var password = $("#password").val();
	  if (username === '' || password === '') {
      Alert('Account Info', 'Please insert a Username and Password')
	  }
	  else {
  	    Prop.set('username',username);
    	  Prop.set('password',password);
    	  $('#actSaved').fadeIn();
    	  postTo(url("/sessions/remote_login"), {username:username, password:password}, function(rsp){
    	    if(rsp.stat == 'ok'){
    	      Prop.set('authenticated', '1')
    	      setPets();
    	      $('#actSaved').html('<img src="img/accept.png" align="center"/> Account Authorized');
    	    } else {
    	      Prop.set('authenticated', '0')
    	      $('#actSaved').html('<img src="img/cross.png" align="center"/> Failed to Authorize');
    	    }
    	    setTimeout(function(){
    	      $('#actSaved').fadeOut();
    	    }, 5000)
    	  });
	  }
	});
	
	

});