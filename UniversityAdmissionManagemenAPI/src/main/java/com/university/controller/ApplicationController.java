package com.university.controller;

import java.util.ArrayList;
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
import com.university.entity.ApplicationEntity;
import com.university.entity.Document;
import com.university.entity.Program;
import com.university.entity.User;
import com.university.repo.IApplicationRepo;
import com.university.repo.IDocumentRepo;
import com.university.repo.IProgramRepo;
import com.university.repo.IUserRepo;

/**
 * @author kartikuppal
 *
 */

@RestController
public class ApplicationController {
	
	@Autowired
	private IApplicationRepo applicationRepo;
	
	@Autowired
	private IUserRepo userRepo;

	@Autowired
	private IDocumentRepo documentRepo;
	
	@Autowired
	private IProgramRepo programRepo;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/addApplication")
	public Map addProgram(@RequestBody ApplicationEntity ae) {
		
	Application a = new Application();
	a.setApplicationStatus(ae.getApplicationStatus());
	User u = userRepo.findById(ae.getUserId()).get();
	Program p = programRepo.findById(ae.getProgramId()).get();
	a.setUser(u);
	a.setProgram(p);
	applicationRepo.save(a);
		
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
	public List<ApplicationEntity> viewProgramList() {
		
		List<Application> applications = applicationRepo.findAll();
		ApplicationEntity ae = new ApplicationEntity();
		List<ApplicationEntity> list = new ArrayList<ApplicationEntity>();
		for(Application a : applications) {
			ae.setAdditionalDocumentRequest(a.getAdditionalDocumentRequest());
			ae.setApplicationStatus(a.getApplicationStatus());
			ae.setFirstName(a.getUser().getFirstName());
			ae.setLastName(a.getUser().getLastName());
			ae.setProgramCode(a.getProgram().getCode());
			ae.setProgramName(a.getProgram().getName());
			ae.setId(a.getId());
			ae.setProgramId(a.getProgram().getId());
			ae.setUserId(a.getUser().getId());
			list.add(ae);
		}
		
		return list;
		
		
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
