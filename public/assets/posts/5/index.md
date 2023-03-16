---
title: '블로그 개발기 - 설계편'
subTitle: '기술 스택 및 객체 구조 설계'
date: '2022-11-16'
tags: 'CleanArchitecture'
---

개발은 블로그 Front-end 작업부터 시작하였습니다. 우선 선택한 기술 스택을 살펴보자면,

UI 프레임워크는 `SSR(Server-side Rendering)`을 위해 [NextJS](https://nextjs.org)를 선택했습니다.

전체 구조는 [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)를 적용하였는데, 역할에 따라 나누어진 코드 계층의 경계가 명료하고 변경 사항이 영향을 미치는 범위가 명확하여 즐겨 사용하고 있습니다. 예컨대, 처음에는 서버 없이 [Prisma](https://www.prisma.io)를 이용하여 직접 `Database`와 연결할 계획인데, 이후에 서버 구축 시 `Data` 계층에 존재하는 `Prisma` 관련 코드만 서버 API 코드로 변경하면, 상위 계층의 코드를 그대로 사용할 수 있습니다.

Database는 [MySQL](https://www.mysql.com)으로 정했습니다. 지금까지 주로 `NoSQL`을 사용해왔기에 관계형 데이터베이스에 도전해보고 싶었습니다. `PostgreSQL`과 고민 하다가 가장 대중적이고 기본이라고 여겨지는 `MySQL`로 정했습니다.

서버는 앞서 언급하였듯이 당장 개발하지는 않고  `ORM(Object Relational Mapping)` 도구인 `Prisma`를 선택하였습니다. 직접 제작을 고민하다가 블로그 특성상 API 종류가 다양하지 않고 `Prisma`에서 기본으로 제공하는 API면 충분할 것 같아 빠르게 개발할 수 있는 Prisma를 우선 적용하였습니다. 이후에 `NestJS` 를 사용하여 서버 코드를 작성할 예정입니다.

## 구조 설계

![구조 설계](https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnxblasu4vht/b/blog/o/blog_architecture.jpg)

구조 설계

## Entity 정의

```tsx
class Post {
	id: number;
	title: string;
	createdAt: Date;
	description: string;
	body: string; // Markdown
	tags: string[];
}
```

## UseCase 정의

- `Post`
    - `get(id: number): Post`
    - `getList(): Post[]`
    - `translateMarkdownToHTML(markdown: string): string`

## Database 설치 및 설정

- 설치 - [Homebrew](https://brew.sh/index_ko)를 통해 `MySQL`을 설치 합니다.
- Database(이하 DB) 주소 관리
- DB 주소: `mysql://${USER_NAME}:${PASSWORD}@localhost:${PORT_NUMBER}/${DATABASE_NAME}`

- DB 주소를 외부에 노출시키지 않기 위해 `.env` 에 저장하여 환경 변수로 관리합니다.

- local DB 주소는 `.env.local`에 저장하고, 실제 DB 주소는 `.env.production` 파일에 저장합니다.

- `NextJS`는 실행 스크립트에서 함께 작성한 `--${FLAG}` 값과 매칭되는 `.env` 파일을 사용하는데, `local`은 local에서, `production`은 build 시 기본  FLAG로 동작합니다.

- 위 두 파일은 `.gitignore`에 등록하여 `Github` 공개 저장소에 노출되지 않도록 합니다.
- `Prisma`를 사용하므로 `schema.prisma` 파일에 DB 및 Schema 정보를 작성하면 됩니다.

```
generator client {
	provider = "prisma-client-js"
}

datasource db {
	provider = "mysql"
	url      = env("DATABASE_URL")
}

model PostData {
	id          Int      @id @unique(map: "Posts_ID_uindex") @default(autoincrement())
	title       String   @db.VarChar(32)
	createdAt  DateTime @default(now()) @db.Timestamp(0) @map("created_at")
	description String   @db.VarChar(100)
	tags        String   @db.VarChar(500)
	body        String   @db.VarChar(5000)
	@@map("Post")
}
```

- `Post` Entity가 존재하지만, Database Model을 위한 `PostData` 를 추가로 정의하였습니다. `PostData` 타입은 `PostTranslator` 객체를 이용하여 `Post` 타입으로 변환시킨 뒤 상위 계층으로 전달합니다.
- Schema 정의와 DB 설정을 완료하면

```bash
prisma generate
```

위 명령어로 해당 설정을 `Prisma Client`에 적용합니다.

- `prisma pull` 또는 `prisma push` 명령어로 DB Schema를 가져오거나 Client 측 Schema를 DB에 적용할 수도 있습니다.