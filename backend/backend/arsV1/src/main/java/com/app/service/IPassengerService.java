package com.app.service;

import java.util.List;

import com.app.entity.Passenger;
import com.app.entity.Ticket;

public interface IPassengerService {

	//add psgr details
	List<Passenger> addPsgrDetails(List<Passenger> list);
	
	//get psgr from ticketNo
	Passenger getPsgrForTicketNo(Ticket ticket);
	
	List<Passenger> getListOfPsgrForFlight(List<Ticket> tickets);
}
