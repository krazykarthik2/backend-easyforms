# Welcome to EasyForms API

## Routes
    - /api/events
        - GET: Get all events
        /create - POST: Create a new event
        /:id - GET: Get a event by id
        /edit/:id - PUT: Update a event by id
        /delete/:id - DELETE: Delete a event by id
    - /api/forms
        - GET: Get all forms
        /create - POST: Create a new form
        /:id - GET: Get a form by id
        /edit/:id - PUT: Update a form by id
        /delete/:id - DELETE: Delete a form by id
    - /api/auth/admin
        /login - POST: Login as admin
        /logout - POST: Logout as admin
    - /api/auth/user
        /login - POST: Login as user
        /logout - POST: Logout as user
    - /api/users
        / - GET: Get all users
        /:id - GET: Get a user by id
        /create - POST: Create a new user
        /edit/:id - PUT: Update a user by id
        /delete/:id - DELETE: Delete a user by id
    - /api/admins
        / - GET: Get all admins
        /:id - GET: Get a admin by id
        /create - POST: Create a new admin
        /edit/:id - PUT: Update a admin by id
        /delete/:id - DELETE: Delete a admin by id
    
