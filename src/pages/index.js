
import axios from "axios"
import moment from "moment-timezone"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"



export default function Index(){
  const router = useRouter()
  const [userList, setUserList] = useState([])

  async function fn() {
    const {data} = await axios.get('/api/user')
    setUserList(data)
  }

  useEffect(() => {
    fn()
  }, [])

  

  // 회원가입 
  return (
    <>
      <h1>데이터베이스</h1>
      {userList &&
        userList.map((user, idx) => {
          const { id, username, password, email, created_at, updated_at } = user;
          return (
            <p key={idx}>
              id : {id}, username : {username}, password : {password}, email:{email}
              created_at :
              {moment(created_at)
                .tz("Asia/Seoul")
                .utc()
                .format("YYYY-MM-DD HH:mm")}
              , updated_at :
              {moment(updated_at)
                .tz("Asia/Seoul")
                .utc()
                .format("YYYY-MM-DD HH:mm")}
            </p>
          );
        })}

      {/* 회원가입 폼 */}
      <h2>회원가입</h2>
      <form
        onSubmit={async (e) => { //비동기 방식(async,await)
          e.preventDefault(); //이벤트 동작 중단
          const username = e.target.username.value; //input의 name이 username인 것의 값 불러옴 ----- e:이벤트 /target:이벤트가 발생한 대상 객체 /username:input의name /value:input에 입력한 값
          const password = e.target.password.value; //input의 name이 password인 것의 값 불러옴
          const email = e.target.email.value; //input의 name이 email인 것의 값 불러옴
          const data = { username: username, password: password , email: email}; // {username (키): username(변수-username)}
          console.log(data);
          await axios.post('/api/user', data)   //api에 data를 post 요청 ---- axios:API를 이용한 HTTP 비동기 통신 라이브러리 /post:create 생성 /'/api/user':데이터 연동 파일 / data:데이터
          router.reload()  //화면 새로고침 메서드 ---- router:라우팅(네트워크상의 주소로 이동하여 해당 주소에 연결되어있는 데이터를 사용하는 일련의 과정을 의미)을 수행하는 장치
        }}
      >
        <input name="username" placeholder="아이디" /> <br />
        <input name="password" type="password" placeholder="비번" /> <br />
        <input name="email" type="email" placeholder="이메일" /> <br />
        <input type="submit" />
      </form>
    </>
  );
}