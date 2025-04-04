#!/bin/bash
# Complete Vite App Deployment Script with Key Setup
set -e  # Exit immediately if any command fails

# Configuration
EC2_IP="18.210.110.84"
EC2_USER="ubuntu"
LOCAL_KEY="../key_pem/foodapp.pem"
DEPLOY_KEY="$HOME/.ssh/deploy_key.pem"  # Temporary secure location

echo "=== Starting Secure Deployment ==="

# 1. Key Setup
echo "🔑 Setting up deployment key..."
if [ ! -f "$LOCAL_KEY" ]; then
    echo "❌ Error: Key file not found at $LOCAL_KEY"
    exit 1
fi

# Create secure location for key
mkdir -p ~/.ssh
chmod 700 ~/.ssh
cp "$LOCAL_KEY" "$DEPLOY_KEY"
chmod 400 "$DEPLOY_KEY"

# 2. Build Verification
echo "🏗 Verifying local build..."
if [ ! -d "./dist" ]; then
    echo "🛠 Building Vite app..."
    npm run build || { echo "❌ Build failed"; exit 1; }
fi

# 3. Prepare EC2 Temp Directory
echo "🛠 Preparing EC2 temporary directory..."
TEMP_DIR="/tmp/web_deploy_$(date +%s)"
ssh -i "$DEPLOY_KEY" "$EC2_USER@$EC2_IP" \
    "sudo mkdir -p '$TEMP_DIR' && \
     sudo chown -R $EC2_USER:$EC2_USER '$TEMP_DIR'"

# 4. Secure File Transfer
echo "🚚 Uploading files..."
scp -i "$DEPLOY_KEY" -o StrictHostKeyChecking=no -r ./dist/* "$EC2_USER@$EC2_IP:$TEMP_DIR/"

# 5. Finalize Deployment
echo "🔧 Moving files to production..."
ssh -i "$DEPLOY_KEY" "$EC2_USER@$EC2_IP" \
    "sudo rm -rf /var/www/html/* && \
     sudo mv '$TEMP_DIR'/* /var/www/html/ && \
     sudo chown -R www-data:www-data /var/www/html && \
     sudo chmod -R 755 /var/www/html && \
     sudo rm -rf '$TEMP_DIR'"

# 6. Cleanup
echo "🧹 Cleaning up..."
rm -f "$DEPLOY_KEY"

echo -e "\n✅ ${GREEN}Deployment successful!${NC}"
echo "🌐 Access your app at: http://$EC2_IP"
echo "🕒 Last updated: $(date)"

# Add colors for better visibility (optional)
GREEN='\033[0;32m'
NC='\033[0m'