import TodoItem from "@/components/todoItem"
import { prisma } from "@/db"
import { Inter } from "next/font/google"
import Link from "next/link"

async function toggleTodo(id: string, complete:boolean) {
  "use server"
  console.log(id, complete)
  await prisma.todo.update({where: {id}, data: {complete}})
}

export default async function Home() {

  //await prisma.todo.create({data: {title:"Mandar e-mail para proposta", complete:false}})
  const todos = await prisma.todo.findMany()

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">To-dos</h1>
        <Link href="/new" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">New</Link>
      </header>
      <main className="main">
        <ul className="pl-4">
          {
            todos.map((todo:any, key:any) => (
              <TodoItem key={todo.id} id={todo.id} title={todo.title} complete={todo.complete} toggleTodo={toggleTodo}></TodoItem>
            ))
          }
        </ul>
      </main>
    </>
    
  )
}
