export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  tag: string;
  eventType: string;
  company: string;
  jobTitle: string;
  timezone: string;
};

export const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 555-123-4567",
    tag: "VIP",
    eventType: "Intro call",
    company: "Acme Inc.",
    jobTitle: "Founder",
    timezone: "Nepal Time",
  },
  {
    id: 2,
    name: "Sara Lee",
    email: "sara@example.com",
    phone: "+1 555-234-5678",
    tag: "Lead",
    eventType: "Product demo",
    company: "Beyond Co.",
    jobTitle: "Product Manager",
    timezone: "Sydney, Melbourne Time",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    phone: "+44 20 1234 5678",
    tag: "Customer",
    eventType: "Customer check‑in",
    company: "Example Corp.",
    jobTitle: "CTO",
    timezone: "UTC",
  },
];


