package com.app.controller;

import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponseDto;
import com.app.entity.User;
import com.app.entity.Booking;
import com.app.entity.Flight;
import com.app.entity.Passenger;
import com.app.entity.Payment;
import com.app.entity.Ticket;
import com.app.service.IBookingService;
import com.app.service.IFlightService;
import com.app.service.IPassengerService;
import com.app.service.IPaymentService;
import com.app.service.ITicketService;

@RestController
@RequestMapping("/psgr")
@CrossOrigin
public class PassengerController {


	@Autowired
	private IFlightService flightService;
	
	@Autowired
	private IBookingService bookingService;
	
	@Autowired
	private ITicketService ticketService;
	
	@Autowired
	private IPassengerService psgrService;
	
	@Autowired
	private IPaymentService pmtService;
	
	private Logger logger;
	
	public PassengerController() {
		logger = Logger.getLogger(PassengerController.class.getName());
		logger.log(Level.INFO, "inside ctor of: " + getClass());
	}
	
	@PostMapping("/searchflight")
	// render the user on flight_list page
	public ResponseEntity<?> searchBySourceAndDestination(@RequestBody Flight searchFlight)
	{
		logger.log(Level.INFO, "inside searchBySourceAndDestination date: " + searchFlight.getTravelDate());
		try {
			List<Flight> avlFlights = flightService.findBySourceAndDestinationForTravelDate(searchFlight.getSource(),
												searchFlight.getDestination(), searchFlight.getTravelDate());
			Map<String, Object> map = new HashMap<String, Object>();
			if(avlFlights.isEmpty())
				map.put("result", "no flights");
			else
				map.put("result", avlFlights);
			
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "Error in getFlights "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDto(e.getMessage()));
		}
	}
	
	@GetMapping("/bookings/{userId}")
	public ResponseEntity<?> getBookingDetails(@PathVariable Integer userId) {
		logger.log(Level.INFO, "inside getBookingDetails userId ="+ userId);
		try {
			List<Booking> list = bookingService.getBookingByUserId(userId);
			//how to test if lombok lib is actually working ? : invoke a getter
			return new  ResponseEntity<>(list, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "Error in getBookingDetails "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
					body(new ApiResponseDto(e.getMessage()));
		}
	}

	@PostMapping("/addbooking/{noOfTickets}")
	public ResponseEntity<?> addBookingDetails(@RequestBody Booking transientBooking, @PathVariable int noOfTickets){	// @RequestBody : unmarshalling (json ---> java)
		
		logger.log(Level.INFO, "inside addBookingDetails transientBooking: "+ transientBooking.toString());
		logger.log(Level.INFO, "inside addBookingDetails noOfTickets: "+ noOfTickets);
		try {
			transientBooking.setBookingTime(LocalDateTime.now());
			transientBooking.setPayStatus(false);
			transientBooking.setIsValid(false);
			Booking persistentBooking = bookingService.addBookingDetails(transientBooking);
			List<Ticket> persistentTickets = ticketService.addTicketDetails(transientBooking, noOfTickets);
			Map<String, Object> resMap = new HashMap<String, Object>();
			if(persistentTickets != null) {
				resMap.put("booking", persistentBooking);
				resMap.put("tickets", persistentTickets);
			} else {
				//remove booking
				String msg = bookingService.removeBooking(persistentBooking);
				logger.log(Level.INFO, "Booking removal: " + msg);
				resMap.put("booking", "no booking");
				resMap.put("tickets", "no tickets");
			}
			return new ResponseEntity<>(resMap, HttpStatus.CREATED);
		} catch(RuntimeException e) {
			logger.log(Level.INFO, "Error in addBookingDetails method "+ e);
			//send api resp (DTO) wrapped in the resp entity
			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
									.body(new ApiResponseDto(e.getCause().getMessage()));
		}
	}
	
	@GetMapping("/invalidatebooking/{bookingNo}")
	public ResponseEntity<?> invalidateBooking(@PathVariable Long bookingNo){
		logger.log(Level.INFO, "inside invalidateBooking: " + bookingNo);
		try {
			Map<String, String> map = new HashMap<String, String>();
			String message = bookingService.invalidateBookingByBookingNo(bookingNo);
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
	@PostMapping("/makepayment")
	public ResponseEntity<?> makePayment(@RequestBody Payment pmt){
		logger.log(Level.INFO, "inside makePayment: "+ pmt);
		try {
			Map<String, Object> map = new HashMap<>();
			
			int txId = (int)(Math.floor((Math.random())*100000000));
			pmt.setTxId(txId);
			pmt.setTxDateTime(LocalDateTime.now());
			pmt.setTxStatus(true);
			
			Payment persistentPmt = pmtService.addPaymentDetails(pmt);
			if(persistentPmt != null) {
				String message = bookingService.changePaymentStatusByBookingNo(persistentPmt.getBookingNo());
				List<Ticket> list = ticketService.getAllTicketsByBookingNo(persistentPmt.getBookingNo());
				logger.log(Level.INFO, "tickets = " + list);
				ticketService.makeTicketValidByTicketNo(list);
				map.put("result", persistentPmt);
			} else {
				map.put("result", "payment failed");
			}
			
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch(RuntimeException e) {
			logger.log(Level.INFO, "Error in makepayment method "+ e);
			//send api resp (DTO) wrapped in the resp entity
			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
									.body(new ApiResponseDto(e.getCause().getMessage()));
		}
	}
	
	@GetMapping("/ticket/{ticketNo}")
	public ResponseEntity<?> getTicketDetails(@PathVariable Long ticketNo) {
		logger.log(Level.INFO, "inside getTicketDetails" + ticketNo);
		try {
			Ticket t = ticketService.getTicketByTicketNo(ticketNo);
			//how to test if lombok lib is actually working ? : invoke a getter
			return new  ResponseEntity<>(t, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "Error in getTicketDetails "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).
					body(new ApiResponseDto(e.getMessage()));
		}
	}

//	@PostMapping("/addticket")
//	public ResponseEntity<?> addTicketDetails(@RequestBody @Valid Ticket transientTicket){	// @RequestBody : unmarshalling (json ---> java)
//		
//		logger.log(Level.INFO, "inside addTicketDetails " , transientTicket);
//		try {
//			return new ResponseEntity<>(ticketService.addTicketDetails(transientTicket), HttpStatus.CREATED);
//		} catch(RuntimeException e) {
//			logger.log(Level.INFO, "Error in addNewUser method ", e);
//			//send api resp (DTO) wrapped in the resp entity
//			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//									.body(new ApiResponseDto(e.getCause().getMessage()));
//		}
//	}
	
	@GetMapping("/invalidateTicket/{ticketNo}")
	public ResponseEntity<?> invalidateTicket(@PathVariable Long ticketNo){
		logger.log(Level.INFO, "inside invalidateTicket: " + ticketNo);
		try {
			Map<String, String> map = new HashMap<String, String>();
			String message = ticketService.invalidateTicketByTicketNo(ticketNo);
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
	
	@PostMapping("/seetickets")
	// render the user on flight_list page
	public ResponseEntity<?> seeTicketsForBookingNo(@RequestBody Booking bookingNo)
	{
		logger.log(Level.INFO, "inside seeTicketsForBookingNo date: "+ bookingNo);
		try {
			List<Ticket> avlTicket = ticketService.getTicketsByBookingNo(bookingNo.getBookingNo());
			logger.log(Level.INFO, "inside see tickets" + avlTicket);
			Map<String, Object> map = new HashMap<String, Object>();
			if(avlTicket.isEmpty())
				map.put("result", "no tickets");
			else
				map.put("result", avlTicket);
			
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "Error in getFlights "+ e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDto(e.getMessage()));
		}
	}
	
	@PostMapping("/addpsgr")
	public ResponseEntity<?> addPassengerDetails(@RequestBody List<Passenger> list){	// @RequestBody : unmarshalling (json ---> java)
		
		logger.log(Level.INFO, "inside addPassengerDetails "+ list);
		try {
			return new ResponseEntity<>(psgrService.addPsgrDetails(list), HttpStatus.CREATED);
		} catch(RuntimeException e) {
			logger.log(Level.INFO, "Error in addPassengerDetails method "+ e);
			//send api resp (DTO) wrapped in the resp entity
			//return new ResponseEntity<>(new ApiResponseDto(e.getCause().getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
									.body(new ApiResponseDto(e.getCause().getMessage()));
		}
	}
}
