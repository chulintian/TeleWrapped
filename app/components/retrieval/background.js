import Image from "next/image"

export default function Background(){
  return(
    <div className="p-5 mt-12 w-full">
        <table className="table place-self-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]">
        <tbody>
          <tr>
            <td>
              <Image 
                src="/ingredients/compatibility/shitake.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle place-self-center"
              />
            </td>
            <td>
              <Image 
                src="/ingredients/attachmentStyle/tofu.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle place-self-center"
              />
            </td>
            <td>
              <Image 
                src="/ingredients/numOfMessages/corn.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle place-self-center"
              />
            </td>
            <td>
              <Image 
                src="/ingredients/redFlag/meat.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle place-self-center"
              />
            </td>
            <td>
              <Image 
                src="/ingredients/greenFlag/bokchoy.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle place-self-center"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}