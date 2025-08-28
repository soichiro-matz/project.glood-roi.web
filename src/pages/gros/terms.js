import Link from "next/link";
import { SITE, API_URL } from "@/config/config";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/parts/Heading";
import styles from "@/styles/pages/gros/index.module.scss";

const title = "GROS利用規約";
const title_en = "GROS Terms";
const description =
  SITE.description + "このページは「GROS利用規約」を紹介しております。";
export default function PrivacyPolicyIndex() {
  const breadcrumbs = [
    {
      title: "ホーム",
      url: SITE.base,
    },
    {
      title: title,
      url: "",
    },
  ];

  return (
    <>
      <Heading titleEn={title_en} titleJp={title} breadcrumbs={breadcrumbs} space={4}/>
      <section>
        <div className="l-container l-grid__12">
          <div
            className={`${styles.privacypolicy} pb-fluid-[64,120,350,768] pt-fluid-[48,56,350,768] text-fluid-[15,16] md:pb-fluid-[120,144] md:pt-fluid-[64,104]`}
          >
            <div className="text-center">
              <h2 className="font-bold pb-fluid-[32,40,350,768] text-fluid-[20,32,350,768] md:pb-fluid-[56,72] md:text-fluid-[32,36]">
                GROS利用規約
              </h2>
            </div>


            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">最終更新日：2025-08-28</p>


            <h2>第1条（適用）</h2>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">本規約は、{SITE.name}（以下「当社」）が社内向けに提供するアプリケーション「GROS」（以下「本アプリ」）の利用条件を定めるものです。GROSに関するプライバシーポリシーは<Link href="/gros/privacy-policy">こちら</Link>をご確認ください（全社のプライバシーポリシーは<Link href="/privacy-policy">こちら</Link>）。</p>


            <h2>第2条（利用対象者）</h2>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">本アプリは当社の役員・従業員その他当社が認めた者のみが利用できます。外部第三者による利用、または外部提供・再販・サブライセンスを禁止します。</p>


            <h2>第3条（利用目的）</h2>
            <ul className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">
            <li>当社取扱商品の商品情報の取得・設定（カタログ属性、リスティング、画像URL、フィード投入 等）</li>
            <li>納品プランの作成・管理（FBA 納品計画、SKU/FNSKU、数量、箱情報、納品先FC 等）</li>
            <li>新規商品の企画・登録準備における参考データの取得</li>
            </ul>


            <h2>第4条（遵守事項）</h2>
            <ul className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">
            <li>Amazon の Selling Partner API の規約、データ保護ポリシー、レート制限を遵守すること</li>
            <li>法令および第三者の権利（著作権・商標権等）を尊重すること</li>
            <li>本アプリで取得したデータは社内業務目的の範囲でのみ利用し、無断転載・外部配布を行わないこと</li>
            <li>Amazon から提供される画像・テキスト等の利用は、当該ライセンスの範囲内で行うこと（必要に応じてメーカー素材・自社素材を使用）</li>
            </ul>


            <h2>第5条（資格情報・セキュリティ）</h2>
            <ul className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">
            <li>LWA アクセストークン・リフレッシュトークン、AWS 署名キー等の資格情報を第三者と共有しないこと</li>
            <li>最小権限原則に基づくアクセス制御、ネットワーク制限、暗号化、監査ログの取得に協力すること</li>
            </ul>


            <h2>第6条（禁止事項）</h2>
            <ul className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">
            <li>SP-APIポリシーに反する利用、スクレイピング等の不正取得</li>
            <li>レート制限の回避、認証の不正取得、改ざん行為</li>
            <li>機微情報（PII）を本アプリの許容範囲を超えて取得・保存・外部提供する行為</li>
            <li>本アプリのリバースエンジニアリングその他当社が不適切と判断する行為</li>
            </ul>


            <h2>第7条（知的財産権）</h2>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">本アプリおよび関連資料に関する著作権その他の知的財産権は当社または正当な権利者に帰属します。</p>


            <h2>第8条（ログ・監査）</h2>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">当社は、API 呼出しを含む本アプリの利用状況を記録・監査します。不審な利用が確認された場合、利用制限・アカウント停止等の措置を行うことがあります。</p>


            <h2>第9条（提供の中断・変更）</h2>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">当社は、保守・障害・外部サービスの停止等により、本アプリの全部または一部を中断・変更・終了することがあります。</p>


            <h2>第10条（免責）</h2>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">当社は、本アプリの利用に関連して利用者に生じた損害について、当社に故意または重過失がある場合を除き、一切の責任を負いません。</p>


            <h2>第11条（規約の変更）</h2>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">当社は、必要と判断した場合、本規約を変更できるものとします。重要な変更は社内にて通知します。</p>


            <h2>第12条（準拠法・裁判管轄）</h2>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">本規約は日本法に準拠し、さいたま地方裁判所を専属的合意管轄裁判所とします。</p>

          </div>
        </div>
      </section>
    </>
  );
}

PrivacyPolicyIndex.meta = {
  title: title,
  description: description,
  ogImage: "",
};
