import { name } from "@azure/msal-browser/dist/packageMetadata";
import {supabase} from  "../supabaseClient";

export async function fetchUserData()  {
    //kukuha ng name ni user 
    let { data: admin, error } = await supabase
    .from('admin')
    .select("*")
    .eq('adminName', name)
    // pero pano malalaman na yung kukunin kong name eh yung sa me acc?
    // naka select lang sya sa adminName pano marerecognize na kanya yon
    //what if may multiple acc sa database 
    //ano yung pipiliin nya don since walang ibang pag babasihan ng kukunin
    //shet ang hirap neto
    
    /**
     * 
     * 
     * try mo yung .eq kung kaya
     * 
     * 
     */


    
}
export const data = () => {
        
}
export const registerUserData = () => {
        
}