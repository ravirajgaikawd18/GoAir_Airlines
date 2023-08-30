package com.app.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import com.app.helper.JwtUtil;
import com.app.service.UserServiceImpl;


@Component
@CrossOrigin(origins = "http://localhost:3000")
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private UserServiceImpl userServices;
	
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//getjwt
		//bearer se start ho raha hai ya nahi
		//validate
		String requestTokenHeader = request.getHeader("Authorization");
		String userName=null;
		String jwtToken=null;
		//checking null and format
		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken=requestTokenHeader.substring(7);
			try {
				userName = this.jwtUtil.getUsernameFromToken(jwtToken);
				
			}catch (Exception e) 
			{
				e.printStackTrace();
			}
		UserDetails userDetails = this.userServices.loadUserByUsername(userName);
			
			//security
			if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null)
			{
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}else
			{
				System.out.println("token is not validated");
			}
			
		}
		filterChain.doFilter(request, response);
	}
	
}
