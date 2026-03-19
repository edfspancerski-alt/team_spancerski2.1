#!/bin/bash

# Exit on error
set -e

# 1. Git status, add, commit, and push
echo "==> Checking git status and pushing changes..."
git status
git add .
git commit -m "Auto deploy $(date)"
git push

# 2. Install dependencies, generate Prisma client, and push database schema
echo "==> Installing dependencies and setting up Prisma..."
npm install
npx prisma generate
npx prisma db push || npx prisma migrate deploy

# 3. Build the Next.js project
echo "==> Building the project..."
npm run build

# 4. Set environment variables for Render and Stripe
echo "==> Setting up environment variables..."
export DATABASE_URL="your_database_url_here"
export STRIPE_SECRET="your_stripe_secret_here"

# 5. Deploy to Render
echo "==> Deploying to Render..."
npm install -g render-cli@latest
render deploy

# 6. Test Stripe webhook and server
echo "==> Testing Stripe webhook and server..."
curl -X POST -H "Stripe-Signature: your_test_signature" -d '{"type":"payment_intent.succeeded"}' http://localhost:3000/api/stripe/webhook
curl http://localhost:3000

echo "==> Deployment complete!"