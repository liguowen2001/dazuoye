package club.yunzhi.log.controller;


import club.yunzhi.log.entity.MyOrder;
import club.yunzhi.log.service.MyOrderService;
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


@RestController
@RequestMapping("order")
public class MyOrderController {

    private final static Logger logger = LoggerFactory.getLogger(MyOrderController.class);

    @Autowired
    private MyOrderService orderService;

    @Autowired
    public MyOrderController(final MyOrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public MyOrder save(@RequestBody final MyOrder order) {
        return this.orderService.save(order);
    }

    @GetMapping("page")
    public Page<MyOrder> page(
            @RequestParam(required = false) Long status,
            @RequestParam(required = false) Long restaurantId,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<MyOrder> orders = new PageImpl(this.orderService.findAll(status,restaurantId,pageable));
        return orders;
    }

    @GetMapping("getAll")
    public List<MyOrder> getAll() {
        return this.orderService.getAll();
    }

    @GetMapping("{id}")
    public MyOrder getById(@PathVariable Long id) {
        return this.orderService.findById(id);
    }

    @PutMapping("{id}")
    public MyOrder update(@PathVariable Long id, @RequestBody MyOrder order) {
        return this.orderService.update(id, order);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.orderService.deleteById(id);
    }

    @GetMapping("getByCustomer/{id}")
    public MyOrder getByCustomer(@PathVariable Long id) {
        return this.orderService.getByCustomerId(id);
    }

    @GetMapping("getAllByCustomer/{id}")
    public List<MyOrder> getAllByCustomer(@PathVariable Long id) {
        return this.orderService.getAllByCustomerId(id);
    }
}
