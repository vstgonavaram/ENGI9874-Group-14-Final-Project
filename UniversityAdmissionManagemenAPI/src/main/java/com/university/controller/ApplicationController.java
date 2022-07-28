package com.university.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.university.entity.Application;
import com.university.repo.IApplicationRepo;

/**
 * @author kartikuppal
 *
 */

@RestController
public class ApplicationController {
	
	@Autowired
	private IApplicationRepo applicationRepo;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/addApplication")
	public Map addProgram(@RequestBody Application application) {
		
	
		applicationRepo.save(application);
		return Collections.singletonMap("status", true);
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/viewApplication/{userId}")
	public List<Application> viewProgramListWithUser(@PathVariable("userId") Integer userId) {
		
		List<Application> applications = applicationRepo.findByUserId(userId);
		return applications;
		
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/viewApplication")
	public List<Application> viewProgramList() {
		
		List<Application> applications = applicationRepo.findAll();
		return applications;
		
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/updateStatus/{applicationId}/{statusId}")
	public Map updateStatus(@PathVariable("applicationId") Integer applicationId, 
			@PathVariable("statusId") Integer statusId) {
		
		Application application = applicationRepo.findById(applicationId).get();
		application.setApplicationStatus(statusId);
		applicationRepo.save(application);
		
		return Collections.singletonMap("status", true);
		
		
	}
	
}
