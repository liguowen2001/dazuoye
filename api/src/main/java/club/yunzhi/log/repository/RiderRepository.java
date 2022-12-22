package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Customer;
import club.yunzhi.log.entity.Rider;
import club.yunzhi.log.repository.specs.CustomerSpecs;
import club.yunzhi.log.repository.specs.RiderSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

    Rider findByUser_Id(Long id);

    default Rider findByUser(Long userId) {
        Specification<Rider> specification = RiderSpecs.belongToUser(userId);
        return (Rider) this.findOne(specification).get();
    }
}
