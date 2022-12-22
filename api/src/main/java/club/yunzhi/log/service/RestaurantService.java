package club.yunzhi.log.service;

import club.yunzhi.log.entity.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RestaurantService {

    String save(Restaurant restaurant);

    Restaurant update(Long id, Restaurant restaurant);

    void deleteById(Long id);

    Restaurant findById(Long id);

    Page<Restaurant> findAll(String name, String username, Pageable pageable);

    List<Restaurant> getAll();

    Restaurant findByUser(Long userId);
}
