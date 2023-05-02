import {CatType} from "@/types/main";

const CatDetail = ({cat}: {cat: CatType}) => {

    return (
        <div> {cat.id} </div>
    )
}


export async function getServerSideProps(context: any) {

    const id = context.query.id

    const response = await fetch(`${process.env.NEXT_PUBLIC_CAT_API}/images/${id}`, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_KEY ? process.env.NEXT_PUBLIC_KEY : "noKey"
        }
    })

    const cat = await response.json()

    return {
        props: {cat},
    }
}

export default CatDetail
