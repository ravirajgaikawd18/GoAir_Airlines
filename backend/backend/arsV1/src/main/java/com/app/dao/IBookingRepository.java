package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Booking;

public interface IBookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findByUserId(Integer userId);

}
