package com.app.service;

import java.util.List;

import com.app.entity.Booking;
import com.app.entity.Flight;
import com.app.entity.Ticket;

public interface ITicketService {

	//method to add booking details
		List<Ticket> addTicketDetails(Booking transientBooking, int noOfTickets);
		
		Ticket getTicketByTicketNo(Long ticketNo);
		
		String invalidateTicketByTicketNo(Long ticketNo);
		
		List<Ticket> getTicketsByBookingNo(Long bookingNo);
		
		List<Ticket> getTicketsByFlightId(Long flightId);
		
		public String makeTicketValidByTicketNo(List<Ticket> list);

		List<Ticket> getAllTicketsByBookingNo(Long bookingNo);
}
