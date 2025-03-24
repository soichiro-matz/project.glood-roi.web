import Link from "next/link";
import { createElement, forwardRef } from "react";

// Utils
const isExternalLink = (href) => {
  if (typeof href === "string") {
    return href.startsWith("http") || href.startsWith("//");
  }
  return href?.href?.startsWith("http") || href?.href?.startsWith("//");
};

// Component

{
  /*
    （使用例）
    <Button tag="button" onClick={() => console.log('foo')}>
      foo
    </Button>
    <Button tag="a" linkProps={{ href: '#' }} className="c-button p-button -primary">
      foo
    </Button>
    <form>
      <Button tag="input" type="submit" value="foo" />
    </form> */
}

const Button = forwardRef(function Button(props, ref) {
  if (!props.tag) {
    throw new Error("tag props is required");
  }

  if (props.tag === "a") {
    const { tag, linkProps, children, ...otherProps } = props;
    return (
      <Link {...linkProps} legacyBehavior>
        {createElement(
          tag,
          {
            ref,
            ...otherProps,
            role: "button",
            target: isExternalLink(linkProps?.href) ? "_blank" : undefined,
            rel: isExternalLink(linkProps?.href)
              ? "noopener noreferrer"
              : undefined,
          },
          <>
            <span className="p-btnText">{children}</span>
            <span className="p-btnIcon"></span>
          </>,
        )}
      </Link>
    );
  }

  const { tag, children, ...otherProps } = props;
  return createElement(
    tag,
    { ref, type: "button", ...otherProps },
    <>
      <span className="p-btnText">{children}</span>
      <span className="p-btnIcon"></span>
    </>,
  );
});

export default Button;
