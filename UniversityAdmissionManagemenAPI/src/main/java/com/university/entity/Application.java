/**
 * 
 */
package com.university.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 * @author kartikuppal
 *
 */
@Entity
public class Application {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Integer applicationStatus;
	private Boolean additionalDocumentRequest = false;
	
	@OneToOne
	@JoinColumn(name = "programId")
	private Program program;
	
	@OneToOne
	@JoinColumn(name = "userId")
	private User user;
	
	@OneToOne
	@JoinColumn(name = "documentId")
	private Document document;
	
	public Program getProgram() {
		return program;
	}
	public void setProgram(Program program) {
		this.program = program;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getApplicationStatus() {
		return applicationStatus;
	}
	public void setApplicationStatus(Integer applicationStatus) {
		this.applicationStatus = applicationStatus;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Document getDocument() {
		return document;
	}
	public void setDocument(Document document) {
		this.document = document;
	}
	public Boolean getAdditionalDocumentRequest() {
		return additionalDocumentRequest;
	}
	public void setAdditionalDocumentRequest(Boolean additionalDocumentRequest) {
		this.additionalDocumentRequest = additionalDocumentRequest;
	}
	
	
	

}

