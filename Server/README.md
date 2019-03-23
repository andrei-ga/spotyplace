# Spotyplace - server

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=spotyplace-server&metric=alert_status)](https://sonarcloud.io/dashboard?id=spotyplace-server)

## Configuration

Add the following User Secrets to Spotyplace.Web project

```
{
  "ConnectionStrings": {
    "DataAccessPostgreSqlProvider": "User ID=postgres;Password=postgres;Host=localhost;Port=5432;Database=spotyplace;Pooling=true;"
  },
  "Authentication": {
    "Google": {
      "ClientId": "",
      "ClientSecret": ""
    }
  },
  "AWS": {
    "Profile": "",
    "Region": "",
    "ServiceURL": "",
    "ProfilesLocation": ""
  },
  "Upload": {
    "MaxFileSize": "512000",
    "BucketName": "",
    "BasePath": ""
  }
}
```
