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
    <>
      <button className="italic text-xs w-full text-center" onClick={handleClick} disabled={timer !=0}>
        Did not receive?
        <span className={`ms-1 ${timer === 0 ? "underline" : ""}`}>Resend code</span>
        {timer !=0 && <span> in {timer}</span>}
      </button>
    </>
  )
}