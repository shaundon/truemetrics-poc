import { createContext } from "react"

type StopEventType = "parked_for_collection" | "parked_for_delivery"

type TruemetricsContextState = {
  startRecording: () => void
  stopRecording: () => void
  logStopEvent: (
    eventType: StopEventType,
  ) => void
}

const TruemetricsContext = createContext<TruemetricsContextState | undefined>(
  undefined,
)

export { TruemetricsContext }
export type { TruemetricsContextState, StopEventType }
