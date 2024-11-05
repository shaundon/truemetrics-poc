export type SDKStateChangedEventPayload = {
  state: string
}

export type SDKErrorEventPayload = {
  errorCode: string
  message: string
}

export type SDKPermissionsChangedEventPayload = {
  permissions: string[]
}
