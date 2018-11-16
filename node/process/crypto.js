const crypto = require('crypto');


const aesutil = {};
/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为16位私钥
 * @param iv 向量
 * @returns {string}
 */
aesutil.encryption = function (data, key, iv="") {
    if (!data && key.length == 16) {
        return "";
    }
    console.log('Original cleartext: ' + data);
    const algorithm = 'aes-128-ecb';
    const clearEncoding = 'utf8';
    const cipherEncoding = 'base64';
    const cipher = crypto.createCipheriv(algorithm, key, iv); // 创建加密对象

    const cipherChunks = [];
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    console.log(`${cipherEncoding} ciphertext ${cipherChunks.join('')} \n`);

    aesutil.decryption(cipherChunks.join(''), key);
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为16位私钥
 * @param iv 向量
 * @returns {string}
 */
aesutil.decryption = function (data, key, iv ="") {
    if (!data && key.length == 16) {
        return "";
    }
    const clearEncoding = 'utf8';
    const cipherEncoding = 'base64';
    const algorithm = 'aes-128-ecb';
    const cipherChunks = [];
    const decipher = crypto.createDecipheriv(algorithm, key, iv); // 创建解密对象
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));
    console.log("decryption:", cipherChunks.join(''));
}

const beforString = "j5cFtKCEWftVTAEjuo1K7PvEjmMqeKTikn";
const key = "8r9mPAsWm3N&abcd"; // key 必须为16位字符串

aesutil.encryption(beforString, key);