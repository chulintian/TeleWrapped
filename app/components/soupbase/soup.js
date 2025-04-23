import Image from "next/image";
import { MdOutlineTimer } from "react-icons/md";

export default function Soup({ soupbase, handleClick }) {
  return (
    <div
      className="flex flex-col items-center w-64 p-4 cursor-pointer"
      onClick={() => handleClick(soupbase)}
    >
      <Image
        src={`/soupbases/${soupbase.image}.png`}
        alt={soupbase.name}
        width={150}
        height={150}
        className="w-full"
      />
      <div className="rounded-lg bg-white border text-sm p-3 mt-4 w-full">
        <p className="font-bold text-center text-sm">{soupbase.name}</p>
        <p className="justify-center items-center flex flex-row text-sm">
          <span>
            <MdOutlineTimer />
          </span>
          <span>{soupbase.time}</span>
        </p>
        <p className="text-center">{soupbase.messages} message</p>
      </div>
    </div>
  );
}
