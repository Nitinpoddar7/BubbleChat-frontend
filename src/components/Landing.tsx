import Footer from "./Footer";
import Guide from "./Guide";
import Header from "./Header";
import HeroSection from "./HeroSection";

const Landing = () => {
    return (
        <div className="bg-white flex flex-col  min-h-screen dark:bg-black text-black dark:text-white">
            <Header />
            <div className="grow flex w-full h-full items-center justify-center flex-col">
            <HeroSection />
            <hr className="my-6 2xl:my-20 mx-auto w-[50%] sm:w-[20%] text-gray-500"/>
            <Guide />
            </div>
            <Footer />
        </div>
    )
}

export default Landing;