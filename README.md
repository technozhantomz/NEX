
Project to build moderen DEX-UI for the Peerplays on chain DEX

# Peerplays DEX

## Prerequisites

Install the build dependencies on Linux:
```
apt-get update
apt-get install build-essential nasm
```

## Installation

Node v16+ is required and it can be installed using nvm following these [installation steps](https://github.com/nvm-sh/nvm#installing-and-updating).
```
npm install
```

## ENV configuration
Create a `.env` file in the root of the repository:

```
cp example.env .env
```

.env
```
# Token symbol
DEFAULT_TOKEN=''

# Token symbol
DEFAULT_QUOTE=''

# Full URL to the blockchain's faucet
FAUCET_URL=''

# Full URL to your DEX instance
DEX_URL=''

# Chain ID of the blockchain
DEFAULT_CHAIN_ID=''

# Blockchain API endpoints (websocket)
BLOCKCHAIN_ENDPOINTS=''
```

## Starting after installation and ENV configuration
### Development
```
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
### Production
Build the production distribution:
```
npm run build
```
Static files will be created in `./.next` folder.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.