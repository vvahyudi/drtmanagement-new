# Authentication Setup Guide

## Overview

This project now uses Better Auth for authentication with Google OAuth provider and role-based access control.

## Features

- ✅ Google OAuth authentication
- ✅ Role-based access control (ADMIN/STAFF)
- ✅ Protected admin routes
- ✅ JWT session management
- ✅ Middleware-based route protection

## Environment Variables Required

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL="your-neon-postgresql-connection-string"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here-min-32-characters"
BETTER_AUTH_URL="https://your-domain.com" # Production URL

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# App URLs
NEXT_PUBLIC_BASE_URL="https://your-domain.com" # Production URL
```

## Google OAuth Setup

### 1. Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`

### 2. Copy Credentials

- Copy `Client ID` to `GOOGLE_CLIENT_ID`
- Copy `Client Secret` to `GOOGLE_CLIENT_SECRET`

## Database Setup

### 1. Run Migrations

```bash
npx prisma db push
```

### 2. Seed Admin Users

```bash
npm run seed-admin
```

This creates:

- **Admin User**: ahmadwahyudi2395@gmail.com (Super Admin)
- **Staff User**: staff@drtentertainment.com (Staff)

## Usage

### Login

- Navigate to `/auth/login`
- Click "Sign in with Google"
- Authorize with Google account
- Redirected to admin dashboard if authorized

### Access Control

- **ADMIN**: Full access to all admin features
- **STAFF**: Limited access (CRU operations only)

### Protected Routes

- `/admin/*` - All admin routes
- `/api/admin/*` - Admin API endpoints

### Logout

- Click user avatar in top navigation
- Select "Log out"
- Redirected to home page

## Development

### Start Development Server

```bash
npm run dev
```

### Test Authentication

1. Visit `/auth/login`
2. Sign in with Google
3. Access `/admin/dashboard`

## Production Deployment

### Vercel

1. Add environment variables in Vercel dashboard
2. Deploy with `npm run vercel-build`
3. Ensure Google OAuth redirect URIs match production domain

### Database

- Use Neon PostgreSQL in production
- Update `DATABASE_URL` in Vercel environment variables

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**

   - Check Google OAuth redirect URIs in Google Cloud Console
   - Ensure production URL is added

2. **"BETTER_AUTH_SECRET not set"**

   - Generate a secure 32+ character secret
   - Add to environment variables

3. **Database connection issues**

   - Verify `DATABASE_URL` format
   - Check Neon database status
   - Ensure IP allowlist includes Vercel

4. **Session not persisting**
   - Check `BETTER_AUTH_URL` matches current domain
   - Verify cookie settings in browser

### Debug Mode

Add to `.env.local`:

```bash
DEBUG="better-auth:*"
```

## Security Notes

- Keep `BETTER_AUTH_SECRET` secure and unique
- Regularly rotate Google OAuth credentials
- Monitor admin access logs
- Use HTTPS in production
- Implement rate limiting for auth endpoints

## Support

For issues:

1. Check browser console for errors
2. Verify environment variables
3. Check database connectivity
4. Review Google OAuth configuration
