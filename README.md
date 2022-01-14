# server

create school data:
`npx ts-node prisma/seed.ts  `

run prisma client
`npx prisma studio`

ensure db is in sync with prisma schema
`npx prisma migrate dev --name {migrationName}`

run server: 
`npm run dev`
