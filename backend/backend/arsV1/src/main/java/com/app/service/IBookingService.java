package com.app.service;

import java.util.List;

import com.app.entity.Booking;

public interface IBookingService {

	//method to add booking details
	Booking addBookingDetails(Booking transientBooking);
	
	public List<Booking> getBookingByUserId(Integer userId);
	
	String invalidateBookingByBookingNo(Long bookingNo);
	
	String changePaymentStatusByBookingNo(Long bookingNo);
	
	String removeBooking(Booking persistentBooking);
}
