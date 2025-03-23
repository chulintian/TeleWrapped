export default function Button({
    label,
    onClick,
    alignmentClass="",
}) {
    return (
        <div className={`${alignmentClass} bg-black text-white p-2 rounded-lg w-fit`} onClick={onClick}>
            {label}
        </div>
    )
}