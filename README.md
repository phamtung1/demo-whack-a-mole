# 🎯 Whack-a-Mole (AI-Built Game)

Whack-a-Mole is a fun, fast-paced browser game where players click on appearing moles 🐹 to earn points and avoid bombs 💣 that end the game. Built entirely with the help of AI, this game demonstrates how collaborative development can be enhanced using artificial intelligence for ideation, coding, and testing.

Developed by Team **Byte Buddies** — Tuan, Winston, Hong, and Tung — as part of an AI-assisted software engineering initiative.

---

## 📦 Project Description

- A **browser-based grid game** playable on desktop and tablet.
- Players click **moles** to gain points and **bombs** end the game.
- The game becomes faster and harder as levels increase.
- Built using **HTML**, **CSS**, and **JavaScript** (no backend required).
- Entirely designed, coded, and documented through AI collaboration.

---

## 🚀 Setup & Run Instructions

### 📁 Local Development

1. **Clone or download** this repository.
2. Open the folder and launch `index.html` in a modern browser.

```bash
git clone https://github.com/your-username/whack-a-mole.git
cd whack-a-mole
open index.html
```

## 🌐 Deployed Version

You can play the live version here:
🔗 https://whack-a-mole-byte-buddies.netlify.app/


## 🎮 Game Rules
- Click the mole (🐹) to earn +10 points.

- Avoid the bomb (💣) — clicking it triggers Game Over and resets the score and level.

- Clicking an empty hole has no effect.

- The game speeds up every time your score crosses 100, 200, 300, and 400 points.

- Maximum level is 5; objects appear faster at higher levels:

- Level 1: 1.5s → Level 5: 0.6s

- Score and high score are displayed and saved automatically.

- A visual/audio effect is triggered with every hit or mistake.

- You can Start, Pause, or Reset the game at any time using control buttons.

## 📊 Technologies Used

- HTML5 – Markup for game layout.

- CSS3 – Styling and animations.

- Vanilla JavaScript – Game logic, interactivity, and state management.

- localStorage – To persist high scores across sessions.

- Audio API – To play sound effects.

- ARIA & Semantic HTML – For accessibility support.

## 🧪 Tested Features

- Scoring rules: +10 for mole, -5 for bomb (never below 0).

- Level progression at score milestones.

- Bomb ends the game immediately.

- Visual/audio feedback with each click.

- Pause/resume without timer glitches.

- High score persists using localStorage.

## 🧯 Non-Functional Highlights

- ⚡ Loads in under 3 seconds.

- 📱 Fully responsive and mobile-friendly.

- 🎯 Accessible to keyboard users and screen readers.

- 🔐 No data collected or sent to a server (privacy-safe).

- 🧠 Entire codebase and requirements generated through AI assistance.

## 📜 License
MIT License — Free to use, modify, and distribute.

## 🧠 Built With AI

Every requirement, user story, acceptance criteria, and code file was created using ChatGPT (OpenAI) based on best practices in agile development, game design, and modern web standards.

Team Byte Buddies explored how to turn natural language ideas into complete software through iterative AI-driven collaboration.