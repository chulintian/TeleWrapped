export default function Button({
    label,
    onClick,
    alignmentClass="",
}) {
    console.log('Button className:', alignmentClass);
    return (
        <div className={`${alignmentClass} bg-[#42a85e] border-1 p-3 rounded-lg w-fit`} onClick={onClick}>
            {label}
        </div>
    )
}