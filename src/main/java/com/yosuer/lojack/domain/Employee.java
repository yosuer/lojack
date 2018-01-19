package com.yosuer.lojack.domain;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Data;

@Data
@Entity
@JsonDeserialize(builder = Employee.Builder.class)
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

	private Employee(Builder builder) {
		setId(builder.id);
		setDocument(builder.document);
		setCode(builder.code);
		setFirstName(builder.firstName);
		setSecondName(builder.secondName);
		setFirstLastName(builder.firstLastName);
		setSecondLastName(builder.secondLastName);
		setAddress(builder.address);
		setPhone(builder.phone);
		setBirthDate(builder.birthDate);
		setRegistrationDate(builder.registrationDate);
		setGender(builder.gender);
		setStatus(builder.status);
		setObservations(builder.observations);
	}

	public static Builder builder() {
		return new Builder();
	}

	public static Builder builder(Employee copy) {
		Builder builder = new Builder();
		builder.id = copy.id;
		builder.document = copy.document;
		builder.code = copy.code;
		builder.firstName = copy.firstName;
		builder.secondName = copy.secondName;
		builder.firstLastName = copy.firstLastName;
		builder.secondLastName = copy.secondLastName;
		builder.address = copy.address;
		builder.phone = copy.phone;
		builder.birthDate = copy.birthDate;
		builder.registrationDate = copy.registrationDate;
		builder.gender = copy.gender;
		builder.status = copy.status;
		builder.observations = copy.observations;
		return builder;
	}

	@JsonPOJOBuilder
	public static final class Builder {
		private Long id;
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

		private Builder() {
		}

		public Builder withId(Long id) {
			this.id = id;
			return this;
		}

		public Builder withDocument(String document) {
			this.document = document;
			return this;
		}

		public Builder withCode(String code) {
			this.code = code;
			return this;
		}

		public Builder withFirstName(String firstName) {
			this.firstName = firstName;
			return this;
		}

		public Builder withSecondName(String secondName) {
			this.secondName = secondName;
			return this;
		}

		public Builder withFirstLastName(String firstLastName) {
			this.firstLastName = firstLastName;
			return this;
		}

		public Builder withSecondLastName(String secondLastName) {
			this.secondLastName = secondLastName;
			return this;
		}

		public Builder withAddress(String address) {
			this.address = address;
			return this;
		}

		public Builder withPhone(String phone) {
			this.phone = phone;
			return this;
		}

		public Builder withBirthDate(LocalDate birthDate) {
			this.birthDate = birthDate;
			return this;
		}

		public Builder withRegistrationDate(LocalDate registrationDate) {
			this.registrationDate = registrationDate;
			return this;
		}

		public Builder withGender(Gender gender) {
			this.gender = gender;
			return this;
		}

		public Builder withStatus(Status status) {
			this.status = status;
			return this;
		}

		public Builder withObservations(String observations) {
			this.observations = observations;
			return this;
		}

		public Employee build() {
			return new Employee(this);
		}
	}
}
