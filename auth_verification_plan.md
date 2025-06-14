# Clerk Auth E2E Integration & Sanity Check Plan

## Steps

1. **Verify Clerk Environment Variable Loading**
   - Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is accessed correctly in `cyberguard_ai/src/index.js`
   - Sanity check usage: fallback/default key exists if ENV key not set
   - Confirm passing of the key to `<ClerkProvider>` parent

2. **Review Auth Component Placement**
   - Confirm `<ClerkProvider>` wraps the app/root (should be in index.js)
   - Confirm usage of Clerk components (`SignInButton`, `SignUpButton`, `SignedIn`, `SignedOut`, `UserButton`) in the UI

3. **Test Registration & Sign-In Flows**
   - Ensure "Sign in" and "Sign up" options are visible when signed out
   - Confirm modal behavior on click, and that Clerk UI appears
   - Verify user state changes: correct visibility toggle between SignedIn/SignedOut

4. **Test Session Persistence**
   - After sign in, verify page reload or route navigation preserves session/identity
   - Confirm `useUser()` returns correct state, navbar/UserButton updates accordingly

5. **Test ProtectedRoute & Restriction**
   - Confirm `/assessment`, `/dashboard`, `/admin` are only viewable when signed in (otherwise redirect)
   - Sanity check that auth states update instantly after login/logout and UI/routing reflects it

6. **Landing Page Integration**
   - Sanity check: On the landing page:
     - If not signed in, user is prompted reasonably (Sign in/up buttons visible)
     - If signed in, user sees account controls and has access to protected pages

## Expected Outcome

- Clerk publishable key loads as ENV variable (or fallback)
- Clerk UI modals work for sign up/sign in
- User session persists and updates UI instantly
- Protected routes are only accessible when signed in
- Landing page updates nav/auth bar based on state

---
