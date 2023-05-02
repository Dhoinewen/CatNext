import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from "next/link";
import {CatType} from "@/types/main";

const inter = Inter({ subsets: ['latin'] })

function Home({test}: {test: CatType[]}) {

  return (
  <div className="bg-beige">
    <h1>
      {process.env.NEXT_PUBLIC_KEY}
    </h1>
    <div className="w-full px-4 xl:p-0 xl:w-2/3 grid grid-cols-2 xl:grid-cols-3 gap-4 mx-auto">
      {test.map((cat, index) => {
        return (
            <div className="bg-vanila px-4 py-4 rounded-2xl" key={index}>
              <div>
                <Link href={`/cat/${cat.id}`}>{cat.id}</Link>
              </div>
              <Image src={cat.url} alt={cat.id} width={cat.width} height={cat.height}/>
            </div>
        )
      })}
    </div>
  </div>
  )
}


export async function getServerSideProps(context: any) {

  const cats = await fetch(`${process.env.NEXT_PUBLIC_CAT_API}/images/search?limit=20&page=0&order=ASC`, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_KEY ? process.env.NEXT_PUBLIC_KEY : "noKey",
    }
  })
  const test = await cats.json()

  return {
    props: {test}, // will be passed to the page component as props
  }
}


export default Home
