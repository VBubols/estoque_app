import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 24 }}>Bem-vindo ao Gerenciador de Estoque</Text>
      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{ backgroundColor: "#004c6a", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
