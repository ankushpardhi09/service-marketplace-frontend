# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

----------------------------------------------------------------------------------
## Backend Architecture with Firebase

Firebase is a solid choice for this project, and you can build the backend in a clean sequence without overcomplicating it.

**Build Plan**
1. Create Firebase project and enable products.
2. Connect your React app to Firebase SDK.
3. Implement Auth (customer, partner, admin).
4. Model Firestore collections for marketplace flows.
5. Add Security Rules and Indexes.
6. Add Cloud Functions for trusted backend logic.
7. Test in Emulator Suite first, then deploy.

**1. Firebase Project Setup**
1. Create a Firebase project in console.
2. Enable:
- Authentication
- Firestore Database
- Storage
- Functions (optional now, recommended soon)
3. Install CLI and login:
```bash
npm install -g firebase-tools
firebase login
```
4. In your project root:
```bash
firebase init
```
Select:
- Firestore
- Functions
- Hosting (optional)
- Emulators (recommended)

**2. Frontend SDK Integration**
Install SDK:
```bash
npm install firebase
```

Create one Firebase config module in your frontend:
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MSG_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

Use environment variables in `.env` (never hardcode secrets in source).

**3. Authentication + Roles**
Use Firebase Auth for sign up/login.
Store role in Firestore `users/{uid}`:
- customer
- partner
- admin

User document fields:
- role
- name
- email
- createdAt
- isActive

Later, for stronger admin checks, move role into custom claims via Cloud Functions.

**4. Firestore Data Model (Marketplace)**
Top-level collections:
- users
- categories
- services
- bookings
- reviews
- dashboards (precomputed stats)

Key cost-saving design:
- Denormalize display fields in bookings (serviceTitle, partnerName, priceAtBooking) to avoid extra reads.
- Keep dashboard counters in one summary doc instead of calculating from all bookings every load.

**5. Security Rules (Must Do Early)**
Core policy:
- Customer accesses only own profile/bookings.
- Partner accesses only own services/bookings.
- Admin has full access where needed.
- Public read only for active services and categories.

Start strict, then loosen only when needed. Most Firebase data leaks happen from broad rules like `allow read, write: if request.auth != null`.

**6. Indexes + Query Style**
Use query patterns that stay cheap:
1. Always add `limit`.
2. Paginate with cursor (`startAfter`), never load all.
3. Query by owner keys:
- bookings by customerId
- bookings by partnerId
- services by partnerId/categoryId/city
4. Use one summary doc for admin dashboard metrics.
5. Avoid broad realtime listeners on large collections.

Typical low-cost query:
- where status == active
- where city == selectedCity
- orderBy createdAt desc
- limit 12

**7. Cloud Functions (Trusted Backend Logic)**
Use Functions for actions that must not be trusted to frontend:
- set admin/partner claims
- booking state transitions with validation
- update dashboard totals on booking changes
- payment webhook handling (if Stripe/Razorpay later)

This is your true “backend layer” in Firebase architecture.

**8. Local Development First**
Run emulator suite:
```bash
firebase emulators:start
```
Develop and test:
- Auth flows
- Firestore reads/writes
- Rules behavior
- Functions triggers

This prevents risky production testing and saves cost.

**9. Deployment Flow**
1. Deploy rules and indexes:
```bash
firebase deploy --only firestore:rules,firestore:indexes
```
2. Deploy functions:
```bash
firebase deploy --only functions
```
3. Deploy hosting (if used):
```bash
firebase deploy --only hosting
```

**Suggested Implementation Order For Your App**
1. Auth + role-based route guards.
2. Services CRUD for partner.
3. Booking create/update flow.
4. Partner dashboard queries.
5. Admin dashboard summary via Functions.
6. Reviews + storage uploads.
7. Production hardening (rules audit, pagination audit, monitoring).

**Common Mistakes to Avoid**
1. Reading entire collections for dashboards.
2. Putting admin-only logic in frontend only.
3. Weak security rules during “temporary testing” and forgetting to fix.
4. No pagination on bookings/services list.
5. Too many realtime listeners left active.

If you want, next step I can give you a ready-to-use Phase 1 starter pack:
1. exact folder structure for Firebase service layer in your React app,
2. role-based Auth context code,
3. Firestore rules file,
4. first set of queries for Home, Partner Dashboard, and Admin Dashboard.