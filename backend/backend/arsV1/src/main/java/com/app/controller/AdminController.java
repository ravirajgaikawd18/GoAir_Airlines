package com.app.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponseDto;
import com.app.entity.User;
import com.app.entity.Flight;
import com.app.entity.Passenger;
import com.app.entity.Ticket;
import com.app.service.IFlightService;
import com.app.service.IPassengerService;
import com.app.service.ITicketService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

	@Autowired
	private IFlightService flightService;
	
	@Autowired
	private ITicketService ticketService;
	
	@Autowired
	private IPassengerService psgrService;
	
	private Logger logger;
	
	public AdminController() {
		logger = Logger.getLogger(AdminController.class.getName());
		logger.log(Level.INFO ,"inside ctor of: " + getClass());
	}
	
	@PostMapping("/addflight")
	public ResponseEntity<?> addFlight(@RequestBody @Valid Flight transientFlight){
		
		logger.log(Level.INFO ,"inside addFlight: " + transientFlight);
		try {
			return new ResponseEntity<>(flightService.addFlight(transientFlight), HttpStatus.CREATED);
		} catch(RuntimeException e) {
			logger.log(Level.INFO ,"Error in addFlight method "+ e);
			//send api resp (DTO) wrapped in the resp entity
			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
									.body(new ApiResponseDto(e.getCause().getMessage()));
		}
	}
	
	@GetMapping("/removeflight/{flightId}")
	public ResponseEntity<?> removeFlight(@PathVariable Long flightId){
		
		logger.log(Level.INFO ,"inside remove flight toBeRemove: "+ flightId);
		// to remove flight --> only make landing status = true
		try {
			Map<String, String> map = new HashMap<String, String>();
			String message = flightService.removeFlightFromSchedule(flightId);
			map.put("message", message);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch(RuntimeException e) {
			logger.log(Level.INFO ,"Error in removeFlight method "+ e);
			//send api resp (DTO) wrapped in the resp entity
			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
									.body(new ApiResponseDto(e.getCause().getMessage()));
		}
	}
	
	@PostMapping("/allflights")
	public ResponseEntity<?> getAllFlights() {
		logger.log(Level.INFO, "inside getAllFlights");
	
		try {
			LocalDate date = LocalDate.now();
			List<Flight> schedule = flightService.getAllFlights(date);
			Map<String, Object> map = new HashMap<String, Object>();
			if(schedule.isEmpty())
				map.put("data", "empty schedule");
			else
				map.put("data", schedule);
			
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "Error in getFlights "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDto(e.getMessage()));
		}
	}
	
	@PutMapping("/updateflight")
	public ResponseEntity<?> updateFlight(@RequestBody @Valid Flight toUpdate) { 

		logger.log(Level.INFO, "inside updateFlight " + toUpdate);
		try {
			Map<String, String> map = new HashMap<String, String>();
			String message = flightService.updateFlight(toUpdate);
			map.put("message", message);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch(RuntimeException e) {
			logger.log(Level.INFO, "Error in updateFlight method "+ e);
			//send api resp (DTO) wrapped in the resp entity
			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
									.body(new ApiResponseDto(e.getCause().getMessage()));
		}
	}
	
	@GetMapping("/flight/{flightId}")
	public ResponseEntity<?> getFlightById(@PathVariable Long flightId) {
		logger.log(Level.INFO, "inside getFlightById " + flightId);
		try {
			Flight flight = flightService.getFlightById(flightId);
			//how to test if lombok lib is actually working ? : invoke a getter
			logger.log(Level.INFO, "Flight no.: "+ flight.getFlightNo());
			return new  ResponseEntity<>(flight, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "Error in getSpecificUserDetails "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
			body(new ApiResponseDto(e.getMessage()));
		}
	}
	
	@GetMapping("/psgrlist/{flightId}")
	public ResponseEntity<?> seeListOfPsgrForFlight(@PathVariable Long flightId){
		
		logger.log(Level.INFO, "inside seeListOfPsgrForFlight flightId = " + flightId);
		try {
			List<Ticket> tickets = ticketService.getTicketsByFlightId(flightId);
			List<Passenger> psgrs = psgrService.getListOfPsgrForFlight(tickets);
			Map<String, Object> map = new HashMap<String, Object>();
			if(psgrs.isEmpty())
				map.put("result", "no passengers");
			else
				map.put("result", psgrs);
			
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "Error in getFlights "+ e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponseDto(e.getMessage()));
		}
		
	}
}
