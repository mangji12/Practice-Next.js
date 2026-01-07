import SearchableLayout from "@/components/searchable-layout"
import style from "./index.module.css"
import { ReactNode, useEffect } from "react"
import books from "@/mock/books.json"
import BookItem from "@/components/book-item"
import { InferGetStaticPropsType } from "next"

export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서 컴포넌트에 필요한 데이터 불러오는 함수 (서버에서만 실행됨. 클라이언트에서는 볼 수 없음.)
  return {
    props: {
      books,
    }
  }
} // 현재페이지 SSR 완성!

export default function Home({books}: InferGetStaticPropsType<typeof getServerSideProps>){

  useEffect(() => {
    console.log(window) // 해당 함수는 SSR 적용 시 서버 한번 클라이언트 한번 실행되는데 windows.location등의 함수는 실행되지 않는데 useEffect를 사용하면 문제없이 실행이 된다.
  }, [])

  console.log(books)
  return <div className={style.container}>
    <section>
      <h3>지금 추천하는 도서</h3>
      {books.map((book) => <BookItem key={book.id} {...book}/>)}
    </section>
    <section>
      <h3>등록된 모든 도서</h3>
      {books.map((book) => <BookItem key={book.id} {...book}/>)}
    </section>
  </div>
  
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}