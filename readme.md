# 버스 도착 정보 알림 웹

BIS open API를 이용해 버스 도착 정보를 확인할 수 있는 웹페이지.

## 설계

* html, css, js(jQuery)를 이용해서 구현.
* 추후에 wpa로 제작할 목적으로 원 페이지로 구현.
* api request는 ajax로 처리.

## 사용한 openAPI

1. [국토교통부_(TAGO)_버스노선정보](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15098529)

   1. 노선 번호 목록 조회

   2. 노선별 경유 정류소 목록 조회

2. [국토교통부_(TAGO)_버스도착정보](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15098530)

   1. 정류소별 특정 노선 버스 도착 예정정보 목록 조회

## 동작 방식

1. 사용자가 지역을 설정하고 버스 번호를 입력하면 **노선 번호 목록 조회** api로 버스 목록을 보여줌.
2. 사용자가 버스 목록에서 노선을 선택하면 **노선별 경유 정류소 목록 조회** api로 선택한 노선이 지나는 정류장 목록을 보여줌.
3. 사용자가 정류장을 선택하면 **정류소별 특정 노선 버스 도착 예정정보 목록 조회** api로 선택한 정류장에서 선택한 버스가 얼마 뒤에 도착하는지 바로 볼 수 있게 즐겨찾기에 등록.
4. 등록한 즐겨찾기는 쿠키에 저장.

## 디자인

* [피그마](https://www.figma.com/file/qpwqOZ2GrIe16f6Kwjnn8k/bis_pwa?node-id=0%3A1)로 디자인 후 구현.

* 미디어 쿼리로 모든 화면에 대응하기에는 시간이 부족하여 max-width로 600px이상 커지지 않게 지정함.

* pc

  ![image-20220831214955739](C:\Users\jckim\AppData\Roaming\Typora\typora-user-images\image-20220831214955739.png)

  ![image-20220831215006101](C:\Users\jckim\AppData\Roaming\Typora\typora-user-images\image-20220831215006101.png)

  ![image-20220831215022253](C:\Users\jckim\AppData\Roaming\Typora\typora-user-images\image-20220831215022253.png)

* 모바일

  ![image-20220831215057449](C:\Users\jckim\AppData\Roaming\Typora\typora-user-images\image-20220831215057449.png)

  ![image-20220831215111372](C:\Users\jckim\AppData\Roaming\Typora\typora-user-images\image-20220831215111372.png)

  ![image-20220831215125333](C:\Users\jckim\AppData\Roaming\Typora\typora-user-images\image-20220831215125333.png)

## 문제점

1. api의 응답속도가 너무 느리다. 길게는 2~3초까지 소요.
2. 가끔 내용이 없는 상태로 응답이 온다.
3. 시간 부족으로 계획한 부분을 모두 구현하지 못했다.

## 앞으로 목표

* 저장 구현
* firebase auth와 db서버에 연동해 즐겨찾기를 서버에 저장하여 여러 기기와 연동시키기

## 소스코드

https://github.com/K1A2/bis_wpa