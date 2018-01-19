package com.yosuer.lojack;

import static org.springframework.security.core.authority.AuthorityUtils.createAuthorityList;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import com.yosuer.lojack.domain.Employee;
import com.yosuer.lojack.domain.Manager;
import com.yosuer.lojack.domain.Owner;
import com.yosuer.lojack.repository.EmployeeRepository;
import com.yosuer.lojack.repository.ManagerRepository;
import com.yosuer.lojack.repository.OwnerRepository;

@Component
public class DataBaseLoader implements CommandLineRunner {

	private final OwnerRepository ownerRepository;
	private final ManagerRepository managerRepository;
	private final EmployeeRepository employeeRepository;

	public DataBaseLoader(OwnerRepository ownerRepository, ManagerRepository managerRepository,
			EmployeeRepository employeeRepository) {
		this.ownerRepository = ownerRepository;
		this.managerRepository = managerRepository;
		this.employeeRepository = employeeRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		Employee employee1 = Employee.builder()
				.withDocument("111111")
				.withCode("2232323")
				.withFirstName("asdasd")
				.withAddress("addresss")
				.build();

		employeeRepository.save(employee1);

		Manager greg = managerRepository.save(new Manager("greg", "pass1",
				"ROLE_MANAGER"));
		Manager oliver = managerRepository.save(new Manager("oliver", "pass2",
				"ROLE_MANAGER"));

		SecurityContextHolder.getContext().setAuthentication(
				new UsernamePasswordAuthenticationToken("greg", "doesn't matter",
						createAuthorityList("ROLE_MANAGER")));

		this.ownerRepository.save(
				new Owner("Jhonatan Z", "1568772707", "lavalle 222", "AR", greg));
		this.ownerRepository.save(
				new Owner("Juanita C", "1569987446", "lavalle 111", "AR", greg)
		);

		SecurityContextHolder.getContext().setAuthentication(
				new UsernamePasswordAuthenticationToken("oliver", "doesn't matter",
						createAuthorityList("ROLE_MANAGER")));

		this.ownerRepository.save(
				new Owner("Juaaas sa", "111111", "lavalle 111", "BR", oliver)
		);
		this.ownerRepository.save(
				new Owner("Ju dasds", "222222", "lavalle 111", "AR", oliver)
		);

		SecurityContextHolder.clearContext();
	}
}
