export interface Fornecedor {
    id_fornecedor: number;
    nome_fornecedor: string;
    cnpj: string;
    email: string;
}

export interface Produto {
    id_produto: number;
    nome_produto: string;
    categoria: 'Celular' | 'Computador' | 'Segurança' | 'Outro';
    preco: number;
    id_fornecedor: number | null;
    ativo: boolean;
    nome_fornecedor?: string; // Para exibir na lista
}