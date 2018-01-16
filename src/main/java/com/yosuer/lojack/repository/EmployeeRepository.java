package com.yosuer.lojack.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.yosuer.lojack.domain.Employee;

@RepositoryRestResource
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long>{

}
