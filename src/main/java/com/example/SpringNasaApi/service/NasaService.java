package com.example.SpringNasaApi.service;



import com.example.SpringNasaApi.dto.APODResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;

@Service
public class NasaService {
    @Value("${nasa.api.key}")
    private String apiKey;

    private static final String NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";

    public List<APODResponse> getAPOD(String date, String start_date, String end_date, Integer count, Boolean thumbs) {
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(NASA_APOD_URL)
                .queryParam("api_key", apiKey)
                .queryParam("date", date)
                .queryParam("start_date", start_date)
                .queryParam("end_date", end_date)
                .queryParam("count", count)
                .queryParam("thumbs", thumbs);

        String url = uriBuilder.toUriString();

        // Attempt to fetch as a list first
        try {
            ResponseEntity<List<APODResponse>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<APODResponse>>() {}
            );
            return responseEntity.getBody();
        } catch (Exception e) {
            // Fallback for single object response
            try {
                APODResponse singleResponse = restTemplate.getForObject(url, APODResponse.class);
                return Collections.singletonList(singleResponse);
            } catch (Exception ex) {
                // Handle the error appropriately
                throw new RuntimeException("Error fetching APOD data: " + ex.getMessage(), ex);
            }
        }
    }
}

