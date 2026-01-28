import mongoose from "mongoose";
import dotenv from "dotenv";
import { Deal } from "../models/deal.model.js";

dotenv.config({
    path: './.env'
});

const makeDeals = () => [
    {
        title: "AWS Activate",
        description: "$1,000 in AWS credits for 2 years. Access to technical support and training.",
        category: "Cloud",
        accessLevel: "public",
        eligibilityText: "Open to bootstrapped startups.",
        partnerName: "Amazon Web Services"
    },
    {
        title: "HubSpot for Startups",
        description: "90% off HubSpot software for eligible startups. Includes CRM, Marketing, Sales, and Service Hubs.",
        category: "Marketing",
        accessLevel: "locked",
        eligibilityText: "Must be a verified startup with < $2M funding.",
        partnerName: "HubSpot"
    },
    {
        title: "Mixpanel Growth",
        description: "$50,000 in credits for the first year. Advanced product analytics for mobile and web.",
        category: "Analytics",
        accessLevel: "public",
        eligibilityText: "New customers only.",
        partnerName: "Mixpanel"
    },
    {
        title: "Notion Plus",
        description: "6 months free of Notion Plus with AI. Organize your work and knowledge in one place.",
        category: "Productivity",
        accessLevel: "locked",
        eligibilityText: "Verified startups only.",
        partnerName: "Notion"
    },
    {
        title: "GitHub Enterprise",
        description: "20 seats of GitHub Enterprise free for 1 year. Coding collaboration and automation.",
        category: "Developer Tools",
        accessLevel: "public",
        eligibilityText: "Series A or earlier.",
        partnerName: "GitHub"
    },
    {
        title: "DigitalOcean Hatch",
        description: "$1,000 in infrastructure credit for 12 months. Simple, scalable cloud computing.",
        category: "Cloud",
        accessLevel: "locked",
        eligibilityText: "Must be part of an accelerator.",
        partnerName: "DigitalOcean"
    },
    {
        title: "Mailchimp Standard",
        description: "50% off for 12 months. Email marketing, automation, and analytics.",
        category: "Marketing",
        accessLevel: "public",
        eligibilityText: "New accounts only.",
        partnerName: "Intuit Mailchimp"
    }
];

const seedDeals = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing deals to avoid duplicates (optional, but good for idempotent runs)
        await Deal.deleteMany({});
        console.log("Cleared existing deals.");

        const deals = makeDeals();
        await Deal.insertMany(deals);
        console.log(`Successfully seeded ${deals.length} deals!`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding deals:", error);
        process.exit(1);
    }
};

seedDeals();
