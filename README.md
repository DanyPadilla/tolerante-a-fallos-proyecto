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

kubectl apply -f random-number-service-deployment.yaml
kubectl apply -f guess-service-deployment.yaml
kubectl apply -f game-reset-service-deployment.yaml


kubectl get pods
kubectl get services

