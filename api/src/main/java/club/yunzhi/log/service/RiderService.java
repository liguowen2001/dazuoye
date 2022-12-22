package club.yunzhi.log.service;

import club.yunzhi.log.entity.Customer;
import club.yunzhi.log.entity.MyOrder;
import club.yunzhi.log.entity.Rider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RiderService {

    Rider save(Rider rider);

    Rider update(Long id, Rider rider);

    void deleteById(Long id);

    Rider findById(Long id);

    Page<Rider> findAll(Pageable pageable);

    List<Rider> getAll();

    String assignRider(MyOrder myOrder);

    Rider findByUserId(Long id);
}
