#!/bin/bash

#===============================================
# Script quản lý Wechat Bot với PM2
#===============================================

PROJECT_DIR="$(dirname "$0")"
APP_NAME="wechat-bot"
APP_PORT=3000

cd "$PROJECT_DIR"

case "$1" in
    start)
        echo "🚀 Starting $APP_NAME..."

        # Kiểm tra đã build chưa
        if [ ! -d "dist" ]; then
            echo "📦 Building project..."
            npm run build
        fi

        # Chạy với PM2
        pm2 start dist/app.js --name "$APP_NAME" \
            --env production \
            --cwd "$PROJECT_DIR" \
            --time

        pm2 save
        echo "✅ $APP_NAME started on port $APP_PORT"
        ;;

    stop)
        echo "🛑 Stopping $APP_NAME..."
        pm2 stop $APP_NAME
        pm2 delete $APP_NAME
        echo "✅ $APP_NAME stopped"
        ;;

    restart)
        echo "🔄 Restarting $APP_NAME..."
        pm2 restart $APP_NAME
        ;;

    reload)
        echo "🔁 Reloading $APP_NAME..."
        pm2 reload $APP_NAME
        ;;

    logs)
        echo "📜 Logs for $APP_NAME:"
        pm2 logs $APP_NAME --lines 50 --nostream
        ;;

    logsf)
        echo "📜 Following logs (Ctrl+C to exit):"
        pm2 logs $APP_NAME --follow --lines 100
        ;;

    status)
        echo "📊 Status of $APP_NAME:"
        pm2 list
        ;;

    monit)
        echo "📊 Starting monitor..."
        pm2 monit
        ;;

    build)
        echo "📦 Building project..."
        npm run build
        echo "✅ Build completed"
        ;;

    deploy)
        echo "🚀 Deploying $APP_NAME..."
        git pull
        npm install
        npm run build
        pm2 restart $APP_NAME
        echo "✅ Deployment completed"
        ;;

    health)
        echo "❤️ Health check:"
        curl -s http://localhost:$APP_PORT/health
        echo ""
        ;;

    *)
        echo "Usage: ./r.sh {start|stop|restart|reload|logs|logsf|status|monit|build|deploy|health}"
        echo ""
        echo "Commands:"
        echo "  start   - Khởi động app với PM2"
        echo "  stop    - Dừng app"
        echo "  restart - Restart app"
        echo "  reload  - Reload app (zero-downtime)"
        echo "  logs    - Xem logs (50 dòng)"
        echo "  logsf   - Follow logs realtime"
        echo "  status  - Xem trạng thái PM2"
        echo "  monit   - Mở PM2 monitor"
        echo "  build   - Build TypeScript"
        echo "  deploy  - Git pull + build + restart"
        echo "  health  - Health check endpoint"
        exit 1
        ;;
esac
