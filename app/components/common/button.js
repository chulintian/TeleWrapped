export default function Button({
    label,
    onClick,
    alignmentClass="",
}) {
    return (
        <div className={`${alignmentClass} bg-[#42a85e] border-[1.5px] py-1 px-3 rounded-lg w-fit cursor-pointer`} onClick={onClick}>
            {label}
        </div>
    )
}