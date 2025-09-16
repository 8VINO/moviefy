import api_route from "./api.route";

export default async function RequestGET(path: string){
     
    const res = await fetch(api_route + "?url=" + path)

    return res
}