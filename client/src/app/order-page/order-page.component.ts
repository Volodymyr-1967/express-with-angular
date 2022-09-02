import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Order } from '../shared/interfaces/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate!: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate!: TemplateRef<any>;

  orders!: Order[];
  editedOrder!: Order | null;
  isNewRecord: boolean = false;
  statusMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.loadOrders();
  }

  // загрузка всех заказов
  private loadOrders() {
    this.dataService.getAllOrders().subscribe((data: Order[]) => {
      this.orders = data;
      // console.log('Все заказы: ', this.orders);
    });
  }

  // добавление заказа
  addOrder() {
    this.cancel();
    this.editedOrder = {id: `${this.orders[this.orders.length-1].id + 1}`, name: '', phone: ''};
    this.orders.push(this.editedOrder);
    this.isNewRecord = true;
    this.statusMessage = '';
  }

  // редактирование заказа
  editOrder(order: Order) {
    this.editedOrder = {id: order.id, name: order.name, phone: order.phone};
    this.statusMessage = '';
  }

  // загружаем один из двух шаблонов
  loadTemplate(order: Order) {
    if (this.editedOrder && this.editedOrder.id === order.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  // сохраняем пользователя
  saveOrder() {
    if (this.isNewRecord) {
      // добавляем заказ
      this.dataService.createOrder(this.editedOrder as Order).subscribe(_ => {
        this.statusMessage = 'Нове замовлення успішно додано';
          this.loadOrders();
      });
      this.isNewRecord = false;
      this.editedOrder = null;
    } else {
      // изменяем пользователя
      this.dataService.updateOrder(this.editedOrder as Order).subscribe(_ => {
        this.statusMessage = 'Замовлення оновлено';
          this.loadOrders();
      });
      this.editedOrder = null;
    }
  }

  // удаление заказа
  deleteOneOrder(order: Order) {
    if( window.confirm(`Ви дійсно бажаєте видалити замовлення за номером ${order.id}?`) ) {
      this.dataService.deleteOrder(order.id).subscribe(_ => {
        this.statusMessage = `Замовлення за номером ${order.id} видалено`;
      });
      this.loadOrders();
    } else this.statusMessage = '';
  }

  // отмена редактирования
  cancel() {
    // отмена при добавлении заказа - удаляем последнюю запись
    if (this.isNewRecord) {
      this.orders.pop();
      this.isNewRecord = false;
    }
    this.editedOrder = null;
  }
}

