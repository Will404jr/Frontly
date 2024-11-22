"use client";

import Head from 'next/head';
import RichTextEditor from '../dashboard/journal/RichTextEditor';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Quill Rich Text Editor</title>
      </Head>
      <main style={{ padding: '20px' }}>
        <h1>My Rich Text Editor with Quill.js</h1>
        {/* <RichTextEditor /> */}
      </main>
    </div>
  );
}
