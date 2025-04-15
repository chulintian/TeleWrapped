import Image from "next/image";
import { MdOutlineTimer } from "react-icons/md";
import Link from "next/link";

export default function Soup({ soupbases }) {
  return (
    <Link
      href="/ingredientPrep"
      className="flex flex-col items-center w-64 p-4"
    >
      <Image
        src={`/soupbases/${soupbases.image}.png`}
        alt={soupbases.name}
        width={150}
        height={150}
        className="w-full"
      />
      <div className="rounded-lg bg-white border text-sm p-3 mt-4 w-full">
        <p className="font-bold text-center text-sm">{soupbases.name}</p>
        <p className="justify-center items-center flex flex-row text-sm">
          <span>
            <MdOutlineTimer />
          </span>
          <span>{soupbases.time}</span>
        </p>
        <p className="text-center">{soupbases.messages}</p>
      </div>
    </Link>
  );
}
