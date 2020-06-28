const sha256 = require('js-sha256').sha256;

const username = 'saleadmin';
const pwdStr = '123456';

const pwd = sha256(pwdStr);
console.log(pwd);

console.log(sha256(`CRCLDAP+saleadmin+${pwd.toUpperCase()}`));

const encryptPwd = sha256(pwdStr).toLocaleUpperCase();
console.log(encryptPwd);
const upperUsername = username.toLocaleUpperCase();
const saltEncrypt = sha256(`CRCLDAP+${upperUsername}+${encryptPwd}`).toLocaleUpperCase();
console.log(saltEncrypt);
