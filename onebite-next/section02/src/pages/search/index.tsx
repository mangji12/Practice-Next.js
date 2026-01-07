import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router" // 쿼리 스트링을 쓰기 위한 라이브러리
import { ReactNode } from "react";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";

export default function Page(){
    return <div>
      {books.map((book) => 
        <BookItem key={book.id} {...book}/>
      )}
    </div>
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}