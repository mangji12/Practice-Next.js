export default async function page({params} : {params: Promise<{id : number}>}) {
    const {id} = await params 
    return (
        <div>
            book/{id} 페이지
        </div>
    )
}