import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="produtos" />
            <Stack.Screen name="estoque" />
            <Stack.Screen name="fornecedores" />
        </Stack>
    );
}