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
	private String applicationStatus;
	private Boolean additionalDocumentRequest = false;
	
	@OneToOne
	@JoinColumn(name = "userId")
	private User user;
	
	@OneToOne
	@JoinColumn(name = "documentId")
	private Document document;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getApplicationStatus() {
		return applicationStatus;
	}
	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}
	public Boolean getAdditionalDocumentRequest() {
		return additionalDocumentRequest;
	}
	public void setAdditionalDocumentRequest(Boolean additionalDocumentRequest) {
		this.additionalDocumentRequest = additionalDocumentRequest;
	}
	
	
	

}

