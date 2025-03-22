export default function PhoneNumInput() {
    return (
      <div>
        <div className="relative flex flex-auto flex-row gap-3 border border-1 p-3 rounded-lg bg-white w-1/3 place-self-center">
          <div className='flex flex-row gap-1'>
            <span>
              +
            </span>
            <input type="number" placeholder="65" className="outline-0 remove-arrow w-8 border-e-1"/>
          </div>
          <input type="number" placeholder='Phone number' className='outline-0 remove-arrow w-full'/>
        </div>
      </div>
    );
  }