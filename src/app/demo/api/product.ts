interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    inventoryStatus?: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK' | 'APROVADO' | 'EM ANÁLISE' | 'PENDENTE';
    rating?: number;
    date?: string;
    products?: Product[];
    supplier?: string; // Add this line
}