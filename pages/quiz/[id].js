import React from 'react';

export default function QuizDaGaleraPage() {
  return (
    <div>
      Lorem ipsum dolar siat amet
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
  return {
    props: {},
  };
}
