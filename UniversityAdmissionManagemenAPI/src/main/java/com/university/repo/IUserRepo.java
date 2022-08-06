package com.university.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.university.entity.User;

public interface IUserRepo extends JpaRepository<User, Integer>{
	 
	User findByEmail(String email);
	List<User> findByRole(Integer role);

}
