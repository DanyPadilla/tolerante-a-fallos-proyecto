Interfaz basica:
![interfaz basica](https://github.com/DanyPadilla/tolerante-a-fallos-proyecto/assets/115854723/2dd64e66-2fca-40b6-80d8-03ec66328248)

Descargar microservicios:

`docker pull dany2831/reiniciador-juego`

`docker pull dany2831/generador-numeros-aleatorios`

`docker pull dany2831/manejador-conjeturas`

docker build -t dany2831/random-number-service:latest -f Dockerfile .
docker build -t dany2831/guess-service:latest -f Dockerfile .
docker build -t dany2831/game-reset-service:latest -f Dockerfile .

docker push dany2831/random-number-service:latest
docker push dany2831/guess-service:latest
docker push dany2831/game-reset-service:latest

docker build -t random-number-service .
docker build -t guess-service .
docker build -t reset-service .

kubectl get pods
kubectl get services

docker network inspect my_network

Reiniciar los Contenedores
Si realizaste cambios en los contenedores, asegúrate de reiniciarlos:
docker-compose down
docker-compose up -d


docker stop random-number-service guess-service reset-service
docker rm random-number-service guess-service reset-service

docker run -d --name random-number-service --network adivinanza-network -p 3001:3001 random-number-service
docker run -d --name guess-service --network adivinanza-network --link rabbitmq -p 3002:3002 guess-service
docker run -d --name reset-service --network adivinanza-network --link random-number-service -p 3003:3003 reset-service

***iniciar***

minikube start

kubectl apply -f guess/guess.yaml
kubectl apply -f random/randomNumber.yaml
kubectl apply -f resette/gameResette.yaml
kubectl apply -f rabbitmq.yaml

kubectl get pods
kubectl get svc

minikube service guess-service --url
minikube service random-number-service --url
minikube service game-reset-service --url
