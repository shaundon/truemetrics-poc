import { Text, TouchableOpacity, View } from "react-native";

import * as TrueMetrics from "../modules/truemetrics";

export default function Index() {

  const initializeSdk = () => {
    TrueMetrics.initializeSdk("1234567890");
  }

  const startRecording = () => {
    TrueMetrics.startRecording();
  }

  const stopRecording = () => {
    TrueMetrics.stopRecording();
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={initializeSdk}>
        <Text>Initialize SDK</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={startRecording}>
        <Text>Start Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stopRecording}>
        <Text>Stop Recording</Text>
      </TouchableOpacity>
    </View>
  );
}
