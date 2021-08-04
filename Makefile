start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon server/server.js

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

deploy:
	git push heroku