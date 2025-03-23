export default function OTPInput(){
  return(
    <div className="border border-[1.5px] py-1 px-3 rounded-lg w-full sm:4/5 md:3/5 bg-white">
      <input type="number" placeholder="One-Time Passcode" className='outline-0 remove-arrow w-full'/>
    </div>
  )
}