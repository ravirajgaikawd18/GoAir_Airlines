package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Flight;
import com.app.entity.Passenger;
import com.app.entity.Ticket;

public interface IPassengerRepository extends JpaRepository<Passenger, Long> {

	Passenger findByTicketNo(Long ticketNo);


}
