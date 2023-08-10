This project was generated with yarn, to start using it, you will need to do the following:

First we need to have yarn installed on your computer, to do so, run the following in the command line
```bash
npm install --global yarn
```

To install all the project dependencies, inside the project's root folder, run the following in the command line

```bash
yarn
```

Create a `.env` file at the root of your project using the `.env.example` file to know which keys to add


Add these env variables specifically (it's important to have exactly the same so we all run the same db in docker):
```
DATABASE_URL=postgresql://chingu:chingu@chingu:5432/dashboard?schema=public
HOSTNAME=chingu
POSTGRES_USER=chingu
POSTGRES_PASSWORD=chingu
POSTGRES_DB=dashboard
PGADMIN_EMAIL=chinguadmin@chingu.com
PGADMIN_PW=chingu5432
```

Run these commands when starting up your project:

```
docker compose build
docker compose up
```

Open a 2nd terminal window and run these commands:

```
docker ps
docker exec -it <id of app container> sh
npx prisma migrate dev
```

Docker ps should list 3 containers (assuming you're not running anything else). If you have more, you can just look for 3 that were created recently. The
id you want should be under a image name of something like chingu-dashboard_app (it should be whatyounamedyourprojectfolder-app). The other 2 image names will have pgadmin and postgres in it (look for the one without
those in its name).

If you have docker desktop, you can just use the cli in the app container using the gui (way easier).

To open pgadmin, go to localhost:4000. Put in the credentials, as written in the .env file. Again, if you have docker desktop, you can just open from the gui.

To run prisma studio, follow the same steps above to invoke a command inside your docker container.

```
docker ps (to find the id of your container)
docker exec -it <id of app container> sh
npx prisma studio
```

**It is important to run your migration before running prisma studio or it will error**

When done with your session, run the following command:

```
docker compose down
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
