# trackDay

<img src="./src/main/frontend/public/img/thumbnail.png"  width="500" height="500"/>

## 🗂️ 목차

### 1. [프로젝트 소개](#-프로젝트-소개)

### 2. [Demo 링크](#-데모링크)

### 3. [제작 기간 & 팀 구성](#-팀-구성)

### 4. [기술 스텍 및 라이브러리](#-기술-스텍-및-라이브러리)
#### 4.1 Frontend
#### 4.2 Backend

### 5. ERD

### 6. [주요 기능](#-주요-기능)

### 7. [Troubleshooting](#-Troubleshooting)
#### 7.1 Frontend
#### 7.2 Backend

### 8. 회고
#### 8.1 Frontend

#### 8.2 Backend

### 9. 그외
#### 9.1 [유저 피드백 및 개선 사항](#-유저-피드백-및-개선-사항)

#### 9.2 실행 방법

#### 9.3 license

#### 9.4 사용한 협업 도구.
<hr>

## 📃 프로젝트 소개

trackDay는 이루고자 하는 목표를 관리하고, 매일의 활동을 기록하는 사이트 입니다. 다양한 관점에서의 리포트를 제공하여 유저들에게 동기를 부여하고, 지속적으로 도전할 수 있도록 합니다. 유저들간의 커뮤니티 기능을 통해 서로의 목표와 활동을 공유할 수 있습니다.   
이 외 다양한 기능들을 추가하여 목표를 이루는데 도움이 되고자 합니다. 
<b>해당 프로젝트는 진행 도중 중단되었습니다.</b>

### 📆 개발 기간 : 2021년 08월 31일 ~ 2022년 4월  5일.



### Github [Organizations](https://github.com/dongseoki/trackdayb)0

<hr>

## 데모링크
[trackDay](http://www.trackday.site/)

위 url 이 유효하지 않을 경우 아래 url로 접속

http://52.79.223.169:8080/
<hr>

## 🧑‍💻 제작 기간 & 팀 구성

<table>
  <tr>
  <td align="center">
  Backend
  </td>
  <td align="center">
  Frontend
  </td>
  <tr>
    <td align="center" >
    <b>이동석</b></a><br>
    <a href="https://github.com/dongseoki">Github</a>
    <br>JAVA<br>
    </td>
    <td align="center">
    <b>김유진</b></a><br />
    <a href="https://github.com/eugenekk" >Github</a>
    <br>REACT<br>
    </td>
    </tr>
</table>

<hr>

## ⭐ 기술 스텍 및 라이브러리

- 개발언어: JAVA(jdk-11.0.10), JavaScript
- 개발 라이브러리: React
- 배포 :
  - AWS EC2 : IaaS. Amazon으로 부터 물리적 서버, 네트워크, 가상화를 지원받음.
  - AWS RDS : AWS 클라우드에서 관계형 데이터베이스를 더 쉽게 설치, 운영 및 확장할 수 있는 웹 서비스
- DBMS :
  - mysql(8.0.24) : 오픈 소스의 관계형 데이터베이스 관리 시스템
- 통신 :
  - Axios: 서버 통신을 위해 사용
- 스타일 :
  - styled-components : 가독성 및 편의성을 위해 사용
- 프레임워크 : 
  - spring boot(ver 2.5.2)) : 자바 기반의 웹 어플리케이션을 만들수 있는 프레임 워크
  - spring security : Spring 기반의 애플리케이션의 보안(인증과 권한, 인가 등)을 담당하는 스프링 하위 프레임워크
  - mybatis : 개발자가 지정한 SQL, 저장프로시저 그리고 몇가지 고급 매핑을 지원하는 퍼시스턴스 프레임워크
- 라이브러리(패키지) :
  - React-Slick : Carousel 기능과 LazyLoad 기능을 통해 서버 효율성을 높이기 위해 사용
  - Moment : 시간 및 날짜 설정을 위해 사용
  - lombok : 어노테이션 기반으로 코드를 자동완성 해주는 라이브러리
  - javax.validation :  오브젝트 레벨의 제약 선언 및 유효성 검사 기술
  - swagger : API 문서 자동화를 지원하는 라이브러리
  - gson : Java에서 Json을 파싱하고, 생성하기 위해 사용되는. 구글에서 개발한 오픈소스
  - commons-lang3 :  java.lang API를 위한 수많은 도우미 유틸리티, 특히 문자열 조작 메서드, 기본 수치 메소드, 객체 반사, 동시성, 생성 및 직렬화, 시스템 속성을 제공
  - commons-collections4 : collection과 관련된 새로운 인터페이스, 구현체 및 유틸리티를 제공함으로써 JDK 클래스를 기반으로 빌드하는 것을 추구.
<hr>

## ERD
<iframe width="600" height="336" src="https://www.erdcloud.com/p/pMhndMEj8ag42BjaR" frameborder="0" allowfullscreen></iframe>
https://www.erdcloud.com/p/pMhndMEj8ag42BjaR

## 🕹️ 주요 기능

### 로그인 / 회원가입

- JWT 토큰 방식으로 토큰을 발급받고 LocalStorage에 저장하여 사용한다.
- 영문 소문자, 숫자, 특수기호를 이용하여 아이디와 비밀번호를 설정할 수 있다.
- 닉네임을 입력할 수 있으며, 커뮤니티를 이용하는 모든 곳엔 닉네임만 노출된다.

### 목표관리

- 목표를 카드로 만들어 관리한다.
- 원하는 조건에 맞게 목표카드를 필터링 걸 수 있다.
- 목표카드에는 진행기간/공개여부/제목/내용/목표유형(주기성/기한성)/진행률/부모목표/태그컬러를 설정할 수 있다.
![Thumbnail](./src/main/frontend/public/img/guide/2goal.png)
![Thumbnail](./src/main/frontend/public/img/guide/3goal_add.png)

### 시간관리

- 활동을 타임라인형식으로 기록,저장한다.
- 원하는 조건에 맞게 활동 타임라인을 필터링 걸 수 있다.
- 활동에는 시간/공개여부/제목/내용/몰입도/관련목표를 기록한다.
![Thumbnail](./src/main/frontend/public/img/guide/4time.png)
![Thumbnail](./src/main/frontend/public/img/guide/5time_add.png)

<hr>

## 🙉 Troubleshooting (예시)
### Frontend
#### 1. 하위 컴포넌트의 이벤트로 상위 컴포넌트의 state 변경 문제

- 상위 컴포넌트에 이벤트를 생성하여 Prop로 전달하는 방법 -> driling 이슈 발생

```jsx
const [state, setState] = useState(false);

const render = temp => {
  setState(temp);
};
```

- history로 props를 전달하고, uselocation을 활용하여 데이터를 전달하는 방법  
  -> 변경이 필요한 데이터의 관리가 어렵고, 컴포넌트 구조가 복잡해짐에 따라 사용이 제한적

```jsx
const goToMulti = () => {
  history.push({
    pathname: "/multi",
    state: { multiId: multiId },
  });
};
```

- **모든 페이지의 paramsId를 Redux Store에 저장하여 필요시 사용하는 방법울 사용하여 해결**

```jsx
const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    SetParams: (state, action) => {
      state.paramsId = action.payload;
    },
  },
});
```

```jsx
useEffect(() => {
  dispatch(DetailDB(multiId));
  dispatch(SetParams(multiId));
}, [dispatch, multiId]);
```

<hr>

### Backend
* 서버다운이슈(21.12.25)
  * 상황 : 
    * deploy.sh 스크립트를 이용하여 배포를 진행중에 파일을 권한을 건드렸고, 스크립트 실행시, 특정 명령어들이 권한 문제로 실행되지 않는 문제 발생
  * 원인 : deploy.sh에 주어진 권한이 충분하지 않은 문제로 파악됨.
  * 해결방안 ; 
    script 실행시 권한을 항시 바꾸는 명령어를 추가함. 자세한 내용은 이 [링크](https://github.com/dongseoki/trackdayb/blob/master/scripts/deploy.sh) 참조.

* accessToken 임의 수정해도 서버가 로그인했던 유저를 인식하는 문제
  * 상황 : 
    * 현재 프로젝트는 access refresh token 을 기반으로 인증을 함. 그렇기 때문에 accessToken을 임의 수정하고, 권한이 필요한 API 호출시
      * result : 로그인했던 유저를 인식하고, API가 정상적으로 수행됨.
      * expected result : 토큰 해석에 문제가 발생하여 401 에러를 반환해야함.
    * 원인 분석 : 
      * 로그인 했던 유저를 인식한다는 점에서 현재 session이 동작하고 있음을 유추함.(개발자 도구로도 확인.)
      * 이전에 분명 되던 기능이 어느 순간부터 안되기 시작함. 보안 설정에서 뭔가 조치를 취한것으로 판단하고, 관련된 파일의 설정들을 확인해봄. 확인 결과 관련 설정 부분이 주석쳐져있던 것을 확인함.
      * 해당 코드는 [SecurityConfig.java](https://github.com/dongseoki/trackdayb/blob/master/src/main/java/com/lds/trackdayb/config/SecurityConfig.java#L63) 63번째 줄에서 확인 가능.
    * 해결 방안 : 해당 주석을 해제함. 이슈 해결


## 회고
### Frontend

### Backend
#### 좋았던 점
* 프로젝트를 처음부터 끝까지 다해본것이 뿌듯하다.
  * 기획, 설계, 구현, 배포, 협업, 팀원모집, 홍보, 디자인...
  * 이렇게 제안 받지 않았다면 할 엄두도 안냈을 것이다. 멘토님께 감사드린다.

#### 아쉬웠던 점 
* 프로젝트를 너무 오래, 길게 끌었다.
* 실무에 집착한 나머지 이론을 소홀히 했었다.
* 테스트 코드를 작성하지 않았다.
* ORM을 이용해보지 못했다.
* 첫 프로젝트였는데 완벽에 집착했다.

#### 앞으로 나아갈 방향
* 빠른 시간내에 다양한 기능을 사용해볼수있는 프로젝트를 해본다.
* 기획을 작게 한다.(1달내에 작업할수 있는)
* 실무 전에, 이론 먼저 빠삭하게 해둔다.
* 코드를 짜는 것보다, 다른 사람 코드를 더 많이 보고, 해석해본다.
* 다음 프로젝트 기회가 있다면 
  * TDD 기반의 테스트 코드 작성, 
  * 기술블로그에 주기적 프로젝트 진행 추가
  * ORM 도구를 이용해 쿼리 표준화 및 생산성 증대.


<hr>

## 그외

### 🔧 유저 피드백 및 개선 사항 (예시)

#### 피드백 정리 [Notion](https://crawling-health-e0d.notion.site/1e6a76553d3b45909c134d9b62b604fd)

1. 자체 피드백
2. 1차 유저 피드백 (지인) 21/11/15 ~ 21/11/22
3. 2차 유저 피드백 (각종 커뮤니티) 21/11/27 ~ 21/11/30

#### 개선 사항

### 실행 방법

### license

### 사용한 협업 도구.
* notion
  * 프로젝트를 전반적 관리하기 위해 사용. 회의록 작성.
* excel
  * API 명세서를 공유하기 위해 사용.
* postman
  * API 테스트를 공유하기 위해 사용.
  * 
    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/18053149-fb565c62-4e14-47f0-9f49-e439ea495e4a?action=collection%2Ffork&collection-url=entityId%3D18053149-fb565c62-4e14-47f0-9f49-e439ea495e4a%26entityType%3Dcollection%26workspaceId%3D02400cf2-b32d-40d2-b78a-a24fe6f53e68)