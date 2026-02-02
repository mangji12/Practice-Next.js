'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import style from './modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  // ✅ 1. 마운트 상태를 체크할 변수 (백엔드의 'Ready' 상태 확인과 비슷)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // 브라우저에 로드되면 true로 변경
  }, []);

  useEffect(() => {
    // ✅ 2. 마운트 전이거나 이미 열려있으면 중단
    if (!isMounted || !dialogRef.current) return;

    if (!dialogRef.current.open) {
      dialogRef.current.showModal();
      dialogRef.current.scrollTo({ top: 0 });
    }
  }, [isMounted]); // 마운트된 직후에 실행되도록 설정

  // ✅ 3. 서버 렌더링 시점에는 아무것도 렌더링하지 않음 (Hydration 에러 방지)
  if (!isMounted) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={() => {
        router.back();
      }}
      onClick={(e) => {
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      className={style.modal}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}
