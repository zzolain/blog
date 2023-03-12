---
title: '블로그 개발기 - 배포편'
subTitle: '네트워크 설정 및 배포 자동화'
date: '2022-11-16'
tags: 'Domain, Firewall, Network, ReverseProxy, SSL, TLS'
---

코드 개발을 완료하고 막상 배포 하려니 적당한 무료 `PaaS(Platform as a service)` 서비스가 떠오르지 않았습니다. `무료 PaaS` 키워드로 검색하니 수많은 서비스가 검색되고, 이를 [모아둔 자료](https://github.com/ripienaar/free-for-dev)가 있어 공유합니다. 아래는 고려한 서비스 목록과 비교 내용입니다.

- [AWS](https://aws.amazon.com)
    - 1년간 무료이나, 이후부터 과금
    - [Google Cloud Platform](https://cloud.google.com/free)

- 서비스 스펙을 잘못 설정했는지는 모르겠으나, 실제 서비스를 설정하면 예상 요금이 유료로 책정됨

- [Heroku](https://www.heroku.com/pricing)

- 무료 플랜 폐지 예정이라고 함. [관련 기사](https://techrecipe.co.kr/posts/44931)

- [Vercel](https://vercel.com/pricing)

- 작은 프로젝트를 위한 무료 플랜 제공. `NextJS` 앱의 배포 및 CI/CD, HTTPS 등을 쉽게 사용할 수 있는 `CLI`를 제공함

- [Oracle Cloud](https://www.oracle.com/kr/cloud/free/)

- 일정 범위 내의 스펙, 사용량에 대한 무료 플랜 제공

유료 과금 가능성이 있는 `AWS`, `Google`, `Heroku`는 고려 대상에서 제외하였고, 최종적으로 고려한 서비스는 `Oracle Cloud`입니다. `Vercel`의 경우 명령어 하나면 배포가 가능할 만큼 편리한 서비스였지만, 직접 인프라를 구축하는 것이 목표였던 만큼 자동으로 구축하고 설정해주는 서비스는 최대한 배제하였습니다.

## 네트워크 구성

`VCN(Virtual Cloud Network)` 서비스는 Cloud 상에 사용자만의 가상 네트워크 영역을 생성합니다. 외부에서 접근할 수 있는 `Public` 영역과 네트워크 내부에서만 접근할 수 있는 `Private` 영역을 지정하였습니다.

`Public` 영역에는 서버를 설치할 `Compute Instance(이하 인스턴스)`를 배치하고, `Private` 영역에서는 `Public` 영역에 배치한 서버에서만 접근할 수 있는 `Database`를 배치하였습니다.

## 배포

배포는 인스턴스에 원격 `Git` 저장소를 생성하고 해당 저장소로 `push` 하면 해당 코드를 빌드하는 방식으로 진행하였습니다. 상세 진행 방식은 아래와 같습니다.

- 새 코드 작성 ->

- `git commit` ->

- 인스턴스에 생성한 `remote git repository`로 `push` ->

- `git post-receive hook`이 실행됨

(실행할 스크립트에 빌드 명령을 작성) ->

- 빌드 및 서버 실행 ->

- 배포 완료

## HTTP, HTTPS 접근을 위한 네트워크 설정

`Oracle Cloud(이하 오라클)`의 `VCN`은 기본적으로 `SSH` 접속을 위한 `22`번 포트만 외부 접근이 허용되어 있습니다. 웹브라우저는 `HTTP, HTTPS` 프로토콜에 의한 접속이고, 이에 대한 기본 포트는 각각 `80`번, `443`번에 할당되어 있으므로 서버 측 네트워크에서 해당 포트에 대한 데이터 수신을 허용해 주어야 합니다.

`Oracle`의 경우 인스턴스가 속해있는 네트워크의 `Ingress Rules`를 변경해주면 됩니다. 필요하다면 데이터 송출 규칙(`Egress Rules`)도 설정해야 합니다.

(`Oracle`의 기본 설정은 모두 허용이므로 생략)

## OS 방화벽 허용 설정

네트워크에 웹 접근을 허용하면 네트워크 요청은 `OS`에 전달됩니다. 하지만 `OS`의 방화벽에서 이를 허용해주지 않으면 해당 요청은 내부 애플리케이션까지 전달되지 않습니다. 이 때문에 방화벽에 웹 포트를 허용하도록 등록해주어야 하며, `Linux(이하 리눅스)`의 경우 버전에 따라 설정 방법이 다를 수 있으니 현재 인스턴스에 설치된 [`OS` 버전 확인](https://www.makeuseof.com/tag/check-linux-version/)이 필요합니다.

## 웹서버 설치 및 Proxy 설정

이제 모든 웹 요청은 `80`포트로 전달됩니다. 하지만 블로그 서버는 기본적으로 `3000` 포트에서 실행되기 때문에 `80`포트로 향하는 웹 요청을 블로그 서버는 수신할 수 없습니다. 이를 해결하기 위해서는 두 가지 방법이 있을 수 있습니다.

- 하나는 블로그의 실행 포트를 `80`으로 변경하는 방법
- 나머지 하나는 `80`포트의 요청을 `3000`포트로 전달하는 방법

저는 후자를 선택했습니다. 블로그 서버보다 앞선 단계에서 웹 요청을 제어하는 것이 이후에 무중단 배포 적용 등을 고려해보았을 때 유용할 수 있기 때문입니다. 후자와 같은 기법을 [Reverse Proxy](https://en.wikipedia.org/wiki/Reverse_proxy)라고 합니다.

## 도메인 연결

구매한 도메인과 `VCN`을 연결하기 위해 도메인을 구매한 사이트에서 네임 서버를 현재 `PaaS`에서 제공하는 네임서버로 변경합니다. 네임 서버 변경 후 `A` 레코드값에 `VCN`의 공개 `IP`를 설정하여 도메인의 요청을 `VCN`으로 전달하도록 합니다.

(`Oracle`의 경우 `DNS Management`, `AWS`의 경우 `Route53`에서 설정할 수 있습니다.)

이때 `VCN`의 공개 IP가 동적으로 할당되어 변경될 가능성이 있는 경우 고정 IP를 할당 받아 입력합니다.

(`Oracle`의 경우 `Reserved Public IPs`, `AWS`의 경우 `Elastic IP Addresses`에서 할당할 수 있습니다.)

## TLS 인증서 획득

도메인 연결까지 완료하면 도메인의 모든 요청이 블로그 서버로 전달되고, 도메인으로 페이지를 요청했을 때 블로그에 접속할 수 있어야 합니다. 하지만 몇몇 브라우저에서는 접속이 되지 않을 가능성이 있습니다. 최신 브라우저는 `TLS(Transport Layer Security)` 인증서를 획득한 사이트의 접속만 허용하는 기능이 있고, 현재 블로그는 `TLS` 인증서가 없으므로 보안을 위해 사이트 접속을 차단합니다.

`TLS` 인증서를 발급 받기 위해서는 인증 기관을 거쳐야 하고 대부분 유료로 진행됩니다. 하지만 [Let's Encrypt](https://letsencrypt.org)에서 무료 `TLS` 인증서를 발급 받을 수 있습니다. 인증서 발급까지 완료하면 이제 도메인 주소 앞에 당당히 `https`를 붙일 수 있고 정상적으로 접속이 됩니다.

드디어

완성입니다.

[https://jinsol.kim](https://jinsol.kim)

## 참고

- [Deploy a Node.js App to Oracle Cloud - Anthony Luzquiños](https://javascript.plainenglish.io/deploying-a-node-js-app-to-oracle-cloud-c6f783cb98d7)
- [How to Deploy Nextjs to CentOS Apache. Apache to Nginx Webserver](https://xn--t-lia.vn/how-to-deploy-nextjs-to-centos-apache)
- [10 Ways to Check Which Linux Version You're Running](https://www.makeuseof.com/tag/check-linux-version)
- [Reverse proxy - Wikipedia](https://en.wikipedia.org/wiki/Reverse_proxy)
- [Let's Encrypt](https://letsencrypt.org/)