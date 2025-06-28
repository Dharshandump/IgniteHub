# 🚀 Deploying IgniteHub to Vercel

This guide will walk you through deploying your IgniteHub website to Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Supabase project (optional but recommended)

## 🔧 Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## 🌐 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Select your IgniteHub repository
   - Click "Import"

3. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel --prod
```

## 🔐 Step 3: Configure Environment Variables

In your Vercel dashboard:

1. **Go to Project Settings**:
   - Select your project
   - Go to "Settings" → "Environment Variables"

2. **Add Variables**:
   ```
   Name: VITE_SUPABASE_URL
   Value: https://your-project.supabase.co
   
   Name: VITE_SUPABASE_ANON_KEY
   Value: your_anon_key_here
   ```

3. **Redeploy**:
   - Go to "Deployments"
   - Click "..." on latest deployment
   - Select "Redeploy"

## 🗄️ Step 4: Set Up Supabase (If Not Done)

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and anon key

2. **Run Migrations**:
   - Go to SQL Editor in Supabase
   - Run the migration files from `supabase/migrations/`

3. **Test Contact Form**:
   - Visit your deployed site
   - Try submitting the contact form
   - Check data in Supabase Table Editor

## 🔧 Step 5: Custom Domain (Optional)

1. **Add Domain**:
   - Go to Project Settings → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**:
   - Vercel automatically provides SSL
   - Your site will be available via HTTPS

## 📊 Step 6: Performance Optimization

### Enable Analytics
```bash
# In Vercel dashboard
Settings → Analytics → Enable
```

### Configure Caching
The `vercel.json` file already includes optimal caching headers.

### Monitor Performance
- Use Vercel Analytics
- Check Core Web Vitals
- Monitor build times

## 🚨 Troubleshooting

### Common Issues:

**1. Build Fails**
```bash
# Check build locally first
npm run build

# If successful, check Vercel build logs
```

**2. Environment Variables Not Working**
- Ensure variables start with `VITE_`
- Redeploy after adding variables
- Check variable names match exactly

**3. Contact Form Not Working**
- Verify Supabase URL and key
- Check Supabase table exists
- Verify RLS policies

**4. 404 Errors on Refresh**
- The `vercel.json` file handles this with rewrites
- Ensure the file is in your repository root

### Debug Steps:

1. **Check Build Logs**:
   - Go to Vercel dashboard
   - Click on failed deployment
   - Review build logs

2. **Test Locally**:
```bash
npm run build
npm run preview
```

3. **Check Environment**:
```bash
# In your deployed app console
console.log(import.meta.env.VITE_SUPABASE_URL)
```

## 🎯 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Contact form works
- [ ] Mobile responsive
- [ ] Performance is good
- [ ] Analytics tracking (if enabled)
- [ ] Custom domain configured (if applicable)

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update content"
git push origin main
# Vercel will automatically deploy
```

## 📈 Monitoring

### Vercel Analytics
- Real-time visitor data
- Performance metrics
- Core Web Vitals

### Supabase Analytics
- Database usage
- API calls
- Contact form submissions

## 🛡️ Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` files
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Supabase Security**:
   - Enable RLS on all tables
   - Use appropriate policies
   - Monitor for unusual activity

3. **Domain Security**:
   - Use HTTPS only
   - Configure proper headers
   - Enable security headers in Vercel

## 🎉 Success!

Your IgniteHub website should now be live on Vercel! 

**Next Steps**:
- Share your live URL
- Monitor performance
- Collect user feedback
- Iterate and improve

**Live URL Format**:
`https://your-project-name.vercel.app`

Or with custom domain:
`https://yourdomain.com`