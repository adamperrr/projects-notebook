# Containerized PostgreSql DB

## First run - Compose container

```bash
cd database/
docker-compose -f docker-compose.yml up -d
```

## Other runs - Run existing container

1. Find containers of Postgres and Adminer

```bash
docker ps -a
```

2. Run Postgres container

```bash
docker run db_db_1
```

3. Run Adminer container

```bash
docker run db_adminer_1
```

## Login to DB instace

1. Open: http://localhost:8080/?pgsql=db&username=pguser&db=pgdb
2. Use password: `pgpass`
   > Where server name `db` is name of Docker container (service) (check docker-compose.yml file).

## URLs

- [Postgres - Official Image | Docker Hub](https://hub.docker.com/_/postgres)
- [Play databases with Adminer and Docker | by Etienne Rouzeaud | Medium](https://medium.com/@etiennerouzeaud/play-databases-with-adminer-and-docker-53dc7789f35f)
