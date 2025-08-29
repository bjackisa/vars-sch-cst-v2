# Varsity Scholarships

## Deployment

Run the SQL scripts in the `scripts` directory to initialize the database. After running the base migrations, seed an initial admin account:

```bash
psql "$DATABASE_URL" -f scripts/04-seed-admin.sql
```

This creates a corresponding user in both `auth.users` and `public.users` with `is_admin` set to `TRUE`.

## Payments

Configure Relworx credentials in `.env.local` when enabling the applicant payment flow.

```bash
RELWORX_API_BASE=https://payments.relworx.com/api
RELWORX_API_KEY=REPLACE_WITH_YOUR_KEY
RELWORX_ACCOUNT_NO=REPLACE_WITH_YOUR_ACCOUNT_NO
RELWORX_WEBHOOK_SECRET=REPLACE_WITH_WEBHOOK_SECRET
RELWORX_AUTORETURN_SECRET=${RELWORX_WEBHOOK_SECRET}
KV_REST_API_URL=
KV_REST_API_TOKEN=
```
