BEGIN TRANSACTION;
CREATE TABLE user(id integer PRIMARY KEY autoincrement, userName text , password text,createTime text, lastModifyTime text);
INSERT INTO user ( userName  , password ,createTime , lastModifyTime )VALUES('test','111','1403507414000.0','1403507414000.0');
COMMIT;
BEGIN TRANSACTION;
CREATE TABLE userPubKey(id integer PRIMARY KEY autoincrement, userName text, UUID text,pubKey text,createTime text, lastModifyTime text, foreign key (userName) references user(userName));
INSERT INTO userPubKey(userName , UUID ,pubKey ,createTime, lastModifyTime) VALUES('test', 'Linux Mint','-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClWmPI4AASxWTyB4ins3F6r0zo
LnmMBfyEDnrEoiraDkHDkJBBK7ibphbgi3vxeR1VLwih8NdkWyMS/MbN4anHIZDD
EEK1SMivPbga61U6whGWv2Tldfxq1jQO/jcD9vjsqakqKc18aBGK7HWRuZVc76fV
A5MTYpQs1cA93yfF6wIDAQAB
-----END PUBLIC KEY-----
','1403507414000.0','1403507414000.0');
COMMIT;