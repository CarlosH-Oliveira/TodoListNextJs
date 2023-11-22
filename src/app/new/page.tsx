import { prisma } from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

const handleSubmit = async(data:FormData) => {
    "use server"

    try {
        const title = data.get("title")?.valueOf()
        if(typeof title !== "string" || title.length === 0){
            throw new Error("Invalid Title")
        }else{
            await prisma.todo.create({data: {title, complete:false}})
            redirect("/")
        } 
    } catch (error:any) {
        console.log(error.message);
    }
}

export default function Page() {
    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-3xl">New</h1>
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Home</Link>
            </header>
            <form action={handleSubmit} className="flex gap-2 flex-col">
                <input type="text" name="title" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Task title" />
                <div className="flex gap-1 justify-end">
                    <Link href=".." className="bg-white hover:bg-gray-100 text-red-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Cancel</Link>
                    <button type="submit" className="bg-white hover:bg-gray-100 text-green-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Save</button>
                </div>
            </form>
        </>
    )
}