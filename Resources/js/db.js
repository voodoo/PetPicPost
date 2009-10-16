// function addHost(){
//   try{
//     db.execute("INSERT INTO hosts (host, user, password) VALUES (?, ?, ?)", 'host','user','password');
//     var rs = db.execute("select * from hosts");
//     Alert('Db sie', rs.rowCount);  
//   }catch(e){
//     debug(e);
//   }
// }
// 
// db = Titanium.Database.open("pvr");
// db.execute('CREATE TABLE IF NOT EXISTS hosts (host TEXT, user TEXT, password TEXT)')
// 
// $(window).bind('beforeunload', function() {db.close()} );

// 
// Hosts = {
//   create: function(host,user,password){
//     Db.exec("INSERT INTO hosts (host, user, password) VALUES ('test', 'caption')")
//   }
// }