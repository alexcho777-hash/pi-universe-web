# π Universe Web - Pi Network Edition

Multi-Sanctuary Faith Platform built for Pi Network with React + Pi SDK.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Pi Network account (for testing)

### Installation

1. Clone or extract the project
```bash
cd pi-universe-web
npm install
```

2. Create `.env` file (copy from `.env.example`)
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
REACT_APP_API_URL=https://pi-universe-api.onrender.com
REACT_APP_PI_NETWORK=testnet
REACT_APP_PI_APP_ID=your_app_id_here
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Production Build

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📋 Architecture

**路线 B: 完全网页化**

### Frontend (React Web)
- React 19 + TypeScript
- Material-UI for components
- Zustand for state management
- Axios for API calls
- React Router for navigation
- Vite for build tooling

### Integration with Pi Network
- Pi SDK injected via HTML `<script>`
- `window.Pi.authenticate()` for user auth
- `window.Pi.payment()` for donations
- Uses Pi UID instead of custom JWT

### Backend (Existing)
- Express.js on Render
- PostgreSQL database
- Manages user data, sanctuaries, donations

## 🔑 Key Features

- ✅ Pi Network Authentication
- ✅ Multi-Sanctuary Support
- ✅ Daily Check-in & Meditation Tracking
- ✅ Pi Payment Integration
- ✅ Donor/Contributor Acknowledgments
- ✅ User Profile & Statistics
- ✅ Responsive Web Design

## 📝 API Endpoints

The app connects to the existing backend:

```
GET  /api/sanctuaries          - List all sanctuaries
GET  /api/acknowledgments      - Get donor/contributor data
POST /api/daily-checkin        - Daily check-in
POST /api/meditations          - Start meditation session
POST /api/donations/create-payment   - Create Pi payment
POST /api/donations/complete-payment - Complete payment
GET  /api/users/profile        - Get user profile
POST /api/users/sync           - Sync Pi user with backend
```

## 🔄 Authentication Flow

1. User clicks "Login with Pi Network"
2. `Pi.authenticate()` is called
3. Pi Browser injects `window.Pi` object
4. Backend receives Pi UID and syncs user data
5. App stores authentication state in Zustand

## 💳 Payment Flow

1. User initiates donation
2. `Pi.payment()` opens Pi Payment dialog
3. User confirms transaction
4. Backend receives payment callback
5. Backend completes payment verification
6. Donation recorded in database

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Render
```bash
git push origin main  # Connect to Render via git
```

### Traditional Server
```bash
npm run build
# Deploy dist/ folder to your server
```

## 🔐 Environment Variables

- `REACT_APP_API_URL` - Backend API endpoint
- `REACT_APP_PI_NETWORK` - `testnet` or `mainnet`
- `REACT_APP_PI_APP_ID` - Your App ID from Pi App Studio

## 📚 Related Documentation

- [Pi SDK Documentation](https://pi-apps.github.io/pi-sdk-docs/)
- [Pi Payment API](https://pi-apps.github.io/pi-sdk-docs/#payment)
- [React Router Docs](https://reactrouter.com/)
- [Material-UI Docs](https://mui.com/)
- [Zustand Docs](https://github.com/pmndrs/zustand)

## 🐛 Troubleshooting

### Pi SDK Not Loading
- Ensure you're accessing from Pi Browser or Testnet
- Check browser console for errors
- Verify Pi Network is accessible

### Authentication Fails
- Check if Pi SDK is loaded (`window.Pi` should exist)
- Ensure backend is running and accessible
- Check network tab in browser dev tools

### Payment Issues
- Verify backend payment endpoints are working
- Check if user has sufficient Pi balance (testnet)
- Review server logs for payment verification errors

## 📄 License

ISC

## 👥 Contributors

Built for π Universe Multi-Sanctuary Faith Platform
