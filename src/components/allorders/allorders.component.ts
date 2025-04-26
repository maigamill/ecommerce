import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { jwtDecode } from 'jwt-decode';




@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent  {
 
}