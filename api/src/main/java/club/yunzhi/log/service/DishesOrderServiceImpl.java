package club.yunzhi.log.service;


import club.yunzhi.log.entity.DishesOrder;
import club.yunzhi.log.repository.DishesOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class DishesOrderServiceImpl implements DishesOrderService {

    @Autowired
    DishesOrderRepository dishesOrderRepository;

    @Override
    public DishesOrder save(DishesOrder dishesOrder) {
        return this.dishesOrderRepository.save(dishesOrder);
    }

    @Override
    public DishesOrder update(Long id, DishesOrder newDishesOrder) {
        DishesOrder oldDishesOrder = this.dishesOrderRepository.findById(id).get();
        oldDishesOrder.setDishes(newDishesOrder.getDishes());
        oldDishesOrder.setCount(newDishesOrder.getCount());
        return this.dishesOrderRepository.save(oldDishesOrder);
    }

    @Override
    public void deleteById(Long id) {
        DishesOrder dishesOrder = this.dishesOrderRepository.findById(id).get();
        this.dishesOrderRepository.deleteById(id);
    }

    @Override
    public DishesOrder findById(Long id) {
        return dishesOrderRepository.findById(id).get();
    }

    @Override
    public Page<DishesOrder> findAll(Pageable pageable) {
        Page<DishesOrder> page = dishesOrderRepository.findAll(pageable);
        return page;
    }

    @Override
    public List<DishesOrder> getAll() {
        return (List<DishesOrder>) this.dishesOrderRepository.findAll();
    }

    @Override
    public float getTotalPriceByRestaurantAndTime(Long restaurantId, Long startTime, Long endTime) {
        Date startDate = new Date(startTime);
        Date endDate = new Date(endTime);
        List<DishesOrder> dishesOrders = this.dishesOrderRepository.findAllByDishes_Restaurant_IdAndCreateTimeBetween(restaurantId, startDate, endDate);
        AtomicReference<Float> totalPrice = new AtomicReference<>((float) 0);
        dishesOrders.forEach(dishesOrder -> {
            totalPrice.updateAndGet(v -> new Float((float) (v + dishesOrder.getPrice() * dishesOrder.getCount())));

        });
        return totalPrice.get();
    }

    @Override
    public Long getCountByDishesAndTime(Long dishesId, Long startTime, Long endTime) {
        Date startDate = new Date(startTime);
        Date endDate = new Date(endTime);
        List<DishesOrder> dishesOrders = this.dishesOrderRepository.findAllByDishes_IdAndCreateTimeBetween(dishesId, startDate, endDate);
        AtomicReference<Long> totalCount = new AtomicReference<>(0L);
        dishesOrders.forEach(dishesOrder -> {
            totalCount.updateAndGet(v -> v + dishesOrder.getCount());
        });
        return totalCount.get();
    }

}
