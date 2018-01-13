package com.yosuer.lojack.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import com.yosuer.lojack.domain.Owner;

public interface OwnerRepository extends PagingAndSortingRepository<Owner, Long> {
}
