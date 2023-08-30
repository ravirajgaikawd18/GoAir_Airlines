package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.IPaymentRepository;
import com.app.entity.Payment;

@Service
@Transactional
public class PaymentServiceImpl implements IPaymentService{

	@Autowired
	private IPaymentRepository pmtRepo;
	
	@Override
	public Payment addPaymentDetails(Payment pmt) {
		// TODO Auto-generated method stub
		return pmtRepo.save(pmt);
	}

	@Override
	public Payment getPaymentByTxId(Long txId) {
		// TODO Auto-generated method stub
		return pmtRepo.findById(txId).orElseThrow();
	}

}
