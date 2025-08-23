# Lattice Mobile Developer Assessment

This project is a React Native + TypeScript application built to satisfy the requirements of the Lattice Mobile Developer Assessment. It features an AI Conversation page and a Dashboard page with widget management, all designed with a mobile-first approach.

## 🚀 Setup & Run Instructions

npx expo install @react-navigation/drawer @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-native-gifted-charts react-native-svg @react-native-picker/picker expo-linear-gradient

npm install -g eas-cli
eas login
eas build:configure
eas build --platform android

**Prerequisites:**

- Node.js (LTS version)
- Expo Go app on your iOS or Android device, or a running simulator.

**Installation & Running:**

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd LatticeMobileAssessment
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npx expo start
    ```
    This will start the Metro bundler. Scan the QR code with the Expo Go app on your device to run the application.

---

## ✨ Feature Walkthrough

### [cite_start]AI Conversation Page [cite: 10]

The AI Conversation page provides a standard, mobile-friendly chat experience.

- [cite_start]**Swipable Sidebar:** A left-swipable drawer contains the list of all conversation threads and a navigation link to the Dashboard[cite: 13].
- **Thread Management:**
  - [cite_start]**Switching:** Tap on any thread in the sidebar to switch to it[cite: 18].
  - [cite_start]**Editing:** Tap and hold a thread in the sidebar to bring up an input to edit its title[cite: 18].
  - **Deleting:** Swipe a thread from right to left to reveal a delete button. [cite_start]A confirmation modal appears before deletion[cite: 18, 64].
- **Chat Interface:** The main screen displays messages in the active thread. [cite_start]A prompt input at the bottom allows you to send new messages[cite: 14, 19].
- [cite_start]**Simulated AI Response:** After sending a message, a simulated, hardcoded AI response is added to the chat with a typing animation[cite: 19, 62].

### [cite_start]Dashboard Page [cite: 22]

The Dashboard is designed to adapt complex web interactions for a mobile-native feel.

- **Dashboard Management:**
  - [cite_start]**Switching:** A picker at the top of the screen allows you to switch between different dashboards[cite: 26].
  - [cite_start]**Creating:** An "Add Dashboard" button lets you create new dashboards[cite: 26].
  - [cite_start]**Deleting:** A delete button next to the picker allows you to remove the currently active dashboard (with confirmation)[cite: 26].
- **Widget Management:**
  - [cite_start]**Display:** Widgets containing line charts are displayed in a simple vertical list within the active dashboard[cite: 27, 28].
  - [cite_start]**Creating:** An "Add Widget" button adds a new chart widget to the current dashboard[cite: 26].
  - [cite_start]**Deleting:** Each widget has a delete ('x') icon to remove it from the dashboard[cite: 26].

---

## decyzje UI/UX

- [cite_start]**Main Navigation:** A Drawer Navigator was chosen for the primary navigation to directly implement the "swipable sidebar" requirement[cite: 13]. This feels natural on mobile and provides a clean way to tuck away thread management.
- [cite_start]**Mobile Widget Management:** Traditional web-based drag-and-drop is clunky on mobile[cite: 34]. [cite_start]I opted for a simpler, touch-friendly approach: a vertical list of widgets[cite: 36]. Users can add to this list and delete items directly. This avoids complex gestures, making management fast and intuitive on a small screen.
- **Confirmation Flows:** Destructive actions like deleting a thread or dashboard trigger a confirmation modal. [cite_start]This is a standard mobile UX pattern that prevents accidental data loss[cite: 18].
- [cite_start]**Bonus - Swipe-to-Delete:** For thread deletion, a swipe gesture was implemented[cite: 64]. This is a common and efficient pattern in mobile apps (e.g., email clients) that power users appreciate.

---

## 🏛️ Architecture Notes

- **Component Structure:** The app is organized by feature (`chat`, `dashboard`) and function (`components`, `screens`, `context`, `navigation`). Shared components are separated to promote reusability. [cite_start]This keeps the codebase maintainable and easy to navigate[cite: 53].
- [cite_start]**State Management:** **React Context with a `useReducer` hook** was chosen for global state management[cite: 49]. This approach is lightweight and built-in to React, making it sufficient for the app's complexity without adding external libraries like Redux. The reducer handles all logic for managing threads, dashboards, and widgets in a centralized and predictable way.
- [cite_start]**Nested Relationships:** The state is designed to handle the dashboard-widget relationship[cite: 47]. The global state holds an array of `dashboards`, and each `dashboard` object contains an array of its own `widgets`. The reducer logic ensures that when a widget is added or deleted, it's correctly associated with the currently active dashboard.
- [cite_start]**TypeScript:** Strict typing is used throughout the application to avoid errors and improve developer experience[cite: 59]. All major data structures (`Thread`, `Message`, `Dashboard`, `Widget`) have defined interfaces in `src/types/index.ts`.

---

## 🎁 Bonus Features Implemented

- [cite_start]**Simulated Streaming for AI Responses[cite: 62]:** A custom hook (`useSimulatedTyping`) creates a more engaging "typing" effect for AI messages.
- [cite_start]**Swipe Gestures for Delete Actions[cite: 64]:** Implemented swipe-to-delete on conversation threads in the sidebar using `react-native-gesture-handler`.
- [cite_start]**Smooth Animations and Transitions[cite: 65]:** `LayoutAnimation` is used for smooth transitions when adding/deleting dashboards and widgets.
