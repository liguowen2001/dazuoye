package club.yunzhi.log.service;

import club.yunzhi.log.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {

    String save(Customer customer);

    Customer update(Long id, Customer customer);

    void deleteById(Long id);

    Customer findById(Long id);

    Page<Customer> findAll(String name, String username , Pageable pageable);

    List<Customer> getAll();

    Customer findByUserId(Long userId);
}
