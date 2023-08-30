package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Flight;

public interface IFlightRepository extends JpaRepository<Flight, Long>{

	//get all flights after date
	public List<Flight> findByTravelDateGreaterThanEqualOrderByTakeOffTime(LocalDate startDate);

	public List<Flight> findByTravelDate(LocalDate date);
		
}
