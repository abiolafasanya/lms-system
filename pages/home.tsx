import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout/Index';
import Container from '@utility/Container';

export default function Home() {
  return (
    <Layout>
        <Head>
          <title>LMSCApp Management System</title>
          <meta name="description" content="Online school management system" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <Container className="font-montserrat mt-0 py-5 mx-0 w-full max-w-full min-h-screen bg-purple-500/10">
            <div className='lg:max-w-6xl px-5 py-5 w-full lg:mx-auto flex sm:flex-col lg:flex-row'>
               <div className='w-[50%]'>
                <h1 className='text-[28px] font-semibold lg:w-[70%]'>College and School management System</h1>
               </div>
               <div className='w-[50%]'></div>          
            </div>
        </Container>
    </Layout>
  );
}
