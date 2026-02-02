'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { useEffect } from 'react';

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  // 괄호 체크: if문만 감싸야 함
  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요.',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log('Response Status:', response.status);

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`); // 자동으로 재검증 -> 리렌더링

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('/book/[id]', 'page'); // 첫번째 인수는 파일의 경로를 입력하는 것.

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath('/(with-searchbar)', layout);

    // 4. 모든 데이터 재검증
    // revalidatePath('/', 'layout');
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`); // fetch에서 {next : { tags : [ "~~" ] } }
    return {
      status: true,
      error: '',
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다. : ${err}`,
    };
  }
}
