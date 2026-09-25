# CarGenie

CarGenie is an Expo and React Native mobile app concept for people who want to rent a car and for hosts who want to list one.

This repository currently contains a navigable frontend demonstration. It uses sample data so the main renter and host experiences can be explored without connecting real accounts, bookings, payments, or backend services.

## What you can explore

- Welcome, onboarding, and sample sign-in/sign-up screens
- Browse, search, and filter cars
- View car details and select rental dates, times, and pickup options
- Review a sample quote, confirm a mock booking, and view booking history
- Open the host area, create or edit a sample listing, and review mock trip requests
- See loading, validation, empty, error, success, and image fallback states

## Run locally

Requirements: Node.js LTS and npm.

```sh
npm ci
npm run start
```

Expo can open the app in Expo Go or an installed simulator. To run the web version:

```sh
npm run web
```

## Quality checks

```sh
npm run check
npx expo-doctor
npx expo export --platform web
```

## Current scope

The app is a frontend demonstration, not a live rental service. The following are not connected: backend APIs, production database, real authentication, payment processing, driver or vehicle verification, media uploads, notifications, and production booking operations. Booking, listing, and request actions use mock data and local demo behaviour.

The visual design follows the current CarGenie Figma exports. Some host screens extend the shared design system where no complete design export exists. The interface may continue to receive visual refinements.

## Project structure

- `src/app/` — Expo Router routes
- `src/components/ui/` — shared interface components
- `src/design-system/` — semantic visual and accessibility foundations
- `src/features/` — renter, booking, host, and profile flows
- `src/data/` — mock data, repositories, and local storage boundary
- `assets/cargenie/` — app imagery and branding assets

## License

No open-source license has been specified yet. Unless a license is added, all rights are reserved by the copyright holder.
