package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ITokenRepository;
import com.app.entity.CustomTokens;

@Service
@Transactional
public class TokenServiceImpl implements ITokenService {
	
	@Autowired
	private ITokenRepository tokenRepo;

	@Override
	public CustomTokens addToken(CustomTokens transientCustomTokens) {
		// TODO Auto-generated method stub
		return tokenRepo.save(transientCustomTokens);
	}

	
	@Override
	public CustomTokens getCustomTokensById(Integer token) {
		// TODO Auto-generated method stub
		return tokenRepo.findById(token).orElseThrow();
	}

	@Override
	public String removeCustomTokenById(Integer token) {
		// TODO Auto-generated method stub
		tokenRepo.deleteById(token);
		return "token deleted";
	}


	@Override
	public List<CustomTokens> getCustomTokensForUsername(String username) {
		// TODO Auto-generated method stub
		return tokenRepo.findByUsername(username);
	}

}
