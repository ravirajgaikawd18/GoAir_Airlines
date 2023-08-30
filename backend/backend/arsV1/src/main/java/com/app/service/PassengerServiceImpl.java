package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.IPassengerRepository;
import com.app.entity.Passenger;
import com.app.entity.Ticket;

@Service
@Transactional
public class PassengerServiceImpl implements IPassengerService {
	
	@Autowired
	private IPassengerRepository psgrrepo;

	@Override
	public List<Passenger> addPsgrDetails(List<Passenger> transientPsgrs) {
		// TODO Auto-generated method stub
		List<Passenger> persistentPsgrs = new ArrayList<Passenger>();
		for (Passenger psgr : transientPsgrs) {
			persistentPsgrs.add(psgrrepo.save(psgr));
		}
		return persistentPsgrs;
	}

	@Override
	public Passenger getPsgrForTicketNo(Ticket ticket) {
		// TODO Auto-generated method stub
		return psgrrepo.findByTicketNo(ticket.getTicketNo());
	}

	@Override
	public List<Passenger> getListOfPsgrForFlight(List<Ticket> tickets) {
		// TODO Auto-generated method stub
		List<Passenger> psgrs = new ArrayList<Passenger>();
		for (Ticket ticket : tickets) {
			psgrs.add(psgrrepo.findByTicketNo(ticket.getTicketNo()));
		}
		
		return psgrs;
	}

}
