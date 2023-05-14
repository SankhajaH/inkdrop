

# Inkdrop

Inkdrop is a full-stack blogging platform built with Node.js and Next.js. It allows users to create, edit, and publish blog posts, as well as browse and search for posts created by other users.

## Features

- User authentication: Users can create an account, log in, and log out. Authentication is handled using NextAuth.js.
- Create and edit blog posts: Users can create new blog posts, edit existing ones, and delete posts they created.
- Browse and search posts: Users can view all blog posts created by other users, as well as search for posts by title.
- Responsive design: The platform is designed to work on desktop and mobile devices.

## Getting Started

To get started with Inkdrop, follow these steps:

1. Clone the repository: `git clone https://github.com/SankhajaH/inkdrop.git`.
2. Install dependencies: `npm install` or `yarn install`.
3. Set up environment variables: Create a `.env.local` file and add the following variables:
   ```
   MONGODB_URI=<your MongoDB URI>
   NEXTAUTH_URL=<your application URL>
   ```
4. Run the development server: `npm run dev` or `yarn dev`.
5. Open your web browser and go to `http://localhost:3000`.

## Technologies Used

- Node.js: Server-side JavaScript runtime environment.
- Next.js: React-based framework for building server-side rendered web applications.
- MongoDB: NoSQL document database.
- NextAuth.js: Authentication library for Next.js applications.
- Axios: Promise-based HTTP client for Node.js and the browser.

## Contributing

Contributions to Inkdrop are welcome and appreciated! To contribute, please fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
