package com.yosuer.lojack.repository;

import org.springframework.data.repository.Repository;
import com.yosuer.lojack.domain.Manager;

public interface ManagerRepository extends Repository<Manager, Long> {

	Manager save(Manager manager);

	Manager findByName(String name);
}
