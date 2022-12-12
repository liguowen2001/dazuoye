package club.yunzhi.log.repository;


import club.yunzhi.log.entity.MyOrder;
import club.yunzhi.log.repository.specs.MyOrderSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
import java.util.List;

public interface MyOrderRepository extends PagingAndSortingRepository<MyOrder, Long>, JpaSpecificationExecutor {

    default Page findAll(Long status, Long restaurantId, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<MyOrder> specification = MyOrderSpecs.status(status)
                .and(MyOrderSpecs.belongToRestaurant(restaurantId));
        return this.findAll(specification, pageable);
    }

    MyOrder findFirstByCustomer_IdAndAndStatusIs(Long customerId, Long status);

    List<MyOrder> findAllByCustomer_IdOrderByCreateTimeDesc(Long id);

    List<MyOrder> findAllByCustomer_Id(Long id);
}
