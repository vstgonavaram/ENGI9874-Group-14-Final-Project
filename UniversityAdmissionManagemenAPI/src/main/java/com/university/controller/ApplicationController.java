package com.university.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@PostMapping("/addApplication")
	public String addProgram(@RequestBody Application application) {
		
	
		applicationRepo.save(application);
		return "program created";
		
	}
	
	
	@GetMapping("/viewApplication/{userId}")
	public List<Application> viewProgramList(@PathVariable("userId") Integer userId) {
		
		List<Application> applications = applicationRepo.findByUserId(userId);
		return applications;
		
		
	}
	
	@GetMapping("/updateStatus/{applicationId}/{statusId}")
	public String updateStatus(@PathVariable("applicationId") Integer applicationId, 
			@PathVariable("statusId") Integer statusId) {
		
		Application application = applicationRepo.findById(applicationId).get();
		application.setApplicationStatus(statusId);
		applicationRepo.save(application);
		return "status updated successfully";
		
		
	}
	
}
