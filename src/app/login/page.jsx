import { Login } from "@/components/component/login";

export default function login   () {
    console.log("login page");
    return(
        <div className={"flex justify-center mt-0 bg-white "}>
        <Login/>
    </div>
    )
}