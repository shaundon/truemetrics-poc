import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core"

import {
  SDKStateChangedEventPayload,
  SDKErrorEventPayload,
  SDKPermissionsChangedEventPayload,
} from "./src/TrueMetrics.types"
import TrueMetricsModule from "./src/TrueMetricsModule"

export function initializeSdk(apiKey: string): void {
  return TrueMetricsModule.initializeSdk(apiKey)
}

export function startRecording(): void {
  return TrueMetricsModule.startRecording()
}

export function stopRecording(): void {
  return TrueMetricsModule.stopRecording()
}

export async function setValueAsync(value: string) {
  return await TrueMetricsModule.setValueAsync(value)
}

const emitter = new EventEmitter(
  TrueMetricsModule ?? NativeModulesProxy.TrueMetrics,
)

export function addSDKStateChangedListener(
  listener: (event: SDKStateChangedEventPayload) => void,
): Subscription {
  return emitter.addListener<SDKStateChangedEventPayload>(
    "sdkStateChanged",
    listener,
  )
}

export function addSDKErrorListener(
  listener: (event: SDKErrorEventPayload) => void,
): Subscription {
  return emitter.addListener<SDKErrorEventPayload>("sdkError", listener)
}

export function addSDKPermissionsChangedListener(
  listener: (event: SDKPermissionsChangedEventPayload) => void,
): Subscription {
  return emitter.addListener<SDKPermissionsChangedEventPayload>(
    "sdkPermissions",
    listener,
  )
}

export {
  SDKStateChangedEventPayload,
  SDKErrorEventPayload,
  SDKPermissionsChangedEventPayload,
}
