$(function()
{
  
  //The image selected by the user
  var theImage        = null;
  var theImageDetails = null;
  
  //Display the selected image as a preview
  function stageImage() {
    $("#preview #thumb img").attr('src', theImage.url);
    $("#preview #thumb").css({background:"url(" + theImage.url + ")"})
    $("#buttons").fadeOut(function() {
      $("#preview").fadeIn();
    });
  }

	//Set up image buttons
	$("#getPic").click(function() {
	  Titanium.Media.openPhotoGallery({
			success: function(image,details) {
				theImage = image;
				theImageDetails = details;
				stageImage();
			},
			error: function(e) {
				var a = Titanium.UI.createAlertDialog({title:'Whoops!',message:'There was a problem with your photo gallery.'});
    		a.show();
			},
			cancel: function() {
				//no op
			},
			allowImageEditing:true
		});
	});
	
	$("#takePic").click(function() {
	  Titanium.Media.showCamera({
			success: function(image,details) {
				theImage = image;
				theImageDetails = details;
				stageImage();
			},
			error: function(e) {
				var a = Titanium.UI.createAlertDialog({title:'No Camera',message:'There was a problem with your device camera.'});
    		a.show();
			},
			cancel: function() {
				//no op
			},
			allowImageEditing:true
		});
	});
 	
	$("#updateAct").click(function() {
	  nav('act')
	});		
	
  //Unstage the current Image and reset UI
  function reset() {
    theImage = null;
 	  theImageDetails = null;
    $("#preview").hide();
    $("#preview img").attr('src', '');
    $("#buttons").show();
  }
  	
  //Make XHR request to post picture
	function postPic(pic) {
    $('#status-console').show();
    $('#posting').show();       
    postTo(url('/plogs/upload_iphone_pic'), {
          media:pic, 
          username:Prop.get('username'), 
          password:Prop.get('password'),
          message: $('#message').val()}, function(rsp){
            reset();
            if(rsp.stat == 'ok'){
              $("#posting").hide();
              $("#success").fadeIn();
              setTimeout(function(){
                $("#status-console").fadeOut();
                $("#success").fadeOut();
              }, 3000) 
            }else{
              $("#error-message").html("Connection failed"); /*rsp.err.msg*/                  
              $('#error').fadeIn();
              $('#posting').hide();
              setTimeout(function() {
                $("#status-console").hide();
                $("#error").hide();
                $("#uploadPic").show();
              },8000);
            }//if
        })//postTo
	}//postPic
	
 	$("#uploadPic").click(function() {
 	  if (theImage !== null) {
 	    postPic(theImage);
 	    $('#status-console').show();
 	    $("#posting").show();
 	  }
 	  else {
 	    var a = Titanium.UI.createAlertDialog({
 	      title:'Please select a pic',
 	      message:'Choose a picture from the gallery or take a pic'
 	    });
  		a.show();
 	  }
	});

 	$("#cancelPic").click(function() {
    reset(function() {
      $("#posting").fadeOut(function() {
        $("#success").fadeIn();
      });
      setTimeout(function() {
        $("#success").fadeOut(function() {
          $("#uploadPic").fadeIn();
        });
      },4000);
    });
	});
			
	// Set UI for not authenticated
	function notAuthenticated(){
	   $('#status-console').show();
	   $("#error").html('You must authenticate first');
	   $('#error').show();
	   setTimeout(function(){
	     nav('account');
	   }, 2000);
	}	
	
	function authenticated(){
	  return (Prop.get('authenticated') === '1');
	}
	
	$(function(){
    if(!authenticated()){
      notAuthenticated();      
    } else {
      //setPets();
    }
	})

});