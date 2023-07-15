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
      className="group flex w-fit flex-row items-center gap-1.5 rounded-3xl bg-otherworld-200 px-3 py-1 transition-all hover:rounded-lg hover:bg-dash-100 lg:px-4 lg:py-2"
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
      className="h-min w-fit text-lg text-otherworld-200 underline underline-offset-2 transition hover:text-dash-100 lg:text-xl"
      target="_blank"
    >
      {children ? `${children} ` : ""}
      <span className="inline-flex items-center gap-0.5 underline underline-offset-2">
        {last}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-3 w-3 fill-none stroke-current stroke-[3px]"
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
      className="flex h-auto w-full flex-col justify-between bg-otherworld-400 lg:fixed lg:h-full lg:w-[30rem] lg:overflow-y-auto"
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
        <div className="z-0 -mt-3 select-none text-[84px] font-bold leading-none text-otherworld-200 lg:-mt-4 lg:text-[110px]">
          aczw
        </div>
      </div>
      <div className="p-9 lg:p-12">
        <p className="mb-6 text-lg leading-snug text-otherworld-100 lg:text-xl">
          Hi, my name is <b>Charles Wang.</b> Currently studying computer graphics at the University
          of Pennsylvania. I&apos;m interested in graphics programming and design.
        </p>
        <LinkButton href="/resume.pdf">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-4 w-4 fill-otherworld-600 group-hover:fill-dash-600 lg:h-5 lg:w-5"
          >
            <path
              fillRule="evenodd"
              d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-lg font-bold text-otherworld-600 group-hover:text-dash-600 lg:text-xl">
            Resume
          </span>
        </LinkButton>
      </div>
      <div className="flex h-auto flex-col gap-2 bg-otherworld-500 p-9 lg:p-12">
        <div className="flex flex-row items-center gap-2">
          <Link
            href="https://www.linkedin.com/in/aczw/"
            className="w-fit"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[22px] w-[22px] fill-otherworld-100 transition hover:fill-dash-100"
            >
              <title>LinkedIn</title>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
          <Link
            href="https://github.com/aczw/"
            className="w-fit"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-otherworld-100 transition hover:fill-dash-100"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </Link>
          <Link
            href="https://behance.net/charleszw/"
            className="w-fit"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 fill-otherworld-100 transition hover:fill-dash-100"
            >
              <title>Behance</title>
              <path d="M0 4.4804V19.243h7.1554c.6613 0 1.3078-.0832 1.9297-.248.6288-.1654 1.1905-.4203 1.6792-.7661.485-.3431.8784-.788 1.1677-1.3369.2862-.542.4294-1.187.4294-1.9354 0-.9232-.219-1.7109-.6675-2.369-.446-.6542-1.1187-1.1139-2.0274-1.3746.6674-.3161 1.1658-.7227 1.506-1.2177.3371-.4967.5058-1.1174.5058-1.8607 0-.6873-.1127-1.2677-.3375-1.7318-.2306-.4709-.552-.8452-.9632-1.1266-.4176-.2808-.912-.4857-1.4912-.6085-.5827-.1261-1.22-.1872-1.9264-.1872zm15.6674.9903v1.4567h5.9844V5.4707zM3.2509 6.9947h3.0407c.2873 0 .5683.0204.8359.0731.2728.0466.508.134.716.2595.2096.1205.3754.293.501.5132.1208.2203.1806.5038.1806.8474 0 .6189-.1811 1.0702-.5551 1.3426-.3778.2775-.8543.4147-1.4304.4147H3.2509zm15.545 1.2564c-.819 0-1.5587.1462-2.2294.436-.6705.2904-1.2463.6875-1.7318 1.1915-.4846.5011-.8535 1.0986-1.12 1.7909-.2612.69-.3942 1.4366-.3942 2.236 0 .8268.1284 1.5891.3835 2.2786.258.6923.6198 1.2822 1.0856 1.781.478.4967 1.046.8784 1.726 1.1497.6806.269 1.4382.4048 2.2803.4048 1.208 0 2.2446-.2771 3.0949-.8326.8599-.5528 1.4902-1.471 1.9058-2.7574h-2.585c-.1.3307-.359.649-.784.9467-.4295.2988-.9417.4492-1.534.4492-.8233 0-1.4588-.2168-1.8985-.6462-.4412-.4294-.7267-1.2289-.7267-2.0742h7.713c.0552-.8291-.0122-1.6218-.2045-2.3797-.1938-.7601-.5033-1.4365-.9393-2.029-.4355-.5931-.9904-1.0667-1.667-1.4165-.6788-.3543-1.4703-.5288-2.3747-.5288zm-.0887 2.217c.7209 0 1.3126.2092 1.6612.5954.3503.389.6065.9432.6766 1.6915h-4.7766c.0136-.2085.058-.4444.1339-.7045.0749-.2668.2039-.5164.3933-.753.1905-.2326.4402-.431.744-.5896.3109-.1608.6986-.2397 1.1676-.2397zM3.251 12.664h3.5334c.6996 0 1.2682.1602 1.6948.4836.4259.328.6405.8685.6405 1.6292 0 .3885-.0632.7094-.1946.9566-.131.2495-.3106.4466-.528.5896-.2172.1491-.4753.2498-.7661.3137-.2862.0639-.5905.092-.9115.092H3.2509z" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          <ExtLink
            href="https://open.spotify.com/playlist/6ZL5YMDGizDz2jxn8IuHjU/"
            last="to"
          >
            Current favorite Spotify playlist
          </ExtLink>
          <ExtLink
            href="https://www.last.fm/user/ashzw"
            last="scrobbling"
          >
            See what I&apos;m
          </ExtLink>
        </div>
      </div>
    </header>
  );
};

const InfoCard = ({
  heading,
  imageUrl,
  href,
  buttonText,
  children,
}: {
  heading: string;
  imageUrl: string;
  href: string;
  buttonText: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-fit w-full flex-col rounded-2xl bg-otherworld-500">
      <h2 className="p-7 font-mono text-3xl font-bold leading-none lg:text-4xl">{heading}</h2>
      <div className="flex h-64 w-full items-center justify-center bg-otherworld-400">
        <i className="font-mono text-xl">{imageUrl} here...</i>
      </div>
      <div className="p-7">
        <p className="mb-6 text-lg leading-snug lg:text-xl">{children ?? ""}</p>
        <LinkButton href={href}>
          <span className="text-lg font-bold text-otherworld-600 group-hover:text-dash-600 lg:text-xl">
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

const ImageCard = ({ imageUrl, children }: { imageUrl: string; children: React.ReactNode }) => {
  return (
    <div className="flex h-fit flex-col rounded-2xl bg-otherworld-500">
      <div className="flex h-64 items-center justify-center rounded-b-none rounded-t-2xl bg-otherworld-400">
        <span className="font-mono text-xl italic">{imageUrl}</span>
      </div>
      <div className="p-7 text-lg lg:text-xl">{children ?? ""}</div>
    </div>
  );
};

const ProgrammingSection = () => {
  return (
    <section className="flex flex-col space-y-6 px-9 pt-9 text-otherworld-100 lg:space-y-8 lg:px-12 lg:pt-12">
      <h1 className="text-5xl font-bold text-otherworld-100 lg:text-6xl">Programming</h1>
      <div className="grid w-full grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-1 lg:gap-12 xl:grid-cols-2">
        <InfoCard
          heading="RCW"
          imageUrl="imageUrl"
          href="https://aczw.itch.io/rcw"
          buttonText="Play in your browser"
        >
          Unity minigame. Endlessly match colors and text together, but be quick about it. Gameplay
          is{" "}
          <ExtLink
            href="https://en.wikipedia.org/wiki/Stroop_effect"
            last="simple"
          >
            really
          </ExtLink>{" "}
          as I was focusing more on UI/UX. First foray into gamedev.
        </InfoCard>
        <InfoCard
          heading="sddm-theme-corners"
          imageUrl="imageUrl"
          href="https://github.com/aczw/sddm-theme-corners"
          buttonText="Source code and manual"
        >
          An <em>extremely</em> customizable theme for{" "}
          <ExtLink
            href="https://wiki.archlinux.org/title/SDDM"
            last="SDDM,"
          />{" "}
          a login manager for Linux. Didn&apos;t like any existing themes, so I made my own. Clean
          and simple, with a focus on the wallpaper.
        </InfoCard>
        <InfoCard
          heading="aczw.dev"
          imageUrl="imageUrl"
          href="https://github.com/aczw/personal-website"
          buttonText="View source code"
        >
          This is included here because I spent <em>way too long</em> on this site for it to not
          count as a project. Scroll down for the list of stuff I used to make it.
        </InfoCard>
        <InfoCard
          heading="tic-tac-toe"
          imageUrl="imageUrl"
          href="/ttt"
          buttonText={
            <>
              Hosted at <span className="font-mono">/ttt</span>
            </>
          }
        >
          Small little game that finally made React click for me. Followed the{" "}
          <ExtLink
            href="https://react.dev/learn/tutorial-tic-tac-toe"
            last="tutorial"
          />{" "}
          from their site. Took what I learned to build <em>this</em> site.
        </InfoCard>
        <InfoCard
          heading="wikiRank"
          imageUrl="imageUrl"
          href="https://wikirank.vercel.app/"
          buttonText="Go to site"
        >
          Paste some text (journal articles and papers) and have the{" "}
          <ExtLink
            href="https://en.wikipedia.org/wiki/Vector_space_model"
            last="model"
          >
            vector space
          </ExtLink>{" "}
          analyze the text and your keywords to find the most relevant Wikipedia articles.
        </InfoCard>
      </div>
    </section>
  );
};

const DesignSection = () => {
  return (
    <section className="flex flex-col space-y-6 px-9 pt-9 text-otherworld-100 lg:space-y-8 lg:px-12 lg:pt-12">
      <h1 className="text-5xl font-bold text-otherworld-100 lg:text-6xl">Design</h1>
      <div className="grid w-full grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-1 lg:gap-12 xl:grid-cols-2">
        <ImageCard imageUrl="imageUrl here...">caption here yes</ImageCard>
        <ImageCard imageUrl="imageUrl here...">caption here yes</ImageCard>
      </div>
    </section>
  );
};

const AboutSiteSection = () => {
  return (
    <section className="flex flex-col space-y-5 p-9 text-lg leading-snug text-otherworld-100 lg:p-12 lg:text-xl">
      <h1 className="text-4xl font-bold text-otherworld-100 lg:text-5xl">About this site</h1>
      <p>Currently deployed on Cloudflare Pages. Their free plan is nice.</p>
      <p>
        Made with{" "}
        <ExtLink
          href="https://create.t3.gg"
          last="create-t3-app"
        />{" "}
        which uses Next.js and provides TypeScript and Tailwind CSS out of the box. I didn&apos;t
        add any of the backend stuff though. Basically, it&apos;s overkill for my use case.
      </p>
      <p>
        {" "}
        Design and primary colors were first prototyped in Figma. Primary font is{" "}
        <ExtLink
          href="https://en.wikipedia.org/wiki/Atkinson_Hyperlegible"
          last="Hyperlegible,"
        >
          Atkinson
        </ExtLink>{" "}
        monospace is IBM Plex Mono. Icons provided by{" "}
        <ExtLink
          href="https://heroicons.com"
          last="Heroicons"
        />{" "}
        and{" "}
        <ExtLink
          href="https://simpleicons.org/"
          last="Icons."
        >
          Simple
        </ExtLink>
      </p>
      <p className="pb-1.5">
        <i className="font-mono text-base lg:text-lg">Last updated: July 14, 2023.</i>{" "}
        <span className="whitespace-nowrap">👾💜</span>
      </p>
      <LinkButton
        href="/"
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
        <span className="text-lg font-bold text-otherworld-600 group-hover:text-dash-600 lg:text-xl">
          Back to top
        </span>
      </LinkButton>
    </section>
  );
};

const Content = () => {
  return (
    <main className="bg-otherworld-600 lg:ml-[30rem]">
      <ProgrammingSection />
      <DesignSection />
      <AboutSiteSection />
    </main>
  );
};

const App = () => {
  return (
    <>
      <Head>
        <title>aczw • Home</title>
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
