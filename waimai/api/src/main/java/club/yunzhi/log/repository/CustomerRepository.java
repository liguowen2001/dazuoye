package club.yunzhi.log.repository;


import club.yunzhi.log.entity.Customer;
import club.yunzhi.log.repository.specs.CustomerSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

public interface CustomerRepository extends PagingAndSortingRepository<Customer, Long>, JpaSpecificationExecutor {

    default Page findAll(String name, String username, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Customer> specification = CustomerSpecs.containingName(name)
                .and(CustomerSpecs.containingUsername(username));
        return this.findAll(specification, pageable);
    }

    default Customer findByUser(Long userId) {
        Specification<Customer> specification = CustomerSpecs.belongToUser(userId);
        return (Customer) this.findOne(specification).get();
    }

}
