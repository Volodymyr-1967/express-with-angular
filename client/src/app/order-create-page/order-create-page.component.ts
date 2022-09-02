import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Order } from '../shared/interfaces/order';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create-page',
  templateUrl: './order-create-page.component.html',
  styleUrls: ['./order-create-page.component.css']
})
export class OrderCreatePageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aMemSub!: Subscription; // устранение утечки памяти при редиректе
  errorMessage = '';
  order!: Order;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy() {
    if (this.aMemSub) {
      this.aMemSub.unsubscribe(); // отписаться от стрима при переходе на новую станицу
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit(): void {
    console.log('Данные user формы login: ', this.form.value);

    this.aMemSub = this.data.createOrder(this.form.value)
      .subscribe({
          next: () => {
            this.router.navigate(['/my-order']).then();
          },
          error: () => {
            console.log(`Ошибка`);
          }
        }
      );
  }

}
