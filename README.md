# WTWR (What to Wear?)

> **Weather-based clothing recommendations for your day.**

🌤️ **[Live App](https://uffywtwr.vercel.app)** | ⚙️ **[Backend API](https://github.com/UffyLane/se_project_express)**

---

## About

WTWR checks the weather where you are and shows what to wear. Signed-out visitors land on a page that explains itself: a hero themed to the live weather, a three-step "how it works" row, and sample outfits for today's temperature. Signed-in users build a personal wardrobe of clothing tagged hot / warm / cold, and the app surfaces the items that suit the day.

---

## Try It

**Live app:** https://uffywtwr.vercel.app

Test credentials:
- **Email:** test@wtwr.com
- **Password:** Test1234!

Or create your own account and add clothing items to your wardrobe.

> The backend is hosted on Render's free tier, so the first request after a period of inactivity can take ~50 seconds to wake up.

---

## Features

- **Landing page for new visitors** — a hero whose background follows the live weather (clear, clouds, fog, rain, snow, storm, day and night), a three-step explainer, and a sample wardrobe that shows the weather-to-outfit matching before anyone signs up
- **Live weather** — real-time conditions for your location via the OpenWeatherMap API, with a default location if you decline the location prompt
- **Honest loading and error states** — "Checking your local weather…" while it loads, and a clear message if the weather service can't be reached, instead of a made-up temperature
- **Temperature toggle** — switch between °F and °C
- **Wardrobe management** — add, view, and delete clothing items tagged as hot / warm / cold
- **Weather-matched recommendations** — only shows items suited to today's temperature
- **Authentication** — sign up, log in, and manage your profile with JWT
- **Like items** — save your favorite clothing cards
- **Protected routes** — profile and wardrobe require authentication
- **Responsive layout** — works on phones and desktops

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Context API (current user, temperature unit)
- Plain CSS with BEM-style class names

**Backend** ([se_project_express](https://github.com/UffyLane/se_project_express))
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication, bcryptjs password hashing
- Celebrate request validation
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
│   │   ├── App/                 # State, routes, API wiring
│   │   ├── Header/ Footer/
│   │   ├── Main/                # Landing (signed out) or recommendations (signed in)
│   │   ├── Welcome/             # Weather-themed hero
│   │   ├── HowItWorks/          # Three-step explainer
│   │   ├── SampleOutfit/        # Sample wardrobe for signed-out visitors
│   │   ├── WeatherCard/ ToggleSwitch/
│   │   ├── ItemCard/ ItemModal/ AddItemModal/ ConfirmDeleteModal/
│   │   ├── LoginModal/ RegisterModal/ EditProfileModal/ ModalWithForm/
│   │   ├── Profile/ ClothesSection/ SideBar/
│   │   └── ProtectedRoute/
│   ├── contexts/
│   │   ├── CurrentUserContext.jsx
│   │   └── currentTemperatureUnitContext.jsx
│   ├── hooks/                   # useForm
│   ├── utils/
│   │   ├── api.js               # Backend API calls
│   │   ├── weatherAPI.js        # OpenWeatherMap calls + hot/warm/cold sorting
│   │   └── constants.js         # Default location, weather images, sample wardrobe
│   ├── vendor/                  # Cabinet Grotesk font files + @font-face rules
│   └── assets/
│       ├── day/                 # Daytime weather banners
│       └── night/               # Nighttime weather banners
```

---

## Running Locally

**Prerequisites:** Node.js 20.19+ and the [backend](https://github.com/UffyLane/se_project_express) running locally (it listens on port 3001 by default).

```bash
git clone https://github.com/UffyLane/se_project_react.git
cd se_project_react
npm ci
```

Create `.env.development.local`:

```
VITE_API_URL=http://localhost:3001
VITE_WEATHER_API_KEY=your_openweathermap_key
```

```bash
npm run dev
# runs at http://localhost:3000
```

> **Why `.env.development.local` and not `.env`?** The repo commits an `.env.local` that points at the production API, and Vite gives `.env.local` priority over `.env`. A plain `.env` would be silently ignored and you'd be talking to production data. `.env.development.local` has higher priority than both. It's git-ignored, so your key stays out of the repo.

---

## How It Works

1. On load, the app asks the browser for your location. If you decline, it uses a default location in Minnesota.
2. The coordinates go to OpenWeatherMap, which returns the temperature and conditions.
3. The temperature is sorted into a type: **hot** above 86°F, **warm** from 66–86°F, **cold** below 66°F.
4. **Signed out:** the hero, explainer, and sample outfits for today's type. Visitors can switch between hot / warm / cold to see how the matching works.
5. **Signed in:** the weather banner, plus the clothing items whose weather tag matches today's type. If none match, the page says so and points to **+ Add Clothes**.

---

## Known Limitations

- **The weather API key is visible in the browser.** It's a free OpenWeatherMap key read from `VITE_WEATHER_API_KEY`, and any `VITE_` variable is bundled into client code. Proxying the weather call through the backend would keep it private.
- **Weather is fetched once per page load**, not refreshed while the page stays open.
- **Most sample wardrobe photos are hosted by TripleTen's storage.** If one fails to load, the card shows a placeholder instead of a broken image. The sweater and raincoat icons are bundled in the repo (`src/assets/sample/`).
- **`npm run lint` doesn't run yet.** `eslint.config.js` uses the older config format that ESLint 9 no longer reads.
- **No automated tests yet.**

---

## Deployment

- **Frontend:** Vercel (auto-deploys from `main`)
- **Backend:** Render (Node.js web service)
- **Database:** MongoDB Atlas

---

## Author

**Stuart G. Clark Jr.**
[GitHub](https://github.com/UffyLane) · [Portfolio](https://www.uffylanes.com/)

---

## License

MIT
