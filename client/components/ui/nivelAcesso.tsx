import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface NivelAcessoProps {
    nivel: string;
    setNivel: (value: string) => void;
}

export default function NivelAcesso({ nivel, setNivel }: NivelAcessoProps) {
return (
    <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8 }}>Nível de Acesso</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
            onPress={() => setNivel("admin")}
            style={{
                padding: 12,
                borderWidth: 1,
                borderColor: nivel === "admin" ? "#004c6a" : "#ccc",
                backgroundColor: nivel === "admin" ? "#004c6a" : "#fff",
                borderRadius: 8,
            }}
        >
            <Text style={{ color: nivel === "admin" ? "#fff" : "#000" }}>Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => setNivel("vendedor")}
        style={{
            padding: 12,
            borderWidth: 1,
            borderColor: nivel === "vendedor" ? "#004c6a" : "#ccc",
            backgroundColor: nivel === "vendedor" ? "#004c6a" : "#fff",
            borderRadius: 8,
        }}
        >
            <Text style={{ color: nivel === "vendedor" ? "#fff" : "#000" }}>Vendedor</Text>
        </TouchableOpacity>
    </View>
    </View>
);
}
