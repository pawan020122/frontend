import { Stack } from "expo-router";
import { CategoryProvider } from "./context/Category";

export default function RootLayout() {
  return (
    <CategoryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CategoryProvider>
  );
}