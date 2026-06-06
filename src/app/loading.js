import { Spinner } from "@/components/ui/spinner"

function Loading(){
    return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-tr from-sky-200 via-sky-400 to-sky-500">
    <Spinner/> <p>Loading....</p>
  </div>)
}

export default Loading