package com.example.demo.Service.UserManagement;

import com.example.demo.DTO.CountryUserCount;
import com.example.demo.Repo.UserManagement.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class UserReportService {

    private final UserRepository userRepository;

    public UserReportService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<CountryUserCount> getGeographicalDistribution(Integer month, Integer year) {
        if (month != null && year != null) {
            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.YEAR, year);
            cal.set(Calendar.MONTH, month - 1); // Java months are 0-based
            cal.set(Calendar.DAY_OF_MONTH, 1);
            cal.set(Calendar.HOUR_OF_DAY, 0);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);
            cal.set(Calendar.MILLISECOND, 0);
            Date startDate = cal.getTime();

            cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
            cal.set(Calendar.HOUR_OF_DAY, 23);
            cal.set(Calendar.MINUTE, 59);
            cal.set(Calendar.SECOND, 59);
            Date endDate = cal.getTime();

            return userRepository.countUsersByCountryWithinDateRange(startDate, endDate);
        } else {
            return userRepository.countUsersByCountry();
        }
    }

}
