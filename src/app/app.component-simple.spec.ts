import { AppComponent } from "./app.component";
import { of } from 'rxjs';

describe("App Component simple", () => {
  let cmp: AppComponent;
  const fakeUser = {
    'id': 1,
    'productName': 'Apple',
    'productCode': 'GDN-0011',
    'releaseDate': 'March 19, 2018',
    'description': 'Leaf rake with 48-inch wooden handle',
    'price': 10,
    'starRating': 3.2,
    'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
    'tags': ['rake', 'leaf', 'yard', 'home'],

  }
  const fakeProductService = {
    getProducts: () => of([fakeUser]),
    productsUrl: '0',
    handleError: err => { },
    http:{}
  } as any;
  beforeEach(() => {
    cmp = new AppComponent(fakeProductService);
  });

  it("should 1 + 1", () => {
    expect(1 + 1).toEqual(2);
  });

  it("check component instance", () => {
    expect(cmp.title).toEqual("testing");
  });

  it("get products worked", () => {
    cmp.ngOnInit();
    cmp.products$.subscribe(val => {
      console.log(val);
      expect(val[0]).toEqual(fakeUser);
    });

  });
});
