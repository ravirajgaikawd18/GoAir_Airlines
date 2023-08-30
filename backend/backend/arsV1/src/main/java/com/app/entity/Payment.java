package com.app.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "t_payments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Payment {
	
	@Id
	@Column(name = "tx_id")
	private Integer txId;
	
//	@NotBlank(message = "email can not be blank")
	private String email;
	
	@Column(name = "card_no")
	@NotBlank(message = "cardNo can not be blank")
	private String cardNo;
	
	private String cvv;
	
	@Column(name = "expiry_date")
	private LocalDate expiryDate;
	
	private Double amount;
	
	@Column(name = "tx_date_time")
	private LocalDateTime txDateTime;
	
//	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "booking_no")
	private Long bookingNo;
	
	@Column(name = "tx_status")
	private Boolean txStatus;

}
