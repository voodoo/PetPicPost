var PROD     = false;
var DEV_HOST = 'http://localhost:3000';
var HOST     = 'http://petvetrecs.com';

function url(path){
  return (PROD ? HOST : DEV_HOST) + path;  
}

function Alert(title,msg){
  	var a = Titanium.UI.createAlertDialog({
	      title:title,
	      message:msg
	    });
		a.show();
}

function nav(to) {
  Titanium.UI.createWindow({url:to+'.html', hideNavBar:true}).open({animated:true});  
}	

function debug(o){
  Titanium.API.debug(o);
}

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
      var answer = eval('(' + rsp + ')');
          callback(answer);
    }catch(e){
      Alert("Failure", e.message)
    }
    
	};	
}

Prop = {
  get:function(id){
    return Titanium.App.Properties.getString(id)
  },
  set: function(id,value){
    Titanium.App.Properties.setString(id,value)
  }
}