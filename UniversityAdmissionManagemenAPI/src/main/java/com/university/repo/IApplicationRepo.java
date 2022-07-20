package com.university.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.university.entity.Application;

public interface IApplicationRepo extends JpaRepository<Application, Integer>{

	List<Application> findByUserId(Integer id);
}
