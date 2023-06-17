import Image from "next/image";
import Link from "next/link";
import { Breed, CatType } from "@/types/main";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { filterArrayControl } from "@/helpers/filterArrayControl";

function Home({ test, breeds }: { test: CatType[]; breeds: Breed[] }) {
  const [breedsFilter, setBreedsFilter] = useState<string[]>([]);


  return (
    <div className="bg-beige">
      <h1 className="w-full text-center">Cat Site</h1>
      <div className="w-full xl:p-0 xl:w-2/3 my-4 mx-auto p-2">
          <div className="flex flex-wrap my-4 h-12">
              {breedsFilter.length !== 0 ? (
                  breedsFilter.map((breed) => (
                      <span className="py-2 px-3 rounded-xl mb-4 mr-4 border border-gray-800 text-gray-800 bg-vanila">
                      {breed}
                  </span>
                  ))) : (
                <h2>Select breed</h2>
              )}
          </div>
        <div className="flex flex-wrap justify-center">
          {breeds.map((breed, index) => (
            <button
              className={clsx(
                "py-2 px-3 rounded-xl mb-4 mr-4 border border-gray-800 text-gray-800",
                breedsFilter.includes(breed.id)
                  ? "bg-vanila transition duration-100"
                  : "bg-beige transition duration-100"
              )}
              key={`breed-${breed.id}`}
              onClick={() =>
                setBreedsFilter(filterArrayControl(breed.id, breedsFilter))
              }
            >
              {breed.name}
            </button>
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
