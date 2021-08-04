start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon bin/slack.js

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

deploy:
	git push heroku