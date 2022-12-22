package club.yunzhi.log.controller;


import club.yunzhi.log.entity.Dishes;
import club.yunzhi.log.service.DishesService;
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
@RequestMapping("dishes")
public class DishesController {

    private final static Logger logger = LoggerFactory.getLogger(DishesController.class);

    @Autowired
    private DishesService dishesService;

    @Autowired
    public DishesController(final DishesService dishesService) {
        this.dishesService = dishesService;
    }

    @PostMapping
    public String save(@RequestBody final Dishes dishes) {
        return this.dishesService.save(dishes);
    }

    @GetMapping("page")
    public Page<Dishes> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long restaurantId,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Dishes> dishess = new PageImpl(this.dishesService.findAll(name, restaurantId, pageable));
        return dishess;
    }

    @GetMapping("getAll")
    public List<Dishes> getAll() {
        return this.dishesService.getAll();
    }

    @GetMapping("{id}")
    public Dishes getById(@PathVariable Long id) {
        return this.dishesService.findById(id);
    }

    @PutMapping("{id}")
    public Dishes update(@PathVariable Long id, @RequestBody Dishes dishes) {
        return this.dishesService.update(id, dishes);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.dishesService.deleteById(id);
    }

    @GetMapping("getByRestaurant/{id}")
    public List<Dishes> getByRestaurantId(@PathVariable Long id) {
        return this.dishesService.getByRestaurantId(id);
    }

}
