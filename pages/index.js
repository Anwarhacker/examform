import Head from 'next/head'
import Form from '../components/Form'

export default function Home() {
  return (
    <>
      <Head>
        <title>GEC Bidar - Application Form</title>
        <meta name="description" content="Application Form for Examination / Revaluation / Photocopy - Government Engineering College, Bidar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form />
    </>
  )
}