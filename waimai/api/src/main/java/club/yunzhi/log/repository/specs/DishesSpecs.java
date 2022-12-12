package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Dishes;
import club.yunzhi.log.entity.Restaurant;
import org.springframework.data.jpa.domain.Specification;

public class DishesSpecs {

    public static Specification<Dishes> containingName(String name) {
        if (name != null) {
            return (Specification<Dishes>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }


    public static Specification<Dishes> belongToRestaurant(Long restaurantId) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(restaurantId);
        if (restaurantId != null) {
            return (Specification<Dishes>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("restaurant").as(Restaurant.class), restaurant);
        } else {
            return Specification.where(null);
        }
    }
}
