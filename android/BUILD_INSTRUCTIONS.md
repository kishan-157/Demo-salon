# Bella Rose Salon — Android Applications Build & Deployment Guide

This repository contains the complete native Android Jetpack Compose source code for two dedicated applications:
1. **Customer Android App** (`com.bellarose.salon.customer`) located at `/android/customer-app`
2. **Salon Owner Android App** (`com.bellarose.salon.owner`) located at `/android/owner-app`

Both applications share the same real-time booking backend (`/api/bookings`, `/api/services`, `/api/availability`) and reflect the single-salon Rose Pink + White luxury brand identity.

---

## 1. Prerequisites
- **JDK**: Java Development Kit 17 (or OpenJDK 17)
- **Android SDK**: API Level 34 (Android 14) with Build-Tools 34.0.0
- **Android Studio**: Android Studio Hedgehog / Iguana / Jellyfish or newer
- **Gradle**: 8.4+

---

## 2. Building the Customer Android App
1. Open terminal and navigate to `/android/customer-app`:
   ```bash
   cd android/customer-app
   ```
2. Build the Debug APK:
   ```bash
   ./gradlew assembleDebug
   ```
   The resulting APK will be generated at:
   `android/customer-app/app/build/outputs/apk/debug/app-debug.apk`

3. To place the compiled APK into the web admin panel download folder:
   ```bash
   cp app/build/outputs/apk/debug/app-debug.apk ../../dist-apks/bellarose-customer.apk
   ```

---

## 3. Building the Salon Owner Android App
1. Open terminal and navigate to `/android/owner-app`:
   ```bash
   cd android/owner-app
   ```
2. Build the Debug APK:
   ```bash
   ./gradlew assembleDebug
   ```
   The resulting APK will be generated at:
   `android/owner-app/app/build/outputs/apk/debug/app-debug.apk`

3. To place the compiled APK into the web admin panel download folder:
   ```bash
   cp app/build/outputs/apk/debug/app-debug.apk ../../dist-apks/bellarose-owner.apk
   ```

---

## 4. Installing and Testing on a Physical Android Device

### Option A: USB Debugging via ADB
1. Enable **Developer Options** on your physical Android phone (Settings > About Phone > Tap "Build Number" 7 times).
2. Enable **USB Debugging** (Settings > Developer Options > USB Debugging).
3. Connect your Android phone to your computer via USB cable.
4. Verify connection:
   ```bash
   adb devices
   ```
5. Install the Customer App:
   ```bash
   adb install -r android/customer-app/app/build/outputs/apk/debug/app-debug.apk
   ```
6. Install the Owner App:
   ```bash
   adb install -r android/owner-app/app/build/outputs/apk/debug/app-debug.apk
   ```

### Option B: Direct Browser Download from Admin Panel
Once the APK files are placed into `/dist-apks/`, the web Admin Panel's **Mobile Apps** section automatically detects the files, updates the status to **"Verified APK Compiled"**, and enables the direct **"Download APK"** button.

---

## 5. Live Interactive In-Browser Previews
For client and sales demonstrations without physical Android hardware, the web application includes full **interactive in-browser simulators** embedded directly inside the Admin Panel under **Mobile Apps**:
- **Customer App Simulator**: Walks through Splash -> Home -> Service Menu -> Service Details -> Date & Time Selector -> Booking Submission -> My Bookings -> WhatsApp Concierge.
- **Owner App Simulator**: Walks through Owner Login -> Real-Time Dashboard -> Pending Booking Approval -> Live Confirmation -> WhatsApp Customer Notification.
- Both simulators connect directly to the shared backend database (`/api/bookings`), demonstrating genuine end-to-end booking synchronization.
