package club.yunzhi.log.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class Rider {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long phone;

    private Long status;

    @OneToOne
    private User user;
}
