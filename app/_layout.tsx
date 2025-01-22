import { TruemetricsProvider } from "@/services/truemetrics/TruemetricsProvider.android";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TruemetricsProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </TruemetricsProvider>
  );
}
