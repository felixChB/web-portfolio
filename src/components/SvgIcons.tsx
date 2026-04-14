export function ArrowIcon() {
    return (
        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
            height="24">
            <path d="M2 2h20M22 22v-20M2 22L22 2" fill="none" stroke="currentColor" stroke-width="1"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export function ArrowIconWrapper() {
    return (
        <div className="arrow-icon-wrapper">
            <ArrowIcon />
            <ArrowIcon />
        </div>
    )
}