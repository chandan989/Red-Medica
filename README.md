# 🏥 Red Médica - Blockchain Supply Chain Platform

A comprehensive pharmaceutical supply chain management platform built on blockchain technology, ensuring product authenticity and traceability from manufacturer to consumer.

## 🌟 Features

### 🔗 Blockchain Integration
- **Smart Contract**: Deployed on Moonbase Alpha testnet
- **Contract Address**: `0xAD6655fa10DB0DDDc079774198E76c457E2e0C8C`
- **MetaMask Integration**: Seamless wallet connectivity
- **Transaction Verification**: Direct links to block explorer

### 📦 Product Management
- **4-Step Registration**: Intuitive product registration process
- **Real-time Dashboard**: Live product counts and analytics
- **Product Verification**: QR code scanning and ID lookup
- **Data Export**: JSON export functionality
- **Local Database**: Persistent storage with localStorage

### 🎨 User Experience
- **Responsive Design**: Mobile and desktop optimized
- **Professional UI**: Clean, modern interface
- **Real-time Updates**: Instant dashboard refresh
- **Demo Mode**: Fallback for offline demonstration

## 🚀 Live Demo

The platform is deployed and ready for demonstration with:
- ✅ Working product registration
- ✅ Blockchain verification
- ✅ Real-time dashboard updates
- ✅ QR code generation
- ✅ Transaction hash verification

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Radix UI** components
- **React Router** for navigation

### Blockchain
- **Substrate/Polkadot** ecosystem
- **Moonbase Alpha** testnet
- **MetaMask** wallet integration
- **Ethers.js** for blockchain interaction

### Smart Contract
- **Rust** with ink! framework
- **Supply chain logic** implementation
- **Product registration** and verification
- **Transfer tracking** capabilities

## 📁 Project Structure

```
Red-Medica/
├── red-medica-web/          # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # Blockchain and API services
│   │   └── lib/            # Utilities and store
│   └── package.json
├── contracts/               # Smart contracts
│   └── medical_supply_chain/
│       ├── lib.rs          # Main contract logic
│       └── Cargo.toml      # Rust dependencies
└── scripts/                # Deployment scripts
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- Rust (for contract development)

### Frontend Setup
```bash
cd red-medica-web
npm install
npm run dev
```

### Smart Contract Development
```bash
cd contracts/medical_supply_chain
cargo contract build
cargo contract deploy
```

## 🔧 Configuration

### Environment Variables
Create `.env` file in `red-medica-web/`:
```env
VITE_CONTRACT_ADDRESS=0xAD6655fa10DB0DDDc079774198E76c457E2e0C8C
VITE_NETWORK_RPC=https://rpc.api.moonbase.moonbeam.network
VITE_CHAIN_ID=1287
```

## 📱 Usage

### Product Registration
1. Connect MetaMask wallet
2. Navigate to "Register New Product"
3. Fill in product details across 4 steps:
   - Basic Information
   - Manufacturing Dates
   - Product Details
   - Regulatory Information
4. Submit to blockchain

### Product Verification
1. Go to "Verify" page
2. Enter Product ID or scan QR code
3. View complete product information
4. Verify blockchain transaction

### Dashboard Analytics
- View total registered products
- Monitor active shipments
- Track delivery status
- Export product data

## 🔐 Security Features

- **Blockchain Immutability**: Tamper-proof product records
- **Wallet Authentication**: Secure MetaMask integration
- **Data Encryption**: Secure local storage
- **Transaction Verification**: Direct blockchain validation

## 🌐 Network Details

- **Network**: Moonbase Alpha (Polkadot Testnet)
- **Chain ID**: 1287
- **RPC URL**: https://rpc.api.moonbase.moonbeam.network
- **Explorer**: https://moonbase.moonscan.io/

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Submission

This project was developed for the LATIN HACK hackathon, demonstrating:
- Full-stack blockchain development
- Real-world supply chain solutions
- Professional UI/UX design
- Smart contract integration
- Production-ready deployment

## 📞 Contact

For questions or collaboration opportunities, please reach out through GitHub issues.

---

**Built with ❤️ for transparent pharmaceutical supply chains**