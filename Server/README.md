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
  }
}
```
