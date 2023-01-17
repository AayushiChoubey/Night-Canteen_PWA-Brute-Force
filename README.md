<h2>Night Cravings: PWA Project for Night Canteen</h2>

<i>"Best conversations and meals only happen at night." <br>
Let's make memories with midnight Cravings.</i>

<br>
<b>Client Pages</b>: Login, Home, Cart, Payment, Error<br>
<b>Admin-only Pages</b>: Admin dashboard, Admin edit page.<br>

<b>Login Page:<br></b>
The login page will only give you access to the website only with the institute id; if it is accessed by the admin, PWA will direct the admin to the Admin dashboard. This feature is implemented by Google OAuth.

<b>Home Page contains:<br></b>
-Menu of dish items(Name, Availability, Veg/Non-Veg, Price, and Image)<br>
Allows users to select the dishes they want to order; they can increase and decrease the quantity of a particular dish. After finalizing the order by pressing “Confirm order,” they will be directed to the cart page.<br>
-Current order no. <br>
-Your order no. and its status(Preparing/Ready/ Delivered)<br>
-Bottom Navbar: Total no. of orders received, delivered, and Pending<br>
-Search Bar <br>

<b>Cart Page:<br></b>
-Show all the items added to the cart<br>
-  +(increase), -(decrease), add and delete items from the order.<br>
After confirming the order by selecting” Pay to order,” the user will be directed to the Payment Page.<br>

<b>Payment Page</b>: It is implemented by using Razor Pay.<br>
You will have to enter your contact number and email address to process to the order.<br>

After your payment has been completed, you will be directed to the home page, Where the information about your order will be displayed. <br>

<b>Admin Dashboard:<br></b>
- Display total orders delivered, received, and Pending.<br>
- Option to change the state of order according to its status.<br>
- Display complete details about all the orders which are made.<br>

<b>Admin edit Page:<br></b>
-Allows the admin to add dishes to the menu.<br>
Admin can set Name, Price, tag(Veg/Non-Veg), Availability, and Image of the dish.<br>
- Allows admin to delete the dish or change its availability status.<br>

<b>Error Page:<br></b>
When a user tries to access the web addresses than available ones, then an error page will be directed.<br>


