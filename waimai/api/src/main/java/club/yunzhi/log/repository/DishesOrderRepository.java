package club.yunzhi.log.repository;


import club.yunzhi.log.entity.DishesOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public interface DishesOrderRepository extends PagingAndSortingRepository<DishesOrder, Long>, JpaSpecificationExecutor {

    default Page findAll(@NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
//        Specification<Order> specification = OrderSpecs.containingName(name)
//                .and(DishesSpecs.belongToRestaurant(restaurantId));
        return this.findAll(pageable);
    }

    List<DishesOrder> findAllByDishes_Restaurant_IdAndCreateTimeBetween(Long restaurantId, Date startTime, Date endTime);

    List<DishesOrder> findAllByDishes_IdAndCreateTimeBetween(Long dishesId, Date startTime, Date endTime);
}
