#### Folder Structure
- /src
  - /components
    - /shared: holds all components that are shared through out the project
    - /ui: holds ui components from shadcn
  - /lib: contains anything related to libraries
    - /validation: holds the form schema
    - /appwrite: holds the appwrite client
    - utils.ts: holds the helper functions
  - /_auth: holds all the authentication related components
    AuthLayout.tsx: Helps to dynamically render either the sign in form or sign up form depending on the route.
    /forms: the different form compoonent (i.e signInform, and signup form)
  - /_root: holds the root component of the application.

#### Creating the Forms
1. Install froms from shadcn.
2. Define the shape of the form using zod schema.
3. Extract formShchema into a seperate file. Store in the /src/lib/validation folder.


The lib folder stores all functions that are not directly related to the UI. They store helper functions that are needed for a library to work.


#### Notes while developing
- When you define a Route element without a path, like in the case of AuthLayout, it means the component is used as a wrappper or layout for the child routes. It doesnt have its own URL; instead, it renders whenever any of its child routes are accessed. It renders whererver the child routes points. A more visual explanation:
1. User visits /sign-in:
  - AuthLayout renders
  - Inside AuthLayout, the SigninForm renders.

- When trying to use env variables in vite, you need to prefix the variable with VITE_. For example, to use the variable REACT_APP_APPWRITE_ENDPOINT, you need to prefix it with VITE_ to become VITE_REACT_APP_APPWRITE_ENDPOINT. This is because vite automatically replaces the REACT_APP_ prefix with VITE_. Then where you need it, you can use import.meta.env.VITE_REACT_APP_APPWRITE_ENDPOINT.
But you might get an error because typescript does know that env exist on import.meta. To fix this, you need to add a type definition file in the root of your project. Create a file called vite-env.d.ts and add the following code:
  ```typescript
    /// <reference types="vite/client" />
  ```