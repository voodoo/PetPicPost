var PROD     = false;
var DEV_HOST = 'http://localhost:3000';
var HOST     = 'http://petvetrecs.com';

// Call correct host plus url
function url(path){
  return (PROD ? HOST : DEV_HOST) + path;  
}

// Shortcut to native alert
function Alert(title,msg){
  	var a = Titanium.UI.createAlertDialog({
	      title:title,
	      message:msg
	    });
		a.show();
}
// Show a page
function show(id){
 $('.page').hide();
 $('#' + id).slideDown();
};


// Shortcut to debug
function debug(o){
  Titanium.API.debug(o);
}

// Hardwire simple post
function postTo(url, params, callback){
  if(Titanium.Network.NETWORK_NONE) {
    var a = Titanium.UI.createAlertDialog({
      title:"No Connection",
      message:'Are you connected to the internet?'
    });
    a.show();
    return false;
  }
  var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST',url);
	xhr.send(params);
  xhr.onload = function() {
    try{
      var rsp    = this.responseText;
      debug(rsp);
      var answer = eval('(' + rsp + ')');
          callback(answer);
    }catch(e){
      //Alert("Failure", e.message)
      callback({stat:'fail',err:{msg:e.message}});
    }
    
	};	
}

// Pull in pets, if authed
function setPets(){
  postTo(url('/users/pets'), 
    {
      username:Prop.get('username'), 
      password:Prop.get('password')
    },
      function(rsp)
      {
        if(rsp.stat == 'ok')
        {            
          var pets = rsp.pets;
          var options = '';
          for(var i = 0 ; i < pets.length ; i++ ){
            options += '<option value="' + pets[i].id + '">' + pets[i].name + '</option>';
          }
          $('select#pet').html(options);
        }else
        {
          //Alert('Error', 'Could not load pets');
        }
    })    
}
	
// Shortcut to Tit Props - all strings
Prop = {
  get:function(id){
    return Titanium.App.Properties.getString(id);
  },
  set: function(id,value){
    Titanium.App.Properties.setString(id,value);
  }
}

function nav(to) {
  var tab = Titanium.UI.getTabByName(to); 
  Titanium.UI.setActiveTab(tab);   
  //Titanium.UI.createWindow({url:to+'.html', hideNavBar:true}).open({animated:true});  
}	

