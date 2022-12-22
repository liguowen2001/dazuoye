package club.yunzhi.log.service;

import club.yunzhi.log.entity.Restaurant;
import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.RestaurantRepository;
import club.yunzhi.log.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Override
    public String save(Restaurant restaurant) {
        User user = restaurant.getUser();
        User newUser = this.userRepository.save(user);
        restaurant.setUser(newUser);
        this.restaurantRepository.save(restaurant);
        return "yunzhi";
    }

    @Override
    public Restaurant update(Long id, Restaurant newRestaurant) {
        Restaurant oldRestaurant = this.restaurantRepository.findById(id).get();
        this.userService.update(newRestaurant.getUser().getId(), newRestaurant.getUser());
        oldRestaurant.setAddress(newRestaurant.getAddress());
        oldRestaurant.setName(newRestaurant.getName());
        oldRestaurant.setPhone(newRestaurant.getPhone());
        oldRestaurant.setStatus(newRestaurant.getStatus());
        oldRestaurant.setDrawProportion(newRestaurant.getDrawProportion());
        oldRestaurant.setPraiseRate(newRestaurant.getPraiseRate());
        return this.restaurantRepository.save(oldRestaurant);
    }

    @Override
    public void deleteById(Long id) {
        Restaurant restaurant = this.restaurantRepository.findById(id).get();
        Long userId = restaurant.getUser().getId();
        this.restaurantRepository.deleteById(id);
        this.userRepository.deleteById(userId);
    }

    @Override
    public Restaurant findById(Long id) {
        return restaurantRepository.findById(id).get();
    }

    @Override
    public Page<Restaurant> findAll(String name, String username, Pageable pageable) {
        Page<Restaurant> page = restaurantRepository.findAll(name, username, pageable);
        return page;
    }

    @Override
    public List<Restaurant> getAll() {
        return (List<Restaurant>) this.restaurantRepository.findAll();
    }

    @Override
    public Restaurant findByUser(Long userId) {
        return this.restaurantRepository.findByUser(userId);
    }
}
