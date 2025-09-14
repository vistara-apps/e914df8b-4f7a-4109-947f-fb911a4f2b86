# Crypto P&L Glance

A privacy-focused Base Mini App for tracking cryptocurrency profit and loss in real-time.

## Features

- **Simple P&L Dashboard**: Clear view of your crypto holdings with real-time profit/loss calculations
- **Manual Entry**: Easy input of your crypto holdings and cost basis
- **Privacy-First**: Your data stays on your device, only public price data is fetched
- **Real-time Prices**: Live price updates from CoinGecko API
- **Mobile-First Design**: Optimized for Base Wallet mobile experience

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Base Integration**: OnchainKit for Base Mini App functionality
- **Price Data**: CoinGecko API
- **Storage**: Local storage for privacy

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Privacy & Security

- All portfolio data is stored locally on your device
- No personal financial data is transmitted to external servers
- Only public cryptocurrency price data is fetched from CoinGecko
- No account creation or authentication required

## Deployment

This app is designed to be deployed as a Base Mini App. Make sure to:

1. Update the manifest.json with your actual deployment URLs
2. Set the NEXT_PUBLIC_ONCHAINKIT_API_KEY environment variable (optional)
3. Deploy to a platform that supports Next.js (Vercel, Netlify, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.
