import SubTitle from "@components/parts/SubTitle";

export default function SectionTitle({
  tag = "h2",
  titleEn = "",
  titleJp = "",
  align = "",
}) {
  const HeadingTag = tag === "h2" ? "h2" : "h3";

  const baseClass = [
    "text-fluid-[14,18,350,768]",
    "md:text-fluid-[16,20]",
    "pt-fluid-[16,20,350,768]",
    "absolute",
    "-bottom-[50%]",
  ];

  let addClass = [];

  if (align == "") {
    addClass = [...baseClass, "left-1/2", "-translate-x-1/2"];
  } else if (align == "left") {
    addClass = [...baseClass, "left-0"];
  }

  return (
    <HeadingTag className="relative inline-block gap-fluid-[8,10]">
      <SubTitle
        lang="en"
        addClass={["text-fluid-[36,48,350,768]", "md:text-fluid-[48,80]"]}
      >
        {titleEn}
      </SubTitle>
      <SubTitle lang="jp" addClass={addClass}>
        {titleJp}
      </SubTitle>
    </HeadingTag>
  );
}
