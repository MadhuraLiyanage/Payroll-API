FROM node:20.10-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --force
RUN npm install nodemon --force
COPY . .
EXPOSE 3040
RUN chown -R node /app
USER node
CMD ["npm", "start"]

