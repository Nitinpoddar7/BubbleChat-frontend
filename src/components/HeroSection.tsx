const HeroSection = () => {
    return (
        <div className="mx-auto max-w-5xl text-center">
            <div className="mt-4 p-4 text-3xl sm:text-4xl lg:text-5xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">BubbleChat :</span> Create chat bubbles with just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-300 dark:to-gray-500">Click !</span>
            </div>
            <div className="mx-auto w-[80%]">
                BubbleChat lets you create disposable chat bubbles to chat seamlessly with anyone across the globe. Thinking about getting started? Just create one chat bubble now or simply join your friend's bubble.
            </div>
        </div>
    )
}

export default HeroSection;