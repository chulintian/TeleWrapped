export default function PhoneNumInput() {
    return (
      <div>
        <div className="relative flex flex-auto flex-row gap-5 border border-1 p-3 rounded-lg">
          <div className='flex flex-row gap-1'>
            <span>
              +
            </span>
            <input type="number" placeholder="65" className="outline-0 remove-arrow w-5"/>
          </div>
          <input type="number" placeholder='Phone number' className='outline-0 remove-arrow w-full'/>
        </div>
      </div>
    );
  }