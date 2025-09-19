import {api_route} from "./api.route";

export default async function getData(path: string){
     
    const res = await fetch(api_route + path)

    return res
}