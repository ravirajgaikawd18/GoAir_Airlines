package com.app.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ApiResponseDto {
	
	private LocalDateTime timeStamp;
	private String message;
	
	public ApiResponseDto(String message) {
		super();
		this.timeStamp = LocalDateTime.now();
		this.message = message;
	}
	
	
}
