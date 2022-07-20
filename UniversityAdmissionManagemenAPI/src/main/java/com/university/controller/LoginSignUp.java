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
	public String login(@RequestBody User user) {
		
		User u = userRepo.findByEmail(user.getEmail());
		
		if(ObjectUtils.isEmpty(u)) {
			return "login unsuccessfull";
		}
		if(user.getPassword().equals(u.getPassword())) {
			return "login successfull";
		}
		return "login unsuccessfull";
		
	}
	
	

}
