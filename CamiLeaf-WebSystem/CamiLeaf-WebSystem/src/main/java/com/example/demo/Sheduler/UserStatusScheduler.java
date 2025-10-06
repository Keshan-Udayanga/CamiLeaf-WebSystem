package com.example.demo.Sheduler;

import com.example.demo.Service.UserManagement.UserServices;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class UserStatusScheduler {

    private final UserServices userServices;

    public UserStatusScheduler(UserServices userServices) {
        this.userServices = userServices;
    }

    // Runs every day at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void markInactiveUsers() {
        int daysInactive = 30; // Inactive threshold
        long count = userServices.autoInactivateUsers(daysInactive);
        System.out.println("Auto-inactivated " + count + " users.");
    }
}
