package com.app.service;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.IOTPUserRepository;
import com.app.entity.OTPUser;

@Service
@Transactional
public class OTPUserServiceImpl implements IOTPUserService {
	
	@Autowired
	private IOTPUserRepository otpRepo;

	@Override
	public OTPUser addOTP(OTPUser obj) {
		// TODO Auto-generated method stub
		return otpRepo.save(obj);
	}

	@Override
	public Boolean verifyOTP(OTPUser toUpdate) {
		// TODO Auto-generated method stub
		OTPUser fromDB = otpRepo.getOTPUserByOtp(toUpdate.getOtp());
		if(fromDB != null) {
			if(((LocalDateTime.now()).compareTo(fromDB.getExpiryTime())) > 0)
				return false;
			fromDB.setIsVarified(true);
			otpRepo.save(fromDB);
			return true;
		}
		return false;
	}

}
