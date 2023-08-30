package com.app.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "t_bookings")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Booking {

//	booking_no int auto_increment primary key,
	
	@Id
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "booking_generator")
//	@SequenceGenerator(name = "booking_generator", sequenceName = "booking_sequence_name",
//						allocationSize = 1, initialValue = 1000)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "booking_no")
	private Long bookingNo;
	
//	 booking_date datetime,
	
	@Column(name = "booking_time")
	private LocalDateTime bookingTime;
	
//    tickets int,
	
//	@OneToMany(mappedBy = "bookingNo", fetch = FetchType.EAGER)
//	private List<Ticket> tickets = new ArrayList<Ticket>();
	
//    total_amount float,
	
	@Column(name = "total_amount")
	private Double totalAmount;
	
//    pay_status boolean,
	
	@Column(name = "pay_status")
	private Boolean payStatus;
	
//    isvalid boolean,
	
	@Column(name = "is_valid")
	private Boolean isValid;
	
//    flight_id int,
	
//	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "flight_id")
	private Long flightId;
	
//	 user_id int,
	
//	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private Integer userId;
	
//	 FOREIGN KEY (flight_id) REFERENCES T_Flights(flight_id),
//    FOREIGN KEY (user_id) REFERENCES T_Users(user_id),
//    ec1 int,
//	 ec2 int,
//	 ec3 varchar(50),
//	 ec4 varchar(50),
//	 ec5 varchar(50),
//	 ec6 varchar(50),
//	 ec7 float,
//	 ec8 double,
//	 ec9 boolean,
//	 ec10 date,
//	 ec11 datetime,
//	 ec12 datetime
//  )auto_increment=1000;
}
