import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesComponent } from './sales/sales.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { ModifyInventoryComponent } from './inventory/modify-inventory/modify-inventory.component';
import { ViewInventoryComponent } from './inventory/view-inventory/view-inventory.component';
import { EditInventoryComponent } from './inventory/edit-inventory/edit-inventory.component';
import { SimpleChartExampleComponent } from './charts/simple-chart-example/simple-chart-example.component';
import { Ang2ChartjsComponent } from './charts/ang2-chartjs/ang2-chartjs.component';
import { TestComponent } from './test/test.component';
import { GoogleChartComponent } from './charts/google-chart/google-chart.component';
import { AddSupplierComponent } from './inventory/add-supplier/add-supplier.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'graphs', component: SimpleChartExampleComponent },
  { path: 'googlechart', component: GoogleChartComponent },
  { path: 'ngchart', component: Ang2ChartjsComponent },
  { path: 'test', component: TestComponent },
  { path: 'add-supplier/:id', component: AddSupplierComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'inventory', component: InventoryComponent, children: [
      { path: 'add', component: AddInventoryComponent },
      { path: 'modify', component: ModifyInventoryComponent },
      { path: 'view', component: ViewInventoryComponent },
      { path: 'edit', component: EditInventoryComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
