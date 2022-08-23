import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) {
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/my-order/', order);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/my-order/');
  }

  getOneOrder(): Observable<Order> {
    return this.http.get<Order>('/api/my-order/:id');
  }

  editOrder(order: Order): Observable<{ order: Order }> {
    return this.http.put<{ order: Order }>('/api/my-order/', order);
  }

  deleteOrder(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/my-order/${id}`);
  }

}
