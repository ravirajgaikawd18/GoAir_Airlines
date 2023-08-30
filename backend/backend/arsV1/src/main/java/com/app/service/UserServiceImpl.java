package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.IUserRepository;

import com.app.entity.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService, UserDetailsService {

	@Autowired
	private IUserRepository userRepo;
	
	@Override
	public User addUserDetails(User transientUser) {
		// TODO Auto-generated method stub
		return userRepo.save(transientUser);		// rets persistent entity
	}												// rets detached user entity : since TX is over.

	@Override
	public User getUserDetailsById(int userId) {
		// TODO Auto-generated method stub
		return userRepo.findById(userId).orElseThrow();		// in case of valid user id : rets persistent user entity
															// or in case of invalid id : throws NoSuchElemExc
	}

//	@Override
//	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
//		// TODO Auto-generated method stub
//		AppUser user = userRepo.findByUserName(userName);
//		return user.toUser();
//	}

	@Override
	public User getUserDetailsByUsernameAndPass(String username, String pass) {
		// TODO Auto-generated method stub
		return userRepo.findByUsernameAndPassword(username, pass).orElseThrow();
	}

	@Override
	public String updateProfileById(User toUpdate) {
		// TODO Auto-generated method stub
		User fromDB = userRepo.findById(toUpdate.getUserId()).orElseThrow();
		if(fromDB != null) {
			String pswd = fromDB.getPassword();
			fromDB = toUpdate;
			fromDB.setPassword(pswd);
			userRepo.save(fromDB);
			return "profile updated";
		}
		return "failure";
	}

	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email);
	}

	@Override
	public String resetPassword(User toUpdate) {
		// TODO Auto-generated method stub
		User fromDB = userRepo.findByEmail(toUpdate.getEmail());
		if(fromDB != null) {
			fromDB.setPassword(toUpdate.getPassword());
			userRepo.save(fromDB);
			return "password updated";
		}
		return "failure";
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
        Optional<User> userOptional = userRepo.findUserByUsername(username);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("User not found with usesrname: " + username);
        }
        User user = userOptional.get();
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
	
	}

	@Override
	public List<User> getAllSubadmins() {
		// TODO Auto-generated method stub
		return userRepo.findByRole("SUBADMIN");
	}
}
