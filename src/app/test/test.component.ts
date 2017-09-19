import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';
import { Prod } from './../shared/prod';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServerService } from '../shared/server.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {

  products: Prod[];
  subscription: Subscription;
  tableResource: DataTableResource<Prod>;
  items: Prod[] = [];
  itemCount: number;

  constructor(private productService: ServerService) {
    this.subscription = this.productService.getTallyData()
      .subscribe(products => {
        // console.log(products);
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Prod[]) {
    // console.log(products);
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.reportKey.toLowerCase().includes(query.toLowerCase())) :
      // this.products.filter(p => p.report_key.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  onClick(key1: string) {
    alert(key1);

    //Need to have the service updated for just passign Flag and report ID
    // let product_update = '';
    // this.productService.putTallyData(product_update)
    //   .subscribe(
    //   (servers: Prod) => console.log(servers),
    //   (error) => console.log(error)
    //   );

    //start---- Get the clicked key and identify the row in array
    let num = 0;
    let row;
    for (num = 0; num <= this.products.length; num++) {
      if (this.products[num].tallySummaryIid == key1)
        break;
    }
    let product_update = this.products[num];
    product_update.checkFlag = "1";
    this.productService.putTallyData(product_update)
      .subscribe(
      (servers: Prod) => console.log(servers),
      (error) => console.log(error)
      );
    //---end
  }
  // products: Product[];
  // subscription: Subscription;
  // tableResource: DataTableResource<Product>;
  // items: Product[] = [];
  // itemCount: number;

  // constructor() {
  //   let products = {
  //     "categories": {
  //       "bread": {
  //         "name": "Bread"
  //       },
  //       "dairy": {
  //         "name": "Dairy"
  //       },
  //       "fruits": {
  //         "name": "Fruits"
  //       },
  //       "seasonings": {
  //         "name": "Seasonings and Spices"
  //       },
  //       "vegetables": {
  //         "name": "Vegetables"
  //       }
  //     },
  //     "products": {
  //       "-KrqgOLs07ZkbapP4EGi": {
  //         "category": "vegetables",
  //         "imageUrl": "http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg",
  //         "price": 2.5,
  //         "title": "Spinach"
  //       },
  //       "-KrrIkDT19XhPgWo0T0A": {
  //         "category": "bread",
  //         "imageUrl": "https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg",
  //         "price": 3,
  //         "title": "Freshly Baked Bread"
  //       },
  //       "-KrvrXbV3rqnFEru_ojw": {
  //         "category": "fruits",
  //         "imageUrl": "https://pixnio.com/free-images/2017/03/17/2017-03-17-09-15-56.jpg",
  //         "price": 1.75,
  //         "title": "Avacado"
  //       },
  //       "-KrvrgogC3oac5k83Awt": {
  //         "category": "vegetables",
  //         "imageUrl": "https://static.pexels.com/photos/8390/food-wood-tomatoes.jpg",
  //         "price": 2.5,
  //         "title": "Tomato"
  //       },
  //       "-Krvrt2nkeRw2HCbiGDj": {
  //         "category": "vegetables",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg",
  //         "price": 1,
  //         "title": "Lettuce"
  //       },
  //       "-Krvs0ZZBpz5GuM0RfC8": {
  //         "category": "vegetables",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Cauliflowers_-_20051021.jpg/1280px-Cauliflowers_-_20051021.jpg",
  //         "price": 1.75,
  //         "title": "Cauliflower"
  //       },
  //       "-Krvs7RuXkSiDZvBZmey": {
  //         "category": "fruits",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg",
  //         "price": 1.25,
  //         "title": "Banana"
  //       },
  //       "-KrvsKZbI_mpo3hJg7G7": {
  //         "category": "fruits",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg",
  //         "price": 1.7,
  //         "title": "Orange"
  //       },
  //       "-KrvsRNOg-ftEUM3Te-F": {
  //         "category": "fruits",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
  //         "price": 2,
  //         "title": "Apple"
  //       },
  //       "-Krvs_CiDXdiZ3yd0PUp": {
  //         "category": "fruits",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg",
  //         "price": 2,
  //         "title": "Grape"
  //       },
  //       "-KrvsfKjGc0NCM0prc0I": {
  //         "category": "fruits",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Autumn_Red_peaches.jpg",
  //         "price": 2,
  //         "title": "Peach"
  //       },
  //       "-KrvsrmX3I1-Bo6eFCdx": {
  //         "category": "seasonings",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cinnamon-other.jpg",
  //         "price": 0.5,
  //         "title": "Cinnamon Sticks"
  //       },
  //       "-KrvsxvxOmTzMXOSx7iG": {
  //         "category": "seasonings",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/48/Saffron_Crop.JPG",
  //         "price": 3,
  //         "title": "Saffron"
  //       },
  //       "-Krvt8G_naLT8Pg_Fob6": {
  //         "category": "seasonings",
  //         "imageUrl": "http://maxpixel.freegreatpicture.com/static/photo/1x/Seasoning-Powder-Curry-Spice-Ingredient-Turmeric-2344157.jpg",
  //         "price": 0.75,
  //         "title": "Ground Turmeric"
  //       },
  //       "-KrvtXWZvGv-mr0IFbAA": {
  //         "category": "seasonings",
  //         "imageUrl": "http://maxpixel.freegreatpicture.com/static/photo/1x/Ingredient-Herb-Seasoning-Seeds-Food-Coriander-390015.jpg",
  //         "price": 0.5,
  //         "title": "Coriander Seeds"
  //       },
  //       "-Krvtvc_uQyh6dzI-J3R": {
  //         "category": "bread",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg/1280px-Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg",
  //         "price": 1.25,
  //         "title": "Lavash Bread"
  //       },
  //       "-Krvu3aL-m-ku0yCnQGr": {
  //         "category": "bread",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg",
  //         "price": 1,
  //         "title": "Bagel Bread"
  //       },
  //       "-KrvuH_bkBBZDW0NCwfl": {
  //         "category": "fruits",
  //         "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Strawberries.jpg",
  //         "price": 1.95,
  //         "title": "Strawberry"
  //       },
  //       "-KrvuT7GtYfsFvmQfgoj": {
  //         "category": "bread",
  //         "imageUrl": "https://static.pexels.com/photos/416607/pexels-photo-416607.jpeg",
  //         "price": 1.25,
  //         "title": "Baguette Bread"
  //       }
  //     },
  //     "users": {
  //       "iOADbMaCMbfZfxqUkkFmK9WHpnk2": {
  //         "email": "programmingwithmosh@gmail.com",
  //         "isAdmin": true,
  //         "name": "Mosh Hamedani"
  //       }
  //     }
  //   }
  //   this.tableResource = new DataTableResource(this.products);
  //   this.tableResource.query({ offset: 0 })
  //     .then(items => this.items = items);
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count);
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) return;

  //   this.tableResource.query(params)
  //     .then(items => this.items = items);
  // }
  // ngOnDestroy() {
  //   // this.subscription.unsubscribe();
  // }

  // ngOnInit() {
  // }

  // https://github.com/ggmod/angular-2-data-table/blob/master/src/components/table.component.ts
}
