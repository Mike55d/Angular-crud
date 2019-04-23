import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms'; // <-- NgModel lives here
import { Product} from '../../../models/product';
import { ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor( 
    private productService : ProductService,
    private toastr : ToastrService
    ) { }

  ngOnInit() {
  	this.productService.getProducts();
  	this.resetProduct();
  }

  onSubmit(productForm: NgForm){
    if (productForm.value.$key == null) {
    this.productService.insertProduct(productForm.value);
    this.toastr.success('Sucefull Operation', 'Producto Agregado');
    }else{
    this.productService.updateProduct(productForm.value);
    this.toastr.success('Sucefull Operation', 'Producto Modificado');

    }
  	this.resetProduct(productForm);
  }
  resetProduct(productForm?: NgForm){
  	if (productForm != null) {
  		productForm.reset();
  		this.productService.selectedProduct = new Product ();
  	}
  }

}
