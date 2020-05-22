import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductReadDataSource } from './product-read-datasource';
import { Product } from '../product.models';
import { ProductService } from '../product.service';
import { HeaderService } from '../../template/header/header.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: ProductReadDataSource;

  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(
    private productService: ProductService,
    private headerService: HeaderService
  ) {
      headerService.HeaderData = {
      title: 'Produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  ngOnInit() {
    this.dataSource = new ProductReadDataSource();
    this.productService.read().subscribe(products => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

/* Dialog component */
@Component({
  selector: 'dialog-product-delete',
  templateUrl: 'dialog-product-delete.html',
  //styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteDialog {
  
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialogRef: MatDialogRef<ProductDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    console.log(data.id);
  }
  
  deleteProduct(): void {
    this.productService.delete(this.data).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso!');
      this.dialogRef.close();
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}