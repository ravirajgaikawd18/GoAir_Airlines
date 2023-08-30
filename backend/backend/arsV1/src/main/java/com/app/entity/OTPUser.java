package com.app.entity;

import java.time.LocalDateTime;

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

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "t_otp")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OTPUser {

//	otp_id int auto_increment primary key,
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "otp_id")
	private Integer otpId;
	
//	user_id int,
	
//	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private Integer userId;
	
//    otp int,
	
	private String otp;
	
//    generated_on datetime,
	
	@Column(name = "generated_on")
	private LocalDateTime generatedOn;
	
//    expiry_time datetime,
	
	@Column(name = "expiry_time")
	private LocalDateTime expiryTime;
	
//    isvarified boolean,
	
	@Column(name = "is_varified")
	private Boolean isVarified;
	
//	FOREIGN KEY (user_id) REFERENCES T_Users(user_id),
//	ec1 int,
//    ec2 varchar(50),
//    ec3 date,
//    ec4 datetime,
//    ec5 datetime,
//    ec6 boolean
}
