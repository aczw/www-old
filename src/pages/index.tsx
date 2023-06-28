import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            web dev{" "}
            <span className="text-[hsl(280,100%,70%)]">
              <i>yeah</i>
            </span>
          </h1>
          <div>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/tic-tac-toe"
            >
              <h3 className="text-2xl font-bold">tic tac toe!</h3>
              <div className="text-lg">I hate my life</div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
