package com.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.app.service.UserServiceImpl;

@Configuration
@EnableWebSecurity
@CrossOrigin(origins = "http://localhost:3000")
public class MySecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserServiceImpl userServices;
	
	@Autowired
	private JwtAuthenticationFilter jwtFilter;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
	http.csrf().disable().cors().disable().authorizeRequests()
			.antMatchers("/token", "/users/register", "/users/verifyotp", "/users/resetpassword", "/users/{userId}", "/email/sendemail", "/psgr/searchflight", "/admin/allflights", "/users/getsubadmins", "/admin/flight/{flightId}", "/admin/addflight", "/admin/removeflight/{flightId}", "/admin/updateflight", "/admin/flight/{flightId}", "/admin/psgrlist/{flightId}", "/psgr/addbooking/{noOfTickets}", "/psgr/bookings/{userId}", "/psgr/addbooking", "/psgr/invalidatebooking/{bookingNo}", "/psgr/makepayment", "/psgr/ticket/{ticketNo}", "/psgr/invalidateTicket/{ticketNo}", "/psgr/seetickets", "/psgr/addpsgr")
			.permitAll().anyRequest().authenticated().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	
	http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	
	
	
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// TODO Auto-generated method stub
		super.configure(auth);
		auth.userDetailsService(userServices);
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		
		return NoOpPasswordEncoder.getInstance();
	}
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
}
