package club.yunzhi.log.service;

import club.yunzhi.log.entity.DishesOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DishesOrderService {

    DishesOrder save(DishesOrder dishesOrder);

    DishesOrder update(Long id, DishesOrder dishesOrder);

    void deleteById(Long id);

    DishesOrder findById(Long id);

    Page<DishesOrder> findAll(Pageable pageable);

    List<DishesOrder> getAll();


    float getTotalPriceByRestaurantAndTime(Long restaurantId, Long startTime, Long endTime);

    Long getCountByDishesAndTime(Long dishesId, Long startTime, Long endTime);

}
