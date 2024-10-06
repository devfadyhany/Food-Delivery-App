# Food-Delivery-App

food delivery web application inspired by 'Talabat'.

<hr>

### Project Overview:

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) food delivery application where users can browse the menu, add items to their cart, proceed to checkout, and track their orders. An admin dashboard allows for managing categories, items, and orders status.
<hr>

### Used Technologies:

<ul>
  
  ##### Front-End📱:
  <ul>
    <li>React.js (with Hooks, Context API)</li>
    <li>React Router for routing</li>
    <li>Axios for HTTP requests</li>
  </ul>
  
  ##### Back-End🔧:
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB with Mongoose ODM</li>
    <li>JWT for authentication and authorization</li>
    <li>Nodemailer for email notifications (for email confirmation)</li>
    <li>Paymob Accept for order payment</li>
  </ul>
</ul>

<hr>

### Environment Variables:

Create a `.env` file in the `/server` directory and configure the following variables:
<pre>
  <code class="language-env">
    # SERVER
    PORT = your_port_for_running_the_server_on
    DB_CONNECTION_STRING = your_mongodb_connection_string

    # JSON WEB TOKEN
    JWT_SECRET_KEY = your_jwt_secret
    
    # Nodemailer
    NODEMAILER_AUTH_USER = your_email_address
    NODEMAILER_AUTH_PASS = your_gmail_app_key
    CONFIRMATION_ROUTE = your_client_route_for_confirming_emails
    
    # Paymob
    PAYMOB_URL = paymob_api_base_url
    PAYMOB_API_KEY = your_paymob_api_key
    PAYMOB_CARD_INTEGRATION_ID = your_paymob_card_integration_id
  </code>
</pre>
