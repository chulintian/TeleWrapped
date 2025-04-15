import Image from "next/image"

export default function Background(){
  return(
    <div className="relative w-full h-dvh p-5 overflow-y-hidden">
      <table className="table-auto h-full w-full">
        <tbody>
          <tr>
            <td/>
            <td/>
            <td>
              <Image 
                src="/ingredients/numOfMessages/corn.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle"
              />
            </td>
          </tr>
          <tr>
            <td/><td/><td/>
            <td className="w-1/2"></td>
            <td>
              <Image 
                src="/ingredients/greenFlag/bokchoy.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle"
              />
            </td>
          </tr>
          <tr className="h-1/2">
            <td className="hidden sm:block">
              <Image 
                src="/ingredients/attachmentStyle/tofu.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="animate-wiggle"
              />
            </td>
          </tr>
          <tr>
            <td/><td/><td/>
            <td className="w-1/2 hidden sm:block"></td>
            <td/>
            <td>
              <Image 
                src="/ingredients/redFlag/meat.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle"
              />
            </td>
          </tr>
          <tr>
            <td/>
            <td>
              <Image 
                src="/ingredients/compatibility/shiitake.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-18 animate-wiggle"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}