import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';

import { ServerService } from './../../shared/server.service';
import { Prod } from './../../shared/prod';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  categories$;
  // product = {};
  product: Prod[];
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serverService: ServerService) {

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) this.serverService.getASupplierData(this.id).take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {
  }
  save(f) { }

}
