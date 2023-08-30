package com.app.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "t_tickets")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Ticket{

//	ticket_no int auto_increment primary key,
	
	@Id
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ticket_generator")
//	@SequenceGenerator(name = "ticket_generator", sequenceName = "ticket_sequence_name",
//						allocationSize = 1, initialValue = 10000)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ticket_no")
	private Long ticketNo;
	
//	   isvalid boolean,
	
	@Column(name = "is_valid")
	private Boolean isValid;
	
//	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "flight_id")
	private Long flightId;
	
//    booking_no int,
	
//	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "booking_no")
	private Long bookingNo;
	
	
	
	
	
//    FOREIGN KEY (booking_no) REFERENCES T_Bookings(booking_no),
//    ec1 int,
//	   ec2 int,
//	   ec3 varchar(50),
//	   ec4 varchar(50),
//	   ec5 varchar(50),
//	   ec6 varchar(50),
//	   ec7 float,
//	   ec8 double,
//	   ec9 boolean,
//	   ec10 date,
//	   ec11 datetime,
//	   ec12 datetime
//	 )auto_increment=100000;
}
