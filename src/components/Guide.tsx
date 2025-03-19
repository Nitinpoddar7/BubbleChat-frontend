const Guide = () => {
    return (
        <div className="p-4 max-w-5xl mx-auto text-center">
            <div className="text-3xl sm:text-4xl">
                Getting Started
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-14 lg:grid-cols-3">
                {/* STEP 1 */}
                <div className="text-center">
                    <div className="text-2xl">
                        Step 1
                    </div>
                    <div className="">Create a bubble (your bubble will be assigned a unique id)</div>
                </div>
                {/* STEP 2 */}
                <div className="text-center">
                    <div className="text-2xl">
                        Step 2
                    </div>
                    <div className="">Share your bubble's unique ID/link to your friend</div>
                </div>
                {/* STEP 3 */}
                <div className="text-center">
                    <div className="text-2xl">
                        Step 3
                    </div>
                    <div className="">Ask your friend to join via ID/link and you're ready to go</div>
                </div>
            </div>
        </div>
    )
}

export default Guide;