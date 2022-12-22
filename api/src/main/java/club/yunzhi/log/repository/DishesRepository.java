package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Dishes;
import club.yunzhi.log.entity.Restaurant;
import club.yunzhi.log.repository.specs.DishesSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
import java.util.List;

public interface DishesRepository extends PagingAndSortingRepository<Dishes, Long>, JpaSpecificationExecutor {

    default Page findAll(String name, Long restaurantId, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Dishes> specification = DishesSpecs.containingName(name)
                .and(DishesSpecs.belongToRestaurant(restaurantId));
        return this.findAll(specification, pageable);
    }

    List<Dishes> findAllByRestaurant_Id(Long restaurantId);
}
