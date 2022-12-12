package club.yunzhi.log.entity;

import javax.persistence.*;

/**
 * 教师
 */
@Entity
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * 用户
     */
    @OneToOne
    private User user;

    private String name;

    private String phone;

    private String praiseRate;

    private String address;

    private int status;

    private int drawProportion;

    public int getDrawProportion() {
        return drawProportion;
    }

    public void setDrawProportion(int drawProportion) {
        this.drawProportion = drawProportion;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPraiseRate() {
        return praiseRate;
    }

    public void setPraiseRate(String praiseRate) {
        this.praiseRate = praiseRate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
