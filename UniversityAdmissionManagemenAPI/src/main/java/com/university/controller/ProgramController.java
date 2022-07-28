package com.university.controller;

import java.util.ArrayList;
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

import com.university.entity.Program;
import com.university.repo.IProgramRepo;

/**
 * @author kartikuppal
 *
 */

@RestController

public class ProgramController {
	
	@Autowired
	private IProgramRepo programRepo;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/addProgram")
	public Map addProgram(@RequestBody Program program) {
		
		Program p = programRepo.findByName(program.getName());
		if(!ObjectUtils.isEmpty(p)) {
			return Collections.singletonMap("status", false);
		}
		programRepo.save(program);
		return Collections.singletonMap("status", true);
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/viewProgram")
	public List<Program> viewProgramList() {
		
		List<Program> programList = new ArrayList<Program>();
		programList = programRepo.findAll();
		
		return programList;
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/deleteProgram/{id}")
	public Map deleteProgram(@PathVariable Integer id) {
		
		
		programRepo.deleteById(id);
		
		return Collections.singletonMap("status", true);
		
	}

}
