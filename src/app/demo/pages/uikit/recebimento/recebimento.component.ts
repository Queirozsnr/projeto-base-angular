import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './recebimento.component.html',
    providers: [MessageService]
})
export class RecebimentoComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    estoqueProdutos: string[] = [];

    groupedProducts: any[] = [];

    expandedRows: { [key: string]: boolean } = {};

    viewProductDialog: boolean = false;
    viewedProduct: Product = {};

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getRecebimento().then(data => {
            this.products = data;
            this.groupProductsBySupplier();
        });

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
            { label: 'APROVADO', value: 'APROVADO' }
        ];

        this.getProductNames();
    }

    openNew() {
        this.product = {};
        this.product.inventoryStatus = this.statuses[1].label;
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Products Deletado', life: 3000 });
        this.selectedProducts = [];
        this.groupProductsBySupplier();
        this.applyGlobalFilter();
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto deletado!', life: 3000 });
        this.product = {};
        this.groupProductsBySupplier();
        this.applyGlobalFilter();
    }

    applyGlobalFilter() {
        const filterInput = document.querySelector('input[placeholder="Pesquisar"]') as HTMLInputElement;
        if (filterInput) {
            const event = new Event('input');
            filterInput.dispatchEvent(event);
        }
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Atualizado!', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Criado!', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
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

    onGlobalFilter(table: Table, event: Event) {
        const value = (event.target as HTMLInputElement).value.toLowerCase();
        table.filterGlobal(value, 'contains');

        // Reset groupedProducts before applying the filter
        this.groupProductsBySupplier();

        this.groupedProducts.forEach(group => {
            group.filteredProducts = group.products.filter(product => 
                product.name.toLowerCase().includes(value) ||
                product.category.toLowerCase().includes(value) ||
                product.inventoryStatus.toLowerCase().includes(value)
            );
        });

        this.groupedProducts = this.groupedProducts.filter(group => 
            group.supplier.toLowerCase().includes(value) ||
            group.date.toLowerCase().includes(value) ||
            group.filteredProducts.length > 0
        );
    }

    getProductNames() {
        this.productService.getProdutos().then(data => {
            this.estoqueProdutos = data.map(product => product.name);
        });
    }

    groupProductsBySupplier() {
        const grouped = this.products.reduce((acc, product) => {
            const supplier = product.description;
            if (!acc[supplier]) {
                acc[supplier] = { supplier, date: product.date, products: [], status: 'PENDENTE' };
            }
            acc[supplier].products.push(product);
            return acc;
        }, {});

        this.groupedProducts = Object.values(grouped);

        this.groupedProducts.forEach(group => {
            if (group.products.some(product => product.inventoryStatus === 'EM ANÁLISE')) {
                group.status = 'EM ANÁLISE';
            }
        });
    }

    toggleRow(event: Event, group: any) {
        event.preventDefault();
        this.expandedRows[group.supplier] = !this.expandedRows[group.supplier];
    }

    expandAllRows() {
        this.groupedProducts.forEach(group => {
            this.expandedRows[group.supplier] = true;
        });
    }

    collapseAllRows() {
        this.expandedRows = {};
    }

    toggleAllRows() {
        if (Object.keys(this.expandedRows).length === this.groupedProducts.length) {
            this.collapseAllRows();
        } else {
            this.expandAllRows();
        }
    }

    viewProduct(product: Product) {
        this.viewedProduct = product;
        this.viewProductDialog = true;
    }
}
