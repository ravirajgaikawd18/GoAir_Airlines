package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.OTPUser;

public interface IOTPUserRepository extends JpaRepository<OTPUser, Integer> {
 
	public OTPUser getOTPUserByOtp(String otp);
}
