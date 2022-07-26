/**
 * 
 */
package com.university.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
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
	
	@PostMapping("/signup")
	public String signup(@RequestBody User user) {
		User u = userRepo.findByEmail(user.getEmail());
		if(!ObjectUtils.isEmpty(u)) {
			return "user already exists";
		}
		userRepo.save(user);
		return "account created";
		
	}
	
	@GetMapping("/login")
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
			userEntity.setEmail(user.getEmail());
			userEntity.setFirstName(user.getFirstName());
			userEntity.setId(user.getId());
			userEntity.setLastName(user.getLastName());
			userEntity.setRole(user.getRole());
			userEntity.setMessage("Login Successfull");
		}
		return userEntity;
		
	}
	
	

}
