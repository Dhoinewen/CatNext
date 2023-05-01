import { useRouter } from 'next/router'
import {CatType} from "@/types/main";

const CatDetail = ({cat}: {cat: CatType}) => {

    console.log(cat)

    return (
        <div> {cat.id} </div>
    )
}


export async function getServerSideProps(context: any) {

    const id = context.query.id



    const response = await fetch(`${process.env.NEXT_PUBLIC_CAT_API}/images/${id}`, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        }
    })

    const cat = await response.json()

    return {
        props: {cat}, // will be passed to the page component as props
    }
}

export default CatDetail
