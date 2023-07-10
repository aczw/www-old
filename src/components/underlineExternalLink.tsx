import { type ReactNode } from "react";

const UnderlineExternalLink = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <a
      className="underline underline-offset-4 transition hover:text-dash-100"
      href={href}
      target="_blank"
    >
      {children}
    </a>
  );
};

export default UnderlineExternalLink;
