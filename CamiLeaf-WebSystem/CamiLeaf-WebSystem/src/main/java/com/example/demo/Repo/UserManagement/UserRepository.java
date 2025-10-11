package com.example.demo.Repo.UserManagement;

import com.example.demo.DTO.CountryUserCount;
import com.example.demo.Entity.UserManagement.User;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    List<User> findByStatus(String status);


    void deleteByStatus(String status);

    @Aggregation(pipeline = {
            "{ $match: { role: 'Customer' } }",
            "{ $group: { _id: '$country', count: { $sum: 1 } } }"
    })
    List<CountryUserCount> countUsersByCountry();

    @Aggregation(pipeline = {
            "{ $match: { createdAt: { $gte: ?0, $lte: ?1 }, role: 'Customer' } }",
            "{ $group: { _id: '$country', count: { $sum: 1 } } }"
    })
    List<CountryUserCount> countUsersByCountryWithinDateRange(Date startDate, Date endDate);


}
