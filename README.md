# Watson Speech To Text Test

## Speech to Text Service

### IBM Bluemix

Create an [IBM Bluemix](https://console.ng.bluemix.net/) account

### Speech to Text service

From the IBM Bluemix console, create a "Speech to Text" Service

## Configure, Build and Run

To build and run the app, you need:
- docker
- docker-compose
- IBM Bluemix Speech To Text Service

### Configure

```bash
cp .env.dist .env
$EDITOR .env
```

Then edit the .env file using your IBM Bluemix Speech to Text Credentials

### Build

```bash
docker-compose build
```

Will build an image of the application

### Run

```bash
docker-compose up
```

Will run the application

The application is available on port 3000 of your docker host

- If you are using docker whithout docker-machine, the url should be ```http://127.0.0.1:3000/``

- If you are using docker-machine, ```http://< docker host ip >:3000/```
  You can find yout < docker host ip > with ```docker-machine ip < machine name >```

