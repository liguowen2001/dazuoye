import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {UserAsyncValidators} from '../../user/add/user-async-validators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entity/user';
import {UsernameValidator} from '../../user/add/username-validator';
import {FileService} from '../../../service/file.service';
import {Customer} from '../../../entity/customer';
import {CustomerService} from '../../../service/customer.service';
import {Restaurant} from '../../../entity/restaurant';
import {RestaurantService} from '../../../service/restaurant.service';
import {Rider} from '../../../entity/rider';
import {RiderService} from '../../../service/rider.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private commonService: CommonService,
              private userAsyncValidators: UserAsyncValidators,
              private router: Router,
              private fileService: FileService,
              private customerService: CustomerService,
              private restaurantService: RestaurantService,
              private riderService: RiderService) {
  }

  beExit = false;
  formGroup = new FormGroup({});
  file: File;
  code: File;
  sanitizerUrl: any;
  canSubmit = true as boolean;
  formData = new FormData();

  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    role: 'role',
    password: 'password',
    phone: 'phone',
    picture: 'picture',
    address: 'address',
    restaurantName: 'restaurantName',

  };
  user = {} as User;

  initFormControl(): void {
    const formControlUsername = new FormControl('',
      [Validators.required, UsernameValidator.username], this.userAsyncValidators.userNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username, formControlUsername);
    this.formGroup.addControl(this.formKeys.role, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.password, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.restaurantName, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.phone, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.address, new FormControl('', Validators.required));
  }

  ngOnInit(): void {
    this.initFormControl();
    this.userService.login({username: 'admin', password: 'yunzhi'})
      .subscribe(() => {
        console.log('success');
      });
  }

  onSubmit(formGroup: FormGroup): void {
    this.formData.append('file', this.file);
    this.fileService.save(this.formData)
      .subscribe(fileName => {
        const user = {
          name: formGroup.get(this.formKeys.name).value as string,
          username: formGroup.get(this.formKeys.username).value as string,
          role: formGroup.get(this.formKeys.role).value as number,
          password: formGroup.get(this.formKeys.password).value as string,
          pictureName: fileName
        } as User;
        if (this.formGroup.get(this.formKeys.role).value == 1) {
          this.saveRestaurant(user);
        } else if(this.formGroup.get(this.formKeys.role).value == 2){
          this.saveCustomer(user);
        }else {
          this.saveRider(user);
        }
      });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.canSubmit = false;
      this.file = file;
    }
  }

  saveCustomer(user: User) {
    const customer = {
      user: user,
      address: this.formGroup.get(this.formKeys.address).value
    } as Customer;
    this.customerService.save(customer)
      .subscribe(string => {
        this.commonService.success(() => {
          this.router.navigateByUrl('/login/login');
        }, '', '注册成功');
      }, error => {
        this.commonService.error(() => {
        }, '注册失败');
      });
    console.log(customer);
  }

  saveRestaurant(user: User) {
    this.formData.append('file', this.code);
    this.fileService.save(this.formData)
      .subscribe(fileName => {
        const restaurant = {
          user: user,
          phone: this.formGroup.get(this.formKeys.phone).value,
          address: this.formGroup.get(this.formKeys.address).value,
          name: this.formGroup.get(this.formKeys.restaurantName).value,
          score: 0,
          commentNumber: 0,
          collectionCode: fileName
        } as Restaurant;
        this.restaurantService.save(restaurant)
          .subscribe(string => {
            this.commonService.success(() => {
              this.router.navigateByUrl('/login/login');
            }, '', '注册成功');
          }, error => {
            this.commonService.error(() => {
            }, '注册失败');
          });
      })
  }

  saveRider(user: User) {
    let rider = {
      user: user,
      phone: this.formGroup.get(this.formKeys.phone).value
    } as Rider;
    this.riderService.save(rider)
      .subscribe(string => {
        this.commonService.success(() => {
          this.router.navigateByUrl('/login/login');
        }, '', '注册成功');
      }, error => {
        this.commonService.error(() => {
        }, '注册失败');
      });
  }

  onCodeSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.canSubmit = false;
      this.code = file;
    }
  }
}
