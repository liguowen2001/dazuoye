import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {Assert} from '@yunzhi/utils/build/src';
import {FileService} from '../../../service/file.service';
import {UserService} from '../../../service/user.service';
import {Rider} from '../../../entity/rider';
import {RiderService} from '../../../service/rider.service';

@Component({
  selector: 'app-category-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    name: 'name',
    status: 'status'
  };

  pageData = {} as Page<Rider>;
  params: Params;
  queryForm = new FormGroup({});

  constructor(private riderService: RiderService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.queryForm!.addControl(this.keys.name, new FormControl());
    this.queryForm!.addControl(this.keys.status, new FormControl());

    // 订阅参数变化
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      this.queryForm.get(this.keys.status).setValue(params[this.keys.status]);

      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      // 发起查询
      this.riderService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          name: params[this.keys.name],
          status: params[this.keys.status]
        },
      ).subscribe(page => {
        this.pageData = page;
      });
    });
  }

  /**
   * 删除
   * @param object 用户
   */
  onDelete(object: Rider): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.riderService.delete(object.id!)
          .subscribe(() => {
            this.commonService.success(() => this.pageData.content.splice(index, 1));
          });
      }
    }, '');
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }


  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size}});
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    //this.commonService.reloadByParam(params).then();
    // 将参数转换为路由参数
    const queryParams = CommonService.convertToRouteParams(params);
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      }).then();
  }

  /**
   * 重置密码
   * @param id
   */
  onResetPassword(id: number): void {
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        this.userService.resetPassword(id)
          .subscribe((defaultPassword) => {
            this.commonService.success(() => {
            }, '', '操作成功，密码:' + defaultPassword);
          });
      }
    }, '');
  }

}
