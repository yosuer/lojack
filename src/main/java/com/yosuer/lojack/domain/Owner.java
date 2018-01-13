package com.yosuer.lojack.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
@Entity
public class Owner {

	private @Id @GeneratedValue Long id;
	private String fullName;
	private String phoneNumber;
	private String address;
	private String country;

	private @Version @JsonIgnore Long version;

	public Owner() {
	}

	public Owner(String fullName, String phoneNumber, String address, String country) {
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.country = country;
	}
}
