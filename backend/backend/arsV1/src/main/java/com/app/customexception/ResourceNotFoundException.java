package com.app.customexception;

public class ResourceNotFoundException extends RuntimeException {
	
	public ResourceNotFoundException(String mesg) {
		
		super(mesg);
	}
}
