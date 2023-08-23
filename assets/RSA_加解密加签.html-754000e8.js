import{_ as i,p as e,q as n,a1 as l}from"./framework-449724a9.js";const s={},r=l(`<h1 id="加解密-rsa-加解密加签" tabindex="-1"><a class="header-anchor" href="#加解密-rsa-加解密加签" aria-hidden="true">#</a> 加解密/RSA_加解密加签</h1><h2 id="加解密加签验签过程" tabindex="-1"><a class="header-anchor" href="#加解密加签验签过程" aria-hidden="true">#</a> 加解密加签验签过程</h2><ul><li>加密、加签 <ul><li>对方公钥加密数据</li><li>本方私钥对加密后数据进行加签，得到加签数据</li></ul></li><li>验签、解密过程 <ul><li>获取对方传送加密数据、加签数据</li><li>用对方公钥对加签数据进行验签</li><li>用本方私钥对加密数据进行解密</li></ul></li></ul><h2 id="密钥及格式生成" tabindex="-1"><a class="header-anchor" href="#密钥及格式生成" aria-hidden="true">#</a> 密钥及格式生成</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 生成私钥
openssl genrsa -out rsa_private_key.pem 1024

openssl rsa -in rsa_private_key.pem -out rsa_public_key.pem -pubout

-- 转换为pkcs8
openssl pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform pem -nocrypt -out rsa_private_key_pkcs8.pem 

-- pkcs8 转pkcs1
openssl rsa -in pkcs8.pem -out pkcs1.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>密钥2048，解密时需要设置 最大解密长度=256</li></ul><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> DEMO</h2><blockquote><p>说明：加解密、验签需要双方密钥格式一至，在测试过程中由于密钥保存时，编辑器自动增加回车换行，一直出现解密失败、验签失败情况。</p><p>密钥直接使用一行字符串，如果用common-codes包的base64转码，出现多行数据，很容易导致解密、验签失败问题</p></blockquote><ul><li>加解密工具类</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package nohi.encrpty;

import org.apache.commons.lang3.ArrayUtils;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.Cipher;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.RSAPublicKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class RSAUtils {
    public static final String SIGN_ALGORITHMS = &quot;SHA1WithRSA&quot;;
    private static String RSA = &quot;RSA&quot;;
    private final static Base64.Decoder DECODER_64 = Base64.getDecoder();
    private final static Base64.Encoder ENCODER_64 = Base64.getEncoder();


    public static KeyPair generateRSAKeyPair() {
        return generateRSAKeyPair(1024);
    }

    public static KeyPair generateRSAKeyPair(int keyLength) {
        try {
            KeyPairGenerator kpg = KeyPairGenerator.getInstance(RSA);
            kpg.initialize(keyLength);
            return kpg.genKeyPair();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String encryptData(String data, PublicKey publicKey){
        return ENCODER_64.encodeToString(RSAUtils.encryptData(data.getBytes(), publicKey));
    }

    public static byte[] encryptData(byte[] data, PublicKey publicKey) {
        try {
            byte[] dataReturn = new byte[0];
            Cipher cipher = Cipher.getInstance(RSA);
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);

            // 加密时超过117字节就报错。为此采用分段加密的办法来加密
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i &lt; data.length; i += 100) {
                byte[] doFinal = cipher.doFinal(ArrayUtils.subarray(data, i,
                        i + 100));
                sb.append(new String(doFinal));
                dataReturn = ArrayUtils.addAll(dataReturn, doFinal);
            }
            return dataReturn;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 验证数字签名函数入口
     *
     * @param plainBytes 待验签明文字节数组
     * @param signBytes  待验签签名后字节数组
     * @param publicKey  验签使用公钥
     * @return 验签是否通过
     * @throws Exception
     */
    public static boolean verifyDigitalSign(byte[] plainBytes, byte[] signBytes, PublicKey publicKey) throws Exception {
        boolean isValid = false;
        try {
            Signature signature = Signature.getInstance(SIGN_ALGORITHMS);
            signature.initVerify(publicKey);
            signature.update(plainBytes);
            isValid = signature.verify(signBytes);
            return isValid;
        } catch (NoSuchAlgorithmException e) {
            throw new Exception(String.format(&quot;验证数字签名时没有[%s]此类算法&quot;, SIGN_ALGORITHMS));
        } catch (InvalidKeyException e) {
            throw new Exception(&quot;验证数字签名时公钥无效&quot;);
        } catch (SignatureException e) {
            throw new Exception(&quot;验证数字签名时出现异常&quot;);
        }
    }

    public static String rsaSign(byte[] encryptByte, PrivateKey privateKey) {
        try {
            Signature signature = Signature.getInstance(SIGN_ALGORITHMS);
            signature.initSign(privateKey);
            signature.update(encryptByte);
            byte[] signed = signature.sign();
            return (new BASE64Encoder()).encodeBuffer(signed);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String decryptData(String content, PrivateKey privateKey) throws IOException {
        return new String(RSAUtils.decryptData((new BASE64Decoder()).decodeBuffer(content), privateKey));
    }

    public static byte[] decryptData(byte[] encryptedData, PrivateKey privateKey) {
        try {
            Cipher cipher = Cipher.getInstance(RSA);
            cipher.init(Cipher.DECRYPT_MODE, privateKey);

            // 解密时超过128字节就报错。为此采用分段解密的办法来解密
            byte[] dataReturn = new byte[0];
            for (int i = 0; i &lt; encryptedData.length; i += 128) {
                byte[] doFinal = cipher.doFinal(ArrayUtils.subarray(encryptedData, i,
                        i + 128));
                dataReturn = ArrayUtils.addAll(dataReturn, doFinal);
            }

            return dataReturn;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static boolean doCheck(byte[] encryptByte, byte[] bs, PublicKey publicKey) {
        try {
            Signature signature = Signature.getInstance(SIGN_ALGORITHMS);
            signature.initVerify(publicKey);
            signature.update(encryptByte);
            return signature.verify(bs);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public static PublicKey getPublicKey(byte[] keyBytes) throws NoSuchAlgorithmException,
            InvalidKeySpecException {
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA);
        PublicKey publicKey = keyFactory.generatePublic(keySpec);
        return publicKey;
    }

    public static PrivateKey getPrivateKey(byte[] keyBytes) throws NoSuchAlgorithmException,
            InvalidKeySpecException {
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA);
        PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
        return privateKey;
    }

    public static PublicKey getPublicKey(String modulus, String publicExponent)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        BigInteger bigIntModulus = new BigInteger(modulus);
        BigInteger bigIntPrivateExponent = new BigInteger(publicExponent);
        RSAPublicKeySpec keySpec = new RSAPublicKeySpec(bigIntModulus, bigIntPrivateExponent);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA);
        PublicKey publicKey = keyFactory.generatePublic(keySpec);
        return publicKey;
    }

    public static PrivateKey getPrivateKey(String modulus, String privateExponent)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        BigInteger bigIntModulus = new BigInteger(modulus);
        BigInteger bigIntPrivateExponent = new BigInteger(privateExponent);
        RSAPublicKeySpec keySpec = new RSAPublicKeySpec(bigIntModulus, bigIntPrivateExponent);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA);
        PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
        return privateKey;
    }

    public static PublicKey loadPublicKey(String publicKeyStr) throws Exception {
        byte[] buffer = (new BASE64Decoder()).decodeBuffer(publicKeyStr);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(buffer);
        return keyFactory.generatePublic(keySpec);
    }

    public static PrivateKey loadPrivateKey(String privateKeyStr) throws Exception {
        byte[] buffer = (new BASE64Decoder()).decodeBuffer(privateKeyStr);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(buffer);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA);
        return keyFactory.generatePrivate(keySpec);
    }

    public static PublicKey loadPublicKey(InputStream in) throws Exception {
        return loadPublicKey(readKey(in));
    }

    public static PrivateKey loadPrivateKey(InputStream in) throws Exception {
        return loadPrivateKey(readKey(in));
    }

    private static String readKey(InputStream in) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(in));
        String readLine = null;
        StringBuilder sb = new StringBuilder();
        while ((readLine = br.readLine()) != null) {
            if (readLine.charAt(0) == &#39;-&#39;) {
                continue;
            } else {
                sb.append(readLine);
                sb.append(&#39;\\r&#39;);
            }
        }
        System.out.println(&quot;1111:\\n&quot; + sb.toString());
        return sb.toString();
    }

    /**
     * 验签
     *
     * @param srcData   原始字符串
     * @param publicKey 公钥
     * @param sign      签名
     * @return 是否验签通过
     */
    public static boolean verify(String srcData, PublicKey publicKey, String sign) throws Exception {
        Signature signature = Signature.getInstance(SIGN_ALGORITHMS);
        signature.initVerify(publicKey);
        signature.update(srcData.getBytes());
        return signature.verify(DECODER_64.decode(sign));
    }

    public static String sign(String data, PrivateKey privateKey) throws Exception {
        Signature signature = Signature.getInstance(SIGN_ALGORITHMS);
        signature.initSign(privateKey);
        signature.update(data.getBytes());
        return ENCODER_64.encodeToString(signature.sign());
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>测试类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Test
    public void testRsa加密加签() throws Exception {
        String pubFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/对方系统公钥字符串.txt&quot;;
        String priFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/RSA_PRI.KEY&quot;;
        String loalPubFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/RSA_PUB.KEY&quot;;

        String priKey = FileUtils.readStringfromPath(priFile);
        String pubKey = FileUtils.readStringfromPath(pubFile);
        String localPub = FileUtils.readStringfromPath(loalPubFile);
        System.out.println(&quot;priKey:&quot; + priKey);
        System.out.println(&quot;pubKey:&quot; + pubKey);
        System.out.println(&quot;localPub:&quot; + localPub);

        System.out.println(&quot;==========================&quot;);

        pubKey = _2Stri(pubKey);
        priKey = _2Stri(priKey);
        localPub = _2Stri(localPub);

        System.out.println(&quot;priKey:\\n&quot; + priKey);
        System.out.println(&quot;pubKey:\\n&quot; + pubKey);
        System.out.println(&quot;localPub:\\n&quot; + localPub);

        PrivateKey privateKey = RSAUtils.loadPrivateKey(priKey);
        PublicKey publicKey = RSAUtils.loadPublicKey(pubKey);
        PublicKey locaPublicKey = RSAUtils.loadPublicKey(localPub);
        // 加密
        String data = &quot;{\\&quot;htbh\\&quot;:\\&quot;20200629\\&quot;}&quot;;
        System.out.println(data);
        String encryptStr = RSAUtils.encryptData(data, publicKey);
        System.out.println(&quot;加密数据:&quot; + encryptStr);

        // RSA签名
        String sign = RSAUtils.sign2(encryptStr, privateKey);
        System.out.println(&quot;加签:&quot; + sign);

        // 验签
        boolean result = RSAUtils.verify2(encryptStr, locaPublicKey, sign);
        System.out.println(&quot;验签结果1:&quot; + result);
    }
    
    @Test
    public void testRsa验签() throws Exception {
        String pubKeyFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/租赁系统公钥字符串.txt&quot;;

        String localSignFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/密文_sign_local.txt&quot;;
        String localDataFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/密文_data_local.txt&quot;;
        String priFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/RSA_PRI.KEY&quot;;

        String priKey = FileUtils.readStringfromPath(priFile);
        String localData = FileUtils.readStringfromPath(localDataFile);
        String localSign = FileUtils.readStringfromPath(localSignFile);
        String localPub = FileUtils.readStringfromPath(pubKeyFile);
        System.out.println(&quot;localData:&quot; + localData);
        System.out.println(&quot;localSign:&quot; + localSign);
        System.out.println(&quot;localPub:&quot; + localPub);

        PublicKey locaPublicKey = RSAUtils.loadPublicKey(localPub);

        // 验签
        boolean result = RSAUtils.verify2(localData, locaPublicKey, localSign);
        System.out.println(&quot;验签结果1:&quot; + result);

        PrivateKey privateKey = RSAUtils.loadPrivateKey(priKey);
        // 解密
        String data = RSAUtils.decryptData(localData, privateKey);
        System.out.println(&quot;原文:&quot; + data);
    }

    @Test
    public void testRsa验签解密() throws Exception {
        String pubFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/
        &quot;;
        String priFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/RSA_PRI.KEY&quot;;

        String contentFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/密文_data.txt&quot;;
        String signFile = &quot;/Users/nohi/work/workspaces-nohi/nohithink/thinkinjava/src/test/resources/密文_sign.txt&quot;;

        String priKey = FileUtils.readStringfromPath(priFile);
        String pubKey = FileUtils.readStringfromPath(pubFile);
        String content = FileUtils.readStringfromPath(contentFile);
        String sign = FileUtils.readStringfromPath(signFile);

//        System.out.println(&quot;priKey:&quot; + priKey);
        System.out.println(&quot;pubKey:&quot; + pubKey);
        System.out.println(&quot;content:&quot; + content);
        System.out.println(&quot;sign:&quot; + sign);

        System.out.println(&quot;==========================&quot;);
        pubKey = _2Stri(pubKey);
        priKey = _2Stri(priKey);
        System.out.println(&quot;pubKey:\\n&quot; + pubKey);
//        System.out.println(&quot;priKey:\\n&quot; + priKey);

        System.out.println(&quot;pubKey:\\n&quot; + pubKey);
        System.out.println(&quot;priKey:\\n&quot; + priKey);
        System.out.println(&quot;content:\\n&quot; + content);
        System.out.println(&quot;sign:\\n&quot; + sign);

        PrivateKey privateKey = RSAUtils.loadPrivateKey(priKey);
        PublicKey publicKey = RSAUtils.loadPublicKey(pubKey);

        // 解密
        String data = RSAUtils.decryptData(content, privateKey);
        System.out.println(&quot;原文:&quot; + data);

        boolean result = RSAUtils.verify2(content, publicKey, sign);
        System.out.println(&quot;验签结果2:&quot; + result);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,11),t=[r];function a(d,v){return e(),n("div",null,t)}const u=i(s,[["render",a],["__file","RSA_加解密加签.html.vue"]]);export{u as default};
