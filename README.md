# server

create school data:
`npx ts-node prisma/england_school_information_create.ts  `

run prisma client
`npx prisma studio`

ensure db is in sync with prisma schema
`prisma migrate dev --name {migrationName}`

run server: 
`npm run dev`
