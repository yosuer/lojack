package com.yosuer.lojack.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import com.yosuer.lojack.domain.Manager;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

	private final SpringDataJpaUserDetailsService userDetailsService;

	public SecurityConfiguration(SpringDataJpaUserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(this.userDetailsService)
				.passwordEncoder(Manager.PASSWORD_ENCODER);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.authorizeRequests()
					.antMatchers("/built/**", "/main.css").permitAll()
					.anyRequest().authenticated()
					.and()
				.formLogin()
					.defaultSuccessUrl("/", true)
					.permitAll()
					.and()
				.httpBasic()
					.and()
				.csrf().disable()
				.logout()
					.logoutSuccessUrl("/");
	}

}
