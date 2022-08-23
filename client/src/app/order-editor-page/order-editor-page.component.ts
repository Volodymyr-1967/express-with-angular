import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-order-editor-page',
  templateUrl: './order-editor-page.component.html',
  styleUrls: ['./order-editor-page.component.css']
})
export class OrderEditorPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aMemSub!: Subscription; // устранение утечки памяти при редиректе
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();

    // this.route.queryParams.subscribe((params: Params) => {
    //   if (params['registered']) {
    //     // Можете зайти в систему используя свои данные
    //   } else if (params['accessDenied']) {
    //     // Для начала авторизуйтесь в системе
    //   } else if (params['sessionFailed']) {
    //   }
    // });

  }

  ngOnDestroy() {
    if (this.aMemSub) {
      this.aMemSub.unsubscribe(); // отписаться от стрима при переходе на новую станицу
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit(): void {
    console.log('Данные user формы login: ', this.form.value);

    this.aMemSub = this.data.createOrder(this.form.value)
      .subscribe({
          next: () => {
            this.router.navigate(['/order']).then();
          },
          error: () => {
            console.log(`Ошибка`);
          }
        }
      );
  }
}
