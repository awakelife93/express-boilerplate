# Node API Template

## React Client + React Admin + Gateway Server + API Server + Style Server

![구조](https://user-images.githubusercontent.com/20429356/158008003-23315066-bca4-402c-af4e-10d81a886ec7.png)

## Client Repository

https://github.com/awakelife93/react-template

## Admin Repository

https://github.com/awakelife93/react-admin-template

## Gateway Server Repository

https://github.com/awakelife93/spring-boot-gateway

## Style Server Repository

https://github.com/awakelife93/node-design-template

## 프로젝트 리팩토링

### Old Version = passport.js + redis + express template

### New Version = Api Server

## [노트]

### 설명

```
[환경설정]
.env를 사용한다.

1. generate ./env file (dotenv)
2. DB Table (Model) 추가 시
    2-1. go .src/lib/database.ts
    2-2. connectRepository function에 참조되는 AppRepository 객체에 선언
```

## 작성자

```
2020.05.14 -> 2021.06.16
Author: 박현우
```

## Framework & Library

```
Express
TypeORM
Mysql
Redis
JWT
Module Alias
Class Validator
Class Transformer
```

## 실행

```
1. npm i
2. npm start
  2-1. 현재 개발중으로 인해 nodemon을 붙인 상태이므로, package.json 수정해서 사용하길 요망
3. 설명란 참고
```

#
### Thanks To JetBrains
![Thanks To JetBrains](https://user-images.githubusercontent.com/20429356/156112274-1e0d4de3-b62d-4a67-989b-dadb52a2ff3f.png)
![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png)

