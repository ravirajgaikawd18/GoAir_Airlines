package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.User;

public interface IUserRepository extends JpaRepository<User, Integer> {

	// user validation : email n password
		
		
		Optional<User> findByUsernameAndPassword(String username, String pass);

		User findByEmail(String email);

		Optional<User> findUserByUsername(String username);

		List<User> findByRole(String role);

}
