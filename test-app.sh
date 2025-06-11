#!/bin/bash

# HopeChain Test Script
echo "🧪 HopeChain Testing Checklist"
echo "============================="

echo ""
echo "✅ MANUAL TESTS TO PERFORM:"
echo ""

echo "1. 🔗 Wallet Connection Test:"
echo "   - Open http://localhost:3000"
echo "   - Click 'Connect Freighter Wallet'"
echo "   - Should prompt for wallet connection"
echo "   - Should redirect to /main on success"
echo ""

echo "2. 💫 Main App Interface Test:"
echo "   - Should display connected wallet address"
echo "   - Should show total donated and last donor stats"
echo "   - Should have donation form with amount and recipient fields"
echo ""

echo "3. 💸 Donation Flow Test:"
echo "   - Enter donation amount (e.g., 1)"
echo "   - Enter recipient address (your testnet address)"
echo "   - Click 'Donate Now'"
echo "   - Should prompt for transaction signing"
echo "   - Should show success message and update stats"
echo ""

echo "4. 🔧 Error Handling Test:"
echo "   - Try empty fields - should show validation error"
echo "   - Try invalid address - should show transaction error"
echo ""

echo "✅ AUTOMATED CHECKS:"
echo ""

# Check if Next.js server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Next.js server is running on localhost:3000"
else
    echo "❌ Next.js server not accessible"
fi

# Check if contract files exist
if [ -f "contracts/donation/src/lib.rs" ]; then
    echo "✅ Soroban contract exists"
else
    echo "❌ Soroban contract missing"
fi

# Check if dependencies are installed
if [ -d "node_modules/@stellar/freighter-api" ]; then
    echo "✅ Freighter API dependency installed"
else
    echo "❌ Freighter API dependency missing"
fi

if [ -d "node_modules/@stellar/stellar-sdk" ]; then
    echo "✅ Stellar SDK dependency installed"
else
    echo "❌ Stellar SDK dependency missing"
fi

echo ""
echo "🎯 SUCCESS CRITERIA:"
echo "- ✅ Wallet connects successfully"
echo "- ✅ Main page loads with stats"
echo "- ✅ Donation form works"
echo "- ✅ Transaction signing works"
echo "- ✅ UI updates after donation"
echo ""

echo "📝 NOTES:"
echo "- This is a testnet application"
echo "- Contract currently uses mock data"
echo "- Real contract deployment is optional"
echo "- All transactions are on Stellar testnet"
echo ""

echo "🚀 Ready for testing! Open http://localhost:3000"
