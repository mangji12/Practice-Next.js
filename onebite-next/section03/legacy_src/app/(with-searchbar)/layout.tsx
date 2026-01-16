import { ReactNode } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({children} : Readonly<{children: ReactNode}>) {
    return (
        <div>
            <div>임시 서치바</div>
            {children}
            <Searchbar/>
        </div>
    )
}