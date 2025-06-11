# 🔗 HopeChain - Stellar Donation dApp

A minimal donation dApp built with Next.js, TypeScript, Tailwind CSS, and Stellar Soroban smart contracts.

## ✨ Features

- **Freighter Wallet Integration**: Connect and interact with Stellar testnet
- **Simple Donation Interface**: Send XLM to any Stellar address
- **Smart Contract Backend**: Rust-based Soroban contract for donation tracking
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: Live donation statistics and transaction feedback

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Blockchain**: Stellar Network (Testnet)
- **Wallet**: Freighter Wallet API
- **Smart Contract**: Rust + Soroban SDK
- **SDK**: Stellar SDK for JavaScript

## 🚀 Getting Started

### Prerequisites

1. **Install Freighter Wallet**: [Chrome Extension](https://freighter.app/)
2. **Get Testnet XLM**: [Stellar Laboratory](https://laboratory.stellar.org/#account-creator)
3. **Node.js**: Version 18+ required

### Installation

1. **Clone and install dependencies**:
```bash
cd hopechain
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open the app**: Navigate to [http://localhost:3000](http://localhost:3000)

### Contract Deployment (Optional)

To deploy the actual Soroban contract:

1. **Install Soroban CLI**:
```bash
cargo install --locked soroban-cli
```

2. **Configure testnet**:
```bash
soroban network add testnet https://soroban-testnet.stellar.org
```

3. **Generate deployer identity**:
```bash
soroban keys generate deployer --network testnet
```

4. **Fund the deployer account** at [Stellar Laboratory](https://laboratory.stellar.org/#account-creator)

5. **Deploy the contract**:
```bash
./deploy-contract.sh
```

6. **Update contract ID** in `src/lib/contract.ts`

## 📱 How to Use

1. **Connect Wallet**: Click "Connect Freighter Wallet" on the home page
2. **Go to Main App**: Click "Go to Donation App" after connecting
3. **Enter Details**: 
   - Donation amount in XLM
   - Recipient's Stellar address
4. **Donate**: Click "Donate Now" and sign the transaction
5. **View Stats**: See total donated and last donor information

## 📁 Project Structure

```
hopechain/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Wallet connection page
│   │   └── main/page.tsx     # Main donation interface
│   └── lib/
│       └── contract.ts       # Contract interaction utilities
├── contracts/
│   └── donation/
│       ├── Cargo.toml        # Rust dependencies
│       └── src/lib.rs        # Soroban smart contract
└── deploy-contract.sh        # Deployment script
```

## 🔧 Smart Contract Functions

The donation contract includes 3 main functions:

1. **`donate(caller, recipient, amount)`**: Records a donation
2. **`get_total_donated()`**: Returns total amount donated
3. **`get_last_donor()`**: Returns address of last donor

## 🎯 Development Notes

- **Testnet Only**: This app uses Stellar testnet for safe testing
- **Mock Data**: Contract calls use mock data for demo purposes
- **Simple Design**: Intentionally minimal and easy to understand
- **Error Handling**: Comprehensive error handling and user feedback

## 🤝 Contributing

This is a workshop template project. Feel free to:
- Add more contract functions
- Enhance the UI/UX
- Add transaction history
- Implement real contract integration

## 📄 License

MIT License - feel free to use this for learning and development!

---

Built with ❤️ for the Stellar community
