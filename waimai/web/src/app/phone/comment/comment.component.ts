import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/utils/build/src';
import {MyOrder} from '../../../entity/my-order';
import {MyOrderService} from '../../../service/my-order.service';
import {CommentService} from '../../../service/comment.service';
import {Comment} from '../../../entity/comment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PhoneService} from '../../../service/phone.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  formGroup = new FormGroup({});

  constructor(private route: ActivatedRoute,
              private myOrderService: MyOrderService,
              private commentService: CommentService,
              private phoneService: PhoneService,
              private router: Router) {
  }


  formKeys = {
    riderScore: 'riderScore',
    riderDetail: 'riderDetail',
    restaurantScore: 'restaurantScore',
    restaurantDetail: 'restaurantDetail'
  };
  myOrder = {} as MyOrder;


  ngOnInit(): void {
    this.initFormControl();
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  loadById(id: number): void {
    this.myOrderService.getById(id)
      .subscribe(myOrder => {
        this.myOrder = myOrder;
      });
  }

  initFormControl(): void {
    this.formGroup.addControl('test', new FormControl());
    this.formGroup.addControl(this.formKeys.riderScore, new FormControl('', [Validators.max(10), Validators.min(0)]));
    this.formGroup.addControl(this.formKeys.riderDetail, new FormControl(''));
    this.formGroup.addControl(this.formKeys.restaurantScore, new FormControl('', [Validators.max(10), Validators.min(0)]));
    this.formGroup.addControl(this.formKeys.restaurantDetail, new FormControl(''));
  }

  submit() {
    const comment = {
      riderScore: this.formGroup.get(this.formKeys.riderScore).value,
      restaurantDetail: this.formGroup.get(this.formKeys.restaurantDetail).value,
      restaurantScore: this.formGroup.get(this.formKeys.restaurantScore).value,
      riderDetail: this.formGroup.get(this.formKeys.riderDetail).value,
      myOrder: this.myOrder
    } as Comment;
    this.commentService.save(comment)
      .subscribe(() => {
        this.phoneService.presentAlert(() => {
          this.myOrder.status = 6;
          this.myOrderService.update(this.myOrder.id, this.myOrder)
            .subscribe(value => {
              console.log(value);
              this.router.navigate(['/phone/order']);

            });
        }, '发布成功');
      });

  }

}
