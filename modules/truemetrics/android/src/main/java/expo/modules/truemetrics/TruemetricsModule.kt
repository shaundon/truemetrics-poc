package expo.modules.truemetrics

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.exception.Exceptions

import android.app.Notification

import expo.modules.truemetrics.R

import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener
import android.app.Activity
import android.util.Log
import androidx.annotation.NonNull
import androidx.annotation.Nullable
import androidx.core.app.NotificationChannelCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat

import io.truemetrics.truemetricssdk.ErrorCode
import io.truemetrics.truemetricssdk.StatusListener
import io.truemetrics.truemetricssdk.TruemetricsSDK
import io.truemetrics.truemetricssdk.config.Config
import io.truemetrics.truemetricssdk.engine.state.State

import android.os.Looper
import android.os.Handler

class TrueMetricsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("TrueMetrics")

    Events("sdkStateChanged")
    Events("sdkError")
    Events("sdkPermissions")

    Function("initializeSdk") { apiKey: String ->

     val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()

     val notificationManager = NotificationManagerCompat.from(context)

     notificationManager.createNotificationChannel(
       NotificationChannelCompat.Builder("FOREGROUND_SERVICE_CHANNEL", NotificationManagerCompat.IMPORTANCE_LOW)
         .setName("Foreground service")
         .setShowBadge(false)
         .build()
     )

     val notification = NotificationCompat.Builder(context, "FOREGROUND_SERVICE_CHANNEL")
       .setContentTitle("Foreground service")
       .setOngoing(true)
       .build()

     /*
     I had to wrap the calls to the SDK in a Handler to avoid a crash.
     I believe this makes it run on the main thread.
      */
     val mainHandler = Handler(Looper.getMainLooper())
     mainHandler.post {

     TruemetricsSDK.setStatusListener(object : StatusListener{
         override fun onStateChange(state: State) {
            Log.i("TrueMetrics SDK State changed", state.name)

            /*
            Calling these events causes the app to crash.
            Not sure why.
             */
          //  sendEvent("sdkStateChanged", mapOf(
          //    "state" to state.name
          //  ))
         }

         override fun onError(errorCode: ErrorCode, message: String?) {
            Log.i("TrueMetrics SDK Error", message ?: "No message")
          //  sendEvent("sdkError", mapOf(
          //    "errorCode" to errorCode.name,
          //    "message" to message
          //  ))
         }

         override fun askPermissions(permissions: List<String>) {
          Log.i("TrueMetrics SDK Permissions", permissions.toString())
          //  sendEvent("sdkPermissions", mapOf(
          //    "permissions" to permissions
          //  ))
         }
     })

     val config = Config(apiKey, notification, true)

        TruemetricsSDK.initialize(
          context,
          config
        )
      }
    }

    Function("startRecording") {
     TruemetricsSDK.startRecording()
    }

    Function("stopRecording") {
     TruemetricsSDK.stopRecording()
    }

    Function("logMetadata") { metadata: Map<String, String> ->
     TruemetricsSDK.logMetadata(metadata)
    }
  }
}
