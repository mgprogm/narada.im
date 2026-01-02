# Narada Documentation

Welcome to the Narada project documentation. This folder contains all technical and planning documentation for the project.

---

## 📚 Documentation Index

### Project Planning

#### [`first-project-requirement.md`](./first-project-requirement.md)
**Complete project requirements and 7-day development roadmap**

- Executive summary and value proposition
- Target audience and personas
- MVP feature specifications
- 7-day development timeline
- Tech stack details
- Success metrics and KPIs
- Go-to-market strategy

**Use when:** Planning features, checking project scope, tracking progress

---

### Design System

#### [`SUPABASE_DESIGN_SYSTEM.md`](./SUPABASE_DESIGN_SYSTEM.md)
**Complete Supabase design system reference guide**

- Color system (Jungle Green #34B27B)
- Typography (Sarabun font with Thai support, type scale)
- Component patterns (buttons, cards, forms)
- Layout and spacing guidelines
- Tailwind configuration examples
- Implementation code snippets

**Use when:** Implementing new UI components, ensuring design consistency

#### [`DESIGN_SYSTEM_IMPLEMENTATION.md`](./DESIGN_SYSTEM_IMPLEMENTATION.md)
**Technical implementation details and troubleshooting**

- ✅ Implementation status and verification
- File structure and configuration
- Critical issue documentation (Tailwind v4 → v3)
- Theme switching implementation
- Icon system (Lucide React with semantic colors)
- Thai language support (Sarabun font)
- Performance optimization
- Maintenance guides

**Use when:** Setting up the project, fixing styling issues, understanding architecture

#### [`ICON_REFERENCE.md`](./ICON_REFERENCE.md)
**Lucide React icon usage guide**

- Icon selection guidelines
- Semantic color mapping (destructive, warning, brand, neutral)
- Size and spacing standards
- Code examples for common patterns
- Accessibility considerations

**Use when:** Adding icons to UI, ensuring consistent icon usage

---

### Technical Guides

#### [`AUTHENTICATION_SETUP.md`](./AUTHENTICATION_SETUP.md)
**Complete authentication system guide**

- Supabase authentication setup
- User registration flow
- Login and session management
- Row Level Security (RLS) policies
- Testing utilities and scripts
- Common authentication issues

**Use when:** Setting up auth, debugging login issues, implementing user management

#### [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md)
**Common issues and their solutions**

- Tailwind classes not applying
- Brand colors not showing
- Dark mode not working
- Font loading issues
- Environment setup
- Database connection problems
- Performance issues

**Use when:** Encountering bugs, debugging styling problems, optimizing performance

---

## 🚀 Quick Start

### For New Developers

1. **Read first:** `first-project-requirement.md` (Executive Summary section)
2. **Setup:** Follow `DESIGN_SYSTEM_IMPLEMENTATION.md` (Implementation section)
3. **Reference:** Keep `SUPABASE_DESIGN_SYSTEM.md` open while coding
4. **If stuck:** Check `TROUBLESHOOTING.md`

### For Designers

1. **Design system:** `SUPABASE_DESIGN_SYSTEM.md`
2. **Color palette:** Brand Green #34B27B + full color system
3. **Components:** See `SUPABASE_DESIGN_SYSTEM.md` → Component Patterns
4. **Spacing:** 4px grid system (p-1 = 4px, p-2 = 8px, etc.)

### For Project Managers

1. **Timeline:** `first-project-requirement.md` → 7-Day Development Roadmap
2. **Features:** `first-project-requirement.md` → MVP Features
3. **Metrics:** `first-project-requirement.md` → Success Metrics
4. **Status:** Check `first-project-requirement.md` for completed tasks (✅)

---

## 📖 Documentation Standards

### File Naming

- Use `UPPERCASE_WITH_UNDERSCORES.md` for technical docs
- Use `kebab-case.md` for planning docs
- Use `README.md` for directory indexes

### Structure

All documents should include:
```markdown
# Title
**Last Updated:** YYYY-MM-DD
**Status:** ✅ / 🚧 / ⚠️

## Table of Contents
- [Section 1](#section-1)

## Content
...

## References
- Link to related docs
```

### Status Indicators

- ✅ **Completed** - Fully implemented and tested
- 🚧 **In Progress** - Currently being worked on
- ⚠️ **Needs Attention** - Has known issues
- 📝 **Planning** - Not yet started

---

## 🔄 Update Workflow

### When to Update Documentation

1. **After implementing new features** → Update `first-project-requirement.md` progress
2. **After design changes** → Update `DESIGN_SYSTEM_IMPLEMENTATION.md`
3. **When fixing bugs** → Add solution to `TROUBLESHOOTING.md`
4. **When changing tech stack** → Update all relevant docs

### How to Update

```bash
# 1. Make changes to documentation
vim docs/DESIGN_SYSTEM_IMPLEMENTATION.md

# 2. Update "Last Updated" date
# 3. Add entry to changelog section
# 4. Commit with descriptive message
git add docs/
git commit -m "docs: update design system implementation guide"
```

---

## 📦 Document Dependencies

```
first-project-requirement.md (Root planning doc)
    ├── SUPABASE_DESIGN_SYSTEM.md (Design reference)
    │   └── DESIGN_SYSTEM_IMPLEMENTATION.md (Technical implementation)
    │       └── TROUBLESHOOTING.md (Issue solutions)
    └── [Future docs...]
```

---

## 🎯 Key Information

### Project Details

- **Name:** Narada
- **Type:** AI-powered chatbot for Facebook Messenger
- **Tech Stack:** Next.js 16.1.1, Tailwind v3.4, Supabase, TypeScript
- **Design System:** Supabase-inspired with Jungle Green (#34B27B)
- **Font:** Sarabun (Google Fonts) with Thai language support
- **Icons:** Lucide React with semantic colors
- **Status:** Day 1 Completed ✅

### Important Links

- **GitHub:** https://github.com/mgprogm/narada.im.git
- **Deployment:** [Vercel URL]
- **Supabase:** [Dashboard URL]
- **Figma:** [Design URL]

### Key Contacts

- **Developer:** Sparklab Team
- **Designer:** [Name]
- **Product:** [Name]

---

## 📋 Documentation Checklist

When creating new features, ensure:

- [ ] Feature documented in `first-project-requirement.md`
- [ ] UI components follow `SUPABASE_DESIGN_SYSTEM.md`
- [ ] Implementation notes added to `DESIGN_SYSTEM_IMPLEMENTATION.md`
- [ ] Common issues added to `TROUBLESHOOTING.md`
- [ ] Code comments reference relevant doc sections
- [ ] README.md updated if structure changes

---

## 🔍 Search Guide

### Find by Topic

- **Colors:** `SUPABASE_DESIGN_SYSTEM.md` → Color System
- **Typography:** `SUPABASE_DESIGN_SYSTEM.md` → Typography / `DESIGN_SYSTEM_IMPLEMENTATION.md` → Thai Language Support
- **Icons:** `ICON_REFERENCE.md` → Icon Usage Guide / `DESIGN_SYSTEM_IMPLEMENTATION.md` → Icons
- **Components:** `SUPABASE_DESIGN_SYSTEM.md` → Component Patterns
- **Authentication:** `AUTHENTICATION_SETUP.md` → Auth System Guide
- **Setup:** `DESIGN_SYSTEM_IMPLEMENTATION.md` → Implementation
- **Errors:** `TROUBLESHOOTING.md` → Common Issues
- **Timeline:** `first-project-requirement.md` → Roadmap
- **Features:** `first-project-requirement.md` → MVP Features

### Search All Docs

```bash
# Search for keyword across all docs
grep -r "brand color" docs/

# Search for specific pattern
grep -r "#34B27B" docs/

# Case insensitive search
grep -ir "tailwind" docs/
```

---

## 🆕 What's New

### Latest Updates (2026-01-02)

1. ✅ **Completed Day 1 setup**
   - Next.js 16.1.1 project initialized
   - Supabase design system implemented
   - Tailwind v3 configured correctly
   - Theme system with dark mode support

2. 🎨 **Design System Enhancements**
   - Replaced emoji icons with professional Lucide React icons
   - Implemented semantic color system for icons (destructive, warning, brand, neutral)
   - Replaced Inter with Sarabun font for native Thai language support
   - Added Thai subset (latin, latin-ext, thai) for proper character rendering
   - Optimized font weights (400, 600, 700, 800)

3. 📝 **Documentation created**
   - `DESIGN_SYSTEM_IMPLEMENTATION.md` - Complete implementation guide with icon and font sections
   - `ICON_REFERENCE.md` - Lucide React icon usage guide
   - `AUTHENTICATION_SETUP.md` - Complete auth system guide
   - `TROUBLESHOOTING.md` - Common issues and solutions
   - Updated `first-project-requirement.md` with progress

4. 🐛 **Issues resolved**
   - Fixed Tailwind v4 → v3 compatibility issue
   - Brand color now displays correctly (#34B27B)
   - All UI components rendering properly
   - Thai characters render correctly with proper tone marks

---

## 📞 Need Help?

### Internal Resources

1. Check `TROUBLESHOOTING.md` for common issues
2. Search documentation using grep (see above)
3. Review Git history: `git log --oneline -- docs/`

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v3](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

### Community

- [Next.js Discord](https://discord.gg/nextjs)
- [Tailwind Discord](https://discord.gg/tailwindcss)
- [Supabase Discord](https://discord.supabase.com/)

---

## 📝 Contributing to Docs

### Guidelines

1. **Be specific** - Include code examples and screenshots
2. **Be concise** - Get to the point quickly
3. **Be accurate** - Test all code snippets before documenting
4. **Be helpful** - Anticipate reader questions

### Template for New Docs

```markdown
# Document Title

**Last Updated:** YYYY-MM-DD
**Status:** ✅ / 🚧 / ⚠️

## Overview
Brief description of what this document covers.

## [Main Sections]
...

## References
- Link to related docs

---

**Maintainer:** [Name]
```

---

**Last Updated:** 2026-01-02
**Documentation Version:** 1.2
**Project Status:** 🚀 Day 1 Complete - Design System Implemented

---

Happy coding! 💚
