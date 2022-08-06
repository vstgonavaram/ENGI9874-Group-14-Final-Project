package com.university.entity;

public class ApplicationEntity {
	private Integer id;
	private Integer applicationStatus;
	private Boolean additionalDocumentRequest = false;
	private String programName;
	private String programCode;
	private String firstName;
	private String lastName;
	private Integer userId;
	private Integer documentId;
	private Integer programId;
	private String documentName;
	
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
	public Boolean getAdditionalDocumentRequest() {
		return additionalDocumentRequest;
	}
	public void setAdditionalDocumentRequest(Boolean additionalDocumentRequest) {
		this.additionalDocumentRequest = additionalDocumentRequest;
	}
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public String getProgramCode() {
		return programCode;
	}
	public void setProgramCode(String programCode) {
		this.programCode = programCode;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getDocumentId() {
		return documentId;
	}
	public void setDocumentId(Integer documentId) {
		this.documentId = documentId;
	}
	public Integer getProgramId() {
		return programId;
	}
	public void setProgramId(Integer programId) {
		this.programId = programId;
	}
	public String getDocumentName() {
		return documentName;
	}
	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}
}
