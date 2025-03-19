export default function ResendCode({
    timer,
}) {
  var count = 0;

  function handleClick() {
    if (count > 1) {
        return;
    }
    //call api
    count++;
  }

  return (
    <div>
      <button className="underline italic" onClick={handleClick} disabled={timer !=0}>
        Did not receive? Resend code 
        {timer !=0 && <span>in {timer}</span>}
      </button>
    </div>
  )
}