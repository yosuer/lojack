package com.yosuer.lojack.domain;

import javax.persistence.*;
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

	private @ManyToOne Manager manager;

	private @Version @JsonIgnore Long version;

	public Owner() {
	}

	@JsonIgnore
	public void setManager(){
		this.manager = manager;
	}

	public Owner(String fullName, String phoneNumber, String address, String country, Manager manager) {
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.country = country;
		this.manager = manager;
	}
}
