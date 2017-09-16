import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { Item } from '../../shared/item.model';
import { InventoryService } from '../../shared/inventory.service';
import { ServerService } from '../../shared/server.service';

import { ProductView } from '../../shared/product-view.interface';
import { ProductAdd } from '../../shared/product-add.interface';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {
  items: Item[];
  viewMode = false;
  testItem = this.serverService.getTestName();
  testws = this.serverService.getServers();

  products: ProductView;
  productsAdd: ProductAdd;
  // product = this.serverService.getWSData();
  // servers = [
  //   {
  //     id: 100,
  //     name: 'Testserver'
  //   }
  // ];
  constructor(private inventoryService: InventoryService,
    private serverService: ServerService) {
    // this.testws = this.serverService.getServers();
  }

  ngOnInit() {
    // console.log('ng init');
    // this.viewMode = true;
    this.items = this.inventoryService.getInventory();
    // const a = JSON.stringify(this.testws);
  }

  onView() {
    this.viewMode = true;
    // this.items = this.inventoryService.getInventory();

    this.serverService.getWSData()

      //  let id = '130';
      // this.serverService.getOneWSData(id)
      .subscribe(
      // (servers: Product) => console.log(servers.id),
      (servers: ProductView) => this.products = servers,
      (error) => console.log(error)
      );


    // var res = this.serverService.getServers().map(function(val){
    //   return [val.id, val.name]
    // })
    // console.log("val.id");

  }
  onUpdate() {
    this.viewMode = true;
    this.serverService.putData(123)
      .subscribe(
      (servers: ProductAdd) => this.productsAdd = servers,
      (error) => console.log(error)
      );

  }
}
