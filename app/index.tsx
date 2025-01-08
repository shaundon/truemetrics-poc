import { Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ExpoTmdemo from 'expo-tmdemo';

const config = require('../config.json');

export default function Index() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
      
        <Group name="Init">

        {
        (ExpoTmdemo.isInitialized())
        ? 
        <>
        <Button
            title="Deinitialize"
            onPress={async () => {
              await ExpoTmdemo.deinitialize();
            }}
          />
        </>
        : 
        <>
          <Button
            title="Initialize"
            onPress={async () => {
              await ExpoTmdemo.initialize({
                apiKey: config.apiKey
              });
            }}
          />
          </>
        }

        </Group>

        <Group name="Recording">

        {(!ExpoTmdemo.isRecordingInProgress()) &&
          <Button
            title="Start recording"
            onPress={async () => {
              await ExpoTmdemo.startRecording();
            }}
          />
        }

        {(ExpoTmdemo.isRecordingInProgress()) &&
          <Button
            title="Stop recording"
            onPress={async () => {
              await ExpoTmdemo.stopRecording();
            }}
          />
        }
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
