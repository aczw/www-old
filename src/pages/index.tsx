import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>aczw</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-otherworld-600">
        <div className="mb-10 text-5xl font-bold text-otherworld-100">aczw</div>
        <Link
          href="/ttt"
          className="rounded-xl bg-otherworld-500 p-8 text-xl text-otherworld-100 hover:bg-otherworld-400"
        >
          tic tac toe
        </Link>
      </main>
    </>
  );
};

export default Home;
