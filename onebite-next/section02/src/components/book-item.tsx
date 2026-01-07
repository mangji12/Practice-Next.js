import type { BookData } from "@/types"
import Link from "next/link"
import style from "./book-item.module.css"
export default function BookItem({
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
} : BookData) {
    
    return <Link className={style.container} href={`/book/${id}`}>
        <img src={`${coverImgUrl}`} alt={`${title}의 커버 이미지`}/>
        <div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <br/>
            <div className={style.author}>
                {author} | {publisher}
            </div>
        </div>
    </Link>
}