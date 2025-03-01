import { motion, useTransform, useViewportScroll, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedTextUnderline = ({
    text = "Let's Connect",
    textColor = "text-teal-800",
    underlineColor = "#009080",
    fontSize = "text-4xl sm:text-5xl",
    animationDuration = 2,
    animationDelay = 0.5,
    strokeWidth = 4,
    curveHeight = 10, // Height of the curve in the SVG path
}) => {
    const textRef = useRef(null);
    const [pathLength, setPathLength] = useState(0);
    const { scrollYProgress } = useViewportScroll();
    const underlineProgress = useTransform(scrollYProgress, [0, 1], [0, pathLength]);
    const isInView = useInView(textRef, { once: true, margin: "-20%" });

    // Function to calculate the text width and update the path length
    const updatePathLength = () => {
        if (textRef.current) {
            const textWidth = textRef.current.offsetWidth;
            setPathLength(textWidth);
        }
    };

    // Recalculate path length on window resize or text change
    useEffect(() => {
        updatePathLength();
        window.addEventListener("resize", updatePathLength);
        return () => window.removeEventListener("resize", updatePathLength);
    }, [text]);

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: {
                    delay: animationDelay,
                    type: "spring",
                    duration: animationDuration,
                    bounce: 0,
                },
                opacity: { delay: animationDelay, duration: 1 },
            },
        },
    };

    // Bubble animation variants
    const bubbleVariants = {
        float: {
            y: [0, -20, 0], // Move up and down
            x: [0, 10, 0], // Slight horizontal movement
            scale: [1, 1.1, 1], // Slight scaling
            transition: {
                duration: 4, // Slower animation
                repeat: Infinity, // Loop forever
                ease: "easeInOut",
            },
        },
    };

    return (
        <section className="relative mx-auto text-center py-12 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            {/* Floating bubbles in the background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-8 h-8 bg-teal-200/50 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        variants={bubbleVariants}
                        animate="float"
                        transition={{
                            duration: Math.random() * 4 + 2, // Randomize duration
                            delay: Math.random() * 2, // Randomize delay
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>

            {/* Text with animated underline */}
            <h1 className={`${fontSize} font-bold tracking-tight text-gray-900 relative z-10`}>
                <span className="relative whitespace-nowrap">
                    <motion.svg
                        aria-hidden="true"
                        viewBox={`0 0 ${pathLength} ${curveHeight}`}
                        className="absolute left-0 top-full h-2"
                        preserveAspectRatio="none"
                        width={pathLength}
                        height={curveHeight}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.path
                            d={`M0 ${curveHeight / 2} Q${pathLength / 4} ${curveHeight}, ${pathLength / 2} ${curveHeight / 2} T${pathLength} ${curveHeight / 2}`}
                            variants={draw}
                            strokeWidth={strokeWidth}
                            fill="none"
                            stroke={underlineColor}
                            style={{ pathLength: underlineProgress }}
                        />
                    </motion.svg>
                    <span ref={textRef} className={`relative ${textColor} font-alliance`}>
                        {text}
                    </span>
                </span>
            </h1>
        </section>
    );
};

export default AnimatedTextUnderline;