package club.yunzhi.log.entity;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Entity
public class MyOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Customer customer;

    @OneToMany
    private List<DishesOrder> dishesOrders;

    private Float totalPrice;

    private Long status;

    @OneToOne
    private Restaurant restaurant;

    @OneToOne
    private Rider rider;

    @CreationTimestamp
    private Timestamp createTime;
}
