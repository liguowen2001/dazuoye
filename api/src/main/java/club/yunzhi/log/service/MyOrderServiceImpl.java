package club.yunzhi.log.service;


import club.yunzhi.log.entity.MyOrder;
import club.yunzhi.log.repository.MyOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyOrderServiceImpl implements MyOrderService {

    @Autowired
    MyOrderRepository orderRepository;

    @Override
    public MyOrder save(MyOrder order) {
        return this.orderRepository.save(order);
    }

    @Override
    public MyOrder update(Long id, MyOrder newOrder) {
        MyOrder oldOrder = this.orderRepository.findById(id).get();
        oldOrder.setDishesOrders(newOrder.getDishesOrders());
        oldOrder.setCustomer(newOrder.getCustomer());
        oldOrder.setStatus(newOrder.getStatus());
        oldOrder.setTotalPrice(newOrder.getTotalPrice());
        oldOrder.setRestaurant(newOrder.getRestaurant());
        oldOrder.setRider(newOrder.getRider());
        return this.orderRepository.save(oldOrder);
    }

    @Override
    public void deleteById(Long id) {
        MyOrder order = this.orderRepository.findById(id).get();
        this.orderRepository.deleteById(id);
    }

    @Override
    public MyOrder findById(Long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public Page<MyOrder> findAll(Long status, Long restaurantId, Pageable pageable) {
        Page<MyOrder> page = orderRepository.findAll(status, restaurantId, pageable);
        return page;
    }

    @Override
    public List<MyOrder> getAll() {
        return (List<MyOrder>) this.orderRepository.findAll();
    }

    @Override
    public MyOrder getByCustomerId(Long id) {
        Long status = 0L;

        return this.orderRepository.findFirstByCustomer_IdAndAndStatusIs(id, status);
    }

    @Override
    public List<MyOrder> getAllByCustomerId(Long id) {
        return this.orderRepository.findAllByCustomer_IdAndStatusNotOrderByCreateTimeDesc(id, 0L);
        //return this.orderRepository.findAllByCustomer_Id(id);

    }

    @Override
    public List<MyOrder> getAllByStatus(Long status) {
        return this.orderRepository.findAllByStatus(status);
    }

    @Override
    public List<MyOrder> getAllByRiderId(Long id) {
        return this.orderRepository.findAllByRider_Id(id);
    }

}
