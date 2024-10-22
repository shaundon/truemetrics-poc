import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to Truemetrics.web.ts
// and on native platforms to Truemetrics.ts
import TruemetricsModule from './src/TruemetricsModule';
import { ChangeEventPayload, TruemetricsViewProps } from './src/Truemetrics.types';

// Get the native constant value.
export const PI = TruemetricsModule.PI;

export function hello(): string {
  return TruemetricsModule.hello();
}

export async function setValueAsync(value: string) {
  return await TruemetricsModule.setValueAsync(value);
}

const emitter = new EventEmitter(TruemetricsModule ?? NativeModulesProxy.Truemetrics);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { TruemetricsViewProps, ChangeEventPayload };
