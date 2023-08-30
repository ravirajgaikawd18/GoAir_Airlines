package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.entity.Flight;

public interface IFlightService {

	//get flight by id
	Flight getFlightById(Long flightId);
	
	//add method to add flight
	Flight addFlight(Flight transientFlight);
	
	//add method to remove flight -- make landing status = true
	String removeFlightFromSchedule (Long flightId);
	
	List<Flight> getAllFlights(LocalDate date);
	
	String updateFlight(Flight toUpdate);
	
	List<Flight> findBySourceAndDestinationForTravelDate(String source, String destination, LocalDate date);
	
	String bookNoOfSeatsForFlightId(int count, Long flightId);
	
	String cancelNoOfSeatsForFlightId(int count, Long flightId);
}
