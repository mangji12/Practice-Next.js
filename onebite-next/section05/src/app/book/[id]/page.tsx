import style from "./page.module.css";

// export const dynamicParams = false; // 없는 페이지의 값이 파라미터로 전달되면 404페이지로 리다이렉션

export function generateStaticParams () {
  return [{id : "1"}, {id : "2"}, {id : "3"}]
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`);
  const bookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = bookData;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
