import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Observable } from 'rxjs';
import { Order } from '../shared/interfaces/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  orders$!: Observable<Order[]>;
  order!: Order;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.orders$ = this.dataService.getAllOrders();
  }

  deleteOneOrder(id: string) {
    const decision = window.confirm(`Ви дійсно бажаєте видалити замовлення з номером ${id}?`)
    if(decision) {
      const mSub = this.dataService.deleteOrder(id).subscribe({
          next: () => this.orders$ = this.dataService.getAllOrders(),
          error: (error) => console.log(`Ошибка ${error.status}: ${error.error.message}`)
        }
      )
    }
  }
}

