build:
	docker compose up -d --build

restart-frontend:
	docker-compose down
	docker rmi fitty-frontend
	docker compose up -d --build