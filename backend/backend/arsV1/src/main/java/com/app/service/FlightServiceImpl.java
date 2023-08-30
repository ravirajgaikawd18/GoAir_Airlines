package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.dao.IFlightRepository;
import com.app.dao.IPassengerRepository;
import com.app.entity.Flight;

@Service
@Transactional
public class FlightServiceImpl implements IFlightService {

	@Autowired
	private IFlightRepository flightRepo;
	
	@Override
	public Flight addFlight(Flight transientFlight) {
		// TODO Auto-generated method stub
		return flightRepo.save(transientFlight);
	}

	@Override
	public String removeFlightFromSchedule(Long flightId) {
		// TODO Auto-generated method stub
		Flight fromDB = flightRepo.findById(flightId).orElseThrow();
		if(fromDB != null) {
			fromDB.setLandingStatus(true);
			flightRepo.save(fromDB);
			return "flight removed";
		}
		return "failure";
	}

	@Override
	public List<Flight> getAllFlights(LocalDate date) {
		// TODO Auto-generated method stub
		
		return flightRepo.findByTravelDateGreaterThanEqualOrderByTakeOffTime(date);
	}

	@Override
	public String updateFlight(Flight toUpdate) {
		// TODO Auto-generated method stub
		Flight fromDB = flightRepo.findById(toUpdate.getFlightId()).orElseThrow();
		if(fromDB != null) {
			fromDB = toUpdate;
			flightRepo.save(fromDB);
			return "flight updated";
		}
		return "failure";
	}

	@Override
	public Flight getFlightById(Long flightId) {
		// TODO Auto-generated method stub
		return flightRepo.findById(flightId).orElseThrow();
	}
	
	@Override
	public List<Flight> findBySourceAndDestinationForTravelDate(String source, String destination, LocalDate date) {
		// TODO Auto-generated method stub
		List<Flight> rawList = new ArrayList<Flight>();
		List<Flight> finalList = new ArrayList<Flight>();
		
		rawList = flightRepo.findByTravelDate(date);
		System.out.println("rawList = " + rawList);
        for (Flight flight : rawList){
        	if(flight.getSource().equals(source) && flight.getDestination().equals(destination))
        	{
        		finalList.add(flight);
        	}
		}
		return finalList;
	}

	@Override
	public String bookNoOfSeatsForFlightId(int count, Long flightId) {
		// TODO Auto-generated method stub
		Flight fromDB = flightRepo.findById(flightId).orElseThrow();
		if(fromDB != null) {
			int totalSeats = fromDB.getAvailableSeats() + fromDB.getBookedSeats();
			if((fromDB.getBookedSeats()+count) <= totalSeats) {
				fromDB.setAvailableSeats(fromDB.getAvailableSeats()-count);
				fromDB.setBookedSeats(fromDB.getBookedSeats()+count);
				flightRepo.save(fromDB);
				return "success";
			}else {
				return "failure";
			}
			
		}
		return null;
	}

	@Override
	public String cancelNoOfSeatsForFlightId(int count, Long flightId) {
		// TODO Auto-generated method stub
		Flight fromDB = flightRepo.findById(flightId).orElseThrow();
		if(fromDB != null) {
			
			if((fromDB.getBookedSeats()-count) >= 0) {
				fromDB.setAvailableSeats(fromDB.getAvailableSeats()+count);
				fromDB.setBookedSeats(fromDB.getBookedSeats()-count);
				flightRepo.save(fromDB);
				return "success";
			}else {
				return "failure";
			}
			
		}
		return null;
	}

}
