# Project Requirements: AI Chatbot ตอบอัตโนมัติผ่าน Facebook Messenger

**Project Name:** Narada
**Timeline:** 7 วัน
**Launch Date:** [กำหนดหลังจากเริ่มโปรเจค]
**Architecture:** Webhook-based (Revenue-first / Minimal MVP)

---

## 📋 Executive Summary

ระบบ AI Chatbot **ตอบลูกค้าอัตโนมัติ 24/7** ผ่าน **Facebook Messenger** โดยใช้ FAQ Engine + AI สร้างคำตอบจากฐานความรู้ที่ร้านกำหนด ไม่ต้องให้แอดมินคอยตอบเอง

### 🎯 ของที่ลูกค้าเห็นคุณค่าทันที
- **ตอบทันที** → ลูกค้าถามคำถามซ้ำๆ ได้รับคำตอบในไม่กี่วินาที
- **ตอบนอกเวลาทำการ** → ไม่พลาดยอดขายจากลูกค้าที่ถามตอนกลางคืน
- **ลดภาระแอดมิน** → คำถาม 80% ตอบอัตโนมัติ แอดมินจัดการแค่ 20% ที่ซับซ้อน

### Pain Points ที่แก้ไข
- ร้านค้าตอบลูกค้าไม่ทัน → เสียยอดขาย
- คำถามซ้ำๆ เยอะ (ราคา, เวลาทำการ, วิธีสั่งซื้อ) → เสียเวลา
- จ้างแอดมินแพง แต่ยอดขายไม่คุ้ม
- ลูกค้าถามนอกเวลาทำการ → ไม่มีคนตอบ

### Flow Architecture (MVP)
```
ลูกค้าใน Facebook Messenger
         ↓
Facebook sends webhook → Your Server
         ↓
FAQ Engine (keyword matching)
    ├─ Match → ตอบทันที
    └─ No match → AI Generator → ตอบ
         ↓
Send reply back to Messenger
         ↓
ลูกค้าได้รับคำตอบภายใน 2-5 วินาที
```

**Admin ใช้เว็บเดียวควบคุมทุกอย่าง** (เพิ่ม FAQ, ดู log, ตั้งค่า tone)

---

## 🎯 Target Audience

### Primary
1. **ร้านค้าออนไลน์** (Facebook Shop, LINE OA, Instagram)
   - รายได้ 30,000-200,000 บาท/เดือน
   - มีแอดมิน 1-3 คน
   - มีลูกค้าถามซ้ำ 50+ ครั้ง/วัน

2. **ธุรกิจบริการ**
   - คลินิกความงาม, คลินิกสัตว์
   - คอร์สออนไลน์
   - เอเจนซี่เล็ก

### User Personas

**Persona 1: แม่ค้าออนไลน์**
- อายุ 28-40 ปี
- ขายเสื้อผ้า/เครื่องสำอาง
- Problem: ตอบ inbox ไม่ทัน ลูกค้าหายไปหาร้านอื่น
- Budget: 500-1,000 บาท/เดือน

**Persona 2: เจ้าของคลินิก**
- อายุ 30-45 ปี
- มีพนักงานต้อนรับ แต่มีคำถามมากเกินจัดการ
- Problem: ลูกค้าถามนอกเวลาทำการ ไม่มีคนตอบ
- Budget: 1,000-3,000 บาท/เดือน

---

## 💎 Core Value Proposition

> **"ตอบลูกค้าอัตโนมัติ 24/7 บน Facebook Messenger โดยไม่ต้องจ้างคนเพิ่ม"**

- **ตั้งค่าครั้งเดียว** → เชื่อม Facebook Page + ตั้ง FAQ → ใช้ได้ทันที
- **AI ตอบเป็นภาษาไทยธรรมชาติ** → ดูเหมือนคนจริง ไม่ใช่บอทแข็งๆ
- **ไม่ต้อง copy-paste** → บอทตอบอัตโนมัติเลย (แต่แอดมินแก้ไขได้ถ้าต้องการ)
- **ไม่ต้องเขียนโค้ด** → แค่กรอกข้อมูลร้าน + FAQ ผ่านหน้าเว็บ

---

## 🔧 Technical Scope

### MVP Features (7 วัน)

#### 1. Admin Dashboard
**หน้าจัดการ Q&A**
- ✅ เพิ่ม/แก้ไข/ลบคำถาม-คำตอบ (CRUD)
- ✅ จัดหมวดหมู่ (ราคา, การจัดส่ง, สินค้า, etc.)
- ✅ Import FAQ จาก CSV (optional)

**ตั้งค่า Bot Personality**
- ✅ เลือก Tone: สุภาพ / เป็นกันเอง / มืออาชีพ / แบบแม่ค้า
- ✅ ตั้งชื่อร้าน, คำทักทาย
- ✅ ตัวอย่าง prompt preview

#### 2. AI Answer Generator
**หน้าช่วยตอบคำถาม**
- ✅ กล่องพิมพ์คำถามลูกค้า
- ✅ AI สร้างคำตอบโดยอิงจาก FAQ + Tone
- ✅ ปุ่ม "Copy คำตอบ" พร้อม animation
- ✅ ปุ่ม "ปรับแต่ง" (แก้คำตอบก่อน copy)
- ✅ บันทึก History คำถาม (เพื่อเรียนรู้ต่อ)

#### 3. FAQ Learning System
**เรียนรู้จากการใช้งานจริง**
- ✅ บันทึกคำถามที่ยังไม่มีในระบบ
- ✅ แนะนำคำถามใหม่ให้ admin เพิ่ม
- ✅ Dashboard แสดง "คำถามยอดนิยม"

#### 4. Authentication & User Management
- ✅ Login/Register (Email + Password)
- ✅ Free Trial 7 วัน (ไม่ต้องใส่บัตร)
- ✅ แผนการใช้งาน (Free/Starter/Pro)

#### 5. Payment & Subscription
- ✅ PromptPay QR Code (manual verify)
- ✅ แสดงสถานะการชำระเงิน
- ✅ Notification ก่อนหมดอายุ

#### 6. Landing Page
- ✅ Hero Section: ปัญหา → solution
- ✅ Demo Video (1-2 นาที)
- ✅ ตัวอย่าง Before/After
- ✅ แผนราคา
- ✅ CTA: "ทดลองฟรี 7 วัน"

---

## 🎨 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand หรือ React Context
- **Forms:** React Hook Form + Zod

### Backend
- **API:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth หรือ NextAuth.js
- **AI:** OpenAI GPT-4o-mini หรือ Claude API

### Payment
- **PromptPay:** QR Code generation (manual verification)
- **Future:** Omise/Stripe

### Deployment
- **Hosting:** Vercel (Free tier)
- **Database:** Supabase (Free tier)
- **Domain:** Namecheap/CloudFlare

---

## 📊 Data Model

### Users
```sql
- id (UUID)
- email
- password_hash
- shop_name
- plan_type (free/starter/pro)
- trial_ends_at
- subscription_ends_at
- created_at
```

### FAQs
```sql
- id
- user_id
- category
- question
- answer
- is_active
- created_at
```

### Conversations (History)
```sql
- id
- user_id
- customer_question
- ai_answer
- was_copied (boolean)
- created_at
```

### Settings
```sql
- id
- user_id
- tone (polite/friendly/professional/vendor)
- shop_name
- greeting_message
- custom_instructions
```

---

## 💰 Pricing Strategy

| แพ็กเกจ | ราคา | Features |
|---------|------|----------|
| **ฟรี (Trial)** | 0 บาท (7 วัน) | - 20 คำถาม/วัน<br>- FAQ สูงสุด 30 รายการ<br>- 1 tone |
| **Starter** | 499 บาท/เดือน | - 200 คำถาม/วัน<br>- FAQ ไม่จำกัด<br>- ทุก tone<br>- History 30 วัน |
| **Pro** | 999 บาท/เดือน | - ไม่จำกัดคำถาม<br>- Multi-user (3 accounts)<br>- Priority support<br>- Export data |
| **Setup Service** | 1,500-5,000 บาท | - ช่วยตั้งค่า FAQ<br>- Training 1 ชม.<br>- Custom tone |

**Revenue Target สัปดาห์แรก:** 3-5 ลูกค้าทดลอง → 1-2 ลูกค้าจ่ายเงิน = 1,000-2,000 บาท

---

## 🗓️ 7-Day Development Roadmap

### Day 1: Foundation & Strategy
**เช้า**
- [x] Finalize Persona & Pain Points
- [x] เขียน Sales message / Landing page copy
- [x] กำหนด Tech stack

**บ่าย**
- [ ] Setup Next.js + Tailwind + Supabase
- [ ] Init Git repository
- [ ] Database schema design

**Deliverable:** Project setup พร้อม, database schema

---

### Day 2: Admin Dashboard - FAQ Management
**เช้า**
- [ ] Auth system (Login/Register) + Supabase
- [ ] Admin layout + sidebar navigation

**บ่าย**
- [ ] FAQ CRUD (Create, Read, Update, Delete)
- [ ] Category management
- [ ] Form validation

**Deliverable:** Admin สามารถเพิ่ม/แก้ไข FAQ ได้

---

### Day 3: AI Answer Generator (Core Feature)
**เช้า**
- [ ] Integrate OpenAI/Claude API
- [ ] Prompt engineering (Thai language, tone variations)
- [ ] Settings page (tone, shop name)

**บ่าย**
- [ ] หน้า "ถามคำถาม" UI
- [ ] แสดงคำตอบจาก AI
- [ ] Copy to clipboard button
- [ ] Edit answer before copy

**Deliverable:** AI ตอบคำถามได้ + copy ไปใช้ได้

---

### Day 4: User Management & Monetization
**เช้า**
- [ ] Plan management (Free/Starter/Pro)
- [ ] Usage limit enforcement
- [ ] Trial period logic

**บ่าย**
- [ ] PromptPay QR generation
- [ ] Payment verification (manual)
- [ ] Email notification (trial ending, payment success)

**Deliverable:** ระบบ subscription พื้นฐาน

---

### Day 5: Landing Page & Marketing
**เช้า**
- [ ] Landing page design (Hero, Features, Pricing)
- [ ] Testimonials section (mock ก่อน)
- [ ] CTA buttons

**บ่าย**
- [ ] Record demo video (1-2 นาที)
- [ ] Before/After examples
- [ ] SEO meta tags

**Deliverable:** Landing page สมบูรณ์

---

### Day 6: Polish & Outreach Prep
**เช้า**
- [ ] UI/UX improvements
- [ ] Mobile responsive check
- [ ] Error handling & loading states

**บ่าย**
- [ ] Prepare outreach message
- [ ] List 20-50 target shops (Facebook groups, LINE OA)
- [ ] Create demo account

**Deliverable:** System ready for beta users

---

### Day 7: Launch & First Customers
**เช้า**
- [ ] Deploy to Vercel
- [ ] Domain setup
- [ ] Final testing

**บ่าย**
- [ ] Outreach to 20+ shops
- [ ] Offer free trial
- [ ] Collect feedback from 1-3 users

**Evening**
- [ ] Quick iteration based on feedback
- [ ] Adjust prompt if needed

**Deliverable:** 1-3 ลูกค้าทดลองใช้จริง

---

## 📈 Success Metrics

### Week 1 (Launch)
- [ ] 3-5 ลูกค้าลงทะเบียนทดลอง
- [ ] 1-2 ลูกค้าจ่ายเงิน (Setup หรือ Subscription)
- [ ] AI ตอบคำถามได้ถูกต้อง 80%+

### Month 1
- [ ] 10-20 ลูกค้าใช้งาน
- [ ] MRR 5,000-10,000 บาท
- [ ] Customer feedback score 4/5+

### Month 3
- [ ] 30-50 ลูกค้า
- [ ] MRR 15,000-30,000 บาท
- [ ] Ready for LINE/FB integration

---

## 🚀 Future Features (Post-MVP)

### Phase 2 (Week 2-4)
- [ ] LINE Official Account integration
- [ ] Facebook Messenger integration
- [ ] Auto-reply mode (ไม่ต้อง copy-paste)

### Phase 3 (Month 2-3)
- [ ] Analytics dashboard (response time, conversion rate)
- [ ] A/B testing คำตอบ
- [ ] Multi-language support

### Phase 4 (Month 4+)
- [ ] WhatsApp integration
- [ ] Voice message support
- [ ] Product catalog integration (Shopee, Lazada)

---

## ⚠️ Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI ตอบผิด / ไม่ธรรมชาติ | สูง | - Prompt engineering ดีๆ<br>- ให้แก้ไขก่อน copy<br>- Collect feedback |
| ลูกค้าไม่เห็นคุณค่า | สูง | - Demo video ชัด<br>- Before/After examples<br>- ทดลองฟรี 7 วัน |
| Cost API สูงเกินไป | กลาง | - ใช้ GPT-4o-mini<br>- Cache คำถามซ้ำ<br>- Rate limiting |
| แข่งขันสูง | กลาง | - โฟกัส SME ไทย<br>- ภาษาไทยเนทีฟ<br>- Customer service ดี |

---

## 📞 Go-to-Market Strategy

### Week 1: Outreach
**Channels:**
1. Facebook Groups (ขายของออนไลน์, SME ไทย)
2. LINE OpenChat (กลุ่มแม่ค้า)
3. Direct message ร้านค้าที่ follow

**Message Template:**
```
สวัสดีครับคุณ [ชื่อ] 👋

สังเกตเห็นว่าร้านคุณมีลูกค้าสอบถามเยอะมาก (คงตอบไม่ทันบางทีใช่มั้ยครับ 😅)

ผมทำระบบ AI ช่วยร่างคำตอบภาษาไทยให้ร้านค้า คัดลอกไปตอบได้เลย
ลดเวลาตอบจาก 5 นาที → 30 วินาที ✨

ตอนนี้เปิดให้ทดลองฟรี 7 วัน (ไม่ต้องใส่บัตร)
สนใจไหมครับ?

[Link to Demo Video]
```

### Week 2-4: Content Marketing
- โพสต์ tips "วิธีจัดการคำถามลูกค้า"
- Case study ร้านที่ใช้ (ขออนุญาตก่อน)
- Facebook/IG Ads (งบ 100-500 บาท/วัน)

---

## 👥 Team & Responsibilities

**Solo Founder (คุณ):**
- [ ] Full-stack development
- [ ] Marketing & sales
- [ ] Customer support

**Optional Support:**
- Freelance copywriter (Landing page)
- Designer (Logo, UI improvements)

---

## 💵 Budget Estimate

| Item | Cost | Notes |
|------|------|-------|
| Vercel Hosting | 0 บาท | Free tier |
| Supabase DB | 0 บาท | Free tier (500MB) |
| OpenAI API | ~500 บาท | $5-10 (testing + first customers) |
| Domain | 300 บาท/ปี | .com or .co.th |
| Logo/Design | 500-2,000 บาท | Fiverr or local designer |
| FB Ads (optional) | 1,000-3,000 บาท | Week 2+ |
| **Total Week 1** | ~1,300 บาท | ไม่รวมเวลาของคุณ |

**Expected ROI:** ถ้าปิดลูกค้า 2 คนแรก (Setup 1,500 บาท + Sub 499 บาท) = 3,500 บาท

---

## 📚 Resources & References

### Design Inspiration
- [Intercom](https://inter.com.com) - Chatbot UX
- [Tidio](https://tidio.com) - Landing page
- [ManyChat](https://manychat.com) - Feature set

### Tech Resources
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Vercel AI SDK](https://sdk.vercel.ai) - AI integration
- [Supabase Docs](https://supabase.com/docs)

### Thai Market Research
- [Facebook: ขายของออนไลน์ไทย](https://facebook.com/groups)
- [Pantip: ธุรกิจออนไลน์](https://pantip.com)

---

## ✅ Definition of Done (Week 1)

- [ ] ระบบ login/register ทำงานได้
- [ ] Admin เพิ่ม FAQ ได้อย่างน้อย 10 รายการ
- [ ] AI ตอบคำถามภาษาไทยได้ธรรมชาติ
- [ ] Copy-paste ใช้งานได้บน mobile
- [ ] Landing page ดูดี มี CTA ชัด
- [ ] Demo video พร้อมโชว์
- [ ] Deploy สำเร็จ + domain เชื่อมต่อแล้ว
- [ ] ทดสอบกับ 1-3 ร้านค้าจริง
- [ ] ได้ feedback และปรับปรุงแล้ว

---

## 🎬 Next Steps

1. **Review document นี้** - เพิ่มเติมหรือแก้ไขได้
2. **เริ่ม Day 1** - Setup project + database
3. **Daily standup (with yourself)** - ทบทวนความคืบหน้า
4. **Ship fast, iterate faster** - อย่ากลัวที่จะปรับเปลี่ยน

---

**Version:** 1.0
**Last Updated:** 2026-01-01
**Status:** 🟢 Ready to Start

---

**Notes:**
- ถ้า AI cost สูงเกินไป → ใช้ GPT-4o-mini แทน GPT-4
- ถ้าเวลาไม่พอ → ตัด payment system ทำ manual verify ก่อน
- ถ้า scope เยอะเกิน → ตัด FAQ learning ออกก่อน (ไม่ critical)

**คติพจน์:**
> **"Done is better than perfect"** 🚀
> ระบบที่ออกไปใช้ได้จริง 80% ดีกว่าระบบที่สมบูรณ์ 100% แต่ยังไม่ launch

---

**Ready? Let's build! 💪**
