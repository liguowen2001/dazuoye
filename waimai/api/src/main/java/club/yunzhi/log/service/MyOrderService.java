package club.yunzhi.log.service;

import club.yunzhi.log.entity.MyOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MyOrderService {

    MyOrder save(MyOrder order);

    MyOrder update(Long id, MyOrder order);

    void deleteById(Long id);

    MyOrder findById(Long id);

    Page<MyOrder> findAll(Long status, Long restaurantId, Pageable pageable);

    List<MyOrder> getAll();

    MyOrder getByCustomerId(Long id);

    List<MyOrder> getAllByCustomerId(Long id);
}
