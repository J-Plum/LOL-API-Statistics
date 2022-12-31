# 리그오브레전드 전적 검색 사이트 J-plum  
  
    
      
      
[완성본 링크](http://jplum.dothome.co.kr/)  
  
  ## ⭐️사용방법⭐️ 
<img width="948" alt="스크린샷 2022-12-31 오후 8 37 13" src="https://user-images.githubusercontent.com/98649953/210135410-c05a3762-ad3c-46d9-81e5-ba70782b235c.png">   
리그오브레전드(롤) 소환사명(계정명)을 입력한다.  
  
<img width="872" alt="image" src="https://user-images.githubusercontent.com/98649953/210135552-b1dddb82-25a9-4544-89b5-90f6dcacc09c.png">.   
위와 같이 결과물이 나온다.    
    
#           
## ⚒️개발 과정⚒️

<img width="1680" alt="image" src="https://user-images.githubusercontent.com/98649953/210135672-dfb9281e-f01e-4366-b46c-8329103eb090.png">.  
https://developer.riotgames.com/.   
위의 사이트에서 사이트 개발에 필요한 API를 신청했습니다.

<img width="1152" alt="image" src="https://user-images.githubusercontent.com/98649953/210135826-2b674b02-7138-42d5-8b88-74abf11a3c65.png">  
그리고 제가 필요로 하는 API를 PostMan에 정리를 했습니다.  
  
  
  
<img width="225" alt="image" src="https://user-images.githubusercontent.com/98649953/210136019-214a0704-6258-491a-9be7-37ebab47d542.png">  
  
저는 이번 프로젝트를 React와 PostCSS를이용해서 개발 했습니다.  
### ⭐️모듈화⭐️
모듈화에 매력을 느껴서 사용하게 되었습니다.
동일한 className을 이용하다보면 각각의 css 파일이라도 style이 중복으로 덮어 씌워지는 경우가 있었고  
이때문에 복잡하고 세부적인 className을 작성해서 사용 해야 했으니, PostCSS의 모듈화를 사용하면 동일한 className을 작성하더라도  
오버라이팅을 방지할 수 있다는점이 좋았습니다.




# 
## 🥲추후 개선 사항 및 아쉬운 점🥲

1. 개발 과정중 sass와 scss를 알게되었으며, 다음 개발에는 sass나 scss 을 공부해서 작성하고싶습니다.  
 중첩, 변수 선언, 연산자등 다양한 장점을 가지고 있는점에서 흥미가 생겼습니다.   
2. state관리와 불변성 관리를 하고자 useReducer와 immer를 공부했으니 적용하지 못한점이 아쉬웠습니다.
3. 기회가 된다면 백엔드도 공부를 해서 구성후 연동을 했으면 좋았을 것 같습니다. 구현하지 못한 부분이 있어서 아쉬웠습니다.
4. 리랜더링 관련 부분을 보다 더 개선하고싶습니다.. (가장 아쉬운 점)





  
## 📖사용기술📖

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/><img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/><img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=PostCSS&logoColor=white"/><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/>
