---
title: '블로그 개발기 - 기획편'
subTitle: '풀스택 개발 첫 걸음'
date: '2022-11-16'
tags: 'NextJS, React'
---

현재의 블로그는 [Gatsby](https://www.gatsbyjs.com)라는 [React](https://reactjs.org) 기반 정적 페이지 생성 도구를 이용하여 제작하였습니다.

제작 당시 기술 스택을 선택하기 위해 고려했던 것은 단 2가지, 개발 속도 그리고 유지 가격이었기 때문에 사용법이 간단하고 컴퓨팅 파워 없이 무료 호스팅 서비스에 업로드 할 수 있는  `Gatsby`는 꽤나 매력적인 선택지였습니다.

`Gatsby`와 `Firebase`의 무료 호스팅 서비스를 이용하여 빠르게 블로그를 제작하였습니다.

`Gatsby`는 프레임워크가 지정한 폴더에 `MarkDown` 파일만 작성하여 저장한 뒤 빌드하면, 바로 `SEO(Search Engine Optimization, 검색 엔진 최적화)`가 적용된 웹페이지를 얻을 수 있다는 큰 장점이 있었습니다.

하지만 한편으로는 정적 페이지 생성 도구이기 때문에 게시물을 추가하거나 수정, 삭제할 때 코드를 새로 빌드하여 배포해야 한다는 단점이 있었습니다.

이는 코드를 빌드하고 배포할 수 있는 환경에서만 블로그 컨텐츠를 변경할 수 있다는 것을 의미합니다.

(CMS와 관련 Hook을 이용하면 환경적인 제약은 어느정도 해결할 수는 있지만, 여전히 매 번 코드를 새로 빌드해야 한다는 단점은 남아 있습니다.)

환경적인 제약 없이 데이터만 변경하여 게시물을 관리하면서 검색 엔진에 최적화된 블로그를 얻고 싶다면 어떻게 해야 할까요? 아마도 `Database`와 `SSR(Server Side Rendering)`이 필요할 것입니다. 그리고 이를 위한 서버, 서버를 운영할 컴퓨팅 및 네트워크 서비스 또한 필요할 것입니다.

개인적으로 지금까지는 `Back-end(이하 백엔드)`와 `Infrastructure(이하 인프라)`를 직접 구축하거나 운영하는 경험을 접할 일이 없었습니다. 업무에서는 해당 업무 담당자가 계셨고, 개인 프로젝트에서는 기획과 `Front-end`에 집중하고  백엔드는 `Firebase`, `AppSync`와 같은 `BaaS(Back-end as a Service)`를 사용해 빠르게 서비스를 배포하는 것이 효율적이라 판단했기 때문이었습니다.

하지만 `백엔드`와 기본 네트워크에 대한 지식과 경험이 부족해 해당 업무 담당자분들과 협업 시 의사소통에 어려움을 종종 겪었고, 앞으로 지금과 같이 `백엔드` 작업이 필요한 프로젝트가 있을 때 직접 대응하지 못하는 경우가 생길 수 있겠다는 생각이 들어 이번 기회에 직접 `백엔드` 작업과 배포 작업을 진행해보려 합니다.

---

아래는 이를 위한 기획 개요 및 기술 스택 입니다.

## 목적

- Back-end 개발 경험
- Database 설계 및 관리 경험
- 배포 자동화 경험
- Infrastructure 구축 경험

## 요구 사항

블로그와 `CMS(Content Management System)` 개발

### 블로그

- SEO + SSR
- 게시물 목록 출력
- 생성일 기준 내림차순 정렬
- 페이지네이션(차후)
- 게시물 상세 출력
- 제목, 대표 이미지, 설명, 태그, 본문, Markdown 변환 및 출력

### CMS

- 로그인, 로그아웃
- 게시물 관리
    - 게시 중
        - 목록 출력
        - 생성일 기준 내림차순 정렬
        - 페이지네이션(차후)
        - 전체 게시물 수 출력
    - 작성 중
        - 목록 출력
        - 생성일 내림차순 정렬
        - 페이지네이션
        - 전체 게시물 수 출력
    - 게시물 작성
        - 제목, 대표 이미지, 설명, 태그
        - 본문
        - Markdown으로 작성
        - 이미지 및 이미지 설명
    - 게시물 수정
        - 변경된 이미지 삭제
    - 게시물 삭제
        - 게시물 및 관련 이미지 삭제

## 기술 스택

- Language
    - [TypeScript](https://www.typescriptlang.org)
- Front-end
    - UI - [React](https://reactjs.org),  [NextJS](https://nextjs.org)
    - Theme - [TailwindCSS](https://tailwindcss.com)
    - TextEditor - [CKEditor](https://ckeditor.com)
- Back-end
    - ORM - [Prisma](https://www.prisma.io)
    - Server - [NestJS](https://nestjs.com/)
- API Test - [Insomnia](https://insomnia.rest)
- Database
    - [MySQL](https://www.mysql.com)
    - ERD - [ERD Cloud](https://www.erdcloud.com)
- Version Control
    - [GitHub](https://github.com)
- Infrastructure
    - [Oracle Cloud](https://www.oracle.com/kr/cloud/)
- Wiki & Issue Management
    - [Notion](https://notion.so/)

많은 시행 착오와 오랜 개발 기간이 예상 되지만 값진 경험이 될 것이라 기대 합니다.

이 여정을 기록하고 나누고 싶습니다.