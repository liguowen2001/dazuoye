package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.MyOrder;
import club.yunzhi.log.entity.Restaurant;
import org.springframework.data.jpa.domain.Specification;

public class MyOrderSpecs {
    public static Specification<MyOrder> status(Long status) {
        if (status != null) {
            return (Specification<MyOrder>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.equal(root.get("status").as(Long.class), status);
        } else {
            return (Specification<MyOrder>) (root, criteriaQuery, criteriaBuilder)
                    -> criteriaBuilder.between(root.get("status").as(Long.class), 1L, 6L);
        }
    }


    public static Specification<MyOrder> belongToRestaurant(Long restaurantId) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(restaurantId);
        if (restaurantId != null) {
            return (Specification<MyOrder>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("restaurant").as(Restaurant.class), restaurant);
        } else {
            return Specification.where(null);
        }
    }
}
