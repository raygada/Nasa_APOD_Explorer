package com.finfactor.nasa_apod_explorer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finfactor.nasa_apod_explorer.dto.ApodResponse;
import com.finfactor.nasa_apod_explorer.service.ApodService;

@CrossOrigin(origins = "http://localhost:5173/") // your Vite frontend URL
@RestController
@RequestMapping("/api/apod")
public class ApodController {

    private final ApodService apodService;

    public ApodController(ApodService apodService) {
        this.apodService = apodService;
    }

    @GetMapping("/today")
    public ApodResponse getTodayApod() {
        return apodService.getTodayApod();
    }

    @GetMapping
    public ApodResponse getApodByDate(@RequestParam(required = false) String date) {
        if (date == null || date.isEmpty()) {
            date = java.time.LocalDate.now().toString(); // default to today
        }
        return apodService.getApodByDate(date);
    }
    
    @GetMapping("/monthly")
    public List<ApodResponse> getMonthlyApods(
            @RequestParam int year,
            @RequestParam int month) {
        return apodService.getMonthlyApods(year, month);
    }

    @GetMapping("/yearly")
    public List<ApodResponse> getYearlyApods(@RequestParam int year) {
        return apodService.getYearlyApods(year);
    }

}

