import FoodSizzleAudio from "../components/home/food_sizzle";
import SteamLottie from "../components/home/steam_lottie";

export default function Home() {
  return (
    <div className="w-full h-screen justify-center items-center flex">
      <FoodSizzleAudio></FoodSizzleAudio>
      <div className="flex flex-col items-center max-w-screen-lg w-full">
        <div className="flex flex-row justify-end w-full ">
          <div className="w-4/5">
            <SteamLottie></SteamLottie>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full ">
          <img
            className="w-5/6 -mt-25 sm:-mt-40 md:-mt-48 lg:-mt-60 "
            src="/hotpot/pot.png"
          ></img>
        </div>
      </div>
    </div>
  );
}
