import Image from "next/image";
import Link from "next/link";
import { Breed, CatType } from "@/types/main";
import axios from "axios";

function Home({ test, breeds }: { test: CatType[]; breeds: Breed[] }) {
  return (
    <div className="bg-beige">
      <h1 className="w-full text-center">Cat Site</h1>
      <div className="w-full xl:p-0 xl:w-2/3 my-4 mx-auto">
        <div className="flex flex-wrap justify-items-center">
          {breeds.map((breed, index) => (
            <span
              className="border border-gray-300 py-2 px-3 rounded-md mb-4 mr-4"
              key={`breed-${breed.id}`}
            >
              {breed.name}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {test.map((cat, index) => {
            return (
              <div className="bg-vanila px-4 py-4 rounded-2xl" key={index}>
                <div>
                  <Link href={`/cat/${cat.id}`}>{cat.id}</Link>
                </div>
                <Image
                  src={cat.url}
                  alt={cat.id}
                  width={cat.width}
                  height={cat.height}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const cats = await fetch(
    `${process.env.NEXT_PUBLIC_CAT_API}/images/search?limit=20&page=0&order=ASC`,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_KEY
          ? process.env.NEXT_PUBLIC_KEY
          : "noKey",
      },
    }
  );

  const { data: breeds } = await axios.get(
    "https://api.thecatapi.com/v1/breeds"
  );
  const test = await cats.json();

  return {
    props: { test, breeds },
  };
}

export default Home;
