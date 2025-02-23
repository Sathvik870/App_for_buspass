****Bus Pass Application System**
Overview**
  The Bus Pass Application System is a web-based platform that allows users to apply for a bus pass, enter their details, and generate a downloadable PDF. The system consists of a user-friendly interface built with HTML, CSS (Tailwind), and JavaScript. The backend is powered by Node.js and Express, where a REST API handles the generation of PDFs.

**Features**
  * User-friendly Form: Users can enter their details like name, email, phone number, and address.
  * PDF Generation: The entered details are sent to the backend, which generates a PDF for download.
  * Responsive UI: The application has a modern and visually appealing design using Tailwind CSS.
  * Local Storage Support: User details are temporarily stored in local storage to maintain data before submission.
  * Dashboard Navigation: Users can navigate back to the dashboard after downloading the PDF.

**Installation & Setup**
  **1. Backend Setup**
        * Install node.js for backend
        * cd backend
        * Also Add .env file in backend and use these variables : 
            * MONGO_URI = "Your mongodb atlas url with respective database name"
            * PORT = 5000
        * npm install
        * node server.js
        * The backend will start on http://localhost:5000.
        
  **2. Frontend Setup**
        * Open terminal at frontend folder
        * Run "start index.html"
        * This will completely run your project

  **3. App setup :**
        * Install this app-debug.apk  in this below file structure for to use it in your Android smart phone.
        * Folder structure : Cordova check\BusPass_Renewal\platforms\android\app\build\outputs\apk\debug\app-debug.apk

    For any doubts contact me : sathvikayyasamyworks@gmail.com

**Project video**

https://github.com/user-attachments/assets/e8bc9b46-0488-4228-8ba8-7309dad8f378


