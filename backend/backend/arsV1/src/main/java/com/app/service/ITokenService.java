package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.entity.CustomTokens;

public interface ITokenService {

	//add a method to insert token into db
	CustomTokens addToken(CustomTokens transientCustomTokens);
	
	CustomTokens getCustomTokensById(Integer token);
	
	List<CustomTokens> getCustomTokensForUsername(String username);
	
	String removeCustomTokenById(Integer token);
}
