#### Folder Structure
- /src
  - /components
    - /shared: holds all components that are shared through out the project
    - /ui: holds ui components from shadcn
  - /lib
    - /validation: holds the form schema
  - /_auth: holds all the authentication related components
    AuthLayout.tsx: Helps to dynamically render either the sign in form or sign up form depending on the route.
    /forms: the different form compoonent (i.e signInform, and signup form)
  - /_root: holds the root component of the application.

#### Creating the Forms
1. Install froms from shadcn.
2. Define the shape of the form using zod schema.
3. Extract formShchema into a seperate file. Store in the /src/lib/validation folder.


The lib folder stores all functions that are not directly related to the UI. They store helper functions that are needed for a library to work.