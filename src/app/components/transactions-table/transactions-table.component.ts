import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Merchant } from 'src/app/models/Merchant';
import { Transaction } from 'src/app/models/Transaction';
import { MatPaginator } from '@angular/material/paginator';
import { ELEMENT_DATA } from './transactionMock';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TransactionsTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Transaction>(ELEMENT_DATA);
  columnsToDisplay = ['date', 'merchInvoice', 'merchant', 'location', 'icao', 'dodaac', 'tail', 'item', 'total', 'card', 'status','add'];
  columnsName = ['Date', 'Merch Invoice', 'Merchant', 'Location', 'ICAO/IATA', 'DoDAAC', 'Tail', 'Item', 'Total', 'Card', 'Status'];
  columnsToDisplayWithExpand = ['expand', 'select', ...this.columnsToDisplay,];
  expandedElement!: Transaction | null;
  selection = new SelectionModel<Transaction>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    ELEMENT_DATA.map(transaction => {
      transaction.merchantData.map(data => {
        data.amount = data.quantity * data.govPrice;
      })
      transaction.total = transaction.merchantData.map(t => t.amount).reduce((acc, value) => acc + value, 0);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.merchInvoice + 1}`;
  }

  // format(inputDate: Date) {
  //   let date, month, year;

  //   date = inputDate.getDate();
  //   month = inputDate.getMonth() + 1;
  //   year = inputDate.getFullYear();

  //   date = date
  //     .toString()
  //     .padStart(2, '0');

  //   month = month
  //     .toString()
  //     .padStart(2, '0');

  //   return `${date}/${month}/${year}`;
  // }

}




