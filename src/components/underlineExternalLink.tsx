import { type ReactNode } from "react";

const UnderlineExternalLink = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <a
      className="flex w-fit flex-row items-center gap-1 underline underline-offset-4 transition hover:text-dash-100"
      href={href}
      target="_blank"
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="h-3 w-3 lg:h-4 lg:w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </a>
  );
};

export default UnderlineExternalLink;
