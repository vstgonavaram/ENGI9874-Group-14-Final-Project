package com.university.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.university.entity.Program;

public interface IProgramRepo extends JpaRepository<Program, Integer>{

	
	Program findByName(String name);
}
