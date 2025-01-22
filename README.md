# TrueMetrics PoC

## Prerequisites

You need NodeJS 20.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Make a copy of `.env.template` and name it `.env`. Then enter the correct API key.

3. Run the app on Android

   ```bash
    npm run android
   ```

4. Start streaming Android logs

In a separate tab:

```bash
   adb logcat | grep -i TrueMetrics
```
