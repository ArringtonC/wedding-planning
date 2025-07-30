# 🚀 Supabase Setup Instructions

Follow these steps to enable cloud storage and data sync for your wedding planner:

## 1. Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

## 2. Set up Database Tables
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql` into the editor
3. Click **Run** to create all the necessary tables

## 3. Get Your API Credentials
1. Go to **Settings** > **API**
2. Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy your **anon public key** (looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 4. Update the App Configuration
1. Open `src/supabase.js`
2. Replace `YOUR_SUPABASE_URL` with your Project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your anon public key

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

## 5. Deploy and Test
1. Build and deploy your app
2. Your data will now sync to the cloud automatically
3. You can export your data anytime using the Export button

## ✨ Features You'll Get
- **Cloud Storage**: Your data is saved to Supabase automatically
- **Real-time Sync**: Changes sync within 2 seconds
- **Export Function**: Download all your wedding data as JSON
- **Offline Backup**: LocalStorage still works as a backup
- **Multi-device**: Access your data from any device

## 🔒 Security Notes
- Your data is stored securely in Supabase
- Only you can access your wedding planning data
- The free tier includes 500MB database storage and 2GB bandwidth

That's it! Your wedding planner now has cloud storage and sync capabilities! 🎉