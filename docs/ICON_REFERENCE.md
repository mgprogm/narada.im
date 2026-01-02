# Icon Reference Guide

**Project:** Narada
**Icon Library:** [Lucide React](https://lucide.dev/)
**Last Updated:** 2026-01-02

---

## Quick Reference

### Icon Philosophy

Following Supabase's design system, we use **muted, monochromatic icons** with semantic colors instead of colorful emojis.

**Principles:**
- ✅ Clean, minimal SVG icons
- ✅ Semantic color usage
- ✅ Consistent sizing
- ✅ Professional appearance
- ❌ No emoji icons
- ❌ No bright, varied colors

---

## Icon Categories

### 1. Problem/Alert Icons

Used to highlight issues, pain points, or problems.

#### Red/Destructive (Serious Problems)

```tsx
import { AlertCircle, DollarSign } from "lucide-react";

// Usage
<div className="w-12 h-12 bg-destructive-200 rounded-lg flex items-center justify-center">
  <AlertCircle className="w-6 h-6 text-destructive" />
</div>
```

**Color:** `text-destructive` (red)
**Background:** `bg-destructive-200` (light red)
**Shape:** Rounded square (`rounded-lg`)

**Use for:**
- Alerts and errors
- Critical issues
- High cost/expense warnings
- Urgent problems

**Icons:**
- `AlertCircle` - General alerts, problems
- `AlertTriangle` - Warnings, cautions
- `DollarSign` - Expensive, high cost
- `XCircle` - Errors, failures

#### Orange/Warning (Cautions)

```tsx
import { RefreshCw } from "lucide-react";

<div className="w-12 h-12 bg-warning-200 rounded-lg flex items-center justify-center">
  <RefreshCw className="w-6 h-6 text-warning" />
</div>
```

**Color:** `text-warning` (orange)
**Background:** `bg-warning-200` (light orange)
**Shape:** Rounded square (`rounded-lg`)

**Use for:**
- Repetitive tasks
- Time-consuming processes
- Attention needed
- Moderate concerns

**Icons:**
- `RefreshCw` - Repeated actions, cycles
- `AlertCircle` - Moderate alerts

#### Gray/Neutral (Information)

```tsx
import { Moon } from "lucide-react";

<div className="w-12 h-12 bg-surface-300 rounded-lg flex items-center justify-center">
  <Moon className="w-6 h-6 text-foreground-light" />
</div>
```

**Color:** `text-foreground-light` (gray)
**Background:** `bg-surface-300` (light gray)
**Shape:** Rounded square (`rounded-lg`)

**Use for:**
- Informational items
- Neutral facts
- Time-related info
- General information

**Icons:**
- `Moon` - Night, after-hours
- `Clock` - Time-related
- `Info` - Information

---

### 2. Solution/Feature Icons

Used to highlight benefits, features, and positive aspects.

#### Green/Brand (Solutions & Features)

```tsx
import { Clock, MessageSquare, TrendingUp } from "lucide-react";

// Circular background for positive features
<div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center">
  <Clock className="w-8 h-8 text-brand" />
</div>
```

**Color:** `text-brand` (Jungle Green #34B27B)
**Background:** `bg-brand-200` (light green)
**Shape:** Circle (`rounded-full`)

**Use for:**
- Product features
- Benefits
- Solutions
- Positive outcomes
- Success indicators

**Icons:**
- `Clock` - Speed, fast response
- `MessageSquare` - Chat, communication
- `TrendingUp` - Growth, improvement
- `Sparkles` - AI, magic, special features
- `Zap` - Power, energy, instant
- `CheckCircle` - Success, completion

---

### 3. Action/UI Icons

Small icons used in buttons, checkmarks, and UI elements.

#### Checkmarks

```tsx
import { Check } from "lucide-react";

<div className="flex items-center gap-2">
  <Check className="w-4 h-4 text-brand" />
  <span>Feature included</span>
</div>
```

**Color:** `text-brand`
**Size:** 16px (`w-4 h-4`)

**Use for:**
- Pricing plan features
- Completed items
- Included features
- Success indicators

#### Button Icons

```tsx
import { Sparkles, ArrowRight } from "lucide-react";

<Button>
  <Sparkles className="w-5 h-5 mr-2" />
  Start Free Trial
</Button>
```

**Size:** 20px (`w-5 h-5`)
**Spacing:** `mr-2` (8px margin)

**Common button icons:**
- `Sparkles` - Special features, AI
- `ArrowRight` - Forward action
- `Plus` - Add, create
- `Download` - Download action
- `Upload` - Upload action

---

## Icon Sizing Guide

### Container Sizes

| Size | Class | Pixels | Use Case |
|------|-------|--------|----------|
| Small | `w-10 h-10` | 40px | Compact cards |
| Medium | `w-12 h-12` | 48px | Problem cards |
| Large | `w-16 h-16` | 64px | Feature highlights |
| Extra Large | `w-20 h-20` | 80px | Hero sections |

### Icon Sizes

| Size | Class | Pixels | Use Case |
|------|-------|--------|----------|
| Extra Small | `w-4 h-4` | 16px | Checkmarks, inline |
| Small | `w-5 h-5` | 20px | Buttons |
| Medium | `w-6 h-6` | 24px | Cards, problems |
| Large | `w-8 h-8` | 32px | Features, solutions |
| Extra Large | `w-10 h-10` | 40px | Hero, main icons |

---

## Color Combinations

### Complete Color Matrix

| Purpose | Container Class | Icon Class | Shape | Example Icon |
|---------|----------------|------------|-------|--------------|
| **Critical Problem** | `bg-destructive-200` | `text-destructive` | `rounded-lg` | `AlertCircle` |
| **Warning** | `bg-warning-200` | `text-warning` | `rounded-lg` | `RefreshCw` |
| **Information** | `bg-surface-300` | `text-foreground-light` | `rounded-lg` | `Moon` |
| **Solution** | `bg-brand-200` | `text-brand` | `rounded-full` | `Clock` |
| **Checkmark** | none | `text-brand` | none | `Check` |
| **Button Icon** | none | `text-white` or `text-brand` | none | `Sparkles` |

---

## Common Icons Library

### Communication & Messaging
```tsx
import {
  MessageSquare,    // Chat, messaging
  MessageCircle,    // Conversation
  Mail,            // Email
  Send,            // Send message
  Phone,           // Phone call
} from "lucide-react";
```

### Time & Speed
```tsx
import {
  Clock,           // Time, speed
  Zap,            // Instant, fast
  Timer,          // Countdown
  Calendar,       // Scheduling
} from "lucide-react";
```

### Growth & Analytics
```tsx
import {
  TrendingUp,     // Growth, improvement
  TrendingDown,   // Decline
  BarChart,       // Analytics
  PieChart,       // Statistics
} from "lucide-react";
```

### AI & Technology
```tsx
import {
  Sparkles,       // AI, magic
  Cpu,            // Processing
  Bot,            // Chatbot
  Brain,          // Intelligence
} from "lucide-react";
```

### Alerts & Status
```tsx
import {
  AlertCircle,    // Alert, problem
  AlertTriangle,  // Warning
  Info,           // Information
  CheckCircle,    // Success
  XCircle,        // Error
} from "lucide-react";
```

### Actions & UI
```tsx
import {
  Check,          // Checkmark
  X,              // Close, cancel
  Plus,           // Add
  Minus,          // Remove
  Edit,           // Edit
  Trash,          // Delete
  ArrowRight,     // Forward
  ArrowLeft,      // Back
  Download,       // Download
  Upload,         // Upload
  Settings,       // Settings
  Search,         // Search
} from "lucide-react";
```

### Business & Finance
```tsx
import {
  DollarSign,     // Money, pricing
  CreditCard,     // Payment
  ShoppingCart,   // Cart
  Package,        // Product
  Store,          // Shop
} from "lucide-react";
```

### Time & Availability
```tsx
import {
  Moon,           // Night, after-hours
  Sun,            // Day, light mode
  CloudRain,      // Weather
  RefreshCw,      // Repeat, cycle
} from "lucide-react";
```

---

## Examples

### Problem Card Example

```tsx
// Component: ProblemCard.tsx
import { AlertCircle } from "lucide-react";

export function ProblemCard() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="w-12 h-12 bg-destructive-200 rounded-lg flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <h3 className="font-semibold text-lg mb-2">ตอบลูกค้าไม่ทัน</h3>
        <p className="text-foreground-light">
          ลูกค้าถามพร้อมกัน 10+ คน ตอบไม่ทัน เสียโอกาสขาย
        </p>
      </CardContent>
    </Card>
  );
}
```

### Feature Card Example

```tsx
// Component: FeatureCard.tsx
import { Clock } from "lucide-react";

export function FeatureCard() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <Clock className="w-8 h-8 text-brand" />
      </div>
      <h3 className="font-semibold text-lg mb-2">ตอบทันที</h3>
      <p className="text-foreground-light">
        ตอบคำถามลูกค้าภายใน 2-5 วินาที ไม่ต้องรอแอดมิน
      </p>
    </div>
  );
}
```

### Pricing Feature List Example

```tsx
// Component: PricingFeature.tsx
import { Check } from "lucide-react";

export function PricingFeature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check className="w-4 h-4 text-brand" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
```

### CTA Button Example

```tsx
// Component: CTAButton.tsx
import { Sparkles } from "lucide-react";

export function CTAButton() {
  return (
    <Button size="lg" className="text-lg">
      <Sparkles className="w-5 h-5 mr-2" />
      เริ่มใช้งานฟรี 7 วัน
    </Button>
  );
}
```

---

## Best Practices

### DO ✅

1. **Use semantic colors**
   ```tsx
   // Good: Semantic meaning
   <AlertCircle className="text-destructive" />
   ```

2. **Consistent sizing**
   ```tsx
   // Good: Consistent icon size in same context
   <Clock className="w-8 h-8" />
   <MessageSquare className="w-8 h-8" />
   ```

3. **Proper contrast**
   ```tsx
   // Good: Light background, dark icon
   <div className="bg-brand-200">
     <Clock className="text-brand" />
   </div>
   ```

4. **Appropriate shapes**
   ```tsx
   // Good: Circle for positive features
   <div className="bg-brand-200 rounded-full">
     <Clock className="text-brand" />
   </div>
   ```

### DON'T ❌

1. **Don't mix color styles**
   ```tsx
   // Bad: Inconsistent colors in same section
   <Check className="text-green-600" />
   <Check className="text-blue-500" />
   <Check className="text-red-400" />
   ```

2. **Don't use emoji**
   ```tsx
   // Bad: Using emoji instead of icons
   <div>😰</div>

   // Good: Using Lucide icon
   <AlertCircle className="text-destructive" />
   ```

3. **Don't use inconsistent sizes**
   ```tsx
   // Bad: Mixed sizes in same context
   <Clock className="w-6 h-6" />
   <MessageSquare className="w-8 h-8" />
   ```

4. **Don't skip backgrounds for feature icons**
   ```tsx
   // Bad: No background container
   <Clock className="text-brand" />

   // Good: With appropriate background
   <div className="w-16 h-16 bg-brand-200 rounded-full">
     <Clock className="text-brand" />
   </div>
   ```

---

## Migration Guide

### Replacing Emoji with Icons

| Emoji | Icon | Color Scheme | Use Case |
|-------|------|--------------|----------|
| 😰 | `AlertCircle` | destructive | Problems, alerts |
| 🔁 | `RefreshCw` | warning | Repetition |
| 🌙 | `Moon` | neutral | Night, after-hours |
| 💸 | `DollarSign` | destructive | Cost, expensive |
| ✅ | `Check` | brand | Checkmark, included |
| ⏰ | `Clock` | brand | Time, speed |
| 💬 | `MessageSquare` | brand | Chat, messaging |
| 📈 | `TrendingUp` | brand | Growth |
| ✨ | `Sparkles` | brand | AI, special |

**Migration pattern:**
```tsx
// Before
<div className="text-4xl">😰</div>

// After
<div className="w-12 h-12 bg-destructive-200 rounded-lg flex items-center justify-center">
  <AlertCircle className="w-6 h-6 text-destructive" />
</div>
```

---

## Resources

### Official Documentation
- [Lucide React](https://lucide.dev/) - Official icon library
- [Lucide Icon List](https://lucide.dev/icons/) - Browse all icons
- [Lucide GitHub](https://github.com/lucide-icons/lucide) - Source code

### Related Documentation
- `DESIGN_SYSTEM_IMPLEMENTATION.md` - Full design system guide
- `SUPABASE_DESIGN_SYSTEM.md` - Supabase design reference
- `first-project-requirement.md` - Project requirements

### Tools
- [Lucide Icon Search](https://lucide.dev/icons/) - Search icons
- [SVG Viewer](https://www.svgviewer.dev/) - Preview SVG icons

---

## Quick Copy-Paste Templates

### Problem Icon Template
```tsx
<div className="w-12 h-12 bg-destructive-200 rounded-lg flex items-center justify-center">
  <AlertCircle className="w-6 h-6 text-destructive" />
</div>
```

### Feature Icon Template
```tsx
<div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center">
  <Clock className="w-8 h-8 text-brand" />
</div>
```

### Checkmark Template
```tsx
<Check className="w-4 h-4 text-brand" />
```

### Button Icon Template
```tsx
<Button>
  <Sparkles className="w-5 h-5 mr-2" />
  Button Text
</Button>
```

---

**Last Updated:** 2026-01-02
**Version:** 1.0
**Maintainer:** Sparklab Team
