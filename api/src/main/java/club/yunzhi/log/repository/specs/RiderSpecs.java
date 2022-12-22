package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.Comment;
import club.yunzhi.log.entity.Customer;
import club.yunzhi.log.entity.Rider;
import club.yunzhi.log.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class RiderSpecs {

    public static Specification<Rider> belongToUser(Long userId) {
        User user = new User();
        user.setId(userId);
        if (userId != null) {
            return (Specification<Rider>) (root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("user").as(User.class), user);
        } else {
            return Specification.where(null);
        }
    }

}
