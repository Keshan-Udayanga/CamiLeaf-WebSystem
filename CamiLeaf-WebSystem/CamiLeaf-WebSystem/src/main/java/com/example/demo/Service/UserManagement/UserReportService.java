package com.example.demo.Service.UserManagement;

import com.example.demo.DTO.CountryUserCount;
import com.example.demo.Repo.UserManagement.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserReportService {

    private final UserRepository userRepository;

    public UserReportService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<CountryUserCount> getGeographicalDistribution() {
        return userRepository.countUsersByCountry();
    }
}
