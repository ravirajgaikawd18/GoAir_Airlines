package com.app.service;

import com.app.entity.User;
import com.app.entity.OTPUser;

public interface IOTPUserService {

	//add otp into db
	OTPUser addOTP(OTPUser obj);
	
	//inactivate otp
	Boolean verifyOTP(OTPUser toUpdate);
	
	
}
