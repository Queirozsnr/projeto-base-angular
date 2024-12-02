import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './triagem.component.html',
    providers: [MessageService]
})
export class TriagemComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    suppliers: any[] = []; // Change to hold suppliers

    fornecedores: any[] = []; // Add this line

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    estoqueProdutos: string[] = [];

    expandedRows: { [key: string]: boolean } = {};

    viewProductDialog: boolean = false;
    viewedProduct: Product = {};

    editProductDialog: boolean = false;

    selectedProductToAdd: string = '';

    selectedProductQuantity: number = 0;

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getRecebimento().then(data => {
            this.suppliers = data;
            this.updateSupplierStatuses();
        });

        this.productService.getFornecedores().then(data => {
            this.fornecedores = data;
        });

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'PENDENTE', value: 'PENDENTE' },
            { label: 'EM ANÁLISE', value: 'EM ANÁLISE' },
            { label: 'APROVADO', value: 'APROVADO' }
        ];

        this.getProductNames();
    }

    updateSupplierStatuses() {
        this.suppliers.forEach(supplier => {
            supplier.status = supplier.products.some(p => p.inventoryStatus !== 'PENDENTE') ? 'EM ANÁLISE' : 'PENDENTE';
        });
    }

    openNew() {
        this.product = {};
        this.product.inventoryStatus = 'PENDENTE'; // Set default status to PENDENTE
        this.product.date = new Date().toISOString().split('T')[0]; // Set default date to today
        this.product.products = []; // Initialize products array
        this.product.supplier = ''; // Reset supplier
        this.submitted = false;
        this.editProductDialog = true; // Use the same modal as edit
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(supplier: any) {
        this.product = { ...supplier };
        this.editProductDialog = true;
    }

    addProductToGroup() {
        this.productService.getProdutos().then(data => {
            const selectedProduct = data.find(product => product.name === this.selectedProductToAdd);
            if (selectedProduct) {
                const newProduct: Product = {
                    id: this.createId(),
                    name: selectedProduct.name,
                    category: selectedProduct.category,
                    inventoryStatus: 'PENDENTE' as 'PENDENTE',
                    quantity: this.selectedProductQuantity,
                    // ...other necessary fields...
                };
                if (!this.product.products) {
                    this.product.products = [];
                }
                this.product.products.push(newProduct);
                this.selectedProductToAdd = '';
                this.selectedProductQuantity = 0;
            }
        });
    }

    removeProductFromGroup(product: Product) {
        if (this.product.products) {
            this.product.products = this.product.products.filter(p => p.id !== product.id);
        }
    }

    updateProductQuantity(product: Product, quantity: number) {
        if (this.product.products) {
            const prod = this.product.products.find(p => p.id === product.id);
            if (prod) {
                prod.quantity = quantity;
            }
        }
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.suppliers.forEach(supplier => {
            supplier.products = supplier.products.filter(val => !this.selectedProducts.includes(val));
        });
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produtos Deletados', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.suppliers = this.suppliers.filter(supplier => supplier.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Fornecedor Deletado!', life: 3000 });
        this.product = {};
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
        this.editProductDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.id) {
            if (typeof this.product.inventoryStatus === 'object' && this.product.inventoryStatus !== null) {
                this.product.inventoryStatus = (this.product.inventoryStatus as any).value;
            }
            const supplier = this.suppliers.find(s => s.supplier === this.product.supplier);
            if (supplier) {
                const index = supplier.products.findIndex(p => p.id === this.product.id);
                if (index !== -1) {
                    supplier.products[index] = this.product;
                }
                supplier.status = supplier.products.some(p => p.inventoryStatus !== 'PENDENTE') ? 'EM ANÁLISE' : 'PENDENTE';
            }
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Atualizado!', life: 3000 });
        } else {
            this.product.id = this.createId();
            this.product.code = this.createId();
            this.product.image = 'product-placeholder.svg';
            if (typeof this.product.inventoryStatus === 'object' && this.product.inventoryStatus !== null) {
                this.product.inventoryStatus = (this.product.inventoryStatus as any).value;
            } else {
                this.product.inventoryStatus = 'INSTOCK';
            }
            let supplier = this.suppliers.find(s => s.supplier === this.product.supplier);
            if (!supplier) {
                supplier = {
                    id: this.createId(),
                    code: this.createId(),
                    supplier: this.product.supplier,
                    date: this.product.date,
                    products: [],
                    status: 'PENDENTE'
                };
                this.suppliers.push(supplier);
            }
            supplier.products.push(this.product);
            supplier.status = supplier.products.some(p => p.inventoryStatus !== 'PENDENTE') ? 'EM ANÁLISE' : 'PENDENTE';
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Criado!', life: 3000 });
        }

        this.productDialog = false;
        this.editProductDialog = false;
        this.product = {};
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.suppliers.length; i++) {
            const supplier = this.suppliers[i];
            for (let j = 0; j < supplier.products.length; j++) {
                if (supplier.products[j].id === id) {
                    index = j;
                    break;
                }
            }
            if (index !== -1) break;
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

    onGlobalFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value.toLowerCase();
        this.productService.getRecebimento().then(data => {
            this.suppliers = data;
            this.suppliers.forEach(supplier => {
                supplier.filteredProducts = supplier.products.filter(product => 
                    product.name.toLowerCase().includes(value) ||
                    product.category.toLowerCase().includes(value) ||
                    product.inventoryStatus.toLowerCase().includes(value)
                );
            });

            this.suppliers = this.suppliers.filter(supplier => 
                supplier.supplier.toLowerCase().includes(value) ||
                supplier.date.toLowerCase().includes(value) ||
                supplier.filteredProducts.length > 0
            );
            this.updateSupplierStatuses();
        });
    }

    getProductNames() {
        this.productService.getProdutos().then(data => {
            this.estoqueProdutos = data.map(product => product.name);
        });
    }

    toggleRow(event: Event, supplier: any) {
        event.preventDefault();
        this.expandedRows[supplier.supplier] = !this.expandedRows[supplier.supplier];
    }

    toggleAllRows() {
        const allExpanded = Object.keys(this.expandedRows).length === this.suppliers.length;
        if (allExpanded) {
            this.expandedRows = {};
        } else {
            this.suppliers.forEach(supplier => {
                this.expandedRows[supplier.supplier] = true;
            });
        }
    }

    viewProduct(product: Product) {
        this.viewedProduct = product;
        this.viewProductDialog = true;
    }

    getSupplierStatus(supplierName: string): string {
        const supplier = this.suppliers.find(s => s.supplier === supplierName);
        return supplier ? supplier.status : '';
    }
}
