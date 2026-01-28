import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

// export const dynamic = 'auto' // 실제로는 잘 쓰지 않음. 
// 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
// 1. auto : 기본값. 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 static 페이지로 설정
// 4. error : 페이지를 강제로 static 페이지 설정 (동적 함수가 있으면 빌드 오류를 줌) 

async function AllBooks () {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache : "force-cache"})
  if(!response.ok) {
    console.log(response)
    return <div>오류가 발생했습니다.</div>
  }
  const allBooks : BookData[] = await response.json()
  console.log(allBooks)

  return (
    <>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  )
}

async function RecoBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, { next : { revalidate : 3}})
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }
  const randBooks : BookData[] = await response.json()
  
  return (
    <>
      {randBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  )
}

export default function Home() {
  

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks/>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks/>
      </section>
    </div>
  );
}