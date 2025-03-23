import styles from "@/styles/pages/index.module.scss";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/home/Hero";

export default function Home() {
  return (
    <Layout>
      <div className={styles.home}>
        <Hero />
      </div>
    </Layout>
  );
}
