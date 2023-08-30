package com.app.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.EmailRequest;
import com.app.entity.User;
import com.app.service.EmailService;
import com.app.service.IUserService;

@RestController
@RequestMapping("/email")
@CrossOrigin
public class EmailController {

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private IUserService userService;
	
	private Logger logger;
	
	public EmailController() {
		logger = Logger.getLogger(EmailController.class.getName());
		logger.log(Level.INFO, "inside ctor of: " + getClass());
	}
	
//	@RequestMapping("/welcome")
//	public String welcome() {
//		return "inside email controller";
//	}
	
//	api to send email
	@RequestMapping(value = "/sendemail" ,method=RequestMethod.POST)
	public ResponseEntity<?>sendEmail(@RequestBody EmailRequest request){
		logger.log(Level.INFO, "inside sendEmail of EmailController");
		logger.log(Level.INFO, "request = "+ request);
		
		User user = userService.getUserByEmail(request.getTo());
		Map<String, String> map = new HashMap<String, String>();
		Boolean result = false;
		if(user != null) {
			result = this.emailService.sendEmail(request.getSubject(), request.getMessage(), request.getTo());
		} else {
			map.put("response", "invalid email");
			return ResponseEntity.ok(map);
		}
		
		if(result) {
			map.put("response", "success");
			return ResponseEntity.ok(map);
		}else {
			map.put("response", "failure");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
		}
	}

}
