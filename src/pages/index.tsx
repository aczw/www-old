import Head from "next/head";
import Link from "next/link";

const Logo = ({ svgClass, pathClass }: { svgClass: string; pathClass: string }) => {
  return (
    <svg
      className={svgClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        className={pathClass}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.48044 2.48044C5.78769 -0.826813 11.1498 -0.826813 14.4571 2.48044L21.6675 9.69092C29.5734 4.10671 39.2224 0.826132 49.6377 0.826132C59.9821 0.826132 69.5706 4.0622 77.4462 9.57721L84.543 2.48044C87.8502 -0.826811 93.2123 -0.826811 96.5196 2.48044C99.8268 5.78769 99.8268 11.1498 96.5196 14.4571L89.4228 21.5538C94.9378 29.4294 98.1739 39.018 98.1739 49.3623C98.1739 59.7776 94.8933 69.4266 89.3091 77.3325L96.5196 84.5429C99.8268 87.8502 99.8268 93.2123 96.5196 96.5196C93.2123 99.8268 87.8502 99.8268 84.5429 96.5196L77.2839 89.2605C69.4391 94.7067 59.9111 97.8985 49.6377 97.8985C39.2933 97.8985 29.7048 94.6624 21.8292 89.1474L14.4571 96.5196C11.1498 99.8268 5.7877 99.8268 2.48044 96.5196C-0.826806 93.2123 -0.826808 87.8502 2.48044 84.5429L9.8526 77.1708C4.33759 69.2952 1.10152 59.7067 1.10152 49.3623C1.10152 39.0889 4.29336 29.5609 9.73947 21.7161L2.48044 14.4571C-0.826813 11.1498 -0.826813 5.78769 2.48044 2.48044ZM34.0957 76.8809C38.6848 79.4783 43.9881 80.961 49.6377 80.961C55.2151 80.961 60.4549 79.516 65.0034 76.98L49.5 61.4766L34.0957 76.8809ZM37.5234 49.5L22.1191 64.9043C19.5217 60.3152 18.039 55.0119 18.039 49.3623C18.039 43.7849 19.484 38.5451 22.02 33.9966L37.5234 49.5ZM61.4766 49.5L77.0563 65.0797C79.7156 60.4505 81.2364 55.084 81.2364 49.3623C81.2364 43.7127 79.7537 38.4094 77.1563 33.8203L61.4766 49.5ZM65.1797 21.8437L49.5 37.5234L33.9203 21.9437C38.5495 19.2844 43.916 17.7636 49.6377 17.7636C55.2873 17.7636 60.5906 19.2463 65.1797 21.8437Z"
      />
    </svg>
  );
};

const LinkButton = ({
  href,
  newTab = true,
  children,
}: {
  href: string;
  newTab?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="group flex w-fit flex-row items-center gap-1 rounded-[30px] bg-otherworld-200 px-4 py-2 transition-all hover:rounded-lg hover:bg-dash-100 lg:gap-2"
      role="button"
      target={newTab ? "_blank" : "_self"}
    >
      {children}
    </Link>
  );
};

// HACK: always insert last word into the span so that arrow will never break on its own.
// this means if we want a one word link, we leave `children` blank and use only `last`.
const ExtLink = ({ href, last, children }: { href: string; last: string; children?: string }) => {
  return (
    <Link
      href={href}
      className="h-min w-fit text-otherworld-200 underline underline-offset-2 transition hover:text-dash-100"
      target="_blank"
    >
      {children ? `${children} ` : ""}
      <span className="inline-flex items-center gap-1 underline underline-offset-2">
        {last}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-[14px] w-[14px] fill-none stroke-current stroke-[3px] lg:h-4 lg:w-4 lg:stroke-[2.5px]"
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

const FlexibleHeader = () => {
  return (
    <header
      className="flex h-auto w-full flex-col justify-between bg-otherworld-400 lg:fixed lg:h-full lg:w-[34rem] lg:overflow-y-auto"
      role="banner"
    >
      <div className="-mb-3 flex flex-col items-start pl-9 pt-9 lg:-mb-7 lg:pl-12 lg:pt-12">
        <button
          className="group z-10"
          type="button"
          onClick={() => alert("hello...")}
        >
          <Logo
            pathClass="fill-otherworld-200 transition group-hover:fill-dash-100"
            svgClass="w-[65px] h-[65px] lg:w-[90px] lg:h-[90px]"
          />
        </button>
        <div className="z-0 -mt-2 select-none text-7xl font-bold text-otherworld-200 lg:-mt-4 lg:text-[110px]">
          aczw
        </div>
      </div>
      <div className="p-9 lg:p-12">
        <p className="mb-8 text-xl text-otherworld-100 lg:text-2xl">
          Hi, my name is <b>Charles Wang.</b> I{"'"}m studying computer graphics at the University
          of Pennsylvania. I{"'"}m interested in graphics programming and design {":)"}
        </p>
        <LinkButton href="/resume.pdf">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-5 w-5 fill-otherworld-600 group-hover:fill-dash-600 lg:h-6 lg:w-6"
          >
            <path
              fillRule="evenodd"
              d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xl font-bold text-otherworld-600 group-hover:text-dash-600 lg:text-2xl">
            Resume
          </span>
        </LinkButton>
      </div>
      <div className="h-auto bg-otherworld-500 p-9 text-xl text-otherworld-100 lg:p-12 lg:text-2xl">
        <p className="mb-4 lg:mb-6">Other stuff that you should also totally check out:</p>
        <div className="grid grid-cols-2 lg:grid-cols-1">
          <ExtLink
            href="https://www.linkedin.com/in/aczw/"
            last="LinkedIn"
          />
          <ExtLink
            href="https://github.com/aczw/"
            last="GitHub"
          />
          <ExtLink
            href="https://behance.net/charleszw/"
            last="Behance"
          />
          <ExtLink
            href="https://open.spotify.com/playlist/6ZL5YMDGizDz2jxn8IuHjU/"
            last="playlist"
          >
            Current Spotify
          </ExtLink>
        </div>
      </div>
    </header>
  );
};

const InfoCard = ({
  heading,
  imageUrl,
  description,
  href,
  buttonText,
}: {
  heading: string;
  imageUrl: string;
  description: React.ReactNode;
  href: string;
  buttonText: string;
}) => {
  return (
    <div className="flex h-fit w-full flex-col rounded-2xl bg-otherworld-500">
      <h2 className="mb-5 px-9 pt-9 font-mono text-4xl font-bold">{heading}</h2>
      <div className="flex h-24 w-full items-center justify-center bg-otherworld-400">
        <i className="font-mono">{imageUrl} here</i>
      </div>
      <div className="px-9 pb-9 pt-5">
        <p className="mb-5 text-xl">{description}</p>
        <LinkButton href={href}>
          <span className="text-xl font-bold text-otherworld-600 group-hover:text-dash-600">
            {buttonText}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-5 w-5 fill-otherworld-600 group-hover:fill-dash-600 lg:h-6 lg:w-6"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z"
              clipRule="evenodd"
            />
          </svg>
        </LinkButton>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <main className="bg-otherworld-600 lg:ml-[34rem]">
      <section className="flex flex-col items-start space-y-5 p-9 text-otherworld-100 lg:p-12">
        <h1 className="text-5xl font-bold text-otherworld-100">Projects</h1>
        <div className="grid w-full grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <InfoCard
            heading="RCW"
            imageUrl="imageUrl"
            description={
              <>
                Minigame made in Unity, based on the{" "}
                <ExtLink
                  href="https://en.wikipedia.org/wiki/Stroop_effect"
                  last="effect."
                >
                  Stroop
                </ExtLink>{" "}
                Tried to design a smooth and consistent UI/UX as well as clean, colorful visuals.
              </>
            }
            href="https://aczw.itch.io/rcw"
            buttonText="Play in browser on itch.io"
          />
          <InfoCard
            heading="sddm-theme-corners"
            imageUrl="imageUrl"
            description={
              <>
                A theme for the{" "}
                <ExtLink
                  href="https://wiki.archlinux.org/title/SDDM"
                  last="SDDM"
                />{" "}
                login manager, written using Qt Quick and QML. Didn{"'"}t like any existing themes,
                so I made my own.
              </>
            }
            href="https://github.com/aczw/sddm-theme-corners"
            buttonText="Source on GitHub"
          />
          <InfoCard
            heading="aczw.dev"
            imageUrl="imageUrl"
            description="This site counts as a project too, in my eyes! Scroll down for the tools, frameworks, and other stuff that I used."
            href="/#"
            buttonText="How meta"
          />
          <InfoCard
            heading="tic-tac-toe"
            imageUrl="imageUrl"
            description={
              <>
                Made using React state and components. Followed the{" "}
                <ExtLink
                  href="https://react.dev/learn/tutorial-tic-tac-toe"
                  last="tutorial"
                />{" "}
                from their website. Fun fact: I had no idea what I was doing!
              </>
            }
            href="/ttt"
            buttonText="Play here"
          />
        </div>
      </section>
      <section className="flex flex-col space-y-5 p-9 text-otherworld-100 lg:p-12">
        <h1 className="text-5xl font-bold text-otherworld-100">About this site</h1>
        <p className="text-xl text-otherworld-100">
          Created with the{" "}
          <ExtLink
            href="https://create.t3.gg"
            last="stack"
          >
            T3
          </ExtLink>{" "}
          which uses (amongst other things) Next.js, TypeScript, and Tailwind CSS.
        </p>
        <p className="text-xl text-otherworld-100">
          {" "}
          Design and primary colors were prototyped in Figma. Display font used is{" "}
          <ExtLink
            href="https://en.wikipedia.org/wiki/Atkinson_Hyperlegible"
            last="Hyperlegible"
          >
            Atkinson
          </ExtLink>{" "}
          and monospace font is IBM Plex Mono. Icons provided by{" "}
          <ExtLink
            href="https://heroicons.com"
            last="Heroicons."
          />
        </p>
        <p className="pb-2 text-xl text-otherworld-100">
          <i className="font-mono text-lg">Last updated on July 13, 2023.</i>{" "}
          <span className="whitespace-nowrap">👾💜</span>
        </p>
        <LinkButton
          href="/#"
          newTab={false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-5 w-5 fill-otherworld-600 group-hover:fill-dash-600 lg:h-6 lg:w-6"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0V8.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 9.74a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xl font-bold text-otherworld-600 group-hover:text-dash-600">
            Back to top
          </span>
        </LinkButton>
      </section>
    </main>
  );
};

const App = () => {
  return (
    <>
      <Head>
        <title>aczw · Home</title>
        <link
          rel="icon"
          sizes="any"
          type="image/svg+xml"
          href="/favicon.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-dark.png"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <FlexibleHeader />
      <Content />
    </>
  );
};

export default App;
