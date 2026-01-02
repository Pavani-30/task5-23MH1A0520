#!/bin/sh
set -e

echo "Waiting for database to be ready..."

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  sleep 2
done

echo "Database is ready"

echo "Running database migrations..."
for file in /app/migrations/*.sql; do
  echo "Running migration: $file"
  psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    -f "$file"
done

echo "Running seed data..."
psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -f /app/seeds/seed_data.sql

echo "Starting backend server..."
exec npm start
