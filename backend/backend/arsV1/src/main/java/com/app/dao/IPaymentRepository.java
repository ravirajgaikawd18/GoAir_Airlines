package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Payment;

public interface IPaymentRepository extends JpaRepository<Payment, Long> {

}
