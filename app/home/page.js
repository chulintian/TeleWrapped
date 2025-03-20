import Image from "next/image";
import SteamLottie from "../components/steam_lottie";

export default function Home() {
  return (
    <div className="w-full h-screen justify-center items-center flex">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row">
          <div className="flex-1/5"></div>
          <div className="flex-4/5">
            <SteamLottie></SteamLottie>
          </div>
        </div>
        <div className="justify-center items-center">
          <Image
            src="/hotpot/pot.png"
            width={500}
            height={300}
            layout="intrinsic"
            objectFit="contain"
            alt="Image of hotpot"
            className="-mt-25"
          />
        </div>
      </div>
    </div>
  );
}
