package club.yunzhi.log.service;

import club.yunzhi.log.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentService {

    String save(Comment comment);

    Comment update(Long id, Comment comment);

    void deleteById(Long id);

    Comment findById(Long id);

    Page<Comment> findAll(String name, Long restaurantId, Pageable pageable);

    List<Comment> getAll();

    List<Comment> getByRestaurantId(Long restaurantId);

    List<Comment> getByRiderId(Long riderId);

}
