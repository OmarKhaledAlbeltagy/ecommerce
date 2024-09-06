import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../../core/interfaces/checkout-session';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _OrderService = inject(OrderService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  cartId!:string;
  session!:Session;
  address:FormGroup = this._FormBuilder.group({
    city:[null,Validators.required],
    details:[null,Validators.required],
    phone:[null,Validators.required]
  })

  payment(){
    console.log(this.address.value);
    this._OrderService.createCheckoutSession(this.cartId,this.address.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.session = res as Session;
        window.open(this.session.session.url,'_self')
      }
    })
  }

  ngOnInit(){
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get('id')!
      }
    })
  }

}
