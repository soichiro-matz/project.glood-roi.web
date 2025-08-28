import Link from "next/link";
import { SITE, API_URL } from "@/config/config";
import Layout from "@/components/layout/Layout";
import Heading from "@/components/parts/Heading";
import styles from "@/styles/pages/gros/index.module.scss";

const title = "GROSに関するプライバシーポリシー";
const title_en = "GROS privacy policy";
const description =
  SITE.description + "このページは「GROSに関するプライバシーポリシー」を紹介しております。";
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
                GROSに関するプライバシーポリシー
              </h2>
            </div>


            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">最終更新日：2025-08-28</p>


            <p className="md:pb-fluid-[24,32]">{SITE.name}（以下「当社」）は、当社が社内で運用するアプリケーション「GROS」（以下「本アプリ」）において取り扱う情報の保護を重要な責務と位置づけ、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。本ポリシーは、当社の<a href="{{GENERAL_PRIVACY_URL}}">全社プライバシーポリシー</a>を補完するものであり、GROSに特化した追加規定です。</p>


            <h3>1. 適用範囲</h3>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">本ポリシーは、GROSおよびそれに付随するウェブページ、Amazon Selling Partner API（以下「SP-API」）等の外部サービス連携機能に適用されます。</p>


            <h3>2. 取得・取り扱い情報</h3>
            <p>本アプリは、主として以下の情報を取り扱います。※原則として個人情報（PII）は取得しません。</p>
            <ul>
            <li><strong>商品カタログ属性</strong>：ASIN、GTIN（JAN/EAN/UPC/ISBN）、ブランド、メーカー、型番、色・サイズ・素材、商品寸法・重量、梱包寸法・重量、原産国、バリエーション情報、商品タイプ 等</li>
            <li><strong>商品情報の設定・管理に関する情報</strong>：当社取扱商品の商品情報（リスティング内容、フィード投入用データ、画像URL 等）</li>
            <li><strong>納品プラン・物流関連情報</strong>：FNSKU/SKU、数量、箱情報、納品先FC、搬入計画 等（FBA 納品管理目的）</li>
            <li><strong>システム技術情報</strong>：API 呼出し時刻、対象 ASIN、レスポンスコード、処理時間、エラーログ、サーバIP 等</li>
            </ul>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]"><em>（将来、注文情報などPIIを取り扱う必要が生じた場合）</em>、当社は関係法令およびAmazonのポリシーに基づく追加の承認・体制整備を行ったうえで、取り扱い範囲・目的・安全管理措置を本ポリシーに追記し、社内に告知します。</p>


            <h3>3. 利用目的</h3>
            <ul className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">
            <li>当社の販売・在庫・物流オペレーションの効率化（納品プラン作成・更新 等）</li>
            <li>システムの運用・保守、障害対応、セキュリティ監査の実施</li>
            <li>SP-API 利用条件・データ保護要件の遵守および記録保持</li>
            <li>社内の商品情報管理・品質向上のための参考情報取得</li>
            </ul>


            <h3>4. 法令・ポリシーの遵守</h3>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">当社は、適用される法令およびAmazonの「Selling Partner API ポリシー」「データ保護ポリシー」等の規程に従い、本アプリを運用します。Amazonから提供される画像・テキスト等のコンテンツは当該ライセンスおよび第三者の権利を尊重して取り扱い、必要に応じてメーカー提供素材や自社制作素材を利用します。</p>


            <h3>5. 安全管理措置</h3>
            <ul className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">
            <li>最小権限原則によるアクセス制御（ロール・権限の適正化、IP/ネットワーク制限）</li>
            <li>通信および保存時の暗号化（TLS、暗号化ストレージ、シークレットマネージャ）</li>
            <li>資格情報の厳格管理（LWA リフレッシュトークン、AWS 署名キーの分離・ローテーション・保管）</li>
            <li>監査ログの取得・保全、不正アクセス・異常検知の実施</li>
            </ul>


            <h3>6. 共同利用・第三者提供</h3>
            <ul className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">
            <li>当社の業務委託先（クラウド、監視、保守ベンダー等）に対し、契約上の守秘義務等のもとで必要な範囲で提供する場合があります。</li>
            <li>法令に基づく開示要請がある場合を除き、当社の承認なく第三者へ提供しません。</li>
            </ul>


            <h3>7. 保存期間</h3>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">業務目的の達成に必要な期間、または法令・契約で定められた期間保管し、不要になった情報は適切に削除・匿名化します。</p>


            <h3>8. クッキー等</h3>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">本アプリの社内ポータルは、ログイン維持等のためクッキーを利用する場合があります。</p>


            <h3>9. 改定</h3>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">本ポリシーの内容は、法令・運用変更に応じて改定されることがあります。重要な変更は社内にて通知します。</p>


            <h3>10. お問い合わせ窓口</h3>
            <p>本ポリシーに関するお問い合わせは、以下までご連絡ください。</p>
            <p className="pb-fluid-[16,24,350,768] md:pb-fluid-[24,32]">
            E-mail：<a href="mailto:matsuo@gloodroi.co.jp">matsuo@gloodroi.co.jp</a>（システム担当：松尾）</p>

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
