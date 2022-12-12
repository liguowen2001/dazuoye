package club.yunzhi.log.service;

import club.yunzhi.log.entity.Customer;
import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.CustomerRepository;
import club.yunzhi.log.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Override
    public String save(Customer customer) {
        User user = customer.getUser();
        User newUser =  this.userRepository.save(user);
        customer.setUser(newUser);
        this.customerRepository.save(customer);
        return "yunzhi";
    }

    @Override
    public Customer update(Long id, Customer newCustomer) {
        Customer oldCustomer = this.customerRepository.findById(id).get();
        this.userService.update(newCustomer.getUser().getId(),newCustomer.getUser());
        oldCustomer.setAddress(newCustomer.getAddress());
        return this.customerRepository.save(oldCustomer);
    }

    @Override
    public void deleteById(Long id) {
        Customer customer = this.customerRepository.findById(id).get();
        Long userId = customer.getUser().getId();
        this.customerRepository.deleteById(id);
        this.userRepository.deleteById(userId);
    }

    @Override
    public Customer findById(Long id) {
        return customerRepository.findById(id).get();
    }

    @Override
    public Page<Customer> findAll(String name, String username, Pageable pageable) {
        Page<Customer> page = customerRepository.findAll(name,username,pageable);
        return page;
    }

    @Override
    public List<Customer> getAll() {
        return (List<Customer>) this.customerRepository.findAll();
    }

    @Override
    public Customer findByUserId(Long userId) {
        return this.customerRepository.findByUser(userId);
    }
}
