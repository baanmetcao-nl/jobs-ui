# Stripe Payment Integration — Backend Specification

This document describes what the frontend sends to Stripe and what your backend receives via webhooks, so you can link payments to employer accounts and job postings.

---

## Flow overview

```
1. Employer fills in job details + company info (stored client-side)
2. Employer picks a pricing plan
3. Frontend creates a PaymentIntent via Next.js API route
4. Frontend attaches employer details to PaymentIntent metadata
5. Employer pays (iDEAL / card / Bancontact)
6. Stripe sends `payment_intent.succeeded` webhook to backend
7. Backend must: link payment → employer account → publish job(s)
```

---

## Pricing plans

| Plan ID     | Name             | Price (ex. BTW) | Amount charged (incl. 21% BTW) | Job credits |
|-------------|------------------|-----------------|-------------------------------|-------------|
| `single`    | Enkele vacature  | €299.00         | €361.79 (36179 cents)         | 1           |
| `bundle3`   | 3 vacatures      | €799.00         | €966.79 (96679 cents)         | 3           |
| `bundle10`  | 10 vacatures     | €1999.00        | €2418.79 (241879 cents)       | 10          |

An optional "featured" add-on (€49 per job) may be added on top. Each job listing runs for 60 days.

---

## What the webhook receives

Stripe sends a POST to your webhook endpoint with a `payment_intent.succeeded` event. The relevant data sits in the PaymentIntent's `metadata` object:

```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_3abc123",
      "amount": 36179,
      "currency": "eur",
      "status": "succeeded",
      "metadata": {
        "planId": "single",
        "clerkUserId": "user_2fXy...",
        "firstName": "Jan",
        "lastName": "Jansen",
        "email": "jan@acme.nl",
        "companyName": "Acme B.V."
      },
      "receipt_email": "jan@acme.nl"
    }
  }
}
```

### Metadata fields

| Field          | Type   | Description                                      |
|----------------|--------|--------------------------------------------------|
| `planId`       | string | One of: `single`, `bundle3`, `bundle10`           |
| `clerkUserId`  | string | Clerk authentication user ID — the unique employer identifier |
| `firstName`    | string | Employer's first name                             |
| `lastName`     | string | Employer's last name                              |
| `email`        | string | Employer's email address                          |
| `companyName`  | string | Employer's company name                           |

### Top-level PaymentIntent fields

| Field          | Type   | Description                                      |
|----------------|--------|--------------------------------------------------|
| `id`           | string | Stripe PaymentIntent ID (e.g. `pi_3abc123`)       |
| `amount`       | int    | Total charged in **cents** (incl. 21% BTW)        |
| `currency`     | string | Always `eur`                                      |
| `receipt_email` | string | Same as metadata email — Stripe sends receipt here |

---

## What the backend must do on `payment_intent.succeeded`

### 1. Find or create the employer account

Use `clerkUserId` as the primary key to match the employer. If the employer doesn't exist yet in your database, create a new record:

```
employer:
  clerkUserId:  "user_2fXy..."
  firstName:    "Jan"
  lastName:     "Jansen"
  email:        "jan@acme.nl"
  companyName:  "Acme B.V."
```

### 2. Register the purchased package

Create a package/subscription record linked to the employer:

```
package:
  employerId:        <employer.id>
  planId:            "single"
  jobCredits:        1          # based on planId: single=1, bundle3=3, bundle10=10
  jobCreditsUsed:    0
  durationDays:      60
  stripePaymentId:   "pi_3abc123"
  amountPaid:        36179      # cents, incl. BTW
  purchasedAt:       <now>
```

### 3. Idempotency

Stripe may deliver the same webhook more than once. Use the PaymentIntent `id` (`pi_3abc123`) as an idempotency key — if a package with that `stripePaymentId` already exists, skip processing.

---

## Publishing a job — the full draft-to-live flow

The job posting content (title, description, salary, etc.) is **not** in the Stripe webhook. It's submitted separately via API. Here's the complete flow:

```
1. Employer fills in job + company details (steps 1-3 in the frontend wizard)
2. Frontend saves draft       →  POST /api/employer/jobs/draft
3. Employer picks plan & pays →  Stripe PaymentIntent (includes draftId in metadata)
4. Stripe webhook fires       →  backend links payment to draft, activates package
5. Frontend calls publish     →  POST /api/employer/jobs/publish
```

### Step 1: Create draft — `POST /api/employer/jobs/draft`

**Auth:** Bearer token (Clerk JWT)

**Request body:**

```json
{
  "job": {
    "title": "Frontend Developer",
    "description": "<p>Wij zoeken een ervaren frontend developer...</p>",
    "city": "Amsterdam",
    "workplace": "hybrid",
    "contract": "permanent",
    "seniority": "medior",
    "education": "higher_professional",
    "url": "https://acme.nl/vacatures/frontend",
    "hours": { "min": 32, "max": 40 },
    "salary": {
      "min": 3500,
      "max": 5000,
      "interval": "monthly"
    },
    "benefits": {
      "extraFixedPayment": true,
      "extraVariablePayment": false,
      "pensionPlan": true,
      "travelAllowance": true,
      "extraTimeOff": false,
      "stockPlan": false
    },
    "requirements": [
      "3+ jaar ervaring met React/Next.js",
      "Kennis van TypeScript",
      "Ervaring met REST APIs"
    ],
    "responsibilities": [
      "Ontwikkelen van nieuwe features",
      "Code reviews uitvoeren",
      "Samenwerken met het design team"
    ],
    "tags": ["React", "TypeScript", "Next.js"],
    "niche": "ict",
    "applicationMethod": "email",
    "applicationEmail": "hr@acme.nl"
  },
  "company": {
    "name": "Acme B.V.",
    "bio": "Acme is een innovatief tech bedrijf gevestigd in Amsterdam.",
    "logoUrl": "/uploads/logos/acme.png",
    "website": "https://acme.nl",
    "industry": "Technology",
    "size": "50-200",
    "foundedYear": 2015,
    "location": "Amsterdam"
  }
}
```

**Expected response:**

```json
{
  "draftId": "draft_abc123"
}
```

#### Field reference — `job` object

| Field               | Type     | Required | Values / Notes                                                     |
|---------------------|----------|----------|--------------------------------------------------------------------|
| `title`             | string   | yes      | Job title                                                           |
| `description`       | string   | yes      | HTML content (sanitized with DOMPurify on the frontend)             |
| `city`              | string   | yes      | City name, e.g. "Amsterdam"                                        |
| `workplace`         | string   | yes      | `remote` · `hybrid` · `office` · `free_choice` · `other`           |
| `contract`          | string   | yes      | `permanent` · `temporary` · `flex` · `freelance`                   |
| `seniority`         | string   | yes      | `junior` · `medior` · `senior` · `principal`                       |
| `education`         | string   | yes      | `none` · `primary` · `secondary` · `vocational_training` · `higher_professional` · `university_bachelor` · `university_master` · `doctorate` · `unknown` |
| `url`               | string   | no       | External application URL                                            |
| `hours.min`         | number   | yes      | Minimum hours per week                                              |
| `hours.max`         | number   | yes      | Maximum hours per week                                              |
| `salary.min`        | number   | yes      | Minimum salary                                                      |
| `salary.max`        | number   | yes      | Maximum salary                                                      |
| `salary.interval`   | string   | yes      | `hourly` · `daily` · `weekly` · `4_weekly` · `monthly` · `yearly`  |
| `benefits`          | object   | yes      | All boolean flags (see request body above)                          |
| `requirements`      | string[] | no       | List of requirements                                                |
| `responsibilities`  | string[] | no       | List of responsibilities                                            |
| `tags`              | string[] | no       | Freeform tags                                                       |
| `niche`             | string   | yes      | Category/niche identifier (e.g. `ict`, `finance`, `zorg`)          |
| `applicationMethod` | string   | yes      | `email` · `external` · `mollie`                                    |
| `applicationEmail`  | string   | no       | Required when `applicationMethod` is `email`                        |

#### Field reference — `company` object

| Field         | Type   | Required | Notes                              |
|---------------|--------|----------|------------------------------------|
| `name`        | string | yes      | Company name                       |
| `bio`         | string | yes      | Company description                |
| `logoUrl`     | string | yes      | Path to uploaded logo              |
| `website`     | string | no       | Company website URL                |
| `industry`    | string | no       | Industry sector                    |
| `size`        | string | no       | Employee count range, e.g. "50-200"|
| `foundedYear` | number | no       | Year founded                       |
| `location`    | string | no       | Company HQ location                |

---

### Step 2: Update draft — `PUT /api/employer/jobs/draft/{draftId}`

Same body structure as create, used when the employer goes back to edit. Only changed fields need to be sent.

**Expected response:**

```json
{
  "success": true
}
```

---

### Step 3: Payment (Stripe handles this)

The `draftId` should be included in the PaymentIntent metadata so the webhook can link the payment to the draft. After payment, metadata looks like:

```json
{
  "planId": "single",
  "clerkUserId": "user_2fXy...",
  "firstName": "Jan",
  "lastName": "Jansen",
  "email": "jan@acme.nl",
  "companyName": "Acme B.V.",
  "draftId": "draft_abc123"
}
```

---

### Step 4: Webhook processing — what the backend must do

When `payment_intent.succeeded` fires:

1. **Find or create employer** by `clerkUserId`
2. **Create package** with job credits (see "Register the purchased package" above)
3. **Link draft to employer** using `draftId` from metadata
4. The draft is now ready to be published (the frontend triggers this in step 5)

---

### Step 5: Publish — `POST /api/employer/jobs/publish`

**Auth:** Bearer token (Clerk JWT)

Called by the frontend after payment confirmation.

**Request body:**

```json
{
  "draftId": "draft_abc123",
  "pricing": {
    "id": "single",
    "name": "Enkele vacature",
    "price": 199,
    "jobCount": 1,
    "durationDays": 60,
    "features": ["1 vacature voor 60 dagen", "..."]
  },
  "account": {
    "companyName": "Acme B.V.",
    "firstName": "Jan",
    "lastName": "Jansen",
    "email": "jan@acme.nl",
    "phone": "+31612345678",
    "termsAccepted": true,
    "newsletter": false
  }
}
```

**What the backend must do:**

1. Verify the employer has a valid package with remaining credits (by `clerkUserId` from the JWT)
2. Verify the `draftId` belongs to this employer
3. Verify payment was received (a package with `stripePaymentId` exists and has `jobCreditsUsed < jobCredits`)
4. Convert the draft to a live job posting:
   - Set `status` to `active`
   - Set `publishedAt` to now
   - Set `expiresAt` to now + `durationDays` (60 days)
5. Deduct 1 job credit from the package (`jobCreditsUsed += 1`)
6. Store invoice/account details from the `account` object

**Expected response (success):**

```json
{
  "success": true,
  "jobId": "job_xyz789"
}
```

**Expected response (error):**

```json
{
  "success": false,
  "errors": {
    "credits": "Geen vacaturetegoed beschikbaar"
  }
}
```

---

### Retrieve a draft — `GET /api/employer/drafts/{draftId}`

**Auth:** Bearer token (Clerk JWT)

Returns the saved draft so the frontend can restore the wizard state.

**Expected response:**

```json
{
  "job": { "title": "Frontend Developer", "..." : "..." },
  "company": { "name": "Acme B.V.", "..." : "..." }
}
```

---

## Summary: linking payment to job

```
clerkUserId  ──→  employer record  ──→  package (with credits)
                                    └──→  draft(s)  ──→  published job(s)
stripePaymentId (pi_xxx)  ──→  package (idempotency key)
draftId  ──→  draft  ──→  published job
```

The `clerkUserId` is the anchor that ties everything together. It comes from the authenticated Clerk session on every request and is embedded in the Stripe PaymentIntent metadata server-side.

---

## Webhook for failed payments

The frontend also forwards `payment_intent.payment_failed` events. No action is required beyond logging, but you may want to track failed attempts per employer for analytics.

---

## Authentication

All payment API routes require a valid Clerk session. The `clerkUserId` in the metadata is set server-side from the authenticated session — it cannot be spoofed by the client.

---

## Test values

For local testing with Stripe test mode:

- Use plan IDs: `single`, `bundle3`, `bundle10`
- iDEAL test bank: any option works in test mode
- Card: `4242 4242 4242 4242`, any future expiry, any CVC
- The webhook endpoint needs to be reachable — use `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
