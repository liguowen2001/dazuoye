package club.yunzhi.log.service;


import club.yunzhi.log.entity.MyOrder;
import club.yunzhi.log.entity.Rider;
import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.MyOrderRepository;
import club.yunzhi.log.repository.RiderRepository;
import club.yunzhi.log.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@Service
public class RiderServiceImpl implements RiderService {

    @Autowired
    RiderRepository riderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MyOrderRepository myOrderRepository;

    Queue<Rider> riders = new LinkedList<Rider>();
    Queue<MyOrder> myOrders = new LinkedList<MyOrder>();


    @Override
    public Rider save(Rider rider) {
        User user = this.userRepository.save(rider.getUser());
        rider.setUser(user);
        Rider rider1 = this.riderRepository.save(rider);
        this.riders.offer(rider1);
        return rider1;
    }

    @Override
    public Rider update(Long id, Rider newRider) {
        // 更新状态为闲置时判断是否有新订单
        if (newRider.getStatus() == 2) {
            if (this.myOrders.isEmpty()) {
                this.riders.offer(newRider);
            } else {
                MyOrder myOrder = this.myOrders.poll();
                MyOrder oldMyOrder = this.myOrderRepository.findById(myOrder.getId()).get();
                oldMyOrder.setRider(newRider);
                oldMyOrder.setStatus(4l);
                this.myOrderRepository.save(oldMyOrder);
            }
        }
        User oldUser = this.userRepository.findById(newRider.getUser().getId()).get();
        oldUser.setName(newRider.getUser().getName());
        oldUser.setUsername(newRider.getUser().getUsername());
        this.userRepository.save(oldUser);
        Rider oldRider = this.riderRepository.findById(id).get();
        oldRider.setPhone(newRider.getPhone());
        oldRider.setStatus(newRider.getStatus());
        return this.riderRepository.save(oldRider);
    }

    @Override
    public void deleteById(Long id) {
        Rider rider = this.riderRepository.findById(id).get();
        this.riderRepository.deleteById(id);
    }

    @Override
    public Rider findById(Long id) {
        return riderRepository.findById(id).get();
    }

    @Override
    public Page<Rider> findAll(Pageable pageable) {
        Page<Rider> page = riderRepository.findAll(pageable);
        return page;
    }

    @Override
    public List<Rider> getAll() {
        return (List<Rider>) this.riderRepository.findAll();
    }

    @Override
    public String assignRider(MyOrder myOrder) {
        if (this.riders.isEmpty()) {
            this.myOrders.offer(myOrder);
            return "wait";
        } else {
            Rider rider = this.riders.poll();
            rider.setStatus(1l);
            this.update(rider.getId(), rider);
            MyOrder oldMyOrder = this.myOrderRepository.findById(myOrder.getId()).get();
            oldMyOrder.setRider(rider);
            oldMyOrder.setStatus(4l);
            this.myOrderRepository.save(oldMyOrder);
            return "success";
        }
    }

    public void init() {
        List<Rider> riders = this.getAll();
        riders.forEach(rider -> {
            this.riders.offer(rider);
        });
    }


}
