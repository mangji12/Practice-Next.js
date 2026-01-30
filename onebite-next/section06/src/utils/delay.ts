// 의도적인 지연을 위한 유틸리티 함수
export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done"); // Promise의 resolve 함수를 호출해야 함
    }, ms);
  });
}