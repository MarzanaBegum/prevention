
interface IconProps {
    stroke?: string
}

function LockIcon({ stroke = '#717171', ...props }: IconProps) {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10.5V8.5C6 5.19 7 2.5 12 2.5C17 2.5 18 5.19 18 8.5V10.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19C13.3807 19 14.5 17.8807 14.5 16.5C14.5 15.1193 13.3807 14 12 14C10.6193 14 9.5 15.1193 9.5 16.5C9.5 17.8807 10.6193 19 12 19Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 22.5H7C3 22.5 2 21.5 2 17.5V15.5C2 11.5 3 10.5 7 10.5H17C21 10.5 22 11.5 22 15.5V17.5C22 21.5 21 22.5 17 22.5Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


    );
}

export default LockIcon;