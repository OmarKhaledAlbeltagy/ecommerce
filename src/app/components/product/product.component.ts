import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
private readonly _ActivatedRoute = inject(ActivatedRoute);
private readonly _ProductsService = inject(ProductsService);
private readonly _CartService = inject(CartService);
private readonly _Router = inject(Router);
private readonly toastr = inject(ToastrService);

product!:Product;
isLoading = true;

getProduct(id:string){
  this._ProductsService.getProduct(id).subscribe({
    next:(res)=>{
      this.product = res.data;
      this.isLoading = false
    }
  })
}

addToCart(){
  this.isLoading = true
this._CartService.addToCart(this.product._id).subscribe({
  next:(res)=>{
    this.isLoading = false
    this.toastr.success(this.product.title+' added to cart','',{
      progressBar:true
    });
  },
  error:(err)=>{this.toastr.error("error occured while adding to cart")}
})
}

ngOnInit(){
  this._ActivatedRoute.paramMap.subscribe({
    next:(res)=>{
      let id = res.get('id')
      this.getProduct(id!)
  
    }
  })
}

}
