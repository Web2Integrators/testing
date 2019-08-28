import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product";
import { ProductsService } from "./products.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = 'testing';
  products$: Observable<Product[]>;

  constructor(private productsService: ProductsService) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }
}
