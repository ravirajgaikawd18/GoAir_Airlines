package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.CustomTokens;
import java.lang.String;
import java.util.List;

public interface ITokenRepository extends JpaRepository<CustomTokens, Integer> {

	List<CustomTokens> findByUsername(String username);
}
