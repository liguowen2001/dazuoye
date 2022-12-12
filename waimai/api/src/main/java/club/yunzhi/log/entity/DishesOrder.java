package club.yunzhi.log.entity;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class DishesOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private Dishes dishes;

    private Integer count;

    private float price;

    @CreationTimestamp
    private Timestamp createTime;

}
