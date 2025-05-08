# DefectDetect - AWS Architecture Wizard

A Next.js application that helps users design and analyze AWS architectures based on their requirements.

## Features

- User authentication (Register/Login)
- Multi-step wizard form for architecture requirements
- AWS architecture analysis and recommendations
- Modern UI with Material-UI and shadcn/ui components
- Database integration with Prisma and SQLite

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

## Installation Steps

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Install additional required packages:
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material formik --legacy-peer-deps
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Create a `.env` file in the root directory with the following content:
```env
DATABASE_URL="file:./dev.db"
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── login/
│   │   └── register/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   └── wizard/
├── components/
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
└── public/
```

## Key Features Implementation

### Authentication
- User registration and login with email/password
- Password hashing with bcrypt
- JWT-based authentication (to be implemented)

### Database
- SQLite database for development
- Prisma ORM for database operations
- User model with email and password fields

### Wizard Form
- Multi-step form for architecture requirements
- Dynamic form fields based on user selections
- Form validation with Formik
- Material-UI components for the interface

## API Endpoints

### Authentication
- POST `/api/register` - Register a new user
- POST `/api/login` - Login existing user

### Architecture Wizard
- POST `/api/kickoff` - Submit architecture requirements and get analysis

## Development Notes

1. The application uses Next.js 13+ with the App Router
2. Authentication is handled through API routes
3. Database operations use Prisma Client
4. UI components are built with Material-UI and shadcn/ui
5. Form handling uses Formik for validation and state management

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check if the database is properly initialized
3. Verify that the `.env` file exists with correct configuration
4. Clear the `.next` folder and node_modules if needed:
```bash
rm -rf .next node_modules
npm install
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[Your chosen license]

## Contact

[Your contact information] 