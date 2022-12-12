package club.yunzhi.log.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private MyOrder myOrder;

    private String restaurantDetail;

    private Long restaurantScore;

    private String riderDetail;

    private Long riderScore;

    @CreationTimestamp
    private Timestamp createTime;
}
