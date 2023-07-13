# Fuel Station Delivery App (MERN Stack)
The Fuel Station Delivery App is a comprehensive application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It is designed to simplify and optimize the process of fuel delivery for fuel station owners and customers.

## Features
- User Registration and Authentication: Users can create accounts, log in securely, and manage their profile information.
- Fuel Station Management: Fuel station owners can register their stations, update fuel availability, pricing, and manage delivery schedules.
- Fuel Ordering: Customers can browse registered fuel stations, view fuel availability, pricing, and place orders for fuel delivery.
- Secure Payment Integration: Integration with secure payment gateways enables customers to make online payments for their fuel orders.
- Real-time Order Tracking: Customers can track the status of their fuel orders in real-time, from confirmation to dispatch and delivery.
- Notifications: Automated notifications and updates keep customers informed about order status, delivery schedules, and any changes.
- Ratings and Reviews: Users can provide feedback and ratings on their fuel delivery experience, helping fuel station owners improve their services.

## Prerequisites
- Node.js and npm installed on your local machine.
- MongoDB database set up and running.

## Getting Started
1. Clone the repository:
   ```git clone https://github.com/your-username/fuel-station-delivery-app.git```
2. Navigate to the project directory:
   ```cd fuel-station-delivery-app```
3. Install dependencies for the server:
   ```bash 
   cd server
   npm install
   ```
4. Set up environment variables:
Create a .env file in the server directory.
Add the necessary environment variables, such as database connection details and secret keys. Refer to .env.example for the required variables.
5. Start the server:
   ```bash 
   npm start
   ```
7. Install dependencies for the client:
   ```bash 
   cd ../client
   npm install
   ```
7. Set up environment variables:
- Create a .env file in the client directory.
- Add the necessary environment variables, such as API endpoint URLs. Refer to .env.example for the required variables.
8. Start the client:
```npm start```
9. Open your web browser and access the application at http://localhost:3000.

## License
This project is licensed under the MIT License. By contributing to this project, you agree to license your contributions under the same license.
