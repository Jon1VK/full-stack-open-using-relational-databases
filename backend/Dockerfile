FROM node:16-alpine AS development
WORKDIR /app
ENV NODE_ENV=development
COPY ./package*.json ./
RUN npm install
CMD ["npm", "run", "dev"]
