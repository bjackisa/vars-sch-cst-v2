# My Project - Your Gateway to Global Education

This project is a web application designed to connect Ugandan and East African students with international scholarship opportunities. It provides a comprehensive platform for students to browse scholarships, manage applications, and access related services to support their educational journey abroad.

## Features

- **Scholarship Listings:** Browse a curated list of scholarship opportunities from around the world.
- **User Dashboard:** A personalized dashboard for users to track their applications and manage their profiles.
- **Admin Panel:** An administrative interface for managing scholarships, users, and applications.
- **Application Portal:** A streamlined process for applying to scholarships.
- **Support Services:** Information and access to services such as visa support, housing assistance, and internships.
- **Country-Specific Information:** Tailored content and opportunities for different countries.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Backend & Database:** [Supabase](https://supabase.io/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20.x or higher recommended)
- [pnpm](https://pnpm.io/installation)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/my-project.git
    cd my-project
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following variables. You can get these from your Supabase project settings.

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).

## Deployment

This application is ready to be deployed to any hosting provider that supports Next.js. Vercel is a highly recommended option for its seamless integration with Next.js.

### Deploying with Vercel

1.  **Push your code to a Git repository** (e.g., GitHub, GitLab, Bitbucket).
2.  **Sign up for a Vercel account** and connect it to your Git provider.
3.  **Import your project** into Vercel.
4.  **Configure environment variables:**

    In your Vercel project settings, add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables with the same values from your `.env.local` file.

5.  **Deploy!** Vercel will automatically build and deploy your application. Any subsequent pushes to your main branch will trigger a new deployment.

## Developer Credit

This project was developed by **Jackisa Daniel Barack**.

-   **Email:** info@jackisa.com
-   **Website:** [my.jackisa.com](https://my.jackisa.com)
