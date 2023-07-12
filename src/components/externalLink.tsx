import Link from "next/link";

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="inline-block text-otherworld-200 underline underline-offset-2 transition hover:text-dash-100"
      target="_blank"
    >
      <span className="flex flex-row items-center gap-1 place-self-start">
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
      </span>
    </Link>
  );
};

export default ExternalLink;
