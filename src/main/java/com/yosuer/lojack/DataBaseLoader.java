package com.yosuer.lojack;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.yosuer.lojack.domain.Owner;
import com.yosuer.lojack.repository.OwnerRepository;

@Component
public class DataBaseLoader implements CommandLineRunner {

	private final OwnerRepository ownerRepository;

	public DataBaseLoader(OwnerRepository ownerRepository) {
		this.ownerRepository = ownerRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		this.ownerRepository.save(
				new Owner("Jhonatan Z", "1568772707", "lavalle 222", "AR"));
		this.ownerRepository.save(
				new Owner("Juanita C", "1569987446", "lavalle 111", "AR")
		);
		this.ownerRepository.save(
				new Owner("Juaaas sa", "111111", "lavalle 111", "BR")
		);
		this.ownerRepository.save(
				new Owner("Ju dasds", "222222", "lavalle 111", "AR")
		);
	}
}
