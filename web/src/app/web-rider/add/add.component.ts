import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsernameValidator} from './username-validator';
import {UserAsyncValidators} from './user-async-validators';
import {RiderService} from '../../../service/rider.service';
import {Rider} from '../../../entity/rider';
import {User} from '../../../entity/user';

/**
 * 用户管理新增
 */

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private riderService: RiderService,
              private commonService: CommonService,
              private userAsyncValidators: UserAsyncValidators) {
  }

  beExit = false;
  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    email: 'email',
    phone: 'phone'
  };
  rider = {} as Rider;
  user = {} as User;
  initFormControl(): void {
    const formControlUsername = new FormControl('',
      [Validators.required, UsernameValidator.username], this.userAsyncValidators.userNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username, formControlUsername);
    this.formGroup.addControl(this.formKeys.email, new FormControl('', Validators.email));
    this.formGroup.addControl(this.formKeys.phone, new FormControl('',Validators.required));
  }

  ngOnInit(): void {
    this.initFormControl();
  }

  onSubmit(formGroup: FormGroup): void {
    const user = {
      name: formGroup.get(this.formKeys.name).value as string,
      username: formGroup.get(this.formKeys.username).value as string,
      email: formGroup.get(this.formKeys.email).value as string,
      role: 3
    } as User;
    this.rider = {
      user: user,
      phone: this.formGroup.get(this.formKeys.phone).value,
      status: 0
    } as Rider;
    this.riderService.save(this.rider)
      .subscribe(rider => {
          this.commonService.success(() => {
            this.commonService.back();
          }, '', '操作成功' );
        }, error => {
          this.commonService.error(() => {
          }, '保存失败');
        },
      );
  }
}

