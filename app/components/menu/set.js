import Image from "next/image"

export default function Set({
  ingredients
}) {
  return(
    <div className="border rounded-lg flex flex-row py-5 md:py-2 px-3 bg-white flex flex-row justify-between text-sm">
      <div className="me-2 flex flex-row">
       <Image
          src="/hotpot/pot.png"
          alt="hotpot"
          width={100}
          height={100}
          className="w-14 me-3"
        />
        <div className="self-center">
          <p className="font-bold">Chat Name</p>
          {/* <p>Comes with {ingredients[0]}, {ingredients[1]}, {ingredients[2]} and {ingredients[3]}</p> */} Need settle loading issue first
        </div>
      </div>
      <div className="rounded-full p-1 aspect-square w-10 bg-[#f8a78d] h-10 flex justify-center items-center self-center">
        <Image 
          src="/cart.png" 
          alt="cart" 
          height={100} 
          width={100} 
          className="w-4"
        />
      </div>
    </div>
  )
}