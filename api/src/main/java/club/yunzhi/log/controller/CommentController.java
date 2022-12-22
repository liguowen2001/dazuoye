package club.yunzhi.log.controller;


import club.yunzhi.log.entity.Comment;
import club.yunzhi.log.service.CommentService;
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
@RequestMapping("comment")
public class CommentController {

    private final static Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    private CommentService commentService;

    @Autowired
    public CommentController(final CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public String save(@RequestBody final Comment comment) {
        return this.commentService.save(comment);
    }

    @GetMapping("page")
    public Page<Comment> page(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long restaurantId,
            final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Comment> comments = new PageImpl(this.commentService.findAll(name, restaurantId, pageable));
        return comments;
    }

    @GetMapping("getAll")
    public List<Comment> getAll() {
        return this.commentService.getAll();
    }

    @GetMapping("{id}")
    public Comment getById(@PathVariable Long id) {
        return this.commentService.findById(id);
    }

    @PutMapping("{id}")
    public Comment update(@PathVariable Long id, @RequestBody Comment comment) {
        return this.commentService.update(id, comment);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.commentService.deleteById(id);
    }

    @GetMapping("getByRestaurant/{id}")
    public List<Comment> getByRestaurantId(@PathVariable Long id) {
        return this.commentService.getByRestaurantId(id);
    }

    @GetMapping("getByRider/{id}")
    public List<Comment> getByRiderId(@PathVariable Long id) {
        return this.commentService.getByRiderId(id);
    }

}
