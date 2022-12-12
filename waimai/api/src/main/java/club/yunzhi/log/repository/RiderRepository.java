package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Rider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RiderRepository extends PagingAndSortingRepository<Rider, Long>, JpaSpecificationExecutor {

    //    default Page findAll(@NotNull Pageable pageable) {
//        Assert.notNull(pageable, "传入的Pageable不能为null");
//        Specification<Order> specification = OrderSpecs.containingName(name)
//                .and(DishesSpecs.belongToRestaurant(restaurantId));
//        return this.findAll(pageable);
//    }
    Page<Rider> findAll(Pageable pageable);
}
