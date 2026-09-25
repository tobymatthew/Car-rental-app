# CarGenie

CarGenie is a car-rental product with a mobile app for renters and hosts and an API service. This repository brings the current frontend and backend code together in one place.

## App demo

The app is not currently available in an app store. [Watch the recorded app walkthrough](https://res.cloudinary.com/dg4ccjvbx/video/upload/v1790247533/video-cargenie_oxehpf.mp4) to preview the renter and host experience.

## Project layout

- [`frontend/`](./frontend/) — Expo and React Native app. Its renter and host journeys are navigable with sample data.
- [`backend/`](./backend/) — existing Express API prototype and draft MySQL schema.

## Frontend

The mobile app demonstrates onboarding, browsing and filtering cars, viewing vehicle details, choosing rental dates and pickup options, reviewing a quote, viewing bookings, creating host listings, and responding to mock trip requests.

```sh
cd frontend
npm ci
npm run start
```

To run the web version, use `npm run web` from `frontend/`. Quality checks are available with `npm run check`, `npx expo-doctor`, and `npx expo export --platform web`.

## Backend

The backend source is included, but it is not yet connected to the mobile app. It requires a separately configured MySQL database and credentials for any external services it uses. Start from [`backend/.env.example`](./backend/.env.example), fill values in a local `backend/.env`, and never commit that file.

```sh
cd backend
npm ci
npm run dev
```

The backend and its SQL schema are an earlier prototype and need a security, dependency, API-contract, and schema review before production use. The backend package does not yet have an automated test suite.

## Current status

The frontend uses mock data for its main flows. There are no live customer accounts, booking transactions, payment processing, driver or vehicle verification, media uploads, or production notifications connected to the app. The backend has not been integrated with the current frontend.

Some interface details may continue to change as the product design is refined. No production deployment is configured in this repository.

## Licensing

Confirm project-wide licensing and asset rights before reuse or redistribution.
