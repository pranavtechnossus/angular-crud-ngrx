import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.action';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
 // sub: Subscription;

 componentActive = true;
 products$: Observable<Product[]>;
 errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {


    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err.error
    // });
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

     // Subscribe here because it does not use an async pipe
    this.store.pipe(select(fromProduct.getCurrentProduct),
     takeWhile(() => this.componentActive)).subscribe(
       currentProduct => this.selectedProduct = currentProduct
     );

    // Subscribe here because it does not use an async pipe
    this.store.pipe(select(fromProduct.getShowProductCode),
    takeWhile(() => this.componentActive)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  ngOnDestroy(): void {
     this.componentActive = false;
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

}
