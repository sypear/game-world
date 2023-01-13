# 💻 Project
* 제목
  * Game World
* 기간
  * 2022/07/02 ~ 2022/07/19
* 목적
  * HTML/CSS, JavaScript 기초 학습 후 React 본격적으로 공부하기 전 HTML/CSS, JavaScript 복습을 위해 진행
* 설명
  * 5개의 미니게임(가위바위보, 다른 색깔 찾기, 카드 짝 맞추기, 기억력 테스트, 숫자 야구)이 있는 웹 사이트 제작 프로젝트
  * CSS 미디어쿼리를 이용한 반응형 디자인 적용
* 데모 페이지
  * https://sypear.github.io/game-world/
<br/>

# 🖤 메인 페이지
<p align="center"><img src="https://user-images.githubusercontent.com/105365737/178926061-f5eef12a-9890-414c-9425-b5cfa4237141.gif"></p>

### 설명
* 웰컴 메시지와 게임 목록이 있는 페이지 ([페이지 바로가기](https://sypear.github.io/game-world/))

### 포스팅 링크
* [📎 메인 페이지 자세한 구현 내용 보러 가기](https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A9%94%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80)
<br/>

# 🖐 가위바위보
<p align="center"><img src="https://user-images.githubusercontent.com/105365737/178926712-82226223-10e3-4f52-a00a-131a271e924e.gif"></p>

### 설명
* 컴퓨터와 하는 가위바위보 게임 ([페이지 바로가기](https://sypear.github.io/game-world/game-rps.html))

### 구현 기능
* 컴퓨터와 가위바위보 대결
  * 컴퓨터는 가위, 바위, 보 중 랜덤으로 하나를 선택한다.
  * 사용자는 가위, 바위, 보 중 하나를 선택해서 낼 수 있다.
  * 사용자가 가위, 바위, 보 중 하나를 선택하는 순간 컴퓨터가 선택한 값과 비교하여 결과를 출력한다.

* 승리 시 베네핏, 패배 시 페널티
  * 사용자에게는 생명 3개가 기본으로 주어진다.
  * 승리 시 10점과 생명 1개를 얻는다.
  * 패배 시 생명 1개를 잃는다.

* 게임 종료 후 결과 출력
  * 게임은 사용자의 생명이 0개가 되거나 사용자가 게임 정지 버튼을 눌렀을 때 종료된다.
  * 게임 종료 시 사용자가 획득한 점수와 대전 결과를 출력한다.

### 포스팅 링크
* [📎 가위바위보 자세한 구현 내용 보러 가기](https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B0%80%EC%9C%84%EB%B0%94%EC%9C%84%EB%B3%B4)
<br/>

# 🎨 다른 색깔 찾기
<p align="center"><img src="https://user-images.githubusercontent.com/105365737/178927010-fdf8c456-1986-41d6-b249-8aa2df3a79fc.gif"></p>

### 설명
* 여러 개의 색 중 다른 색을 찾는 게임 ([페이지 바로가기](https://sypear.github.io/game-world/game-fdc.html))

### 구현 기능
* 다른 색깔 찾기
  * 사용자는 주어진 시간 내에 다른 색을 찾아야 한다.
  * 사용자에겐 15초가 주어진다.
  * 2x2 크기의 게임판으로 시작한다.
  * 정답을 선택하는 경우 다음 스테이지로 넘어간다.
  * 스테이지가 두 단계씩 넘어갈 때마다 게임판 행, 열 사이즈가 1씩 늘어난다.
  * 스테이지가 진행될수록 색 차이는 줄어든다.
  * 오답을 클릭하는 경우 남은 시간에서 3초가 줄어든다.

* 게임 종료 후 결과 출력
  * 게임은 남은 시간이 0초가 됐을 때 종료된다.
  * 게임 종료 시 사용자가 도달한 스테이지 정보를 출력한다.

### 포스팅 링크
* [📎 다른 색깔 찾기 자세한 구현 내용 보러 가기](https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%8B%A4%EB%A5%B8-%EC%83%89%EA%B9%94-%EC%B0%BE%EA%B8%B0)
<br/>

# 🃏 카드 짝 맞추기
<p align="center"><img src="https://user-images.githubusercontent.com/105365737/179338777-0a5651fe-b7a2-4d56-9532-840cd096c9f1.gif"></p>

### 설명
* 카드를 뒤집어 같은 그림의 카드를 맞추는 게임 ([페이지 바로가기](https://sypear.github.io/game-world/game-cm.html))

### 구현 기능
* 카드 짝 맞추기
  * 사용자는 주어진 시간 내에 같은 그림의 카드를 전부 찾아야 한다.
  * 사용자에겐 60초가 주어진다.
  * 게임판은 6x4 크기로 고정된다.
  * 같은 그림의 카드를 전부 찾은 경우 다음 스테이지로 넘어간다.
  * 스테이지가 진행될 때마다 주어진 시간은 5초씩 줄어든다.

* 게임 종료 후 결과 출력
  * 게임은 남은 시간이 0초가 됐을 때 종료된다.
  * 게임 종료 시 사용자가 도달한 스테이지 정보를 출력한다.

### 포스팅 링크
* [📎 카드 짝 맞추기 자세한 구현 내용 보러 가기](https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B9%B4%EB%93%9C-%EC%A7%9D-%EB%A7%9E%EC%B6%94%EA%B8%B0)
<br/>

# 🧠 기억력 테스트
<p align="center"><img src="https://user-images.githubusercontent.com/105365737/179374017-da0b65b5-5d4a-4837-b87b-b49e2193781a.gif"></p>

### 설명
* PC의 블록 선택 순서를 기억한 다음 순서를 똑같이 맞추는 게임 ([페이지 바로가기](https://sypear.github.io/game-world/game-mt.html))

### 구현 기능
* 블록 맞추기
  * 사용자는 PC의 블록 선택 순서를 기억한 다음 똑같이 선택해야 한다.
  * PC의 블록 선택 개수는 1부터 시작한다.
  * 스테이지가 진행될수록 PC의 블록 선택 개수는 1씩 늘어난다.

* 게임 종료 후 결과 출력
  * 사용자가 순서를 틀리면 게임은 종료된다.
  * 게임 종료 시 사용자가 획득한 점수를 출력한다.

### 포스팅 링크
* [📎 기억력 테스트 자세한 구현 내용 보러 가기](https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%EC%96%B5%EB%A0%A5-%ED%85%8C%EC%8A%A4%ED%8A%B8)

<br/>

# 숫자 야구⚾
<p align="center"><img src="https://user-images.githubusercontent.com/105365737/179691362-b9056749-7db5-412e-a697-d952a7cd329a.gif"></p>

### 설명
* 감춰진 4자리 숫자를 9회 안에 맞추는 게임 ([페이지 바로가기](https://sypear.github.io/game-world/game-bac.html))

### 구현 기능
* 숫자 맞추기
  * 사용자는 9회 안에 컴퓨터가 무작위로 정한 4자리 숫자를 맞춰야 한다.

### 포스팅 링크
* [📎 숫자 야구 자세한 구현 내용 보러 가기](https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%88%AB%EC%9E%90-%EC%95%BC%EA%B5%AC)
<br/>

# 🌈 느낀 점
> 사용자가 가장 좋아하는 기능은 내가 가장 공들인 기능이 아닐 수 있다.<br/>
> 잘 만든 기능은 열심히 만든 기능이 아니라, 사용자가 좋아하는 기능이다.
<br/>

프로젝트를 진행하면서 가장 오랜 시간이 들었고, 가장 어려웠고,<br/>
또 가장 공들여서 만든 게임이 [카드 짝 맞추기 게임](https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B9%B4%EB%93%9C-%EC%A7%9D-%EB%A7%9E%EC%B6%94%EA%B8%B0)이었습니다.<br/>
그래서 저에게는 제일 애착이 가는 게임인데요.<br/>
슬프게도 인기가 정말 없었습니다. (오히려 지루하다는 평이 많아서 마음이 아팠던..😥)
<br/><br/>

가장 인기가 많았던 게임은 상대적으로 금방 만들었던 [다른 색깔 찾기](https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%8B%A4%EB%A5%B8-%EC%83%89%EA%B9%94-%EC%B0%BE%EA%B8%B0)였습니다.<br/>
다른 색깔 찾기 신기록을 세웠다는 카톡이 지금까지도 오고 있습니다. (이렇게 인기가 많을 줄이야)
<br/><br/>

![](https://velog.velcdn.com/images/sypear/post/b1d2f144-57bf-4ce2-ba90-746141353f73/image.PNG)<br/><br/>
'사용자의 니즈가 가장 중요하다'라는 말을 굉~장히 많이 들어왔는데요,<br/>
'당연히 중요하지!' 라고 생각은 해왔었는데 사실 직접적으로 느껴보지는 못했었습니다.
<br/><br/>

그런데 이번 프로젝트를 진행하면서 주변 사람들에게 게임을 보여주고 피드백을 듣는 과정을 통해<br/>
수백 시간을 고민해서 수천 시간동안 만든 서비스라도<br/>
사용자가 원하지 않는 것이라면 모든 노력이 물거품이 될 수 있겠구나..라는 것을 느꼈습니다.<br/>
