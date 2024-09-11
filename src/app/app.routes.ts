import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { AddressComponent } from './components/address/address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    {path:"", component:AuthLayoutComponent, canActivate:[isLoggedInGuard], children:[
        {path:"", redirectTo:"signin", pathMatch:"full"},
        {path:"signup",component:SignupComponent,title:"Registration"},
        {path:"signin", component:SigninComponent, title:"Login"},
        {path:"forgot-password",component:ForgotPasswordComponent, title:"Forgot Password"}
    ]},
    {path:"", component:MainLayoutComponent, canActivate:[authGuard], children:[
        {path:"", redirectTo:"home", pathMatch:"full"},
        {path:"allorders", redirectTo:"cart", pathMatch:"full"},
        {path:'home',component:HomeComponent, title:"Home"},
        {path:'brands',component:BrandsComponent, title:"Brands"},
        {path:'cart',component:CartComponent, title:"Cart"},
        {path:'categories',component:CategoriesComponent, title:"Categories"},
        {path:'product/:id',component:ProductComponent, title:"Product Details"},
        {path:'products',component:ProductsComponent, title:"Products"},
        {path:"address/:id",component:AddressComponent, title:"Address"},
        {path:"wishlist",component:WishlistComponent, title:"Wishlist"}
    ]},
    {path:"**", component:NotfoundComponent}
];
