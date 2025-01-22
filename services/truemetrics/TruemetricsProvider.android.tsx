import { ExpoTruemetricsSdk } from "expo-truemetrics-sdk"
import { useCallback, useContext, useEffect } from "react"

import {
  StopEventType,
  TruemetricsContext,
  TruemetricsContextState,
} from "./TruemetricsContext"

interface Props {
  children: React.ReactNode
}

const apiKey = process.env.EXPO_PUBLIC_TRUEMETRICS_API_KEY
console.log("apiKey", apiKey)
const TruemetricsProvider = (props: Props) => {
  const { children } = props

  const startRecording = () => {
    const initialized = initializeIfNeeded()
    if (!initialized) {
      return
    }

    const isAlreadyRecording = ExpoTruemetricsSdk.isRecordingInProgress()
    if (isAlreadyRecording) {
      return
    }

    ExpoTruemetricsSdk.startRecording()

    const recordingStarted = ExpoTruemetricsSdk.isRecordingInProgress()
    if (recordingStarted) {
      console.log("Truemetrics: started recording")
    } else {
      console.log("Truemetrics: failed to start recording")
    }
  }

  const stopRecording = () => {
    ExpoTruemetricsSdk.stopRecording()
    const recordingInProgress = ExpoTruemetricsSdk.isRecordingInProgress()
    if (recordingInProgress) {
      console.log("Truemetrics: failed to stop recording")
    } else {
      console.log("Truemetrics: stopped recording")
    }
  }

  const initializeIfNeeded = useCallback(() => {
    const alreadyInitialized = ExpoTruemetricsSdk.isInitialized()
    if (alreadyInitialized) {
      return true
    }

    if (!apiKey) {
      console.log("Truemetrics: no API key provided")
      return false
    }

    ExpoTruemetricsSdk.initialize({
      apiKey,
      debug: true,
    })
    const didInitialize = ExpoTruemetricsSdk.isInitialized()
    if (didInitialize) {
      console.log("Truemetrics: initialized")
    } else {
      console.log("Truemetrics: failed to initialize")
    }
    return didInitialize
  }, [])

  const deinitializeIfNeeded = useCallback(() => {
    const alreadyInitialized = ExpoTruemetricsSdk.isInitialized()
    if (!alreadyInitialized) {
      return
    }

    ExpoTruemetricsSdk.deinitialize()
    console.log("Truemetrics: deinitialized")
  }, [])

  const logStopEvent = (
    eventType: StopEventType,
  ) => {
    ExpoTruemetricsSdk.logMetadata({
      stop_id: "123",
      stop_type: "collection",
      vehicle_id: "456",
      event_type: eventType,
      address: "12 Grimmauld Place, London, UK",
      routing_latitude: "51.5235635",
      routing_longitude: "-0.1575862",
    })
  }

  const value: TruemetricsContextState = {
    startRecording,
    stopRecording,
    logStopEvent,
  }

  useEffect(() => {
    return () => {
      deinitializeIfNeeded()
    }
  }, [deinitializeIfNeeded])

  return (
    <TruemetricsContext.Provider value={value}>
      {children}
    </TruemetricsContext.Provider>
  )
}

const useTruemetrics = () => {
  const context = useContext(TruemetricsContext)
  if (!context) {
    throw new Error("useTruemetrics must be used within a TruemetricsProvider")
  }
  return context
}

export { TruemetricsProvider, useTruemetrics }
