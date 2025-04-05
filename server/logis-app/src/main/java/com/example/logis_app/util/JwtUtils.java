package com.example.logis_app.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

/**
 * JWT工具类
 */
public class JwtUtils {

    // JWT有效期为一小时
    public static final Long JWT_TTL = 60 * 60 * 1000L;

    // 设置固定的密钥，通过SHA-256确保密钥足够长
    private static final String KEY_STRING = "tuslawebsite";
    private static final SecretKey SECRET_KEY = generateKey(KEY_STRING);

    /**
     * 生成一个固定的密钥，基于提供的字符串
     */
    private static SecretKey generateKey(String keyString) {
        try {
            // 使用SHA-256哈希来确保密钥长度足够
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] keyBytes = digest.digest(keyString.getBytes(StandardCharsets.UTF_8));
            return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating JWT key", e);
        }
    }

    /**
     * 获取UUID
     */
    public static String getUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    /**
     * 生成JWT
     * @param subject token中要存放的数据（json格式）
     * @return JWT令牌
     */
    public static String createJWT(String subject) {
        JwtBuilder builder = getJwtBuilder(subject, null, getUUID());
        return builder.compact();
    }

    /**
     * 生成JWT
     * @param subject token中要存放的数据（json格式）
     * @param ttlMillis token超时时间
     * @return JWT令牌
     */
    public static String createJWT(String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, getUUID());
        return builder.compact();
    }

    /**
     * 创建token
     * @param id 令牌ID
     * @param subject 主题
     * @param ttlMillis 过期时间
     * @return JWT令牌
     */
    public static String createJWT(String id, String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, id);
        return builder.compact();
    }

    /**
     * 获取JwtBuilder
     */
    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        if (ttlMillis == null) {
            ttlMillis = JWT_TTL;
        }

        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);

        return Jwts.builder()
                .setId(uuid)              //唯一的ID
                .setSubject(subject)      // 主题  可以是JSON数据
                .setIssuer("sg")          // 签发者
                .setIssuedAt(now)         // 签发时间
                .signWith(signatureAlgorithm, SECRET_KEY) // 使用HS256对称加密算法签名
                .setExpiration(expDate);  // 设置过期时间
    }

    /**
     * 解析JWT
     * @param jwt JWT令牌
     * @return Claims
     * @throws Exception 解析异常
     */
    public static Claims parseJWT(String jwt) throws Exception {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(jwt)
                .getBody();
    }

    // 示例用法
    public static void main(String[] args) throws Exception {
        // 生成新的JWT令牌
        String token = createJWT("testUser");
        System.out.println("Generated Token: " + token);

        // 解析JWT令牌
        Claims claims = parseJWT(token);
        System.out.println("Parsed Claims: " + claims);
    }
}