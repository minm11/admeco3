import React from "react";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";
import {BiChevronRight, BiFilter, BiErrorAlt, BiSolidGroup} from 'react-icons/bi' 

export default function Import(){
    return(
        <div id="main" className=" pt-9 pb-28 px-5 font-lato mt-7 max-h-full overflow-y-auto  w-full">
            <div id="headTitle" className="flex items-center justify-between gap-16 flex-wrap">
                <div id="container left">
                    <h1 className="text-4xl font-semibold mb-5 text-black">Import</h1>
                    <div className="flex items-center gap-4">
                        <Link to='/' className="hover:text-[#3C91E6]">Home</Link>
                        <BiChevronRight id="icon iconchevronRight" className=""/>
                        <Link to='/Import' className="hover:text-[#3C91E6]">Import</Link>
                    </div>
                </div>
            </div>

        </div>
    );
}