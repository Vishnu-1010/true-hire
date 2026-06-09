# True Hire

**A job portal where verified companies and startups can post job openings, and candidates can easily search and apply for positions.**

---

## **Tech Stack**

* **Frontend:** React.js, Tailwind CSS,Redux ToolKit
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Asset Storage:** ImageKit

---

## **Status**

MVP – work in progress

---

## **Features**

* Companies can register and post job openings.
* Candidates can create profiles and apply to jobs.
* Search and filter jobs based on category, location, or type.
* Image uploads for company logos / job posts via ImageKit.

*(We can expand this later with screenshots, videos, or GIFs.)*

---

## **Installation & Setup**

**Requirements:**

* Node.js (v18+)
* MongoDB instance (local or cloud)
* ImageKit account (for storing images)

**Steps:**

1. Clone the repository:

```bash
git clone https://github.com/Vishnu-1010/true-hire.git
cd true-hire
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Create a `.env` file in backend:

```
MONGO_URI=your_mongo_connection_string
PORT=your_port_number
SALT_ROUNDS=number
NODE_ENV=development_or_production
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
JWT_SECRET=your_jwt_secret
```

5. Run backend:

```bash
cd backend
npm start
```

6. Run frontend:

```bash
cd frontend
npm run dev```

Your app should now be running locally at `http://localhost:3000`.

---

## **Folder Structure (Optional but recommended)**

```
backend/
  controllers/
  models/
  routes/
  utils/
  server.js
frontend/
  src/
    components/
    pages/
    context/
    utils/
    store/
```
