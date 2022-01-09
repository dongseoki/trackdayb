# trackdayb


# 사이드 프로젝트 관련 블로그 게시글 링크.
https://velog.io/@blueskyi?tag=%EC%82%AC%EC%9D%B4%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8


# trackDay

![Thumbnail](./src/images/Thumbnail.png)

## 🗂️ 목차

### 1. [프로젝트 소개](#-프로젝트-소개)

### 2. [팀 구성](#-팀-구성)

### 3. [기술 스텍 및 라이브러리](#-기술-스텍-및-라이브러리)

### 4. [주요 기능](#-주요-기능)

### 5. [Troubleshooting](#-Troubleshooting)

### 6. [유저 피드백 및 개선 사항](#-유저-피드백-및-개선-사항)

<hr>

## 📃 프로젝트 소개

trackDay는 이루고자 하는 목표를 관리하고, 매일의 활동을 기록하는 사이트 입니다.   
다양한 관점에서의 리포트를 제공하여 유저들에게 동기를 부여하고, 지속적으로 도전할 수 있도록 합니다.   
유저들간의 커뮤니티 기능을 통해 서로의 목표와 활동을 공유할 수 있습니다.   
이 외 다양한 기능들을 추가하여 목표를 이루는데 도움이 되고자 합니다.  

### 📆 개발 기간 : 2021년 08월 31일 ~

### 홈페이지 [trackDay](http://52.79.223.169:8080/)

### Github [Organizations](https://github.com/dongseoki/trackdayb)
-> 공개레포로 전환 필요

<hr>

## 🧑‍💻 팀 구성

[팀 소개 페이지](https://crawling-health-e0d.notion.site/be6df84bde484ca883f54739be96eb8f)

<table>
  <tr>
  <td colspan='2' align="center">
  Backend
  </td>
  <td colspan='2' align="center">
  Frontend
  </td>
  <tr>
    <td align="center" >
    <b>이동석</b></a><br>
    <a href="https://github.com/jeangho293">Github</a>
    <br>JAVA<br>
    </td>
    <td align="center">
    <b>김유진</b></a><br />
    <a href="https://github.com/gabmin" >Github</a>
    <br>REACT<br>
    </td>
    </tr>
</table>

<hr>

## ⭐ 기술 스텍 및 라이브러리

- 개발언어: JAVA, JavaScript
- 개발 라이브러리: React
- 배포 :
  - AWS S3 : 서버리스 서비스를 통해 배포를 하기 위해 사용
  - AWS Cloudfront : HTTPS 적용을 위해 사용
- 통신 :
  - Axios: 서버 통신을 위해 사용
- 스타일 :
  - styled-components : 가독성 및 편의성을 위해 사용
- 라이브러리(패키지) :
  - React-Slick : Carousel 기능과 LazyLoad 기능을 통해 서버 효율성을 높이기 위해 사용
  - Moment : 시간 및 날짜 설정을 위해 사용
  - 
<hr>

## 🕹️ 주요 기능

### 로그인 / 회원가입

- JWT 토큰 방식으로 토큰을 발급받고 LocalStorage에 저장하여 사용한다.
- 영문 소문자, 숫자, 특수기호를 이용하여 아이디와 비밀번호를 설정할 수 있다.
- 닉네임을 입력할 수 있으며, 커뮤니티를 이용하는 모든 곳엔 닉네임만 노출된다.

### 목표관리

- 목표를 카드로 만들어 관리한다.
- 원하는 조건에 맞게 목표카드를 필터링 걸 수 있다.
- 목표카드에는 진행기간/공개여부/제목/내용/목표유형(주기성/기한성)/진행률/부모목표/태그컬러를 설정할 수 있다.

### 시간관리

- 활동을 타임라인형식으로 기록,저장한다.
- 원하는 조건에 맞게 활동 타임라인을 필터링 걸 수 있다.
- 활동에는 시간/공개여부/제목/내용/몰입도/관련목표를 기록한다.

<hr>

## 🙉 Troubleshooting (예시)

### 1. 하위 컴포넌트의 이벤트로 상위 컴포넌트의 state 변경 문제

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

## 🔧 유저 피드백 및 개선 사항 (예시)

### 피드백 정리 [Notion](https://crawling-health-e0d.notion.site/1e6a76553d3b45909c134d9b62b604fd)

1. 자체 피드백
2. 1차 유저 피드백 (지인) 21/11/15 ~ 21/11/22
3. 2차 유저 피드백 (각종 커뮤니티) 21/11/27 ~ 21/11/30

## 개선 사항

- Slick Slider 형식은 여러 게시물을 한눈에 보기가 어렵다는 의견이 있어 List 형식으로 볼 수 있게 함.

![](https://blog.kakaocdn.net/dn/bJT7vW/btrmEEvFIy8/YoMX7WqcqRtK4ncXSahQAK/img.gif)

- 보고 있는 찬반 투표, 객관식 투표 페이지에 따라 작성하기의 형식이 바뀌어 적용되도록 함.

![](https://blog.kakaocdn.net/dn/bRL3nF/btrmGgumZxZ/XOzVTdCdwkWli6E1IRpUhK/img.gif)

- 메인페이지의 인기 글을 클릭 후 페이지 이동 시 해당 게시글을 바로 볼 수 있도록 함.

![](https://blog.kakaocdn.net/dn/bSly0e/btrmEdkOyFS/JTOqZmzEmKid2WBkheC6kK/img.gif)

- 선택한 Slider 형식과 List 형식이 유지되도록 함.

![](https://blog.kakaocdn.net/dn/XSJwo/btrmEkjDwCo/ZUcaoPv8rCeKGYgv2Hqjzk/img.gif)

- 객관식 투표 List 형식에서 상세페이지 이동 후 뒤로 가기 시 해당 게시글이 위에 오도록 함.

![](https://blog.kakaocdn.net/dn/qp94l/btrmK8V2MNh/8Pkqks7gCKx1KCTxhdIhJ1/img.gif)

- 찬반 투표 Slick Slider의 양쪽 게시물의 투표 버튼 클릭 시 투표가 적용되는 문제를 해결함.

![](https://blog.kakaocdn.net/dn/eDzuQn/btrmHFglfjB/6DHTUb0ieRmmly3KQ1Bk80/img.gif)
