package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.app.entity.User;

public interface IUserService {

	//add a method to insert user details
	User addUserDetails(User transientUser);
		
	//add a method to get user details by id
	User getUserDetailsById(int userId);
	
	//add a method to get user details by userName and password
	User getUserDetailsByUsernameAndPass(String username, String pass);
	
	String updateProfileById(User toUpdate);
	
	User getUserByEmail(String email);
	
	String resetPassword(User toUpdate);
	
	List<User> getAllSubadmins();
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
	
}
