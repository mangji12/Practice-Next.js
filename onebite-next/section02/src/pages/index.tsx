import SearchableLayout from "@/components/searchable-layout"
import style from "./index.module.css"
import { ReactNode, useEffect } from "react"
import books from "@/mock/books.json"
import BookItem from "@/components/book-item"
import { InferGetStaticPropsType } from "next"
import fetchBooks from "@/lib/fetch-books"
import fetchRandomBooks from "@/lib/fetch-random-books"

// export const getServerSideProps = async() => {
//   // 컴포넌트보다 먼저 실행되어서 컴포넌트에 필요한 데이터 불러오는 함수 (서버에서만 실행됨. 클라이언트에서는 볼 수 없음.)
//   const [allBooks, recoBooks] = await Promise.all([ // Promise.all() : 인수로 전달한 배열안에 들어있는 모든 비동기 함수를 동시에 실행시키는 메서드
//     fetchBooks(),
//     fetchRandomBooks(),
//   ])

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     }
//   }
// } // 현재페이지 SSR 완성!

export const getStaticProps = async() => {
  console.log("인덱스 페이지")

  const [allBooks, recoBooks] = await Promise.all([ // Promise.all() : 인수로 전달한 배열안에 들어있는 모든 비동기 함수를 동시에 실행시키는 메서드
    fetchBooks(),
    fetchRandomBooks(),
  ])

  return {
    props: {
      allBooks,
      recoBooks,
    }
  }
} // 현재페이지 SSG 완성!

export default function Home({allBooks, recoBooks,}: InferGetStaticPropsType<typeof getStaticProps>){

  return <div className={style.container}>
    <section>
      <h3>지금 추천하는 도서</h3>
      {recoBooks.map((book) => <BookItem key={book.id} {...book}/>)}
    </section>
    <section>
      <h3>등록된 모든 도서</h3>
      {allBooks.map((book) => <BookItem key={book.id} {...book}/>)}
    </section>
  </div>
  
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}