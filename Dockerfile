FROM node:18.13.0-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18.13.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

RUN npx typeorm migration:run

CMD ["node", "dist/main"]