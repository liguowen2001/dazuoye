package club.yunzhi.log.controller;


import club.yunzhi.log.entity.Restaurant;
import club.yunzhi.log.service.RestaurantService;
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
@RequestMapping("restaurant")
public class RestaurantController {

    private final static Logger logger = LoggerFactory.getLogger(RestaurantController.class);

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    public RestaurantController(final RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @PostMapping
    public String save(@RequestBody final Restaurant restaurant) {
        return this.restaurantService.save(restaurant);
    }

    @GetMapping("page")
    public Page<Restaurant> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String username,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Restaurant> restaurants = new PageImpl(this.restaurantService.findAll(name, username, pageable));
        return restaurants;
    }

    @GetMapping("getAll")
    public List<Restaurant> getAll() {
        return this.restaurantService.getAll();
    }

    @GetMapping("{id}")
    public Restaurant getById(@PathVariable Long id) {
        return this.restaurantService.findById(id);
    }

    @PutMapping("{id}")
    public Restaurant update(@PathVariable Long id, @RequestBody Restaurant restaurant) {
        return this.restaurantService.update(id, restaurant);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.restaurantService.deleteById(id);
    }

    @GetMapping("getByUser/{id}")
    public Restaurant getByUser(@PathVariable Long id) {
        return this.restaurantService.findByUser(id);
    }
}
