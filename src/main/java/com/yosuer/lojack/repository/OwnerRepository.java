package com.yosuer.lojack.repository;

import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import com.yosuer.lojack.domain.Owner;

@PreAuthorize("hasRole('ROLE_MANAGER')")
@RepositoryRestResource
public interface OwnerRepository extends PagingAndSortingRepository<Owner, Long> {

	@Override
	@PreAuthorize("#owner?.manager == null or #owner?.manager?.name == authentication?.name")
	Owner save(@Param("owner") Owner owner);

	@RestResource(path = "fullName")
	List<Owner> findByFullNameIgnoreCaseContaining(@Param("name") String name);

	@Override()
	@PreAuthorize("@ownerRepository.findById(#id)?.manager?.name == authentication?.name ")
	void deleteById(@Param("id") Long id);

	@Override
	@PreAuthorize("#owner?.manager?.name == authentication?.name")
	void delete(@Param("owner") Owner owner);
}
