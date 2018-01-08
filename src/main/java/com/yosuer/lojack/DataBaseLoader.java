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
		Owner owner1 = new Owner("Jhonatan Z", "1568772707", "lavalle 222", "AR");
		Owner owner2 = new Owner("Juanita C", "1569987446", "lavalle 111", "AR");
		this.ownerRepository.save(owner1);
		this.ownerRepository.save(owner2);
	}
}
