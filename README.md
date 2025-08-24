# Varsity Scholarships

## Deployment

Run the SQL scripts in the `scripts` directory to initialize the database. After running the base migrations, seed an initial admin account:

```bash
psql "$DATABASE_URL" -f scripts/04-seed-admin.sql
```

This creates a corresponding user in both `auth.users` and `public.users` with `is_admin` set to `TRUE`.
