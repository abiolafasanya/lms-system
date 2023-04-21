import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout/Index';

export default function Home() {
  return (
    <Layout>
      <Head>
        {/* <title>LMSCApp Management System</title> */}
        <meta
          name="description"
          content="Learning Management System suitable for almost everything"
        />
        <meta name="author" content="abiola fasanya" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main className="font-montserrat md:max-w-6xl">
        <section className="flex sm:flex-col md:flex-row items-center justify-center md:my-[7rem]">
          <Image
            src={'/Online learning-bro.svg'}
            className="w-full h-[50vh]"
            height={500}
            width={500}
            alt="learning"
          />
          <div className="flex flex-col py-8 text-gray-900 dark:text-gray-300">
            <h3 className="sm:text-2xl md:text-3xl font-semibold sm:text-center md:text-justify">
              LMS provides an all-in-one platform for learning and upgrading the
              skill set
            </h3>
            <Link href='/dashboard' className="sm:mx-auto md:mx-0 btn w-[150px] text-center mt-5 py-3">
              Get Started
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
