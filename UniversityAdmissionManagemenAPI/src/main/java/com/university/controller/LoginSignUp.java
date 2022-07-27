/**
 * 
 */
package com.university.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.university.entity.User;
import com.university.entity.UserEntity;
import com.university.repo.IUserRepo;

/**
 * @author kartikuppal
 *
 */

@RestController

public class LoginSignUp {
	
	@Autowired 
	private IUserRepo userRepo;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/signup")
	public Map signup(@RequestBody User user) {
		User u = userRepo.findByEmail(user.getEmail());
		if(!ObjectUtils.isEmpty(u)) {
			 return Collections.singletonMap("status", false);

		}
		userRepo.save(user);
		return Collections.singletonMap("status", true);

		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/login")
	public UserEntity login(@RequestBody User user) {
		
		User u = userRepo.findByEmail(user.getEmail());
		UserEntity userEntity = new UserEntity();
		
		if(ObjectUtils.isEmpty(u)) {
			userEntity.setMessage("Invalid Email");
		}
		if(!user.getPassword().equals(u.getPassword())) {
			userEntity.setMessage("Invalid Password");
		}
		if(user.getPassword().equals(u.getPassword())) {
			userEntity.setEmail(u.getEmail());
			userEntity.setFirstName(u.getFirstName());
			userEntity.setId(u.getId());
			userEntity.setLastName(u.getLastName());
			userEntity.setRole(u.getRole());
			userEntity.setMessage("Login Successfull");
		}
		return userEntity;
		
	}
	
	

}
