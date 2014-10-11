BEGIN TRANSACTION;
CREATE TABLE user(id int PRIMARY KEY auto_increment, userName varchar(32) , password varchar(32),createTime varchar(32), lastModifyTime varchar(32));
INSERT INTO user ( userName  , password ,createTime , lastModifyTime )VALUES('test','111','1403507414000.0','1403507414000.0');
COMMIT;
BEGIN TRANSACTION;
CREATE TABLE userPubKey(id  int PRIMARY KEY auto_increment, userName varchar(32), UUID varchar(128),pubKey varchar(288),createTime varchar(32), lastModifyTime varchar(32));
INSERT INTO userPubKey(userName , UUID ,pubKey ,createTime, lastModifyTime) VALUES('test', 'Linux Mint','-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClWmPI4AASxWTyB4ins3F6r0zo
LnmMBfyEDnrEoiraDkHDkJBBK7ibphbgi3vxeR1VLwih8NdkWyMS/MbN4anHIZDD
EEK1SMivPbga61U6whGWv2Tldfxq1jQO/jcD9vjsqakqKc18aBGK7HWRuZVc76fV
A5MTYpQs1cA93yfF6wIDAQAB
-----END PUBLIC KEY-----
','1403507414000.0','1403507414000.0');
COMMIT;
BEGIN TRANSACTION;
alter table user add index(userName);
ALTER TABLE userPubKey ADD CONSTRAINT fk_pubKey_user
FOREIGN KEY (userName) 
REFERENCES user(userName)
ON UPDATE CASCADE;
COMMIT;


CREATE INDEX idx_user_userName ON  user (userName);
CREATE INDEX idx_userPubKey_userNameDevice ON  userPubKey (userName,UUID);