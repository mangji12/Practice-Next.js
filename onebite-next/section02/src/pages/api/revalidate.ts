import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try{
        await res.revalidate("/") // "재생성"할 경로 설정
        return res.json({revalidate: true})
    } catch(err) {
        res.status(500).send("Revalidation Failed")
    }
}