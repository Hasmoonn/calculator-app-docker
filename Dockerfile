FROM node:18

WORKDIR /calculator

# Copy dependency files first (important for caching)
COPY package*.json .

# Install dependencies
RUN npm install

COPY calculator.html .
COPY style.css .
COPY server.js .

# Expose port (change if your server uses another port)
EXPOSE 4000

CMD ["node", "server.js"]  