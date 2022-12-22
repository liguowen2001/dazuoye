package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Comment;
import club.yunzhi.log.entity.Dishes;
import club.yunzhi.log.entity.Restaurant;
import club.yunzhi.log.entity.Rider;
import org.springframework.data.jpa.domain.Specification;

public class CommentSpecs {
    public static Specification<Comment> belongToRestaurant(Long restaurantId) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(restaurantId);
        if (restaurantId != null) {
            return (Specification<Comment>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("myOrder").get("restaurant").as(Restaurant.class), restaurant);
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Comment> belongToRider(Long riderId) {
        Rider rider = new Rider();
        rider.setId(riderId);
        if (rider != null) {
            return (Specification<Comment>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("myOrder").get("rider").as(Rider.class), rider);
        } else {
            return Specification.where(null);
        }
    }
}
