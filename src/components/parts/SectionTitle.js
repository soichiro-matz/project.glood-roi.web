import SubTitle from "@components/parts/SubTitle";

export default function SectionTitle({
  tag = "h2",
  titleEn = "",
  titleJp = "",
}) {
  const HeadingTag = tag === "h2" ? "h2" : "h3";
  return (
    <HeadingTag className="relative text-center gap-fluid-[8,10]">
      <SubTitle
        lang="en"
        addClass={["text-fluid-[36,48,350,768]", "md:text-fluid-[48,80]"]}
      >
        {titleEn}
      </SubTitle>
      <SubTitle
        lang="jp"
        addClass={[
          "text-fluid-[16,18,350,768]",
          "md:text-fluid-[18,20]",
          "absolute",
          "-bottom-[50%]",
          "left-1/2",
          "-translate-x-1/2",
        ]}
      >
        {titleJp}
      </SubTitle>
    </HeadingTag>
  );
}
