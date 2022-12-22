package club.yunzhi.log.controller;


import club.yunzhi.log.entity.DishesOrder;
import club.yunzhi.log.service.DishesOrderService;
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
@RequestMapping("dishesOrder")
public class DishesOrderController {

    private final static Logger logger = LoggerFactory.getLogger(DishesOrderController.class);

    @Autowired
    private DishesOrderService dishesOrderService;

    @Autowired
    public DishesOrderController(final DishesOrderService dishesOrderService) {
        this.dishesOrderService = dishesOrderService;
    }

    @PostMapping
    public DishesOrder save(@RequestBody final DishesOrder dishesOrder) {
        return this.dishesOrderService.save(dishesOrder);
    }

    @GetMapping("page")
    public Page<DishesOrder> page(
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<DishesOrder> dishesOrders = new PageImpl(this.dishesOrderService.findAll(pageable));
        return dishesOrders;
    }

    @GetMapping("getAll")
    public List<DishesOrder> getAll() {
        return this.dishesOrderService.getAll();
    }

    @GetMapping("{id}")
    public DishesOrder getById(@PathVariable Long id) {
        return this.dishesOrderService.findById(id);
    }

    @PutMapping("{id}")
    public DishesOrder update(@PathVariable Long id, @RequestBody DishesOrder dishesOrder) {
        return this.dishesOrderService.update(id, dishesOrder);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.dishesOrderService.deleteById(id);
    }

    @GetMapping("getTotalPriceByRestaurantAndTime")
    public float getTotalPriceByRestaurantAndTime(
            @RequestParam(required = false) Long restaurantId,
            @RequestParam Long startTime,
            @RequestParam Long endTime
    ) {
        return this.dishesOrderService.getTotalPriceByRestaurantAndTime(restaurantId, startTime, endTime);
    }

    @GetMapping("getCountByDishesAndTime")
    public float getCountByDishesAndTime(
            @RequestParam(required = false) Long dishesId,
            @RequestParam Long startTime,
            @RequestParam Long endTime
    ) {
        return this.dishesOrderService.getCountByDishesAndTime(dishesId, startTime, endTime);
    }
}
