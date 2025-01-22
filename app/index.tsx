import { useTruemetrics } from "@/services/truemetrics/TruemetricsProvider.android";
import { Button, SafeAreaView, ScrollView, StyleSheet } from "react-native";


const Index = () => {
  const { startRecording, stopRecording, logStopEvent } = useTruemetrics()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Button title="Start Recording" onPress={startRecording} />
        <Button title="Stop Recording" onPress={stopRecording} />
        <Button title="Log Stop Event" onPress={() => logStopEvent("parked_for_delivery")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Index;
