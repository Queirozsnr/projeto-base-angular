import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProdutos() {
        return this.http.get<any>('assets/demo/data/produtos.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getRecebimento() {
        return this.http.get<any>('assets/demo/data/recebimento.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getFornecedores() {
        return this.http.get<any>('assets/demo/data/fornecedores.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getUsuarios() {
        return this.http.get<any>('assets/demo/data/usuarios.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getDashboard() {
        return this.http.get<any>('assets/demo/data/dashboard.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
