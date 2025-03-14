const Moon = ({size}: {size: string}) => {
    return <span><svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={`lucide lucide-moon-star`}viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg></span>
}

export default Moon;