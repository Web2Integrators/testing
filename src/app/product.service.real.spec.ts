import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from './product';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
import { HttpClientModule } from '@angular/common/http';


describe('ProductsService Real', () => {
  let service: ProductsService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          ProductData, {
            dataEncapsulation: false,
            passThruUnknownUrl: true,
            put204: false // return entity after PUT/update
          }
        ),
        ],
        providers: [
          ProductsService
        ]
    });

    service = TestBed.get(ProductsService)


});

  it('should be created', () => {
     service = TestBed.get(ProductsService);
     expect(service).toBeTruthy();
  });

  it('Get Products Real', (done) => {
    service.getProducts()
            // tslint:disable-next-line:no-shadowed-variable
            .subscribe(products2 => {

                expect(products2).toBeTruthy('No products returned');

                expect(products2.length).toBe(5,
                    "incorrect number of products");

                done();

            });

    // const req = httpTestingController.expectOne(
    //   req1 => req.headers.has('Authorization')

    //         );
    // console.log(req);
    // const req = httpTestingController
    // console.log(req.request.url + "fgfggfgfgfgfgfg");
    // expect(req.request.method).toEqual("GET");

    // req.flush(products);
  });

});
