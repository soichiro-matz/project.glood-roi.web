// components/Transition/index.js
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Transition({ children }) {
  const router = useRouter();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [prevPath, setPrevPath] = useState(router.asPath);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (router.asPath !== prevPath) {
      // ページ遷移が発生したら前の children を一時表示
      setDisplayChildren(displayChildren); // 現在の表示を維持

      timeoutRef.current = setTimeout(() => {
        setDisplayChildren(children); // 1秒後に切り替え
        setPrevPath(router.asPath); // パスを更新
      }, 1000);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [router.asPath, children]);

  return <div>{displayChildren}</div>;
}
