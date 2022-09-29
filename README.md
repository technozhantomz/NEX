
[![pipeline status](https://gitlab.com/PBSA/NEX/badges/dev/pipeline.svg)](https://gitlab.com/PBSA/NEX/-/commits/dev)

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

Clone this repo:
```
https://gitlab.com/PBSA/NEX.git -b <branch name>
```

Now make sure you are in the application's root directory. Install app dependecies:
```
npm install
```

## ENV configuration
Create a `.env.local` file in the root of the repository:

```
cp .env.example .env.local
```

.env.local
```
# Token symbol
NEXT_PUBLIC_DEFAULT_TOKEN=''

# Token symbol
NEXT_PUBLIC_DEFAULT_QUOTE=''

# Full URL to the blockchain's faucet
NEXT_PUBLIC_FAUCET_URL=''

# Full URL to your DEX instance
NEXT_PUBLIC_DEX_URL=''
```

## Nodes list
put the list of nodes inside the /src/api/params/nodesList.ts file


## Mannual Starting after installation and ENV configuration
### Development
```
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
### Production
Install pm2 globally:
```
 npm install pm2 -g
```

Now make sure you are in the application's root directory. Build the production distribution:
```
npm run build
```

Make sure you are in the application's root directory. Serve the application:
```
pm2 start npm --name <must be unique> -- start
```

#### Exmaple NGINX Configuration:

```
server {
        listen 80;
        server_name <domain name or serve ip address>;
        root /var/www/html;
        index index.html index.htm;

        location / {
                proxy_pass             http://127.0.0.1:3000;
                proxy_read_timeout     60;
                proxy_connect_timeout  60;
                proxy_redirect         off;

                # Allow the use of websockets
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```


Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
