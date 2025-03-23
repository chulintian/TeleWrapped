import Image from "next/image"

export default function Background(){
  return(
    <div className="relative w-full h-dvh p-5 ">
      <table className="table-auto h-full w-full">
        <tbody>
          <tr>
            <td/>
            <td/>
            <td>
              <Image 
                src="/ingredients/otherVeg/corn.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-20"
              />
            </td>
          </tr>
          <tr>
            <td/><td/><td/>
            <td className="w-1/2"></td>
            <td>
              <Image 
                src="/ingredients/greenVeg/bokchoy.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-20"
              />
            </td>
          </tr>
          <tr className="h-1/2">
            <td className="hidden sm:block">
              <Image 
                src="/ingredients/extra/tofu.png" 
                alt="corn" 
                width={75} 
                height={75}
              />
            </td>
          </tr>
          <tr>
            <td/><td/><td/>
            <td className="w-1/2 hidden sm:block"></td>
            <td/>
            <td>
              <Image 
                src="/ingredients/meat/meat.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-20"
              />
            </td>
          </tr>
          <tr>
            <td/>
            <td>
              <Image 
                src="/ingredients/mushroom/shiitake.png" 
                alt="corn" 
                width={75} 
                height={75}
                className="w-35 sm:w-20"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}