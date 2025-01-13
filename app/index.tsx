import { Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ExpoTmdemo from 'expo-tmdemo';
import { useEffect, useState } from "react";

const config = require('../config.json');

export default function Index() {

  const [isInitialized, setIsInitialized] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const initialize = async () => {
    await ExpoTmdemo.initialize({
      apiKey: config.apiKey
    });
    const didInitialize = await ExpoTmdemo.isInitialized();
    setIsInitialized(didInitialize);
  }

  const deinitialize = async () => {
    await ExpoTmdemo.deinitialize();
    const didDeinitialize = await ExpoTmdemo.isInitialized();
    setIsInitialized(didDeinitialize);
  }

  const startRecording = async () => {
    await ExpoTmdemo.startRecording();
    const recording = await ExpoTmdemo.isRecordingInProgress();
    setIsRecording(recording);
  }

  const stopRecording = async () => {
    await ExpoTmdemo.stopRecording();
    const recording = await ExpoTmdemo.isRecordingInProgress();
    setIsRecording(recording);
  }

  useEffect(() => {
    const initialized = ExpoTmdemo.isInitialized()
    setIsInitialized(initialized);

    const recording = ExpoTmdemo.isRecordingInProgress()
    setIsRecording(recording);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>

      
        <Group name="Init">

          {isInitialized && (
            <>
            <Text>Initialized</Text>
            <Button
              title="Deinitialize"
              onPress={deinitialize}
            />
            </>
          )}

            {!isInitialized && (
            <>
            <Text>Not initialized</Text>
            <Button
              title="Initialize"
              onPress={initialize}
            />
            </>
          )}

        </Group>

        <Group name="Recording">

        {isRecording && (
            <>
            <Text>Recording is ON</Text>
            <Button
              title="Stop Recording"
              onPress={stopRecording}
            />
            </>
          )}

          {!isRecording && (
            <>
            <Text>Recording is OFF</Text>
            <Button
              title="Start Recording"
              onPress={startRecording}
            />
            </>
          )}

        </Group>
        
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
