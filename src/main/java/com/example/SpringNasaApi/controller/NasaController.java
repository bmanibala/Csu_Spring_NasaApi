package com.example.SpringNasaApi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringNasaApi.dto.APODResponse;
import com.example.SpringNasaApi.service.NasaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class NasaController {

    private final NasaService nasaService;

    @Autowired
    public NasaController(NasaService nasaService) {
        this.nasaService = nasaService;
    }

    @GetMapping("/apod")
    public List<APODResponse> getAPOD(@RequestParam(required = false) String date,
            @RequestParam(required = false) String start_date,
            @RequestParam(required = false) String end_date,
            @RequestParam(required = false) Integer count,
            @RequestParam(required = false) Boolean thumbs) {
        return nasaService.getAPOD(date, start_date, end_date, count, thumbs);
    }
}
