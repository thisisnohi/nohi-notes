# sonar

> create by nohi 20200113

### 安装

参见：https://www.jianshu.com/p/4966af7412d4

* 安装postgreSql

  ```kotlin
  docker run --name postgresql -p 5432:5432 -e POSTGRES_USER=sonar -e POSTGRES_PASSWORD=sonar -e POSTGRE_DB=sonar -v postgres_volume:/Users/nohi/data/docker/volumes/postgres_volume -d postgres
  ```

  sonar/sonar   jdbc:postgresql://localhost:5432/postgres

* 安装sonarqube

```cpp
docker run --name sonarqube --link postgresql -e SONARQUBE_JDBC_URL=jdbc:postgresql://postgresql:5432/sonar -p 9002:9000 -d -v sonar_data:/Users/nohi/data/docker/volumes/sona_data -v sonar_extensions:/Users/nohi/data/docker/volumes/sona_extensions sonarqube
```

http://localhost:9002  admin/admin





