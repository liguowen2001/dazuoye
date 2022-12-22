package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Customer;
import club.yunzhi.log.service.CustomerService;
import club.yunzhi.log.utils.PageImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * 学生
 */
@RestController
@RequestMapping("customer")
public class CustomerController {

    private final static Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    public CustomerController(final CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public String save(@RequestBody final Customer customer) {
        return this.customerService.save(customer);
    }

    @GetMapping("page")
    public Page<Customer> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String username,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Customer> customers = new PageImpl(this.customerService.findAll(name, username, pageable));
        return customers;
    }

    @GetMapping("getAll")
    public List<Customer> getAll() {
        return this.customerService.getAll();
    }

    @GetMapping("{id}")
    public Customer getById(@PathVariable Long id) {
        return this.customerService.findById(id);
    }

    @PutMapping("{id}")
    public Customer update(@PathVariable Long id, @RequestBody Customer customer) {
        return this.customerService.update(id, customer);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.customerService.deleteById(id);
    }

    @GetMapping("getByUser/{id}")
    public Customer getByUser(@PathVariable Long id) {
        return this.customerService.findByUserId(id);
    }
}
