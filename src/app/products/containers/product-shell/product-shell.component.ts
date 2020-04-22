import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
/* NgRx */
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.action';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit  {

  errorMessages$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {

    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessages$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
    // this.productService.changeSelectedProduct(product);
  }


  deleteProduct(product: Product): void {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }

  clearProduct(): void {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store.dispatch(new productActions.CreateProduct(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }
}
