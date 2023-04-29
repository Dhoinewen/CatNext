import { useRouter } from 'next/router'
import {CatType} from "@/types/main";

const CatDetail = ({cat}: {cat: CatType}) => {

    console.log(cat)

    return (
        <div> {cat.id} </div>
    )
}


export async function getServerSideProps(context) {

    const id = context.query.id



    const response = await fetch(`${process.env.NEXT_PUBLIC_CAT_API}/images/${id}`, {
        headers: {
            'x-api-key': 'live_cdDyPkqKPEm7J3IiMV6e31uVHpneQOey2j6Bfw3xprkRJdzp3pMcsG1euDSVHfbb',
        }
    })

    const cat = await response.json()

    return {
        props: {cat}, // will be passed to the page component as props
    }
}

export default CatDetail
