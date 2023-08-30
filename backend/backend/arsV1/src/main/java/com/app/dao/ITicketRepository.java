package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Booking;
import com.app.entity.Flight;
import com.app.entity.Ticket;

public interface ITicketRepository extends JpaRepository<Ticket, Long> {

	List<Ticket> findByBookingNo(Long bookingNo);

	List<Ticket> findByFlightId(Long flightId);

}
