import Link from "next/link";

const ExtLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link
      href={href}
      className="inline-block text-otherworld-200 underline underline-offset-2 transition hover:text-dash-100"
      target="_blank"
    >
      <span className="flex flex-row items-center gap-0.5">
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-[14px] w-[14px] stroke-current stroke-[3px] lg:h-4 lg:w-4 lg:stroke-[2.5px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </span>
    </Link>
  );
};

export default ExtLink;
