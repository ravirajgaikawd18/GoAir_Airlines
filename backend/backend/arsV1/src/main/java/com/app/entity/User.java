package com.app.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import org.springframework.format.annotation.DateTimeFormat;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "T_Users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User {
//	user_id int auto_increment primary key,
	@Column(name = "user_id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	
//	username varchar(20) not null unique,
	@Column(name = "username", length = 20, unique = true)
	@NotBlank(message = "username can not be blank")
	private String username;
	
//	email varchar(30) not null unique,
	@Column(length = 30, unique = true)
	@NotBlank(message = "email can not be blank")
	@Email(message = "invalid email format")
	private String email;
	
//	password varchar(50) not null unique,
	@Column(length = 100, unique = true)
	@NotNull(message = "password can not be blank")
//	@JsonIgnore : skipped during ser n de-ser
	@JsonProperty(access = Access.WRITE_ONLY)		// skipped during ser(= marshalling) n kept during de-ser (un marshalling)
	private String password;
	
//	first_name varchar(20) not null,
	@Column(name = "first_name", length = 20)
	@NotBlank(message = "firstName can not be null")
	private String firstName;
	
//	last_name varchar(20) not null,
	@Column(name = "last_name", length = 20)
	@NotBlank(message = "lastName can not be blank")
	private String lastName;
	
//	phone varchar(10) not null,
	@Column(length = 10)
	@NotBlank(message = "phone can not be blank")
	private String phone;
	
//	adhar varchar(12) unique,
	@Column(length = 12)
	private String adhar;
	
//	role varchar(20),
//	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private String role;
	
//	created_time datetime,
	@Column(name = "created_time")
	@DateTimeFormat(pattern = "yyyy-MM-ddTHH:MM:SS")
	@Past(message = "invalid date")
	private LocalDateTime createdTime;
	
//  isactive boolean,
	@Column(name = "isactive")
	private Boolean isActive;

		
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
