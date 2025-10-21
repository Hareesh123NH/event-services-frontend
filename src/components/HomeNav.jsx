import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import { motion } from "framer-motion";

const HomeNav = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-white shadow z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <div className="text-2xl font-bold text-purple-600">Event Services</div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6">

                        {["hero", "features", "testimonials"].map((section) => (
                            <ScrollLink
                                key={section}
                                to={section}
                                smooth={true}
                                duration={800}
                                offset={-80} // adjust for navbar height
                                className="cursor-pointer hover:text-purple-600 transition"
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </ScrollLink>
                        ))}

                        <a href="/login" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Login</a>
                        <a href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Register</a>
                        <a href="/dashboard" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Get Started</a>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white shadow-lg"
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            {["hero", "features", "testimonials"].map((section) => (
                                <ScrollLink
                                    key={section}
                                    onClick={() => setMenuOpen(false)}
                                    to={section}
                                    smooth={true}
                                    duration={800}
                                    offset={-80}
                                    className="cursor-pointer hover:text-purple-600 transition"
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </ScrollLink>
                            ))}
                            <a href="/login" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Login</a>
                            <a href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Register</a>
                            <a href="/dashboard" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">Get Started</a>
                        </div>
                    </motion.div>
                )}
            </nav>
        </>
    )
}


export default HomeNav;