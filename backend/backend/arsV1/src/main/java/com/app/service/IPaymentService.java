package com.app.service;

import com.app.entity.Payment;

public interface IPaymentService {

	//add payment details
	Payment addPaymentDetails(Payment pmt);
	
	Payment getPaymentByTxId(Long txId);
}
