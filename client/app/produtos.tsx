import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    FlatList,
    Modal,
    ScrollView,
} from "react-native";
import { api } from "../services/api";
import { router } from "expo-router";
import { Produto, Fornecedor } from "../types";
import { Picker } from "@react-native-picker/picker";

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    
    // Formulário
    const [nomeProduto, setNomeProduto] = useState("");
    const [categoria, setCategoria] = useState<"Celular" | "Computador" | "Segurança" | "Outro">("Celular");
    const [preco, setPreco] = useState("");
    const [idFornecedor, setIdFornecedor] = useState<number | null>(null);
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

    const categorias = ["Celular", "Computador", "Segurança", "Outro"];

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        await Promise.all([carregarProdutos(), carregarFornecedores()]);
    }

    async function carregarProdutos() {
    try {
        setLoading(true);
        const response = await api.get("/produtos");
        
        // Converter preço para número
        const produtosFormatados = response.data.map((produto: any) => ({
            ...produto,
            preco: parseFloat(produto.preco) || 0
        }));
        
        setProdutos(produtosFormatados);
    } catch (error: any) {
        Alert.alert("Erro", "Não foi possível carregar os produtos");
    } finally {
        setLoading(false);
    }
}

    async function carregarFornecedores() {
    try {
        const response = await api.get("/fornecedores");
        console.log("Fornecedores carregados:", response.data); // ADICIONE ESTA LINHA
        setFornecedores(response.data);
    } catch (error: any) {
        console.error("Erro ao carregar fornecedores:", error);
    }
}

    async function handleCriarProduto() {
        if (!nomeProduto || !preco) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios");
            return;
        }

        try {
            await api.post("/produtos", {
                nome_produto: nomeProduto,
                categoria,
                preco: parseFloat(preco),
                id_fornecedor: idFornecedor,
            });

            Alert.alert("Sucesso", "Produto criado com sucesso!");
            limparFormulario();
            setModalVisible(false);
            carregarProdutos();
        } catch (error: any) {
            Alert.alert(
                "Erro",
                error.response?.data?.error || "Erro ao criar produto"
            );
        }
    }

    async function handleAtualizarProduto() {
        if (!produtoEditando || !nomeProduto || !preco) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios");
            return;
        }

        try {
            await api.put(`/produtos/${produtoEditando.id_produto}`, {
                nome_produto: nomeProduto,
                categoria,
                preco: parseFloat(preco),
                id_fornecedor: idFornecedor,
            });

            Alert.alert("Sucesso", "Produto atualizado com sucesso!");
            limparFormulario();
            setModalEditVisible(false);
            carregarProdutos();
        } catch (error: any) {
            Alert.alert(
                "Erro",
                error.response?.data?.error || "Erro ao atualizar produto"
            );
        }
    }

    async function handleDesativarProduto(id: number) {
        try {
            await api.delete(`/produtos/${id}`);
            Alert.alert("Sucesso", "Produto desativado com sucesso!");
            carregarProdutos();
        } catch (error: any) {
            Alert.alert(
                "Erro",
                error.response?.data?.error || "Erro ao desativar produto"
            );
        }
    }

    async function handleReativarProduto(id: number) {
        try {
            await api.patch(`/produtos/${id}/reativar`);
            Alert.alert("Sucesso", "Produto reativado com sucesso!");
            carregarProdutos();
        } catch (error: any) {
            Alert.alert(
                "Erro",
                error.response?.data?.error || "Erro ao reativar produto"
            );
        }
    }

    function abrirModalEdicao(produto: Produto) {
        setProdutoEditando(produto);
        setNomeProduto(produto.nome_produto);
        setCategoria(produto.categoria);
        setPreco(produto.preco.toString());
        setIdFornecedor(produto.id_fornecedor);
        setModalEditVisible(true);
    }

    function limparFormulario() {
        setNomeProduto("");
        setCategoria("Celular");
        setPreco("");
        setIdFornecedor(null);
        setProdutoEditando(null);
    }

    function formatarPreco(text: string) {
        // Remove tudo que não é número ou ponto
        const numeros = text.replace(/[^0-9.]/g, "");
        setPreco(numeros);
    }

    function getNomeFornecedor(id: number | null) {
        if (!id) return "Sem fornecedor";
        const fornecedor = fornecedores.find(f => f.id_fornecedor === id);
        return fornecedor?.nome_fornecedor || "Desconhecido";
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            {/* Header */}
            <View
                style={{
                    backgroundColor: "#004c6a",
                    padding: 16,
                    paddingTop: 50,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
                    Produtos
                </Text>
            </View>

            {/* Botões */}
            <View style={{ padding: 16, flexDirection: "row", gap: 8 }}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                        flex: 1,
                        backgroundColor: "#004c6a",
                        padding: 12,
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        + Adicionar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/fornecedores")}
                    style={{
                        flex: 1,
                        backgroundColor: "#0066cc",
                        padding: 12,
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Fornecedores
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Lista de Produtos */}
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id_produto.toString()}
                contentContainerStyle={{ padding: 16, paddingTop: 0 }}
                refreshing={loading}
                onRefresh={carregarProdutos}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
                        Nenhum produto cadastrado
                    </Text>
                }
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 16,
                            borderRadius: 8,
                            marginBottom: 12,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            opacity: item.ativo ? 1 : 0.5, // 👈 OPACO SE INATIVO
                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                    {item.nome_produto}
                                </Text>
                                {!item.ativo && ( // 👈 BADGE DE INATIVO
                                    <View style={{ 
                                        backgroundColor: "#dc3545", 
                                        paddingHorizontal: 8, 
                                        paddingVertical: 2, 
                                        borderRadius: 4,
                                        marginLeft: 8 
                                    }}>
                                        <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}>
                                            INATIVO
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#004c6a" }}>
                                R$ {Number(item.preco).toFixed(2)}
                            </Text>
                        </View>
                        
                        <Text style={{ color: "#666", marginBottom: 2 }}>
                            Categoria: {item.categoria}
                        </Text>
                        <Text style={{ color: "#666", marginBottom: 12 }}>
                            Fornecedor: {getNomeFornecedor(item.id_fornecedor)}
                        </Text>
                
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <TouchableOpacity
                                onPress={() => abrirModalEdicao(item)}
                                disabled={!item.ativo} 
                                style={{
                                    flex: 1,
                                    backgroundColor: item.ativo ? "#0066cc" : "#ccc",
                                    padding: 10,
                                    borderRadius: 6,
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Editar
                                </Text>
                            </TouchableOpacity>
                
                            <TouchableOpacity
                                onPress={() => item.ativo 
                                    ? handleDesativarProduto(item.id_produto)
                                    : handleReativarProduto(item.id_produto)
                                }
                                style={{
                                    flex: 1,
                                    backgroundColor: item.ativo ? "#dc3545" : "#28a745",
                                    padding: 10,
                                    borderRadius: 6,
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    {item.ativo ? "Desativar" : "Reativar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Modal Adicionar Produto */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            padding: 20,
                            maxHeight: "80%",
                        }}
                    >
                        <ScrollView>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                                Novo Produto
                            </Text>

                            <Text style={{ marginBottom: 4, color: "#333" }}>Nome do Produto</Text>
                            <TextInput
                                value={nomeProduto}
                                onChangeText={setNomeProduto}
                                placeholder="Digite o nome"
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 16,
                                }}
                            />

                            <Text style={{ marginBottom: 4, color: "#333" }}>Categoria</Text>
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    marginBottom: 16,
                                }}
                            >
                                <Picker
                                    selectedValue={categoria}
                                    onValueChange={(value) => setCategoria(value)}
                                >
                                    {categorias.map((cat) => (
                                        <Picker.Item key={cat} label={cat} value={cat} />
                                    ))}
                                </Picker>
                            </View>

                            <Text style={{ marginBottom: 4, color: "#333" }}>Preço</Text>
                            <TextInput
                                value={preco}
                                onChangeText={formatarPreco}
                                placeholder="0.00"
                                keyboardType="decimal-pad"
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 16,
                                }}
                            />

                            <Text style={{ marginBottom: 4, color: "#333" }}>Fornecedor</Text>
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    marginBottom: 24,
                                }}
                            >
                                <Picker
                                    selectedValue={idFornecedor}
                                    onValueChange={(value) => setIdFornecedor(value)}
                                >
                                    <Picker.Item label="Selecione um fornecedor" value={null} />
                                    {fornecedores.map((forn) => (
                                        <Picker.Item
                                            key={forn.id_fornecedor}
                                            label={forn.nome_fornecedor}
                                            value={forn.id_fornecedor}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            <TouchableOpacity
                                onPress={handleCriarProduto}
                                style={{
                                    backgroundColor: "#004c6a",
                                    padding: 14,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    marginBottom: 12,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                                    Salvar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                    limparFormulario();
                                }}
                                style={{
                                    padding: 14,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "#004c6a",
                                }}
                            >
                                <Text style={{ color: "#004c6a", fontWeight: "bold", fontSize: 16 }}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Modal Editar Produto */}
            <Modal
                visible={modalEditVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalEditVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            padding: 20,
                            maxHeight: "80%",
                        }}
                    >
                        <ScrollView>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                                Editar Produto
                            </Text>

                            <Text style={{ marginBottom: 4, color: "#333" }}>Nome do Produto</Text>
                            <TextInput
                                value={nomeProduto}
                                onChangeText={setNomeProduto}
                                placeholder="Digite o nome"
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 16,
                                }}
                            />

                            <Text style={{ marginBottom: 4, color: "#333" }}>Categoria</Text>
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    marginBottom: 16,
                                }}
                            >
                                <Picker
                                    selectedValue={categoria}
                                    onValueChange={(value) => setCategoria(value)}
                                >
                                    {categorias.map((cat) => (
                                        <Picker.Item key={cat} label={cat} value={cat} />
                                    ))}
                                </Picker>
                            </View>

                            <Text style={{ marginBottom: 4, color: "#333" }}>Preço</Text>
                            <TextInput
                                value={preco}
                                onChangeText={formatarPreco}
                                placeholder="0.00"
                                keyboardType="decimal-pad"
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 16,
                                }}
                            />

                            <Text style={{ marginBottom: 4, color: "#333" }}>Fornecedor</Text>
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    marginBottom: 24,
                                }}
                            >
                                <Picker
                                    selectedValue={idFornecedor}
                                    onValueChange={(value) => setIdFornecedor(value)}
                                >
                                    <Picker.Item label="Selecione um fornecedor" value={null} />
                                    {fornecedores.map((forn) => (
                                        <Picker.Item
                                            key={forn.id_fornecedor}
                                            label={forn.nome_fornecedor}
                                            value={forn.id_fornecedor}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            <TouchableOpacity
                                onPress={handleAtualizarProduto}
                                style={{
                                    backgroundColor: "#004c6a",
                                    padding: 14,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    marginBottom: 12,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                                    Atualizar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setModalEditVisible(false);
                                    limparFormulario();
                                }}
                                style={{
                                    padding: 14,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "#004c6a",
                                }}
                            >
                                <Text style={{ color: "#004c6a", fontWeight: "bold", fontSize: 16 }}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Botão Voltar */}
            <View style={{ padding: 16, paddingBottom: 30 }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        backgroundColor: "#666",
                        padding: 12,
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}