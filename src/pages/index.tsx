import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from "next/link";
import {CatType} from "@/types/main";

const inter = Inter({ subsets: ['latin'] })

function Home({test}: {test: CatType[]}) {

  return (
  <div>
    <h1>
      MMMMMMMMMMM
    </h1>
    <div className="w-2/3 grid grid-cols-3 gap-4 mx-auto">
      {test.map((cat, index) => {
        return (
            <div key={index}>
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


export async function getServerSideProps(context) {


  const cats = await fetch(`${process.env.NEXT_PUBLIC_CAT_API}/images/search?limit=20&page=0&order=ASC`, {
    headers: {
      'x-api-key': 'live_cdDyPkqKPEm7J3IiMV6e31uVHpneQOey2j6Bfw3xprkRJdzp3pMcsG1euDSVHfbb',
    }
  })
  const test = await cats.json()

  return {
    props: {test}, // will be passed to the page component as props
  }
}


export default Home
