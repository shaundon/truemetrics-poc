import { useContext } from "react"

import {
  TruemetricsContext,
  TruemetricsContextState,
} from "./TruemetricsContext"

interface Props {
  children: React.ReactNode
}

/*
Truemetrics is not available on iOS.

This file is an inert version of TruemetricsProvider.android.tsx.
*/

const noop = () => {}

const TruemetricsProvider = (props: Props) => {
  const { children } = props

  const value: TruemetricsContextState = {
    startRecording: noop,
    stopRecording: noop,
    logStopEvent: noop,
  }

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
