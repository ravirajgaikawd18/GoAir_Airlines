package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ITicketRepository;
import com.app.entity.Booking;
import com.app.entity.Flight;
import com.app.entity.Ticket;

@Service
@Transactional
public class TicketServiceImpl implements ITicketService {

	@Autowired
	private ITicketRepository ticketRepo;
	
	@Autowired
	private IFlightService flightService;
	
//	@PersistenceContext
//    private EntityManager entityManager;
	
	
	@Override
	public List<Ticket> addTicketDetails(Booking transientBooking, int noOfTickets) {
		// TODO Auto-generated method stub
		
		String msg = flightService.bookNoOfSeatsForFlightId(noOfTickets, transientBooking.getFlightId());
		
		if(msg.equals("success")) {
			List<Ticket> persistentTickets = new ArrayList<Ticket>();
			while(noOfTickets > 0) {
				noOfTickets--;
				Ticket ticket = new Ticket();
				ticket.setBookingNo(transientBooking.getBookingNo());
				ticket.setFlightId(transientBooking.getFlightId());
				ticket.setIsValid(false);
				
				
//				Session session = entityManager.unwrap(Session.class);
//				session.saveOrUpdate(ticket);
				
				persistentTickets.add(ticketRepo.save(ticket));
				 	
			}
//			persistentTickets = (ticketRepo.findByBookingNo(transientBooking));
			return persistentTickets;
			
		}else {
			return null;
		}
		
	}

	@Override
	public Ticket getTicketByTicketNo(Long ticketNo) {
		// TODO Auto-generated method stub
		return ticketRepo.findById(ticketNo).orElseThrow();
	}

	@Override
	public String invalidateTicketByTicketNo(Long ticketNo) {
		// TODO Auto-generated method stub
		Ticket fromDB = ticketRepo.findById(ticketNo).orElseThrow();
		if(fromDB != null) {
			fromDB.setIsValid(false);
			return "ticket invalidated";
		}
		return "failure";
	}
	
	@Override
	public String makeTicketValidByTicketNo(List<Ticket> list) {
		// TODO Auto-generated method stub
		
		for (Ticket ticket : list) {
			Ticket fromDB = ticketRepo.findById(ticket.getTicketNo()).orElseThrow();
			if(fromDB != null) {
				fromDB.setIsValid(true);
				ticketRepo.save(fromDB);
			}
		}
		return "success";
	}

	@Override
	public List<Ticket> getTicketsByBookingNo(Long bookingNo) {
		// TODO Auto-generated method stub
		List<Ticket> tks = ticketRepo.findByBookingNo(bookingNo);
		
		List<Ticket> tickets = new ArrayList<Ticket>();
		for (Ticket t : tks) {
			if(t.getIsValid())
				tickets.add(t);
		}
		
		return tickets;
	}

	@Override
	public List<Ticket> getTicketsByFlightId(Long flightId) {
		// TODO Auto-generated method stub
		List<Ticket> tks = ticketRepo.findByFlightId(flightId);
		List<Ticket> tickets = new ArrayList<Ticket>();
		for (Ticket t : tks) {
			if(t.getIsValid())
				tickets.add(t);
		}
		
		return tickets;
	}

	@Override
	public List<Ticket> getAllTicketsByBookingNo(Long bookingNo) {
		// TODO Auto-generated method stub
		return ticketRepo.findByBookingNo(bookingNo);
	}

}
