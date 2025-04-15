import Image from "next/image";
import FlipEnoki from "@/app/components/results/flip_enoki";
import FlipTofu from "@/app/components/results/flip_tofu";

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
      <div className="flex justify-center items-center h-96 w-full lg:w-56 lg:h-48 relative">
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
          className="object-contain rounded-lg"
          style={{ transform: "translateX(100%) translateY(-70%)" }}
        />
      </div>
      <div className="flex justify-around items-center h-64 w-full lg:w-56 lg:h-48 relative overflow-visible" style={{ transform: " translateY(-45%)" }}>
          <FlipEnoki />
      </div>
      <div className="flex justify-around items-center h-48 w-full lg:w-56 lg:h-48 " style={{ transform: " translateY(-45%)" }}>
          <FlipTofu></FlipTofu>
      </div>
    </div>
  );
}
