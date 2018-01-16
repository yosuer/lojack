package com.yosuer.lojack.domain;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Employee {

	private @Id @GeneratedValue Long id;
	private String document;
	private String code;
	private String firstName;
	private String secondName;
	private String firstLastName;
	private String secondLastName;
	private String address;
	private String phone;
	private LocalDate birthDate;
	private LocalDate registrationDate;
	private Gender gender;
	private Status status;
	private String observations;

	public Employee(){
	}

	public Employee(String document, String code, String firstName, String secondName, String firstLastName,
			String secondLastName, String address, String phone, LocalDate birthDate, LocalDate registrationDate,
			Gender gender, Status status, String observations) {
		this.document = document;
		this.code = code;
		this.firstName = firstName;
		this.secondName = secondName;
		this.firstLastName = firstLastName;
		this.secondLastName = secondLastName;
		this.address = address;
		this.phone = phone;
		this.birthDate = birthDate;
		this.registrationDate = registrationDate;
		this.gender = gender;
		this.status = status;
		this.observations = observations;
	}
}
