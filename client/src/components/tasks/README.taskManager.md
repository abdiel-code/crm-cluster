# TaskManager - Task management module

Modular system for create, edit, delete and watch tasks

---

## 🚀 Main features

- ✅ Full CRUD of tasks with validations and visual confirmations
- 🧩Animated modals for Add, Update and Delete with control overlays
- 📣 Message management with "handleMessage" for notifications
- 🧪 Testing with Jest for key functions
- 🎨 UX/UI design with key priority and visual security

## 📁 Module Structure

src/components/tasks/ ├── AddTaskButton.jsx ├── AddTaskForm.jsx ├── DeleteConfirmModal.jsx ├── FilterChart.jsx ├── FilterPanel.jsx ├── TaskChart.jsx ├── UpdateTaskForm.jsx ├── README.taskManager.md ← this file

---

## 🧩 Key Props on forms

```jsx
<AddTaskForm
    handleCreateTask={handleCreateTask}
    handleMessage={handleMessage}
    isActive={isModalOpen}
    toggleModal={toggleModal}
    userID={user.id}
/>

handleCreateTask: Function that sends the task to backend
handleMessage: Update global message for notifications
toggleModal: open/close modal
userId: creator identifier

🔄 Task creation flow
User open the modal
Completes formulary
function executes handleCreateTask(formData)
Backend answers with { message: "Task created successfully" }
handleMessage updates notification
Modal closes and the list is updated

🧪 Testing
Each critical function is validated with Jest test
Status validation, synchro and conditional rendering

🧠 Design philosophy
Clarity, modularization and mind peace
Each component have his own responsibility and te system is based in escalation

📌 Autor
Abdiel
