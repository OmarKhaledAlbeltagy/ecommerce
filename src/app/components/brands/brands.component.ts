import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { brandList } from '../../core/interfaces/brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
private readonly _BrandsService = inject(BrandsService)

allBrands!:brandList;
isLoading:boolean = true;

getBrands(){
  this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res);
      this.allBrands = res as brandList;
      this.isLoading = false;
    },
    error:(err)=>{
      console.log(err);
      this.isLoading = false;
    }
  })
}


ngOnInit(){
this.getBrands()
}

}
