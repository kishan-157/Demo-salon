# Bella Rose Luxury Salon - Mobile Applications

This directory contains the source code for the two Android applications built for the Bella Rose Luxury Salon demonstration.

## Apps Overview

1.  **Customer App** (`/mobile/customer-app`):
    *   **Purpose**: Premium booking experience for salon clients.
    *   **Features**: Service browsing, real-time availability, appointment requesting, and status tracking.
    *   **Branding**: Rose Pink + White luxury aesthetic.

2.  **Owner App** (`/mobile/owner-app`):
    *   **Purpose**: Business management tool for the salon owner.
    *   **Features**: Unified dashboard, booking approval workflow (Accept/Reject), schedule management, and business insights.

## Technology Stack

*   **Frontend**: React 19 + TypeScript
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Backend**: Shared Firebase (Firestore + Auth)
*   **Mobile Bridge**: Capacitor 6.0

## Build & Installation Instructions

To build the actual Android APKs from this source code, follow these steps:

### Prerequisites
*   Node.js installed.
*   Android Studio installed.
*   Capacitor CLI (`npm install -g @capacitor/cli`).

### Step-by-Step Build (for either app)

1.  **Navigate to the app directory**:
    ```bash
    cd mobile/customer-app # or owner-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Build the web project**:
    ```bash
    npm run build
    ```

4.  **Add/Sync the Android platform**:
    ```bash
    npx cap add android
    npx cap sync android
    ```

5.  **Open in Android Studio**:
    ```bash
    npx cap open android
    ```

6.  **Build the APK**:
    *   In Android Studio, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
    *   Once finished, the `.apk` file will be located in `android/app/build/outputs/apk/debug/`.

## Shared Backend

Both applications are configured to use the same Firebase project as the website. This ensures that a booking made in the **Customer App** appears instantly in the **Owner App** and the **Website Admin Panel**.
