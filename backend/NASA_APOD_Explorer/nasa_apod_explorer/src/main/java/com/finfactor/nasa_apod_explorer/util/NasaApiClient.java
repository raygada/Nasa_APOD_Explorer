package com.finfactor.nasa_apod_explorer.util;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.finfactor.nasa_apod_explorer.dto.ApodResponse;

@Component
public class NasaApiClient {

    @Value("${nasa.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    public NasaApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ApodResponse getApodByDate(String date) {
    	try {
        if (date == null || date.isEmpty()) {
            date = java.time.LocalDate.now().toString();
        }

        String url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=" + date;

        System.out.println("Fetching NASA APOD: " + url); // Debug log

        ResponseEntity<Map<String, Object>> responseEntity =
                restTemplate.exchange(url, HttpMethod.GET, null,
                        new ParameterizedTypeReference<Map<String, Object>>() {});

        Map<String, Object> response = responseEntity.getBody();

        if (response == null || response.isEmpty()) {
            throw new RuntimeException("NASA API returned null for date: " + date);
        }

        return new ApodResponse(
            (String) response.get("date"),
            (String) response.get("title"),
            (String) response.get("explanation"),
            (String) response.get("url"),
            (String) response.get("media_type"),
            (String) response.get("hdurl"),
            (String) response.get("service_version"),  
            response.get("copyright") != null ? (String) response.get("copyright") : ""
        );
    
    }catch (HttpClientErrorException e) {
        throw new IllegalArgumentException(e.getResponseBodyAsString());
    }
    }
}

