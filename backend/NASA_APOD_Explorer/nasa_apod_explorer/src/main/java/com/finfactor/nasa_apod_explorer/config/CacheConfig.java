package com.finfactor.nasa_apod_explorer.config;

import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import com.github.benmanes.caffeine.cache.Caffeine;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public Caffeine<Object, Object> caffeineConfig() {
        return Caffeine.newBuilder()
                .maximumSize(200)
                .expireAfterWrite(24, TimeUnit.HOURS);
    }

    @Bean
    public CacheManager cacheManager(Caffeine<Object, Object> caffeine) {
    	CaffeineCacheManager cacheManager = new CaffeineCacheManager(
                "monthlyApods", "yearlyApods", "apodCache");
        cacheManager.setCaffeine(caffeine);
        return cacheManager;
    }
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

