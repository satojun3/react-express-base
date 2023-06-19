#!/bin/sh

# # Prismaのマイグレーションを実行
# npx prisma migrate dev --name init

# # Use nodemon for hot reloading in development
# npm run dev

#!/bin/sh

# Maximum number of retries before giving up
MAX_RETRIES=5
RETRY_DELAY=5s
RETRY_COUNT=0

# Prismaのマイグレーションを実行
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  npx prisma migrate dev --name init && break
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "Failed to run prisma migrate. Retrying in $RETRY_DELAY (attempt $RETRY_COUNT/$MAX_RETRIES)"
  sleep $RETRY_DELAY
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "Prisma migrate failed after $MAX_RETRIES attempts. Exiting."
  exit 1
fi

# Use nodemon for hot reloading in development
npm run dev
