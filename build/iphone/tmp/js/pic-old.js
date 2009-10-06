$(function()
{
  
  //The image selected by the user
  var theImage        = null;
  var theImageDetails = null;
  
  //Display the selected image as a preview
  function stageImage() {
    $("#preview img").attr('src', theImage.url);
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
  function reset(callback) {
    theImage = null;
 	  theImageDetails = null;
    $("#preview").hide();
    $("#preview img").attr('src', '');
    $("#buttons").show();
    callback.call();
  }
  	
  //Make XHR request to post picture
	function postPic(pic) {
	  if (Titanium.Network.NETWORK_NONE) {
	    var a = Titanium.UI.createAlertDialog({
 	      title:'We\'re Sorry...',
 	      message:'Are you connected to the internet?'
 	    });
 	    a.show()
	  }
	  else {
      var xhr = Titanium.Network.createHTTPClient();
      $('#status-console').show();
      $('#posting').show();
  		xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          var parser = new DOMParser();
          var responseText = this.responseText;
          debug(responseText);
          var doc = parser.parseFromString(responseText, "text/xml");
          
          $(doc).find("rsp").each(function() {
            var stat = $(this).attr('stat'); //We only get this on an error
            if (stat == null || stat !== 'fail') {
              //$('#status-console').hide();
              reset(function() {
                $("#posting").hide();
                $("#success").show();
                setTimeout(function(){
                  $("#status-console").hide();
                }, 3000)
                // $("#posting").fadeOut(function() {
                //   $("#success").fadeIn();
                // });
                // setTimeout(function() {
                //   $("#success").fadeOut(function() {
                //     $("#uploadPic").fadeIn();
                //   });
                // },4000);
              });
            }
            else {              
                reset(function() {                  
                  $(doc).find("err").each(function() {                
                    $("#error-message").html($(this).attr('msg'));                  
                    $('#error').show();
                    $('#posting').hide();
                    setTimeout(function() {
                      $("#status-console").hide();
                      $("#error").hide();
                      $("#uploadPic").show();
                    },8000);
                  });
                });
            }
          });
        }
  		};
  			    
  		xhr.open('POST',url('/plogs/upload_iphone_pic'));
  		xhr.send({
  			media:pic,
  			username: Titanium.App.Properties.getString('username'),
  			password: Titanium.App.Properties.getString('password'),
  			message: $('#message').val()
  		});
	  }
	}
	
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
			
	
 	//Initialize application
 	var u = Titanium.App.Properties.getString('username');
  var p = Titanium.App.Properties.getString('password');
  if (u === '' || u === null || p === '' || p === null) {
    nav('act');
  }
});