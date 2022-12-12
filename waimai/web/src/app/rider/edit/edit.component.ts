import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../service/common.service';
import {Assert} from '@yunzhi/utils/build/src';
import {RiderService} from '../../../service/rider.service';
import {Rider} from '../../../entity/rider';
import {User} from '../../../entity/user';
import {UserAsyncValidators} from '../add/user-async-validators';
import {UsernameValidator} from '../add/username-validator';


/**
 * 用户管理编辑
 * author: liMingAo
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private riderService: RiderService,
              private commonService: CommonService,
              private riderAsyncValidators: UserAsyncValidators) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    id: 'id',
    name: 'name',
    userName: 'username',
    phone: 'phone'
  };
  rider = {} as Rider;
  user = {} as User;


  loadById(id: number): void {
    this.riderService.getById(id)
      .subscribe((rider: Rider) => {
        this.user = rider.user;
        this.setRider(rider);
      }, (error: any) => console.log(error));
  }

  setRider(rider: Rider): void {
    this.rider = rider;
    this.formGroup.get(this.formKeys.name).setValue(rider.user.name);
    this.formGroup.get(this.formKeys.userName).setValue(rider.user.username);
    this.formGroup.get(this.formKeys.id).setValue(rider.id);
    this.formGroup.get(this.formKeys.phone).setValue(rider.phone);
  }

  initFormControl(): void {
    const formControlUsername = new FormControl('',
      [Validators.required, UsernameValidator.username], this.riderAsyncValidators.userNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.userName, formControlUsername);
    this.formGroup.addControl(this.formKeys.id, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.phone, new FormControl(''));
  }

  ngOnInit(): void {
    this.initFormControl();
    // 检测用户名变化，判断是否改变
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get(this.formKeys.id).value;
    this.rider.user.name = this.formGroup.get(this.formKeys.name).value;
    this.rider.user.username = this.formGroup.get(this.formKeys.userName).value;
    this.rider.phone = this.formGroup.get(this.formKeys.phone).value;

    this.riderService.update(id, this.rider)
      .subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      }, (error) => {
        this.commonService.error(() => {
        }, error);
      });
  }
}
