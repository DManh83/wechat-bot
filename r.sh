#!/bin/bash

#===============================================
# Script deploy Wechat Bot
#===============================================

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="wechat-bot"
APP_PORT=3000

cd "$PROJECT_DIR"

echo "🚀 Deploying $APP_NAME..."

# Pull code
echo "📥 Pulling code..."
git pull

# Install dependencies
# echo "📦 Installing dependencies..."
# npm install

# Build TypeScript
echo "🔨 Building project..."
npm run build

# Stop app if running
pm2 stop $APP_NAME 2>/dev/null

# Start with PM2
echo "▶️ Starting app..."
pm2 start dist/app.js --name "$APP_NAME" \
    --env production \
    --cwd "$PROJECT_DIR" \
    --time

pm2 save

echo "✅ Deploy completed! App running on port $APP_PORT"
