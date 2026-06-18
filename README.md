# WTWR (What to Wear?)

> **Weather-based clothing recommendations for your day.**

🌤️ **[Live App](https://uffywtwr.vercel.app)** | ⚙️ **[Backend API](https://github.com/UffyLane/se_project_express)**

---

## About

WTWR fetches your local weather and recommends what to wear based on the temperature. Users can build a personal wardrobe, add clothing items tagged by weather type, and the app surfaces the right items for the day's conditions.

---

## Try It

**Live app:** https://uffywtwr.vercel.app

Test credentials:
- **Email:** test@wtwr.com
- **Password:** Test1234!

Or create your own account and add clothing items to your wardrobe.

---

## Features

- **Live weather** — fetches real-time conditions using your location via the OpenWeatherMap API
- **Temperature toggle** — switch between °F and °C
- **Wardrobe management** — add, view, and delete clothing items tagged as hot / warm / cold
- **Weather-matched recommendations** — only shows items suited to today's temperature
- **Authentication** — sign up, log in, and manage your profile with JWT
- **Like items** — save your favorite clothing cards
- **Protected routes** — profile and wardrobe require authentication
- **Responsive design** — works on mobile and desktop

---

## Tech Stack

**Frontend**
- React
- Vite
- React Router v6
- Context API
- CSS Modules

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Input validation
- Centralized error handling

**APIs**
- OpenWeatherMap API (current weather by coordinates)
- Browser Geolocation API

---

## Project Structure

```
se_project_react/
│
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Main/
│   │   ├── Profile/
│   │   ├── WeatherCard/
│   │   ├── ItemModal/
│   │   ├── AddItemModal/
│   │   ├── LoginModal/
│   │   ├── RegisterModal/
│   │   ├── EditProfileModal/
│   │   ├── ConfirmDeleteModal/
│   │   └── ProtectedRoute/
│   ├── contexts/
│   │   ├── CurrentUserContext.js
│   │   └── currentTemperatureUnitContext.js
│   ├── hooks/
│   ├── utils/
│   │   ├── api.js          # Backend API calls
│   │   ├── weatherAPI.js   # OpenWeatherMap calls
│   │   └── constants.js    # Coordinates, weather options
│   └── assets/
│       ├── day/            # Daytime weather images
│       └── night/          # Nighttime weather images
```

---

## Running Locally

**Clone the repo**
```bash
git clone https://github.com/UffyLane/se_project_react.git
cd se_project_react
npm install
```

**Create `.env`:**
```
VITE_API_URL=http://localhost:3001
VITE_WEATHER_API_KEY=your_openweathermap_key
```

**Start the app:**
```bash
npm run dev
# runs at http://localhost:5173
```

> You'll also need the backend running locally. See the [backend repo](https://github.com/UffyLane/se_project_express) for setup instructions.

---

## How It Works

1. On load, the app requests your location via the browser Geolocation API
2. Coordinates are sent to OpenWeatherMap to fetch current temperature and conditions
3. The temperature is matched against clothing items in your wardrobe (hot > 86°F, warm 66–86°F, cold < 66°F)
4. Matching items are displayed on the main page
5. Logged-in users can add new items, like items, and manage their profile

---

## Deployment

- **Frontend:** Vercel (auto-deploys from `main`)
- **Backend:** Render (Node.js web service)
- **Database:** MongoDB Atlas

---

## Author

**Stuart G. Clark Jr.**
[GitHub](https://github.com/UffyLane)

---

## License

MIT
