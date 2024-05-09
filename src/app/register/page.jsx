import { Register } from "@/components/component/register";

export default function register() {
    console.log("register page");
    return (
        <div className="flex justify-center bg-white"> {/* Ajoutez la classe bg-white pour mettre tout le background en blanc */}
            <Register/>
        </div>
    );
}

