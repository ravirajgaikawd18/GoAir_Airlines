package com.app.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "t_passengers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Passenger {

//	pid int auto_increment primary key,
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "p_id")
	private Long pId;
	
//	   p_fname varchar(20) not null,
	
	@Column(name = "p_first_name")
	@NotBlank(message = "passenger first name can not be blank")
	private String pfirstName;
	
//    p_mname varchar(20) not null,
	
	@Column(name = "p_middle_name")
	@NotBlank(message = "passenger's middle name can not be blank")
	private String pmiddleName;
	
//    p_lname varchar(20) not null,
	
	@Column(name = "p_last_name")
	@NotBlank(message = "passenger last name can not be blank")
	private String plastName;
	
//    gender varchar(15),
	
	private String gender;
	
//    dob date,
	@Past(message = "DOB is not valid")
	private LocalDate dob;
	
//    adhar varchar(12),
	
	private String adhar;
	
//    phone varchar(10),
	
	private String phone;
	
//    ticket_no int,
	
//	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "ticket_no")
	private Long ticketNo;
	
//    FOREIGN KEY (ticket_no) REFERENCES T_Tickets(ticket_no),
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
//	 );
}
