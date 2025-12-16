import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { api } from "../services/api";
import { router } from "expo-router";
import NivelAcesso from "../components/ui/nivelAcesso";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nivelAcesso, setNivelAcesso] = useState("vendedor");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    async function handleCadastro() {
        if(senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        if(!nome || !email || !senha || !confirmarSenha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await api.post("/usuarios/cadastro", { 
                nome, 
                email, 
                senha, 
                nivel_acesso: nivelAcesso 
            });

            console.log("Resposta da API:", response.data);
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
            router.push("/login");

        } catch (error: any) {
            Alert.alert("Erro", error.response?.data?.message || "Erro ao fazer cadastro");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
            <Text style={{ fontSize: 24, marginBottom: 24 }}>Cadastro</Text>

            <Text>Nome</Text>
            <TextInput
                value={nome}
                onChangeText={setNome}
                style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
            />

            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
            />

            <View>
                <NivelAcesso nivel={nivelAcesso} setNivel={setNivelAcesso} />
            </View>

            <Text>Crie sua Senha</Text>
            <TextInput
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 24, padding: 8 }}
            />

            <Text>Confirmar Senha</Text>
            <TextInput
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 24, padding: 8 }}
            />

            <TouchableOpacity
                onPress={handleCadastro}
                style={{
                    backgroundColor: "#004c6a",
                    padding: 12,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#fff" }}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.back()}
                style={{ marginTop: 16, alignItems: "center" }}
            >
                <Text style={{ color: "#004c6a" }}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}