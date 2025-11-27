package com.finfactor.nasa_apod_explorer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApodResponse {
	private String date;
    private String title;
    private String explanation;
    private String url;
    
	@JsonProperty("media_type")
    private String mediaType;
    private String hdurl;
	@JsonProperty("service_version")
    private String serviceVersion;
    private String copyright;
	
}

