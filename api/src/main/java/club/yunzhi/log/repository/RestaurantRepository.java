package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Restaurant;
import club.yunzhi.log.repository.specs.RestaurantSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long>, JpaSpecificationExecutor {

    default Page findAll(String name, String username, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Restaurant> specification = RestaurantSpecs.containingName(name)
                .and(RestaurantSpecs.containingUsername(username));
        return this.findAll(specification, pageable);
    }

    default Restaurant findByUser(Long userId) {
        Specification<Restaurant> specification = RestaurantSpecs.belongToUser(userId);
        return (Restaurant) this.findOne(specification).get();
    }

}
