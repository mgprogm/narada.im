# Troubleshooting Guide

**Project:** Narada
**Last Updated:** 2026-01-02

---

## Quick Reference

### Common Issues and Solutions

#### 1. Tailwind Classes Not Applying

**Symptoms:**
- Classes like `bg-brand`, `text-foreground` appear in HTML but have no visual effect
- Buttons remain gray instead of green
- Only CSS variables defined, no utility classes generated

**Root Cause:**
Using Tailwind v4 (beta) which has incompatible configuration system.

**Solution:**
```bash
# Downgrade to Tailwind v3
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
```

Update `postcss.config.mjs`:
```javascript
const config = {
  plugins: {
    tailwindcss: {},  // Not '@tailwindcss/postcss'
    autoprefixer: {},
  },
};
```

Update `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* NOT: @import "tailwindcss"; */
/* NOT: @theme { } */
```

**Reference:** See `DESIGN_SYSTEM_IMPLEMENTATION.md` for full details.

---

#### 2. Next.js Dev Server Lock Issue

**Symptoms:**
```
⨯ Unable to acquire lock at .next/dev/lock
```

**Solution:**
```bash
# Kill all Next.js processes
ps aux | grep -E "next|node" | grep -v grep | awk '{print $2}' | xargs -r kill -9

# Remove lock file
rm -f .next/dev/lock

# Clear cache (optional)
rm -rf .next

# Restart server
npm run dev
```

---

#### 3. Brand Color Not Showing

**Symptoms:**
- Buttons show gray `rgb(239, 239, 239)` instead of green `rgb(52, 178, 123)`

**Diagnosis:**
```bash
# Check if Tailwind is v3 or v4
npm list tailwindcss

# Should show: tailwindcss@3.4.x
# If shows: tailwindcss@4.x.x → Problem!
```

**Solution:**
Follow "Tailwind Classes Not Applying" solution above.

---

#### 4. CSS Variables Not Defined

**Symptoms:**
- Browser console shows: `hsl(var(--brand))` evaluates to invalid color

**Check:**
Open browser DevTools → Elements → Inspect `<html>` element:
```css
/* Should see: */
:root {
  --brand: 158 53% 45%;
  --foreground: 222 47% 11%;
  /* ... more variables */
}
```

**Solution:**
Ensure `app/globals.css` is properly imported in `app/layout.tsx`:
```typescript
import "./globals.css";
```

---

#### 5. Dark Mode Not Working

**Symptoms:**
- Theme toggle doesn't change colors
- `[data-theme="dark"]` not applied to `<html>`

**Check:**
1. Verify ThemeProvider wraps app in `layout.tsx`
2. Check browser localStorage: `localStorage.getItem('theme')`
3. Inspect `<html>` element for `data-theme` attribute

**Solution:**
```typescript
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              const t=localStorage.getItem('theme')||'system';
              if(t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches)){
                document.documentElement.setAttribute('data-theme','dark');
              }else{
                document.documentElement.setAttribute('data-theme','light');
              }
            })();`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

#### 6. Fonts Not Loading

**Symptoms:**
- Text displays in Times New Roman instead of Inter
- `font-family: "Times New Roman"` in DevTools

**Check:**
```typescript
// app/layout.tsx - Should have:
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

// In return:
<html className={inter.variable}>
  <body className="font-sans">
```

**Solution:**
Add `className={inter.variable}` to `<html>` tag and `font-sans` to `<body>`.

---

#### 7. Port Already in Use

**Symptoms:**
```
⚠ Port 3000 is in use by an unknown process
```

**Solution:**
```bash
# Option 1: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port
PORT=3001 npm run dev
```

---

#### 8. Module Not Found Errors

**Symptoms:**
```
Module not found: Can't resolve '@/components/ui/button'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart dev server
npm run dev
```

Check `tsconfig.json` has correct path mapping:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## Debugging Checklist

When encountering styling issues:

- [ ] Check Tailwind version: `npm list tailwindcss` (should be 3.4.x)
- [ ] Verify `postcss.config.mjs` uses `tailwindcss` plugin
- [ ] Confirm `globals.css` uses `@tailwind` directives, not `@import`
- [ ] Inspect HTML for correct class names in browser DevTools
- [ ] Check if CSS variables are defined in `:root`
- [ ] Clear `.next` cache: `rm -rf .next`
- [ ] Hard reload browser: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

---

## Performance Issues

### Slow Build Times

**Solution:**
```bash
# Clear Turbopack cache
rm -rf .next/cache

# Use Turbopack (already enabled in Next.js 16)
npm run dev  # Uses Turbopack by default
```

### Large Bundle Size

**Check bundle analyzer:**
```bash
npm install -D @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // config
});

# Run analysis
ANALYZE=true npm run build
```

---

## Environment Issues

### Missing Environment Variables

**Symptoms:**
```
Error: Environment variable is not defined
```

**Solution:**
Create `.env.local`:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# OpenAI (if using)
OPENAI_API_KEY=sk-...
```

**Important:** Never commit `.env.local` to git!

---

## Database Issues

### Supabase Connection Failed

**Check:**
1. Verify Supabase URL in `.env.local`
2. Check internet connection
3. Verify Supabase project is active

**Solution:**
```typescript
// Test connection
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Test query
const { data, error } = await supabase.from('users').select('*').limit(1);
console.log({ data, error });
```

---

## Getting Help

### Resources

1. **Project Documentation**
   - `DESIGN_SYSTEM_IMPLEMENTATION.md` - Design system details
   - `SUPABASE_DESIGN_SYSTEM.md` - Design reference
   - `first-project-requirement.md` - Project requirements

2. **External Documentation**
   - [Next.js Docs](https://nextjs.org/docs)
   - [Tailwind CSS v3](https://tailwindcss.com/docs)
   - [shadcn/ui](https://ui.shadcn.com/)
   - [Supabase Docs](https://supabase.com/docs)

3. **Community Support**
   - [Next.js Discord](https://discord.gg/nextjs)
   - [Tailwind Discord](https://discord.gg/tailwindcss)
   - [Supabase Discord](https://discord.supabase.com/)

---

## Maintenance Commands

### Clear All Caches
```bash
# Full clean
rm -rf .next node_modules/.cache package-lock.json
npm install
npm run dev
```

### Reset Database (Development)
```bash
# Supabase CLI
npx supabase db reset

# Or manually drop tables in Supabase dashboard
```

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update (carefully!)
npm update

# Or use npm-check-updates
npx npm-check-updates -u
npm install
```

---

## Version Information

### Current Stack Versions

```json
{
  "next": "16.1.1",
  "react": "19.0.0",
  "tailwindcss": "3.4.0",
  "@supabase/supabase-js": "latest",
  "lucide-react": "latest"
}
```

### Known Compatibility Issues

- **Tailwind v4:** Not compatible with shadcn/ui → Use v3
- **React 19:** Some libraries may not support yet → Check compatibility
- **Next.js 16:** Uses Turbopack by default → Faster but may have edge cases

---

**Last Updated:** 2026-01-02
**Maintainer:** Sparklab Team

For urgent issues, check Git history: `git log` for recent changes.
