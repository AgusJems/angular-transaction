import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { KaryawanTrainingService } from 'src/app/demo/service/karyawan-training.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { KaryawanInterface } from './karyawan.interface';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-karyawan',
  templateUrl: './karyawan.component.html',
  styleUrls: ['./karyawan.component.scss'],
  providers: [MessageService]
})
export class KaryawanComponent implements OnInit {

    dataKaryawan: KaryawanInterface[] = [];

    karyawan: KaryawanInterface = {};

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    header = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })

    constructor(private productService: ProductService, private messageService: MessageService, private api: KaryawanTrainingService,) {
        this.karyawan.karyawanDetail = {};
     }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.api.getAPI('v1/karyawan/list','?page=0&size=10', {
            page: 10,
            size: 10,
            nama: 'mama',
        }).then((e:any) => {
            this.dataKaryawan = e.data.content;
            console.log(this.dataKaryawan)
        })
    }

    openNew() {
        this.karyawan = {};
        this.karyawan.karyawanDetail = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(data: KaryawanInterface) {
        this.karyawan = { ...data };
        this.productDialog = true;
    }

    deleteProduct(data: KaryawanInterface) {
        this.deleteProductDialog = true;
        this.karyawan = { ...data };
    }

    confirmDeleteSelected() {
        // this.deleteProductsDialog = false;
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        // this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.api.delAPI('v1/karyawan/delete/', this.karyawan.id).then((e) => {
            console.log(e)
            if (e.status == '200') {
                this.getData();
                this.showSuccess();
            } else {
                this.showError();
            }
        })
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.karyawan.name?.trim()) {
            if ( this.karyawan.id) {
                this.api.putAPI('v1/karyawan/update', this.karyawan).then((e) => {
                    if (e.status == '200') {
                        this.getData();
                        this.submitted = false;
                        this.productDialog = false;
                        this.karyawan = {};
                        this.showSuccess();
                    }
                });
            } else {
                this.api.postAPI('v1/karyawan/save', this.karyawan).then((e) => {
                    if (e.status == '200') {
                        this.getData();
                        this.submitted = false;
                        this.productDialog = false;
                        this.karyawan = {};
                        this.showSuccess();
                    }
                });
            }
        }
    }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.dataKaryawan);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'data-karyawan');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    showError() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
