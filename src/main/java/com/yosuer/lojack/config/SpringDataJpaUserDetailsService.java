package com.yosuer.lojack.config;

import static org.springframework.security.core.authority.AuthorityUtils.createAuthorityList;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.yosuer.lojack.domain.Manager;
import com.yosuer.lojack.repository.ManagerRepository;

@Configuration
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final ManagerRepository repository;

	public SpringDataJpaUserDetailsService(ManagerRepository repository) {
		this.repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		Manager manager = this.repository.findByName(name);
		return new User(manager.getName(), manager.getPassword(), createAuthorityList(manager.getRoles()));
	}
}
