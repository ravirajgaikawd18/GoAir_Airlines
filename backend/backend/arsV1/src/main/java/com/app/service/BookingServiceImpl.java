package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.IBookingRepository;
import com.app.entity.Booking;

@Service
@Transactional
public class BookingServiceImpl implements IBookingService {

	@Autowired
	private IBookingRepository bookingRepo;
	
	@Override
	public Booking addBookingDetails(Booking transientBooking) {
		// TODO Auto-generated method stub
		return bookingRepo.save(transientBooking);
	}

	@Override
	public List<Booking> getBookingByUserId(Integer userId) {
		// TODO Auto-generated method stub
		List<Booking> bks = bookingRepo.findByUserId(userId);
		List<Booking> bookings = new ArrayList<Booking>();
		for (Booking b : bks) {
			if(b.getIsValid()) {
				bookings.add(b);
			}
		}
		return bookings;
	}

	@Override
	public String invalidateBookingByBookingNo(Long bookingNo) {
		// TODO Auto-generated method stub
		Booking fromDB = bookingRepo.findById(bookingNo).orElseThrow();
		if(fromDB != null) {
			fromDB.setIsValid(false);
			return "booking invalidated";
		}
		return "failure";
	}

	@Override
	public String changePaymentStatusByBookingNo(Long bookingNo) {
		// TODO Auto-generated method stub
		Booking fromDB = bookingRepo.findById(bookingNo).orElseThrow();
		if(fromDB != null) {
			fromDB.setPayStatus(true);
			fromDB.setIsValid(true);
			return "payment successfull";
		}
		return "payment failed";
	}

	@Override
	public String removeBooking(Booking persistentBooking) {
		// TODO Auto-generated method stub
		try {
			bookingRepo.delete(persistentBooking);
			return "Booking removed";
		} catch (Exception e) {
			// TODO: handle exception
			return "Booking removal failed";
		}
		
	}

}
