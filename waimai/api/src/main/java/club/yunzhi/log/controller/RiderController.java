package club.yunzhi.log.controller;


import club.yunzhi.log.entity.MyOrder;
import club.yunzhi.log.entity.Rider;
import club.yunzhi.log.service.RiderService;
import club.yunzhi.log.utils.PageImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("rider")
public class RiderController {

    private final static Logger logger = LoggerFactory.getLogger(RiderController.class);

    @Autowired
    private RiderService riderService;

    @Autowired
    public RiderController(final RiderService riderService) {

        this.riderService = riderService;
        riderService.init();
    }

    @PostMapping
    public Rider save(@RequestBody final Rider rider) {
        return this.riderService.save(rider);
    }

    @GetMapping("page")
    public Page<Rider> page(
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Rider> riders = new PageImpl(this.riderService.findAll(pageable));
        return riders;
    }

    @GetMapping("getAll")
    public List<Rider> getAll() {
        return this.riderService.getAll();
    }

    @GetMapping("{id}")
    public Rider getById(@PathVariable Long id) {
        return this.riderService.findById(id);
    }

    @PutMapping("{id}")
    public Rider update(@PathVariable Long id, @RequestBody Rider rider) {
        return this.riderService.update(id, rider);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.riderService.deleteById(id);
    }

    @PostMapping("assignRider")
    public String assignRider(@RequestBody final MyOrder myOrder) {
        return this.riderService.assignRider(myOrder);
    }
}
