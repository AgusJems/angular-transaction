import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Transaction } from 'src/app/demo/api/transaction';
import { TransactionService } from 'src/app/demo/service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  providers: [MessageService, TransactionService]
})
export class TransactionComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    transactions: Transaction[] = [];

    transaction: Transaction = {};

    selectedProducts: Transaction[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private transactionService: TransactionService, private messageService: MessageService) { }

    ngOnInit() {
        this.transactionService.getProducts().then(data => this.transactions = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    deleteProduct(product: Transaction) {
        this.deleteProductDialog = true;
        this.transaction = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.transactions = this.transactions.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.transactions = this.transactions.filter(val => val.id !== this.transaction.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.transaction = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.transaction.name?.trim()) {
            if (this.transaction.id) {
                // @ts-ignore
                this.transaction.inventoryStatus = this.transaction.inventoryStatus.value ? this.transaction.inventoryStatus.value : this.transaction.inventoryStatus;
                this.transactions[this.findIndexById(this.transaction.id)] = this.transaction;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.transaction.id = this.createId();
                this.transaction.code = this.createId();
                this.transaction.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.transactions.push(this.transaction);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.transactions = [...this.transactions];
            this.productDialog = false;
            this.transaction = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
