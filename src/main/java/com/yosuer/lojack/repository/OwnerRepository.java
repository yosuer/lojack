package com.yosuer.lojack.repository;

import org.springframework.data.repository.CrudRepository;
import com.yosuer.lojack.domain.Owner;

public interface OwnerRepository extends CrudRepository <Owner, Long> {
}
