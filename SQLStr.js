//SQL used in UserDAO
exports.COUNTTOTALUSERS = "select count(*) as total from user";
exports.FINDALLUSERS = "select * from user";
exports.FINDUSERBYUSERNAME = "select * from user where userName = ?";
exports.CREATEUSER = "insert into user (userName,password,createTime,lastModifyTime) values (?,?,?,?)";
exports.FINDUSERBYUSERNAMEPWD="select * from user where userName = ? and password=?";
exports.DELETEUSER="delete user where userName=?";
//exports.CREATECATEGORY = "insert into category (id,filename,postfix,size,path,location,createTime,lastModifyTime,others) values (null,?,?,?,?,?,?,?,?)";

//SQL used in UserPubKeyDAO
exports.COUNTTOTALUSERPUBKEYS = "select count(*) as total from userPubKey";
exports.COUNTUSERPUBKEYSBYUSERNAME = "select count(*) as total from userPubKey where userName=?";
exports.FINDPUBKEYBYND = "select * from userPubKey where userName = ? and UUID=?";
exports.FINDPUBKEYSBYNAME = "select * from userPubKey where userName = ?";
exports.CREATEUSERPUBKEY = "insert into userPubKey (userName,UUID,pubKey,createTime,lastModifyTime) values (?,?,?,?,?)";
exports.DELETEPUBKEY = "delete from userPubKey where userName = ? and UUID=?";
exports.UPDATEPUBKEY = "update userPubKey set pubKey = ? , lastModifyTime=? where userName = ? and UUID=?";
