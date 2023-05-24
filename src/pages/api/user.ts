import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET'){  //get 요청 하면
        try{
            const userList = await client.user.findMany({ //전체list불러올때 findmany 씀
                orderBy:[{
                    id: 'desc' // desc 내림차순
                }]
            })
            res.json(userList) //직렬화 -> 요청했을때 보여짐 (안하면 오류남)
        } catch (err) {
            res.json(err)
        }
    }

    //회원가입
    if(req.method ==='POST'){ //POST 요청하면
        try{
            const {username, password, } = req.body //username,password의 값을 body에 데이터 받음 ---- 주로 POST 에서 사용
            console.log(username, password)
            const data = await client.user.create({ //data{키-값}를 mysql의 user에 생성 
                data: {
                    username: username, 
                    password: password                 
                }
            })
            res.json(data) //직렬화
        } catch (err){
            res.json(err)
        }
    }
}