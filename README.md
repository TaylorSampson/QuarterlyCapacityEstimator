# 🧠 Quarterly Capacity Estimator

A web-based tool for Agile teams to estimate and experiment with quarterly sprint capacity. Built with React, TailwindCSS, Framer Motion, and Recharts.

[Live Demo](https://taylorsampson.github.io/QuarterlyCapacityEstimator)

---

## 📊 What It Does

- Calculate team capacity based on:
  - Historical velocity
  - Team size
  - Time off (PTO, holidays)
- See **recommended commitment ranges**
- Visually compare experimental scenarios:
  - Add/remove engineers
  - Add OOO days
  - Live-updating chart + gauge
- Visual indicators for overcommitment

---

## 🧱 Tech Stack

- ⚛️ **React** (Vite)
- 🎨 **TailwindCSS**
- 📈 **Recharts** for bar chart visualization
- 🎞 **Framer Motion** for animated transitions

---

## 🧪 Run Locally

1. Clone the repo

```bash
git clone https://github.com/taylorsampson/QuarterlyCapacityEstimator.git
cd QuarterlyCapacityEstimator
```

2. Install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

---

## Features

- Gradient-styled UI with card layouts
- Responsive design
- Clear separation between **baseline team inputs** and **"what-if" experiments**
- Real-time gauge shows commitment pressure
- Subtle visual hierarchy and spacing for legibility

---

## 📁 Folder Structure

```
src/
├── App.jsx            # Main component
├── ScenarioChart.jsx  # Recharts bar chart
├── SprintGauge.jsx    # Circular gauge visualization
├── index.css          # Tailwind base styles
├── main.jsx           # Vite entry point
```

---


## 📝 License

MIT 
