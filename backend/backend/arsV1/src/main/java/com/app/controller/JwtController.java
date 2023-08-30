package com.app.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.User;
import com.app.helper.JwtUtil;
import com.app.model.JwtRequest;
import com.app.model.JwtResponse;
import com.app.service.IUserService;

@RestController
@CrossOrigin
public class JwtController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private IUserService userServices;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	private Logger logger;
	
	public JwtController() {
		logger = Logger.getLogger(JwtController.class.getName());
		logger.log(Level.INFO, "inside ctor of: " + getClass());
	}
	
	@RequestMapping(value = "/token", method = RequestMethod.POST)
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
		
		logger.log(Level.INFO, "inside generateToken: "+ jwtRequest);
		
		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
		} catch(UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("Bad credential");
		} catch(BadCredentialsException e){
			e.printStackTrace();
			throw new Exception("Bad Credentials");
		}
		
		UserDetails userDetails = this.userServices.loadUserByUsername(jwtRequest.getUsername());
		String token=this.jwtUtil.generateToken(userDetails);
		logger.log(Level.INFO, "JWT : "+ token);
		User user = userServices.getUserDetailsByUsernameAndPass(jwtRequest.getUsername(), jwtRequest.getPassword());
		return ResponseEntity.ok(new JwtResponse(token, user));
	}

}
