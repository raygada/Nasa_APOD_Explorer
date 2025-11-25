package com.finfactor.nasa_apod_explorer.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.finfactor.nasa_apod_explorer.dto.ApodResponse;
import com.finfactor.nasa_apod_explorer.util.NasaApiClient;

@Service
public class ApodService {

    private final NasaApiClient nasaApiClient;

    public ApodService(NasaApiClient nasaApiClient) {
        this.nasaApiClient = nasaApiClient;
    }

    @Cacheable(value = "apodCache", key = "#date")
    public ApodResponse getApodByDate(String date) {
        if (date == null || date.isBlank()) {
            throw new IllegalArgumentException("Date is required in YYYY-MM-DD format");
        }

        LocalDate selected = LocalDate.parse(date);
        LocalDate min = LocalDate.of(1995, 6, 16);
        LocalDate max = LocalDate.now().plusDays(1); // NASA allows up to tomorrow's date

        if (selected.isBefore(min) || selected.isAfter(max)) {
            throw new IllegalArgumentException(
                "Date must be between 1995-06-16 and " + max.toString()
            );
        }

        return nasaApiClient.getApodByDate(date);
    }

    public ApodResponse getTodayApod() {
    	String todayUtc = LocalDate.now(ZoneId.of("UTC")).toString();
        return getApodByDate(todayUtc);
    }
    @Cacheable(value = "monthlyApods", key = "#year + '-' + #month")
    public List<ApodResponse> getMonthlyApods(int year, int month) {
        List<ApodResponse> apods = new ArrayList<>();
        YearMonth ym = YearMonth.of(year, month);
        for (int day = 1; day <= ym.lengthOfMonth(); day++) {
            String date = LocalDate.of(year, month, day).toString();
            try {
                apods.add(nasaApiClient.getApodByDate(date));
            } catch (Exception e) {
                // Skip invalid or missing dates
                System.out.println("Skipping date: " + date + " -> " + e.getMessage());
            }
        }
        return apods;
    }

    @Cacheable(value = "yearlyApods", key = "#year")
    public List<ApodResponse> getYearlyApods(int year) {
        List<ApodResponse> apods = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            apods.addAll(getMonthlyApods(year, month));
        }
        return apods;
    }
}

