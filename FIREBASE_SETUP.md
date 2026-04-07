# Firebase Backend Setup

## 1) Create Firebase project

1. Go to Firebase Console and create a new project.
2. Add a Web App and copy the config values.
3. Enable these products:
   - Authentication (Email/Password)
   - Firestore Database (Production mode)
   - Storage (optional now)

## 2) Add environment variables

1. Copy `.env.example` to `.env`.
2. Fill all `VITE_FB_*` values from your Firebase web app config.

## 3) Prepare Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

In project root:

```bash
firebase use --add
```

Select your Firebase project and set an alias (for example `default`).

## 4) Deploy Firestore rules and indexes

This repo already includes:
- `firestore.rules`
- `firestore.indexes.json`
- `firebase.json`

Deploy them:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

## 5) Create first admin user

1. Sign up in app with your email/password.
2. In Firestore, open `users/{uid}` for that account.
3. Set `role` to `admin` manually.
4. Log out and log in again.

## 6) Recommended starter collections

Create these top-level collections:
- `users`
- `categories`
- `services`
- `bookings`
- `reviews`
- `dashboards`

### Minimum document shapes

`users/{uid}`
- `uid`: string
- `name`: string
- `email`: string
- `role`: `customer | partner | admin`
- `isActive`: boolean
- `createdAt`: timestamp
- `updatedAt`: timestamp

`services/{serviceId}`
- `partnerId`: string
- `partnerName`: string
- `categoryId`: string
- `categoryName`: string
- `title`: string
- `price`: number
- `city`: string
- `status`: `draft | active | paused`
- `createdAt`: timestamp
- `updatedAt`: timestamp

`bookings/{bookingId}`
- `customerId`: string
- `partnerId`: string
- `serviceId`: string
- `serviceTitle`: string
- `servicePriceAtBooking`: number
- `status`: `pending | confirmed | completed | cancelled`
- `createdAt`: timestamp
- `updatedAt`: timestamp

## 7) Run locally

```bash
npm run dev
```

The app now uses Firebase Auth for login/register and stores profile in `users` collection.

## 8) Next backend milestones

1. Replace JSON reads in dashboards with Firestore queries.
2. Add service CRUD for partners (`services` collection).
3. Add booking create/update flow (`bookings` collection).
4. Add Cloud Functions for admin-only workflows and aggregates.
