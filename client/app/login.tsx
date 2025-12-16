import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { api } from "../services/api";
import { router } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin() {
        try {
            const response = await api.post("/usuarios/login", { email, senha });
            
            console.log("Resposta da API:", response.data);
            Alert.alert("Sucesso", "Login realizado com sucesso!");
            router.push("/produtos");
            
        } catch (error: any) {
            Alert.alert("Erro", error.response?.data?.message || "Erro ao fazer login");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
            <Text style={{ fontSize: 24, marginBottom: 24 }}>Login</Text>

            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
            />

            <Text>Senha</Text>
            <TextInput
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 24, padding: 8 }}
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={{
                    backgroundColor: "#004c6a",
                    padding: 12,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#fff" }}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.push("/cadastro")}
                style={{ marginTop: 16, alignItems: "center" }}
            >
                <Text style={{ color: "#004c6a" }}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
}