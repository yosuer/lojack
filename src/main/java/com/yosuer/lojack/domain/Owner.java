package com.yosuer.lojack.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Owner {

	@Id
	@GeneratedValue
	private Long id;
	private String fullName;
	private String phoneNumber;
	private String address;
	private String country;

	public Owner() {
	}

	public Owner(String fullName, String phoneNumber, String address, String country) {
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.country = country;
	}
}
