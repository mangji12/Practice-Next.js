import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

async function AllBooks () {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { next : {revalidate : 3}})
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`)
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