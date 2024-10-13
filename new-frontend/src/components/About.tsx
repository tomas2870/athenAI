import { motion } from 'framer-motion'

export default function About() {
    return (
        <div className="flex-grow flex flex-col items-center justify-center p-4 mt-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-8"
            >
                <h2 className="text-3xl font-bold mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
                    About Us
                </h2>
                <p className="text-gray-600 mb-4">
                    We are a dedicated group of students participating in HackHarvard 2024, driven by a shared vision to make the college admissions process more equitable and accessible for everyone. Our product, AthenaPrep, is inspired by the goddess of knowledge, Athena, and embodies the pursuit of wisdom and fairness in education.
                </p>
                <p className="text-gray-600 mb-4">
                    <strong>Our Mission</strong>: At AthenaPrep, we believe that every student deserves access to quality college preparation resources, regardless of their financial background. While traditional college counseling services can be highly effective, they are often out of reach for many families due to high costs. Our goal is to offer an affordable alternative that provides valuable guidance, particularly for those who may not have the budget for private counseling services.
                </p>
                <p className="text-gray-600 mb-4">
                    We are committed to providing a platform that offers meaningful support for college-bound students, particularly in the area of essay writing. Even if we don’t replace traditional services, we aim to complement them by offering a valuable and affordable option for families seeking high-quality assistance without the financial burden.
                </p>
                <p className="text-gray-600 mb-4">
                    <strong>What We Offer</strong>:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>
                        <strong>Orientation:</strong> Through a series of interactive prompts, AthenaPrep engages students in thoughtful discussions, helping them narrow down their college options and guiding them through the key elements of their applications. Acting as a virtual counselor, AthenaPrep ensures that students feel supported as they make critical decisions.
                    </li>
                    <li>
                        <strong>Essay Editing:</strong> AthenaPrep allows students to input their essays and receive comprehensive feedback. Rather than doing the work for them, the LLM provides detailed commentary on both the overall structure and specific sections of the essay, helping students craft responses that are more compelling and tailored to what admissions officers are looking for.
                    </li>
                </ul>
                <p className="text-gray-600">
                    At AthenaPrep, we are passionate about making high-quality college prep tools available to everyone at an affordable cost, ensuring that opportunity is based on merit, not money.
                </p>
            </motion.div>
        </div>
    );
}
