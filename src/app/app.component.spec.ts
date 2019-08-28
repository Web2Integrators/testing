import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { of, Observable } from "rxjs";
import { ProductsService } from "./products.service";
import { Product } from "./product";
const fakeUser = {
  id: 1,
  productName: "Apple",
  productCode: "GDN-0011",
  releaseDate: "March 19, 2018",
  description: "Leaf rake with 48-inch wooden handle",
  price: 10,
  starRating: 3.2,
  imageUrl:
    "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png",
  tags: ["rake", "leaf", "yard", "home"]
};
class MockProductsService {
  getProducts(): Observable<Product[]> {
    return of([fakeUser]);
  }
}

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: ProductsService,
          useClass: MockProductsService
        }
      ]
    }).compileComponents();
  }));

  xit("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'testing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("testing");
  });

  it("should render title in a h1 tag", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to testing!"
    );
  });

  it("get products worked", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    app.products$.subscribe(val => {
      console.log(val);
      expect(val[0]).toEqual(fakeUser);
    });
  });
});
