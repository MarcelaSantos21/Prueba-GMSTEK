import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Merchant } from 'src/app/models/Merchant';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements  OnChanges {

  @Input() data!: Merchant[];
  @Input() cardNumber!: string;
  @Input() dateCreated!: string;
  dataSource!: MatTableDataSource<Merchant>;
  columnsToDisplay = ['description', 'productCode', 'quantity', 'retailPrice', 'govPrice', 'amount','actions'];
  columnsName = ['Merchant Description', 'Product Code', 'Quantity', 'Retail Price', 'Gov Price', 'Amount'];
  dateDelayed = Date.now()

  constructor() { }
  ngOnChanges(): void {
    console.log(this.data);
    this.dataSource = new MatTableDataSource<Merchant>(this.data);
  }

  getTotalCost() {
    return this.data.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }
}
