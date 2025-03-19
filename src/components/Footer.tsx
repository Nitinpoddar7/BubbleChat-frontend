import HeartIcon from "../assets/HeartIcon";
import StarIcon from "../assets/StarIcon";

const Footer = () => {
    return (
        <div className="border-t w-full border-gray-500 p-4 flex flex-col gap-2 lg:gap-0 lg:flex-row">
            <div className="lg:w-1/3 flex justify-center gap-1 items-center">
                <span>Made with</span>
                <HeartIcon size="1rem" />
                <span>by Nitin</span>
            </div>
            <div className="lg:w-1/3 lg:-order-1 flex justify-center items-center gap-1">
                <span>Socials:</span>
                <a href="https://x.com/NitinCodes_07" target="_blank" className="cursor-pointer hover:underline">Twitter</a>
                <span>|</span>
                <a href="https://github.com/Nitinpoddar7" target="_blank" className="cursor-pointer hover:underline">Github</a>
            </div>
            <a target="_blank" href="https://github.com/Nitinpoddar7/BubbleChat-frontend" className="cursor-pointer hover:underline lg:w-1/3 flex justify-center items-center gap-1">
                <span>Give it a star</span>
                <StarIcon size="1rem" />
            </a>
        </div>
    )
}

export default Footer;