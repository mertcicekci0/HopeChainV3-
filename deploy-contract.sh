#!/bin/bash

# HopeChain Contract Deployment Script

echo "🚀 HopeChain Donation Contract Deployment"
echo "========================================"

# Check if Soroban CLI is installed
if ! command -v soroban &> /dev/null; then
    echo "❌ Soroban CLI not found. Installing..."
    echo "Please run: cargo install --locked soroban-cli"
    echo "Or visit: https://soroban.stellar.org/docs/getting-started/setup"
    exit 1
fi

echo "✅ Soroban CLI found"

# Navigate to contract directory
cd contracts/donation

# Build the contract
echo "🔨 Building contract..."
soroban contract build

if [ $? -ne 0 ]; then
    echo "❌ Contract build failed"
    exit 1
fi

echo "✅ Contract built successfully"

# Deploy to testnet (requires network configuration)
echo "🌐 Deploying to Stellar Testnet..."
echo "Note: Make sure you have configured testnet and have a funded account"

# Generate a new identity for deployment (if needed)
soroban keys generate deployer --network testnet 2>/dev/null || echo "Using existing deployer identity"

# Deploy the contract
CONTRACT_ID=$(soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/donation_contract.wasm \
    --source deployer \
    --network testnet)

if [ $? -ne 0 ]; then
    echo "❌ Contract deployment failed"
    echo "Make sure you have:"
    echo "  1. Configured testnet: soroban network add testnet https://soroban-testnet.stellar.org"
    echo "  2. A funded account: Visit https://laboratory.stellar.org/#account-creator"
    exit 1
fi

echo "✅ Contract deployed successfully!"
echo "📋 Contract ID: $CONTRACT_ID"

# Save contract ID to a file for frontend use
echo "$CONTRACT_ID" > ../../contract-id.txt

echo "💾 Contract ID saved to contract-id.txt"
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Update CONTRACT_ID in src/app/main/page.tsx"
echo "2. Test the contract functions"
echo "3. Run the frontend: npm run dev"
