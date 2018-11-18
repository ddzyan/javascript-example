const crypto = require('crypto');

const MD5Encryption = function (data) {
    const algorithm = 'md5';

    const encryption = crypto.createHash(algorithm);//创建指定加密算法的对象
    let encryptionted = encryption.update(data).digest('hex');
    console.log(`${algorithm} encryptionted :`, encryptionted,'\n');
    return encryptionted;
}

MD5Encryption("12312");

const aesutil = {};
/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为16位私钥
 * @param iv 向量
 * @returns {string}
 */
aesutil.encryption = function (data, key, iv = "") {
    if (!data && key.length == 16) {
        console.error("parameter error");
        return "";
    }
    console.log('Original cleartext: ' + data);
    const algorithm = 'aes-128-ecb'; //算法
    const clearEncoding = 'utf8'; //字符串编码
    const cipherEncoding = 'base64';
    const cipher = crypto.createCipheriv(algorithm, key, iv); // 创建加密对象

    let encrypted = cipher.update(data, clearEncoding, cipherEncoding);
    encrypted += cipher.final(cipherEncoding);
    console.log(`${cipherEncoding} ciphertext ${encrypted} \n`);
    return encrypted;
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为16位私钥
 * @param iv 向量
 * @returns {string}
 */
aesutil.decryption = function (data, key, iv = "") {
    if (!data && key.length == 16) {
        console.error("parameter error");
        return "";
    }
    const clearEncoding = 'utf8';
    const cipherEncoding = 'base64';
    const algorithm = 'aes-128-ecb';
    const decipher = crypto.createDecipheriv(algorithm, key, iv); // 创建解密对象

    let decryption = decipher.update(data, cipherEncoding, clearEncoding);
    decryption += decipher.final(clearEncoding);
    console.log(`${cipherEncoding} decryption ${decryption} \n`);
}

const data = "5Jpvj5cFtKCEWftVTAEjuo1";
const key = "8r9mPAsWm3N&abcd"; // key 必须为16位字符串

const encryptedData = aesutil.encryption(data, key);
aesutil.decryption(encryptedData, key);