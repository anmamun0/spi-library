#  Sylhet Polytechnic Library Management System 

> `The Web Application For digitalize ~(Sylhet Polytechnic Institute) `

> The Sylhet Polytechnic Library (**`spi`**) Management System is a web-based solution primarily developed for Library Administrators to efficiently manage library operations such as book inventory, student membership, book issuing, and returns. It also facilitates controlled student access, ensuring accountability and streamlined management.



####  *– Contributors*
> Developed Engineers: | [`AN Mamun`](https://anmamun0.vercel.app/) <br>

---
 
 
<h3> 
  
[  <code> Frontend Live </code>](https://spi-library.vercel.app/) [ <code> Fontend GitHub </code>](https://github.com/anmamun0/spi-library)  [ <code> Backend Live </code>](https://spi-library.onrender.com/)  [ <code> Backend GitHub </code>](https://github.com/anmamun0/polytechnic-library-system-Backend) 

</h3>

 
## 🧰 Tools & Technologies

- **Frontend:** React.js, TailwindCSS
- **Backend:** Django REST Framework
- **Authentication:** JWT (JSON Web Token)
- **Database:** Supabase (PostgreSQL)
- **Deployment:**  
  - Frontend: [Vercel](https://vercel.com)  
  - Backend: [Render](https://render.com)

---

## 👥 User Roles

### 🧑‍🎓 Student Panel
- Register and log in using JWT authentication
- Browse all available books
- Request to borrow books
- View personal profile and transaction history

### 🛠️ Admin Panel
- Verify student registrations
- Add, update, or delete book records
- Manage all borrow/return transactions
- Update transaction statuses: **Pending → Borrowed → Returned**

---

## 🔁 Book Transaction Flow

1. **Student requests** a book to borrow.
2. After visiting the library physically, **Admin updates** the transaction status to `Borrowed`.
3. When the student returns the book, **Admin updates** it to `Returned`.
4. Each transaction is tracked in the system to maintain history and accountability.

---

## 🏗️ Project Structure

