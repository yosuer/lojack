package com.yosuer.lojack.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import com.yosuer.lojack.domain.Owner;

@PreAuthorize("hasRole('ROLE_MANAGER')")
public interface OwnerRepository extends PagingAndSortingRepository<Owner, Long> {

	@Override
	@PreAuthorize("#owner?.manager == null or #owner?.manager?.name == authentication?.name")
	Owner save(@Param("owner") Owner owner);

	@Override()
	@PreAuthorize("@ownerRepository.findById(#id)?.manager?.name == authentication?.name ")
	void deleteById(@Param("id") Long id);

	@Override
	@PreAuthorize("#owner?.manager?.name == authentication?.name")
	void delete(@Param("owner") Owner owner);
}
