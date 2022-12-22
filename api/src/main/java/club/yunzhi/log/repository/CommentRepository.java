package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Comment;
import club.yunzhi.log.repository.specs.CommentSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long>, JpaSpecificationExecutor {

    //    default Page findAll(@NotNull Pageable pageable) {
//        Assert.notNull(pageable, "传入的Pageable不能为null");
//        Specification<Order> specification = OrderSpecs.containingName(name)
//                .and(DishesSpecs.belongToRestaurant(restaurantId));
//        return this.findAll(pageable);
//    }
    Page<Comment> findAll(Pageable pageable);

    default List<Comment> findByRestaurantId(Long restaurantId) {
        Specification<Comment> specification = CommentSpecs.belongToRestaurant(restaurantId);
        return this.findAll(specification);
    }

    default List<Comment> findByRiderId(Long riderId) {
        Specification<Comment> specification = CommentSpecs.belongToRider(riderId);
        return this.findAll(specification);
    }
}
