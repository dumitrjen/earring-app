export default function About() {
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">About EarMuse</h1>

        
        <div className="container mx-auto">
            <p className="text-lg max-w-3xl mx-auto">
            EarMuse is a creative studio committed to bringing innovative ideas to life. With a passion for design and a keen eye for detail, we help our clients shape their brand and vision with passion and precision. Our approach combines creativity, strategy, and technical expertise to deliver exceptional results.
            </p>
        </div>
        </div>


        <footer className="bg-[#485696] text-[#FEF9EA] py-8 text-center">
            <p>&copy; 2024 EarMuse</p>
            <p>All rights reserved.</p>
            <p>Follow us on social media for updates and inspiration!</p>
            <div className="flex justify-center space-x-4 mt-4">
                <a href="#" className="text-[#FEF9EA] hover:text-[#485696]">Instagram</a>
                <a href="#" className="text-[#FEF9EA] hover:text-[#485696]">Facebook</a>
                <a href="#" className="text-[#FEF9EA] hover:text-[#485696]">Twitter</a>
                <a href="#" className="text-[#FEF9EA] hover:text-[#485696]">LinkedIn</a>
            </div>
        </footer>

        </>
    );
}