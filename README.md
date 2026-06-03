# BWTmat Game — Mobile App

Android & iOS mobile app for [BWTmat Game](https://bwtmat-game.vercel.app) built with Expo (React Native).

## Quick Start

### Prerequisites
- Node.js 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) app on your phone (for testing)

### Run locally

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS).

## Build APK / IPA for stores

Install EAS CLI:
```bash
npm install -g eas-cli
eas login
eas build:configure
```

Build Android APK:
```bash
eas build --platform android --profile preview
```

Build iOS IPA:
```bash
eas build --platform ios
```

## App Details

| Field | Value |
|-------|-------|
| Name | BWTmat Game |
| Android package | com.mikemeh.bwtmat |
| iOS bundle ID | com.mikemeh.bwtmat |
| Game URL | https://bwtmat-game.vercel.app |

## Features
- Full online multiplayer
- Works on Android & iOS
- Dark theme matching the web app
- Offline error screen with retry
- Android hardware back button support
