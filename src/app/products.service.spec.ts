import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from './product';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
const products: Product[] = [
  {
    'id': 1,
    'productName': 'Apple',
    'productCode': 'GDN-0011',
    'releaseDate': 'March 19, 2018',
    'description': 'Leaf rake with 48-inch wooden handle',
    'price': 10,
    'starRating': 3.2,
    'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
    'tags': ['rake', 'leaf', 'yard', 'home'],

  },
  {
    'id': 2,
    'productName': 'Garden Cart',
    'productCode': 'GDN-0023',
    'releaseDate': 'March 18, 2018',
    'description': '15 gallon capacity rolling garden cart',
    'price': 32.99,
    'starRating': 4.2,
    'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
  },
  {
    'id': 5,
    'productName': 'Hammer',
    'productCode': 'TBX-0048',
    'releaseDate': 'May 21, 2018',
    'description': 'Curved claw steel hammer',
    'price': 8.9,
    'starRating': 4.8,
    'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
    'tags': ['tools', 'hammer', 'construction']
  },
  {
    'id': 8,
    'productName': 'Saw',
    'productCode': 'TBX-0022',
    'releaseDate': 'May 15, 2018',
    'description': '15-inch steel blade hand saw',
    'price': 11.55,
    'starRating': 3.7,
    'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png'
  },
  {
    'id': 10,
    'productName': 'Video Game Controller',
    'productCode': 'GMG-0042',
    'releaseDate': 'October 15, 2018',
    'description': 'Standard two-button video game controller',
    'price': 35.95,
    'starRating': 4.6,
    'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
  }
];
describe('ProductsService', () => {
  let service: ProductsService;
  // tslint:disable-next-line:label-position
  let httpTestingController: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [
        HttpClientTestingModule,
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

    service = TestBed.get(ProductsService),
    httpTestingController = TestBed.get(HttpTestingController);

});

  it('should be created', () => {
     service = TestBed.get(ProductsService);
     expect(service).toBeTruthy();
  });

  it('Get Products', (done) => {
    service.getProducts()
            // tslint:disable-next-line:no-shadowed-variable
            .subscribe(products2 => {

                expect(products2).toBeTruthy('No products returned');

                expect(products2.length).toBe(5,
                    "incorrect number of products");

                done();

            });

    const req = httpTestingController.expectOne('api/products');
    console.log(req.request.url + 'fgfggfgfgfgfgfg');
    expect(req.request.method).toEqual('GET');
    req.flush(products);
  });

});
