import styles from "@/styles/pages/about/index.module.scss";
import Layout from "@/components/layout/Layout";

export default function About() {
  const title = "About Us";
  const description = "About Us";

  return (
    <Layout title={title} description={description}>
      <div className={styles.about}>
        <section>
          <h2>About Our Company</h2>
          <p>We are a company that values...</p>
        </section>
      </div>
    </Layout>
  );
}
