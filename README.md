# Event Countdown Collection

Track all your important events in one beautiful place.

## Features

- Create unlimited countdowns
- Live countdown timers (updates every second)
- Visual urgency indicators (red for soon, blue for far)
- Edit and delete countdowns
- Automatic sorting (upcoming first)
- Beautiful animations
- Data persists in localStorage

## Design Choices

**Visual Urgency**: Color-coded borders show event proximity:

- Red: 1 day or less
- Orange: Within 7 days
- Yellow: Within 30 days
- Blue: More than 30 days

**Smooth Animations**: Framer Motion for delightful transitions

**Clean UX**:

- Add dark mode feature fro visibility options
- Auto-focus on event name
- One-click delete with confirmation
- Real-time countdown updates

## What I'd Improve

- Add categories/tags
- Email/push notifications
- Recurring events
- Export/import countdowns
- Dark mode

## Tech Stack

- Next.js
- Typescript
- Tailwind CSS
- Framer Motion
- date-fns
- localStorage
