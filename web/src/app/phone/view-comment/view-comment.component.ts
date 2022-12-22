import { Component, OnInit } from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../../../service/comment.service';
import {Comment} from '../../../entity/comment';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private commentService: CommentService) { }

  comments: Comment[] = [] as Comment[];
  ngOnInit(): void {
    this.getComments();
  }

  getComments(){
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.commentService.getByRestaurantId(id)
        .subscribe(comments => {
          this.comments = comments;
          console.log(comments);
      })
    });
  }

}
