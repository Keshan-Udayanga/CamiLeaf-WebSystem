package com.example.demo.Service.UserManagement;

import com.example.demo.Entity.UserManagement.Customer;
import com.example.demo.Entity.UserManagement.User;
import com.example.demo.Repo.UserManagement.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Calendar;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public User createUser(User users) {
        if(userRepo.existsByEmail(users.getEmail())){
            throw new RuntimeException("Email already registered");
        }

        Date now = new Date();
        users.setCreatedAt(now);
        users.setLastLogin(null);

        if (users.getPassword() != null) {
            users.setPassword(passwordEncoder.encode(users.getPassword()));
        }

        userRepo.save(users);
        return users;
    }

    public Iterable<User> getUsers() {
        return this.userRepo.findAll();
    }

    public User updateUser(String id, User users) {

        return userRepo.findById(id).map(user -> {
            user.setFirstName(users.getFirstName());
            user.setLastName(users.getLastName());
            user.setEmail(users.getEmail());
            user.setPhoneNumber(users.getPhoneNumber());
            user.setAddress(users.getAddress());
            user.setRole(users.getRole());
            user.setStatus(users.getStatus());
            return userRepo.save(user);
        }).orElse(null);
    }

    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

    public User getUserById(String id) {
        return userRepo.findById(id).get();
    }

    public Optional<User> getUserByEmail(String email){
        return userRepo.findByEmail(email);
    }

    public User signupCustomer(Customer customer){

        if(userRepo.existsByEmail(customer.getEmail())){
            throw new RuntimeException("Email already registered");
        }

        customer.setPassword(passwordEncoder.encode(customer.getPassword()));

        return userRepo.save(customer);
    }

    public void changePassword(String id, String oldPass, String newPass) {
        User user = getUserById(id);


        if (!passwordEncoder.matches(oldPass, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }


        user.setPassword(passwordEncoder.encode(newPass));
        userRepo.save(user);
    }

    public long removeInactiveUsers() {
        List<User> inactiveUsers = userRepo.findByStatus("Inactive");
        long count = inactiveUsers.size();
        userRepo.deleteByStatus("Inactive");
        return count;
    }

    public long autoInactivateUsers(int daysInactive) {
        Date now = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(now);
        cal.add(Calendar.DAY_OF_YEAR, -daysInactive);
        Date thresholdDate = cal.getTime();

        List<User> inactiveUsers = userRepo.findAll().stream()
                .filter(u -> u.getStatus().equals("Active") && u.getLastLogin() != null && u.getLastLogin().before(thresholdDate))
                .peek(u -> u.setStatus("Inactive"))
                .toList();

        userRepo.saveAll(inactiveUsers);

        return inactiveUsers.size();
    }



}
