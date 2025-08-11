# 🚀 CRM Cluster

**CRM Cluster** is a full-stack Customer Relationship Management (CRM) system developed by **Abdiel Flores**.  
It’s designed to help freelancers and small businesses efficiently manage their clients, tasks, and communication.

---

## ✨ Features

- 📇 **Customer Management**  
  Register and update customer information (name, contact, history).

- 📞 **Interaction Tracking**  
  Log and view communication such as calls, emails, and personal notes.

- 🗓️ **Task Scheduling**  
  Schedule tasks and reminders tied to each customer.

- 📊 **Reports & Analytics**  
  Generate basic statistics: active customers, total sales, task history, etc.

- 🔁 **Real-Time Syncing**  
  Keep the interface up to date with Socket.io for instant updates.

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS

### Backend
- Express.js
- MySQL2
- JSON Web Token (JWT)
- Socket.io

### Deployment
- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Render](https://render.com/)

---

## 📂 Project Structure (Example)

```
crm-cluster/
│
├── client/               # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── tailwind.config.js
│
├── server/               # Backend (Express)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── socket.js
│
├── README.md
└── .env.example
```

---

## 🚧 Upcoming Features (To-do)
- [ ] Export reports to PDF or Excel  
- [ ] Upload and manage files (contracts, images)  
- [ ] Role-based access (Admin, Staff, Viewer)  
- [ ] Customer tags and filters  

---

## 🧑‍💻 Author

Developed by **Abdiel Flores**  
Software Engineering student focused on building modular, functional tools that solve real-world problems.  
Inspired by clarity, logic, and the power of well-designed systems.

---

## 📜 License

MIT License – Feel free to use, modify, and contribute.

## ⚙️ Quick Start

# Clone the repo
git clone https://github.com/tuusuario/crm-cluster.git

# Install dependencies
cd crm-cluster/client && npm install
cd ../server && npm install

# Run frontend and backend
npm run dev  # or your custom script
