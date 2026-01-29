# Task Manager App

A simple React application to manage your daily tasks. You can **add, edit, and delete tasks**, track their **status and priority**, and view summary statistics like total, pending, and completed tasks. The app uses **mock API calls** to simulate network requests, making it easy to run without a backend.

---

## 🚀 Features

- **Add Task** – Create a new task with title, description, status, and priority.
- **Edit Task** – Update an existing task using the same modal form.
- **Delete Task** – Delete a task with a confirmation dialog.
- **Task Summary** – View total, pending, in-progress, completed, and high-priority tasks.
- **Loading & Error States** – Simulated API delay with proper loading indicators and error handling.
- **Reusable Components** – Clean separation of concerns (TaskList, TaskDetails, Modal, Dialog).

---

## 💻 Installation & Running the App

1. Clone the repository:

```bash
git clone <repository-url>
cd task-manager

2. Install dependencies:
Copy code
npm install

3. Start the development server:
Copy code
npm start

4. Open your browser and navigate to:
http://localhost:3000
The app should be up and running.
```

## ⚙️ API Configuration / Mock Mode

- The app is **mocked by default** – no backend is required.
- All “API calls” are simulated using `setTimeout` inside the app.

If you have a backend in the future, you can configure the API base URL in one place:

```ts
// src/config/api.ts
export const API_BASE_URL = process.env.REACT_APP_API_URL || "https://your-api-url";


.

## 🧩 Pages & Components

### Pages / Main Layout

Tasks.tsx – Main page of the app; manages state for tasks, loading, errors, modal, and dialogs.

### Components

1. **TaskDetails**

   Displays a summary of all tasks, including:
   - Total Tasks
   - Pending Tasks
   - In-Progress Tasks
   - Completed Tasks
   - High Priority Tasks

2. **TaskList**

   Displays a table of tasks with:
   - Title, Status, Priority
   - Edit and Delete actions
   - Calls `onEdit` and `onDelete` callbacks from the parent

3. **Modal**

   A reusable form for adding or editing tasks.
   - Receives an optional `initialTask` prop to pre-fill fields when editing
   - Handles form validation
   - Calls `onSave` on submit

4. **Dialog**

   A confirmation dialog for deleting a task.
   - Displays a message and two buttons: Cancel / Delete
   - Calls `onConfirm` when confirmed

## ⚡ Notes

- The app is fully functional **without a backend**.
- State is managed in `Tasks.tsx` using **React hooks**.
- The UI updates automatically whenever tasks are **added, edited, or deleted**.
- Designed with **readability and maintainability** in mind.

## 📦 Tech Stack

- **React** (with hooks)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (for icons)
```
