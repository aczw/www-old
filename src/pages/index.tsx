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

const Header = () => {
  return (
    <header
      className="flex h-auto w-full flex-col justify-between bg-otherworld-400 lg:fixed lg:h-full lg:w-[34rem] lg:overflow-y-auto"
      role="banner"
    >
      <div className="-mb-3 flex flex-col items-start pl-12 pt-12 lg:-mb-7">
        <button
          className="group z-10"
          type="button"
          onClick={() => alert("hi! WIP")}
        >
          <Logo
            pathClass="fill-otherworld-200 transition group-hover:fill-dash-200"
            svgClass="w-[65px] h-[65px] lg:w-[90px] lg:h-[90px]"
          />
        </button>
        <div className="z-0 -mt-2 select-none text-7xl font-bold text-otherworld-200 lg:-mt-4 lg:text-[110px]">
          aczw
        </div>
      </div>
      <div className="px-12 py-12">
        <p className="mb-8 text-xl text-otherworld-100 lg:text-2xl">
          Hi, my name is <b>Charles Wang.</b> I{"'"}m studying computer graphics at the University
          of Pennsylvania. I{"'"}m interested in graphics programming and design {":)"}
        </p>
        <button
          className="rounded-[25px] bg-otherworld-200 px-4 py-2 text-xl font-bold text-otherworld-600 transition-all hover:rounded-xl hover:bg-dash-100 hover:text-dash-600 lg:text-2xl"
          onClick={() => alert("resume! WIP")}
        >
          Resume <span className="font-mono">→</span>
        </button>
      </div>
      <div className="flex h-auto flex-col items-start bg-otherworld-500 p-12 text-xl text-otherworld-100 lg:text-2xl">
        <p className="mb-6">Check out some other stuff:</p>
        <a
          className="underline underline-offset-4 transition hover:text-dash-100"
          href="https://github.com/aczw"
          target="_blank"
        >
          GitHub <span className="font-mono">↗</span>
        </a>
        <a
          className="underline underline-offset-4 transition hover:text-dash-100"
          href="https://behance.net/charleszw"
          target="_blank"
        >
          Behance <span className="font-mono">↗</span>
        </a>
        <a
          className="underline underline-offset-4 transition hover:text-dash-100"
          href="https://open.spotify.com/playlist/6ZL5YMDGizDz2jxn8IuHjU"
          target="_blank"
        >
          Current Spotify playlist <span className="font-mono">↗</span>
        </a>
      </div>
    </header>
  );
};

const Home = () => {
  return (
    <>
      <Header />
      <main className="h-auto bg-otherworld-600 lg:ml-[34rem] lg:min-h-screen">
        <section className="flex flex-col items-center justify-center space-y-5 p-10">
          <h1 className="text-2xl text-otherworld-100">just testing scrolling... move along...</h1>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
        </section>
        <section className="flex flex-col items-center justify-center space-y-5 p-10">
          <h1 className="text-2xl text-otherworld-100">projects lmao</h1>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
        </section>
        <section className="flex flex-col items-center justify-center space-y-5 p-10">
          <h1 className="text-2xl text-otherworld-100">just testing scrolling... move along...</h1>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
          <Link
            href="/ttt"
            className="flex h-14 items-center justify-center rounded-xl bg-otherworld-300 p-8 text-center text-xl text-otherworld-100 transition hover:bg-dash-100"
          >
            tic tac toe
          </Link>
        </section>
      </main>
    </>
  );
};

const App = () => {
  return (
    <>
      <Head>
        <title>home</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Home />
    </>
  );
};

export default App;
