import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../product.models';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService
  ) {
      headerService.HeaderData = {
      title: 'Excluir produto',
      icon: 'storefront',
      routeUrl: '/products',
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }
  
  cancel(): void {
    this.router.navigate(['/products']);
  }
  
  openDialog(): void {
    this.dialog.open(ProductDeleteDialog, {
      width: '350px',
      data: {id: this.product.id},
    });
  }
  
}

/* Dialog component */
@Component({
  selector: 'dialog-product-delete',
  templateUrl: 'dialog-product-delete.html',
  styleUrls: ['./product-delete.component.css']
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