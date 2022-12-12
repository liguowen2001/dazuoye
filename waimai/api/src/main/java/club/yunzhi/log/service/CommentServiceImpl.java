package club.yunzhi.log.service;

import club.yunzhi.log.entity.Comment;
import club.yunzhi.log.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Override
    public String save(Comment comment) {
        this.commentRepository.save(comment);
        return "success";
    }

    @Override
    public Comment update(Long id, Comment newComment) {
        Comment oldComment = this.commentRepository.findById(id).get();
        oldComment.setMyOrder(newComment.getMyOrder());
        oldComment.setRestaurantDetail(newComment.getRestaurantDetail());
        oldComment.setRestaurantScore(newComment.getRestaurantScore());
        oldComment.setRiderDetail(newComment.getRiderDetail());
        oldComment.setRiderScore(newComment.getRiderScore());
        return this.commentRepository.save(oldComment);
    }

    @Override
    public void deleteById(Long id) {
        Comment comment = this.commentRepository.findById(id).get();
        this.commentRepository.deleteById(id);
    }

    @Override
    public Comment findById(Long id) {
        return commentRepository.findById(id).get();
    }

    @Override
    public Page<Comment> findAll(String name, Long restaurantId, Pageable pageable) {
        Page<Comment> page = commentRepository.findAll(pageable);
        return page;
    }

    @Override
    public List<Comment> getAll() {
        return (List<Comment>) this.commentRepository.findAll();
    }

    @Override
    public List<Comment> getByRestaurantId(Long restaurantId) {
        return this.commentRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public List<Comment> getByRiderId(Long riderId) {
        return this.commentRepository.findByRiderId(riderId);
    }

}
