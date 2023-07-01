# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY package.json ./
RUN npm install
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD ["npm", "start"]


#TODOS LOS COMANDOS DEBEN DE SER CON MINUSCULAS Y SIN GUIONES BAJOS
#Comandos Generales
#systemctl start docker

###sudo docker login
### username:
### password:

#sudo docker build --tag moonbyte/frontend_pf_ayd1 .  
#sudo docker push moonbyte/frontend_pf_ayd1

#  PARA CLOUD RUN:
# docker pull moonbyte/frontend_pf_ayd1
# docker tag moonbyte/frontend_pf_ayd1 gcr.io/so1-proyecto-385004/frontend
# docker push gcr.io/so1-proyecto-385004/frontend
#

#Para ver las imagenes presentes:
#sudo docker images

#Para ver los contenedores presentes:
#sudo docker ps

#Para eliminar imagenes:
#sudo docker rmi ID  (3 letras principales del id de las imagenes)

#Para eliminar contenedores:
# sudo docker rm ID (3 letras principales del id del contendor)