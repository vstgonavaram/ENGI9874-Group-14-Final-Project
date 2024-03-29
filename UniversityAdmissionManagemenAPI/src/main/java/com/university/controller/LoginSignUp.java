/**
 * 
 */
package com.university.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@CrossOrigin(origins = "http://localhost:4300")
	@PostMapping("/signup")
	public Map signup(@RequestBody User user) {
		User u = userRepo.findByEmail(user.getEmail());
		if(!ObjectUtils.isEmpty(u)) {
			 return Collections.singletonMap("status", false);

		}
		userRepo.save(user);
		return Collections.singletonMap("status", true);

		
	}
	
	@CrossOrigin(origins = "http://localhost:4300")
	@PostMapping("/login")
	public UserEntity login(@RequestBody User user) {
		
		User u = userRepo.findByEmail(user.getEmail());
		UserEntity userEntity = new UserEntity();
		
		if(u == null || ObjectUtils.isEmpty(u)) {
			userEntity.setMessage("Invalid Email");
		} 
		else {
		if(!user.getPassword().equals(u.getPassword())) {
			userEntity.setMessage("Invalid Password");
		}
		else {
			userEntity.setEmail(u.getEmail());
			userEntity.setFirstName(u.getFirstName());
			userEntity.setId(u.getId());
			userEntity.setLastName(u.getLastName());
			userEntity.setRole(u.getRole());
			userEntity.setMessage("Login Successfull");
		}
		}
		return userEntity;
		
	}
	
	@CrossOrigin(origins = "http://localhost:4300")
	@GetMapping("viewFaculty")
	public List<User> viewFaculty(){
		List<User> userList = userRepo.findByRole(1);
		return userList;
		
	}
	
	@CrossOrigin(origins = "http://localhost:4300")
	@DeleteMapping("deleteFaculty/{id}")
	public String deleteFaculty(@PathVariable Integer id) {
		userRepo.deleteById(id);
		return "Faculty deleted";
		
	}

}
