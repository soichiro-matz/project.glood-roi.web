import { useEffect, useMemo } from "react";

// 全インスタンスを管理するグローバルキャッシュ
// 複数コンポーネントで共通の Rola インスタンスを再利用するためのキャッシュとして使用
const rolaInstanceCache = new Map();

/**
 * useRola - Rola インスタンスを生成して管理するカスタムフック
 *
 * @param {string} selector - Rola が監視する対象の要素のセレクタ (例: "[data-rola-trigger]")
 * @param {object} options - Rola の設定オプション (例: { once: true, scrub: true })
 * @param {function} [callback=null] - ビューポート内に要素が入った際に実行されるコールバック関数 (省略可能)
 */
const useRola = (selector, options, callback = null) => {
  /**
   * キャッシュキーを生成
   * - セレクタとオプションを組み合わせたユニークな文字列を生成する
   * - options は JSON.stringify で変換しておくことで同一設定を文字列として比較可能にする
   * - callback はキャッシュに影響しない (後から適用される)
   */
  const configKey = JSON.stringify([selector, JSON.stringify(options)]);

  /**
   * useMemo - インスタンスのメモ化
   * - configKey が同一ならば、同じインスタンスを再利用する
   * - 同じ設定で無駄な再生成を防ぎ、パフォーマンスを最適化する
   */
  const rolaInstance = useMemo(() => {
    // 既にキャッシュに存在するインスタンスがあるか確認
    if (rolaInstanceCache.has(configKey)) {
      return rolaInstanceCache.get(configKey); // キャッシュされたインスタンスを再利用
    }

    // 新しいインスタンス情報を生成
    const instanceInfo = {
      selector, // 監視対象のセレクタ (例: "[data-rola-trigger]")
      options, // Rola の設定オプション
      callback, // コールバック関数 (ビューポート内に入った際に実行される)
      instance: null, // Rola インスタンス (後で生成)
      hasTriggeredOnce: false, // once: true の場合に一度だけ実行したことを記録するフラグ
    };

    // インスタンス情報をキャッシュに保存 (configKey をキーとして保存)
    rolaInstanceCache.set(configKey, instanceInfo);

    return instanceInfo;
  }, [configKey]); // configKey が変更された時のみ再評価 (再生成)

  /**
   * useEffect - Rola インスタンスの生成と監視設定
   */
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR (サーバーサイドレンダリング) 環境では実行しない

    /**
     * requestIdleCallback のフォールバック設定
     * - サポートされていないブラウザでは setTimeout を代替として使用 (200ms の遅延)
     */
    const requestIdleCallback =
      window.requestIdleCallback || ((cb) => setTimeout(cb, 200));

    // Rola のモジュールが既にロード済みかを管理するフラグ
    let rolaLoaded = false;

    /**
     * importRola - Rola モジュールを非同期にインポートしインスタンスを生成
     */
    const importRola = () => {
      // 既にロード済みであるか、一度実行済みのものはスキップ
      if (!rolaLoaded && !rolaInstance.hasTriggeredOnce) {
        import("@hilosiva/rola").then((module) => {
          const Rola = module.default; // Rola モジュールを取得

          // 指定されたセレクタに一致する全要素を取得
          const elements = document.querySelectorAll(rolaInstance.selector);

          /**
           * Rola インスタンスの生成
           * - インスタンスが存在しない場合にのみ生成
           */
          if (!rolaInstance.instance && elements.length > 0) {
            rolaInstance.instance = new Rola(
              rolaInstance.selector,
              rolaInstance.options,
              (element, isInView, options, progress) => {
                // once: true の場合、一度だけコールバックを実行する
                if (
                  options.once &&
                  isInView &&
                  !rolaInstance.hasTriggeredOnce
                ) {
                  rolaInstance.hasTriggeredOnce = true; // 実行フラグを設定
                  if (typeof rolaInstance.callback === "function") {
                    rolaInstance.callback(element, isInView, options, progress); // コールバック関数を実行
                  }
                  return; // コールバックを1度だけ実行して終了
                }

                // scrub: true の場合、inView の状態である限り常にコールバックを実行
                if (options.scrub && isInView && !options.once) {
                  if (typeof rolaInstance.callback === "function") {
                    rolaInstance.callback(element, isInView, options, progress);
                  }
                }
              },
            );
          }

          rolaLoaded = true; // Rola がロードされたことをマーク

          /**
           * scrub が有効でかつ once フラグが立っていない場合のみスクロール監視を開始
           */
          if (
            rolaInstance.options.scrub === true &&
            !rolaInstance.hasTriggeredOnce
          ) {
            Rola.scrubStart();
          }
        });
      }
    };

    // 非同期に Rola を読み込む (requestIdleCallback を使用)
    requestIdleCallback(() => importRola());

    // 200ms 後に強制的に Rola を読み込む処理 (フォールバック)
    const forceLoadTimeout = setTimeout(() => {
      if (!rolaLoaded) importRola();
    }, 200);

    // クリーンアップ処理 (タイマーをクリア)
    return () => clearTimeout(forceLoadTimeout);
  }, [rolaInstance]); // rolaInstance が更新されると再実行される
};

export default useRola;
