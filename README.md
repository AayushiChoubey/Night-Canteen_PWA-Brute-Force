<h2>Night Cravings: PWA Project for Night Canteen</h2>

<i>"Best conversations and meals only happen at night." <br>
Let's make memories with midnight Cravings.</i>
<hr>
<h3>Website link-</h3>
<b>Client</b> : https://night-cravings.netlify.app<br>
<b>Server</b>: https://night-cravings.onrender.com/dish/getAll<br>
<br>
<img width="550 px" src="https://user-images.githubusercontent.com/85924944/213009298-79c98b48-1ca5-4dc2-9ab7-108110de39d3.png">
<hr/>
<h3>Screenshots: </h3>
<div>
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010007-89d59d96-aac3-4271-b47b-4a6cacccd526.jpg">

<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010044-ee85707e-7db9-47ec-8d3a-9a89dead1320.jpg">

<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010175-e3d5986d-76d7-4f0d-96ad-2dafa84c09ff.jpg">
</div>
<div>
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010248-d935948b-c378-428a-a091-1cca6e53fa51.jpg">  
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010253-4cc32ba5-c67a-418b-9bf6-2091d08edbf6.jpg">  
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010372-26627802-768a-4093-903f-623fb8882eee.jpg">
<div/>
<div>
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010255-832474d3-bd63-433d-8193-98533544bff2.jpg">
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010470-4c30e725-1089-44c0-818a-1820b59c6815.jpg">
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010500-eea9bad8-6d67-46aa-bd18-8c4a7dd58bb7.jpg">
<div/>
<div>
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010549-70d5c25f-af69-4582-b6cf-d8e2643230ae.jpg">
<img height="550 px" src="https://user-images.githubusercontent.com/85924944/213010625-1938f305-f718-48ac-afcd-66bed7c6c53d.jpg">
<div/>


<h4><hr> Description</h4>


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

<h3>Technologies Used:</h3>
-React.Js
-Node.Js
-Firebase
-Express.Js
-Router Dom
-Redux
-Razor Pay
-Google OAuth
-Bootstrap 




