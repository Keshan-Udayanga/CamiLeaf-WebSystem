package com.example.demo.Repo.ResourceManagement;

import com.example.demo.Entity.ResourceManagement.Resource;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResourceRepository extends MongoRepository<Resource,String> {
}
