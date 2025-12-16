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
import { Fornecedor } from "../types"

export default function Fornecedores() {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    // Formulário
    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        carregarFornecedores();
    }, []);

    async function carregarFornecedores() {
        try {
            setLoading(true);
            const response = await api.get("/fornecedores");
            setFornecedores(response.data);
        } catch (error: any) {
            Alert.alert("Erro", "Não foi possível carregar os fornecedores");
        } finally {
            setLoading(false);
        }
    }

    async function handleCriarFornecedor() {
        if (!nomeFornecedor || !cnpj || !email) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        try {
            await api.post("/fornecedores", {
                nome_fornecedor: nomeFornecedor,
                cnpj,
                email,
            });

            Alert.alert("Sucesso", "Fornecedor criado com sucesso!");
            limparFormulario();
            setModalVisible(false);
            carregarFornecedores();
        } catch (error: any) {
            Alert.alert(
                "Erro",
                error.response?.data?.error || "Erro ao criar fornecedor"
            );
        }
    }

    function limparFormulario() {
        setNomeFornecedor("");
        setCnpj("");
        setEmail("");
    }

    function formatarCNPJ(text: string) {
        // Remove tudo que não é número
        const numeros = text.replace(/\D/g, "");
        
        // Limita a 14 dígitos
        const limitado = numeros.slice(0, 14);
        
        setCnpj(limitado);
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
                    Fornecedores
                </Text>
            </View>

            {/* Botão Adicionar */}
            <View style={{ padding: 16 }}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                        backgroundColor: "#004c6a",
                        padding: 12,
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        + Adicionar Fornecedor
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Lista de Fornecedores */}
            <FlatList
                data={fornecedores}
                keyExtractor={(item) => item.id_fornecedor.toString()}
                contentContainerStyle={{ padding: 16, paddingTop: 0 }}
                refreshing={loading}
                onRefresh={carregarFornecedores}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
                        Nenhum fornecedor cadastrado
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
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
                            {item.nome_fornecedor}
                        </Text>
                        <Text style={{ color: "#666", marginBottom: 2 }}>
                            CNPJ: {item.cnpj}
                        </Text>
                        <Text style={{ color: "#666" }}>
                            Email: {item.email}
                        </Text>
                    </View>
                )}
            />

            {/* Modal Adicionar Fornecedor */}
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
                                Novo Fornecedor
                            </Text>

                            <Text style={{ marginBottom: 4, color: "#333" }}>Nome do Fornecedor</Text>
                            <TextInput
                                value={nomeFornecedor}
                                onChangeText={setNomeFornecedor}
                                placeholder="Digite o nome"
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 16,
                                }}
                            />

                            <Text style={{ marginBottom: 4, color: "#333" }}>CNPJ (apenas números)</Text>
                            <TextInput
                                value={cnpj}
                                onChangeText={formatarCNPJ}
                                placeholder="00000000000000"
                                keyboardType="numeric"
                                maxLength={14}
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 16,
                                }}
                            />

                            <Text style={{ marginBottom: 4, color: "#333" }}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="fornecedor@email.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    padding: 12,
                                    marginBottom: 24,
                                }}
                            />

                            <TouchableOpacity
                                onPress={handleCriarFornecedor}
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