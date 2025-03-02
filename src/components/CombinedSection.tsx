import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projectsApi, contactsApi, personalInfoApi } from "../lib/api";
import { Project, Contact, PersonalInfo, AlertProps } from "../lib/types";
import FeaturedProjects from "./FeaturedProjects";
import ContactSection from "./ContactSections";

export default function CombinedSection() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isContactInfoLoading, setIsContactInfoLoading] = useState<boolean>(true);
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [contactForm, setContactForm] = useState<Contact>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    } as Contact);
    const [alert, setAlert] = useState<AlertProps | null>(null);
    const [contactInfo, setContactInfo] = useState<PersonalInfo | null>(null);

    useEffect(() => {
        fetchFeaturedProjects();
        fetchContactInfo();
    }, []);

    // Fetch featured projects
    const fetchFeaturedProjects = async () => {
        try {
            const data = await projectsApi.getAll();
            if (data) setFeaturedProjects(data.filter((p) => p.is_featured));
        } catch (error) {
            console.error("Error fetching featured projects:", error);
            setAlert({
                type: "error",
                message: "Failed to fetch featured projects.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch contact info
    const fetchContactInfo = async () => {
        setIsContactInfoLoading(true);
        try {
            const data = await personalInfoApi.get();
            setContactInfo(data);
        } catch (error) {
            console.error("Error fetching contact info:", error);
            setAlert({
                type: "error",
                message: "Failed to fetch contact information.",
            });
        } finally {
            setIsContactInfoLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await contactsApi.create(contactForm);
            if (data) {
                setAlert({
                    type: "success",
                    message: "Your message has been sent successfully. We will contact you soon!",
                });
                setContactForm({
                    name: "",
                    email: "",
                    subject: "",
                    phone: "",
                    message: "",
                } as Contact);
            }
        } catch (error) {
            console.error(error);
            setAlert({
                type: "error",
                message: "Something went wrong. Please try again later!",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setContactForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (isLoading || isContactInfoLoading) return null;

    return (
        <section className="pt-16 md:py-32 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container max-w-7xl mx-auto">
                {/* Animated Text Heading */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="bg-gradient-to-r from-blue-800 to-cyan-600 bg-clip-text text-transparent">
                        Let's Build Something Amazing
                    </span>
                </motion.h1>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <FeaturedProjects projects={featuredProjects} />
                    <ContactSection
                        contactInfo={contactInfo}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        contactForm={contactForm}
                        isLoading={isLoading}
                        alert={alert}
                    />
                </div>
            </div>
        </section>
    );
}