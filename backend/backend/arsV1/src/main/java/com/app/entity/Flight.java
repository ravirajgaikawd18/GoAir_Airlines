package com.app.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "t_flights")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Flight {

//	flight_id int auto_increment primary key,
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "flight_id")
	private Long flightId;
	
//    flight_no varchar(20) not null,
	
	@NotBlank(message = "Flight no. can not be blank")
	@Column(name = "flight_no")
	private String flightNo;
	
//    source varchar(30),
	
	@Column(name = "source", length = 30)
	@NotBlank(message = "Source can not be blank")
	private String source;
	
//    destination varchar(30),
	
	@Column(name = "destination", length = 30)
	@NotBlank(message = "Destination can not be blank")
	private String destination;
	
//    travel_date date,
	
	@Column(name = "travel_date")
	@NotNull(message = "Travel date can not be Null")
	private LocalDate travelDate;
	
//    arrival_time datetime,
	
	@Column(name = "arrival_time")
	@NotNull(message = "Arrival time can not be Null")
	private LocalDateTime arrivalTime;
	
//    takeoff_time datetime,
	
	@Column(name = "takeoff_time")
	@NotNull(message = "Take off time can not be Null")
	private LocalDateTime takeOffTime;
	
//    landing_time datetime,
	
	@Column(name = "landing_time")
	@NotNull(message = "Landing time can not be Null")
	private LocalDateTime landingTime;
	
//    price float,
	
	@NotNull(message = "Price can not be Null")
	private Double price;
	
//    available_seats int,
	
	@Column(name = "available_seats")
	private Integer availableSeats;
	
	@Column(name = "booked_seats")
	private Integer bookedSeats;
	
//    takeoff_status boolean,
	
	@Column(name = "takeoff_status")
	private Boolean takeOffStatus;
	
//    landing_status boolean,
	
	@Column(name = "landing_status")
	private Boolean landingStatus;
	
//	ec1 int,
//	ec2 int,
//	ec3 varchar(50),
//	ec4 varchar(50),
//	ec5 varchar(50),
//	ec6 varchar(50),
//	ec7 float,
//	ec8 double,
//	ec9 boolean,
//	ec10 date,
//	ec11 datetime,
//	ec12 datetime
}
