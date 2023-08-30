package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponseDto;
import com.app.entity.User;
import com.app.entity.CustomTokens;
import com.app.entity.Flight;
import com.app.entity.OTPUser;
import com.app.service.IOTPUserService;
import com.app.service.ITokenService;
import com.app.service.IUserService;

@RestController

@CrossOrigin
@RequestMapping("/users")
public class UserController {

	@Autowired
	private IUserService userService;
	
	@Autowired 
	private ITokenService tokenService;
	
	@Autowired
	private IOTPUserService otpUserService;
	
	private Logger logger;
	
	public UserController() {
		logger = Logger.getLogger(UserController.class.getName());
		logger.log(Level.INFO ,"inside ctor of: " + getClass());
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> addNewUser(@RequestBody @Valid User triensientUser){	// @RequestBody : unmarshalling (json ---> java)
		
		logger.log(Level.INFO ,"inside addNewUser "+ triensientUser);
		try {
			return new ResponseEntity<>(userService.addUserDetails(triensientUser), HttpStatus.CREATED);
		} catch(RuntimeException e) {
			logger.log(Level.INFO ,"Error in addNewUser method "+ e);
			//send api resp (DTO) wrapped in the resp entity
			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
									.body(new ApiResponseDto(e.getCause().getMessage()));
		}
	}
	
	//add a method to get user details ---> marshall --> send it to front end
	@GetMapping("/{userId}") 	// userId : template URI (path) variable
								// @PathVariable : annotation to be added on method arg
								// For binding incoming URI template var(=path var) to the method arg
	public ResponseEntity<?> getSpecificUserDetails(@PathVariable int userId) {
		
		logger.log(Level.INFO ,"inside getSpecificUserDetails "+ userId);
		try {
			User user = userService.getUserDetailsById(userId);
			//how to test if lombok lib is actually working ? : invoke a getter
			logger.log(Level.INFO ,"User's first name "+ user.getFirstName());
			return new  ResponseEntity<>(user, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO ,"Error in getSpecificUserDetails "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
					body(new ApiResponseDto(e.getMessage()));
		}
	}
	
//	@PostMapping("/login")
//		// @RequestMapping (method=POST)
//		// how many rq params ? 2 : email n pass
//		// @RequestParam : anno to bind req params --> method args
//		// @RequestParam(name="pass") String pass123 : SC --> String
//		// pass123=request.getParamter("pass");
////	public ResponseEntity<?> processLoginForm(@RequestParam String username, @RequestParam(name="password") String pass) {
//	public ResponseEntity<?> processLoginForm(@RequestBody User checkUser, CustomTokens myToken) {
//		logger.log(Level.INFO ,"inside processLoginForm "+ checkUser);
//		try {
//			User user = userService.getUserDetailsByUsernameAndPass(checkUser.getUsername(), checkUser.getPassword());
//			//how to test if lombok lib is actually working ? : invoke a getter
//				logger.log(Level.INFO ,"User's first name "+ user.getFirstName());
//				List<CustomTokens> list = tokenService.getCustomTokensForUsername(user.getUsername());
//				if(!(list.isEmpty())) {
//					tokenService.removeCustomTokenById((list.get(0)).getToken());
//				}
//			int token = (int)(Math.floor((Math.random())*10000));
//				logger.log(Level.INFO ,"token = ", token);
//			myToken.setToken(token);
//			myToken.setUsername(user.getUsername());
//			CustomTokens persistentToken = tokenService.addToken(myToken);
//				logger.log(Level.INFO ,"persistent token = ", persistentToken);
//			Map<String, Object> map = new HashMap<String, Object>();
//			map.put("token", token);
//			map.put("user", user);
//			return new  ResponseEntity<>(map, HttpStatus.OK);
//		} catch (RuntimeException e) {
//			logger.log(Level.INFO ,"Error in processLoginForm "+ e);
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).
//					body(new ApiResponseDto(e.getMessage()));
//		}
//	}
	
//	@PostMapping("/logout")
//	public ResponseEntity<?> logout(@RequestBody CustomTokens fromClnt){
//		
//			logger.log(Level.INFO ,"inside logout clientToken: ", fromClnt);
//			Map<String, Object> map = new HashMap<String, Object>();
//		try {
//			CustomTokens persistentToken = tokenService.getCustomTokensById(fromClnt.getToken());
//			logger.log(Level.INFO ,"persistentToken = "+ persistentToken);
//			String dbMessage = tokenService.removeCustomTokenById(fromClnt.getToken());
//			logger.log(Level.INFO ,"dbMsg: "+ dbMessage);
//			String message = "You have logged out successfully!";
//			map.put("message", message);
//			logger.log(Level.INFO , "message = "+ message);
//			return ResponseEntity.status(HttpStatus.OK).body(map);
//			
//		} catch (RuntimeException e) {
//			// TODO: handle exception
//			String message = "Logout failed!";
//			map.put("message", message);
//			logger.log(Level.INFO , "message = "+ message);
//			return ResponseEntity.status(HttpStatus.OK).body(map);
//		}
//	}
	
	@PutMapping("/updateprofile")
	public ResponseEntity<?> updateProfile(@RequestBody User toUpdate) { 

		logger.log(Level.INFO ,"inside updateProfile "+ toUpdate);
		try {
			Map<String, String> map = new HashMap<String, String>();
			String message = userService.updateProfileById(toUpdate);
			map.put("message", message);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch(RuntimeException e) {
			logger.log(Level.INFO ,"Error in updateFlight method "+ e);
			//send api resp (DTO) wrapped in the resp entity
			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
									.body(new ApiResponseDto(e.getCause().getMessage()));
		}
	}
	
	@PostMapping("/verifyotp")
	public ResponseEntity<?> verifyOTP(@RequestBody OTPUser checkOtp){
		
		String otp = checkOtp.getOtp();
		logger.log(Level.INFO ,"inside resetPassword otp = "+ otp);
		Map<String, String> map = new HashMap<String, String>();
		if(otpUserService.verifyOTP(checkOtp))
			map.put("message", "verified");		//activate resetpassword button in frontend
		else
			map.put("message", "failed");
		return new ResponseEntity<>(map, HttpStatus.OK);
		
	}
	
	@PostMapping("/resetpassword")
	public ResponseEntity<?> resetPassword(@RequestBody User toUpdate){
		
		try {
			logger.log(Level.INFO ,"inside resetPassword email: " + toUpdate.getEmail());
			Map<String, String> map = new HashMap<String, String>();
			map.put("message", userService.resetPassword(toUpdate));
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO ,"Error in resetPassword "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
					body(new ApiResponseDto(e.getMessage()));
		}
	}
	
	@GetMapping("/getsubadmins")
	public ResponseEntity<?> getAllSubadmins() {
		logger.log(Level.INFO ,"inside getAllSubadmins");
		try {
			List<User> list = userService.getAllSubadmins();
			//how to test if lombok lib is actually working ? : invoke a getter
			return new  ResponseEntity<>(list, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO ,"Error in getAllSubadmins "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
					body(new ApiResponseDto(e.getMessage()));
		}
	}
}