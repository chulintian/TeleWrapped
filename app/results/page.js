import Image from "next/image";
import FlipEnoki from "@/app/components/results/flip_enoki";
import FlipTofu from "@/app/components/results/flip_tofu";
import FlipMeat from "@/app/components/results/flip_meat";
import FlipRadish from "../components/results/flip_radish";
import FlipBokchoy from "../components/results/flip_bokchoy";
import FlipTomato from "../components/results/flip_tomato";

export default function Results() {
  return (
    <div className="min-h-dvh w-full py-5 px-7 flex overflow-y-auto flex-col items-center">
      <div className="w-full">
        <Image
          src="/logo2.png"
          alt="logo"
          width={200}
          height={100}
          className="justify-self-center w-4/5 sm:w-1/2 md:w-1/3"
        />
      </div>
      <div className="flex justify-center my-6 w-48 lg:w-56">
        <p className="text-wrap text-xs lg:text-sm text-center">
          Click on each ingredient to reveal chat insights.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col w-full justify-center items-center  lg:order-2 ">
          <div className="flex justify-center items-center h-80 w-full lg:h-96 relative">
            <Image
              src="/hotpot/malaPot.png"
              alt="Image of hotpot"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="flex justify-center items-center h-32 w-32 lg:w-56 lg:h-48 relative overflow-visible">
            <Image
              src="/hotpot/utensils.png"
              alt="Image of utensils"
              fill
              className="object-contain rounded-lg transform translate-x-full -translate-y-[70%] lg:translate-none"
            />
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center lg:order-1 transform xl:translate-x-[7%] 2xl:translate-x-[20%] -translate-y-[20%] lg:translate-y-[0%]">
          <div className="flex flex-col lg:flex-row w-full h-80 justify-center items-center ">
            <div className="flex justify-around items-center h-48 aspect-[1] lg:h-64 ">
              <FlipEnoki></FlipEnoki>
            </div>
            <div className="flex justify-around items-center h-48 aspect-[1] lg:h-40 ">
              <FlipTofu></FlipTofu>
            </div>
          </div>
          <div className="flex justify-around items-center h-48 aspect-[1] lg:h-64 ">
            <FlipBokchoy></FlipBokchoy>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center transform xl:-translate-x-[10%] 2xl:-translate-x-[23%] -translate-y-[15%] lg:translate-y-[0%] lg:order-3">
          <div className="flex flex-col lg:flex-row w-full justify-center items-center lg:order-2 ">
            <div className="flex justify-around items-center h-48 aspect-[1] lg:h-64">
              <FlipRadish></FlipRadish>
            </div>
            <div className="flex justify-around items-center h-48 aspect-[1] lg:h-40">
            <FlipTomato></FlipTomato>
          </div>
          </div>
            <div className="flex justify-around items-center h-48 aspect-[1] lg:h-64 ">
              <FlipMeat></FlipMeat>
            </div>
        </div>
      </div>
    </div>
  );
}
