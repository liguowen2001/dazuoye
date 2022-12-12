package club.yunzhi.log.service;

import club.yunzhi.log.entity.Dishes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DishesService {

    String save(Dishes dishes);

    Dishes update(Long id, Dishes dishes);

    void deleteById(Long id);

    Dishes findById(Long id);

    Page<Dishes> findAll(String name, Long restaurantId , Pageable pageable);

    List<Dishes> getAll();

    List<Dishes> getByRestaurantId(Long restaurantId);

}
