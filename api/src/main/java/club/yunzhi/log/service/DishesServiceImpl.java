package club.yunzhi.log.service;

import club.yunzhi.log.entity.Dishes;
import club.yunzhi.log.repository.DishesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishesServiceImpl implements DishesService {

    @Autowired
    DishesRepository dishesRepository;

    @Override
    public String save(Dishes dishes) {
        this.dishesRepository.save(dishes);
        return "success";
    }

    @Override
    public Dishes update(Long id, Dishes newDishes) {
        Dishes oldDishes = this.dishesRepository.findById(id).get();
        oldDishes.setStatus(newDishes.isStatus());
        oldDishes.setName(newDishes.getName());
        oldDishes.setPrice(newDishes.getPrice());
        oldDishes.setDiscount(newDishes.getDiscount());
        return this.dishesRepository.save(oldDishes);
    }

    @Override
    public void deleteById(Long id) {
        Dishes dishes = this.dishesRepository.findById(id).get();
        this.dishesRepository.deleteById(id);
    }

    @Override
    public Dishes findById(Long id) {
        return dishesRepository.findById(id).get();
    }

    @Override
    public Page<Dishes> findAll(String name, Long restaurantId, Pageable pageable) {
        Page<Dishes> page = dishesRepository.findAll(name, restaurantId, pageable);
        return page;
    }

    @Override
    public List<Dishes> getAll() {
        return (List<Dishes>) this.dishesRepository.findAll();
    }

    @Override
    public List<Dishes> getByRestaurantId(Long restaurantId) {
        return this.dishesRepository.findAllByRestaurant_Id(restaurantId);
    }

}
