# Decentralized Voting System

A blockchain-based decentralized voting system developed as part of **Blockchain Technology Project 2** at **DecodeLabs**.

**Author:** Boutaina El Hourri
**Institution:** ENSA Khouribga  
**Company:** DecodeLabs  
**Date:** July 2026

---

## 📋 Overview

This project implements a transparent, secure, and tamper-proof voting system on the Ethereum blockchain. It ensures:

- ✅ One vote per Ethereum address (double-voting prevention)
- ✅ Transparent vote counting
- ✅ Immutable election results
- ✅ Decentralized candidate management

## 🏗 Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   User/Client   │ ───▶ │  Smart Contract  │ ───▶ │ Ethereum Network│
│  (vote.js)      │      │   (Voting.sol)   │      │    (Sepolia)    │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

**Components:**
- **Voting.sol**: Core smart contract handling candidates, voting logic, and winner determination
- **Hardhat**: Development environment for compilation, testing, and deployment
- **Ethers.js**: Library for interacting with the Ethereum blockchain

## 📁 Project Structure

```
blockchain-voting-dapp/
├── contracts/
│   └── Voting.sol          # Smart contract
├── scripts/
│   ├── deploy.js           # Deployment script
│   └── vote.js             # Voting interaction script
├── test/
│   └── Voting.test.js      # Unit tests
├── hardhat.config.js       # Hardhat configuration
├── .env                    # Environment variables (not committed)
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MetaMask** wallet configured with Sepolia testnet
- **Sepolia test ETH** (get from [Sepolia Faucet](https://sepoliafaucet.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/blockchain-voting-dapp.git
   cd blockchain-voting-dapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file at the root of the project:
   ```env
   PRIVATE_KEY=0xYOUR_PRIVATE_KEY
   SEPOLIA_RPC_URL=https://rpc.sepolia.org
   ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
   ```

   > ⚠️ **Security Note:** Never share or commit your private key. The `.env` file is already in `.gitignore`.

## 🛠 Deployment

### Compile the Contract

```bash
npm run compile
```

### Deploy to Sepolia Testnet

```bash
npm run deploy:sepolia
```

After deployment, copy the contract address and update it in your `.env` file:
```env
CONTRACT_ADDRESS=0xYOUR_NEW_CONTRACT_ADDRESS
```

### Run Unit Tests (Local)

```bash
npm run test
```

## 🗳 Casting a Vote

### Vote for a Candidate

```bash
# Vote for candidate ID 1 (Alice)
npm run vote:sepolia -- 1

# Vote for candidate ID 2 (Bob)
npm run vote:sepolia -- 2
```

### Verify Your Vote

You can verify your vote on [Sepolia Etherscan](https://sepolia.etherscan.io/) using the transaction hash provided after voting.

## 🔒 Security Features

1. **Double-Voting Prevention**: The `voters` mapping ensures each address can only vote once
2. **Owner-Only Candidate Addition**: Only the contract owner can add candidates
3. **Input Validation**: All functions validate inputs to prevent invalid operations
4. **Event Logging**: All votes and candidate additions emit events for transparency

## 📊 Smart Contract Functions

| Function | Visibility | Description |
|----------|------------|-------------|
| `addCandidate(string)` | Public (Owner only) | Add a new candidate |
| `vote(uint)` | Public | Cast a vote for a candidate |
| `getCandidate(uint)` | Public (View) | Get candidate details |
| `getWinner()` | Public (View) | Get the current winner |
| `hasVoted(address)` | Public (View) | Check if an address has voted |

## 🌐 Network Information

- **Network**: Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://rpc.sepolia.org
- **Block Explorer**: https://sepolia.etherscan.io/

## 📝 Future Improvements

- [ ] Add a web frontend (React + wagmi)
- [ ] Implement voting periods (start/end timestamps)
- [ ] Add admin role for candidate management
- [ ] Integrate IPFS for storing candidate metadata
- [ ] Implement quadratic voting
- [ ] Add multi-signature owner verification

## 📚 References

- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Ethereum Sepolia Testnet](https://sepolia.dev/)

## 📄 License

This project is licensed under the MIT License.

---

**Developed with ❤️ at ENSA Khouribga & DecodeLabs**
