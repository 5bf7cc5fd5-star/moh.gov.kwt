export const PORTS = [
  {
    group: "Airports",
    items: [
      "Kuwait International Airport (KWI) — Terminal 1",
      "Kuwait International Airport (KWI) — Terminal 4",
      "Kuwait International Airport — Cargo",
    ],
  },
  {
    group: "Sea ports",
    items: [
      "Shuwaikh Port",
      "Shuaiba Port",
      "Doha Port (Kuwait)",
      "Abdullah Port",
    ],
  },
  {
    group: "Land borders",
    items: [
      "Nuwaiseeb (Saudi Arabia)",
      "Salmi (Saudi Arabia)",
      "Abdali (Iraq)",
    ],
  },
  {
    group: "Other",
    items: ["Other port of entry"],
  },
] as const;

export const PURPOSES = [
  { id: "returning", en: "Returning resident / Kuwaiti returning home" },
  { id: "tourism", en: "Holiday / Tourism" },
  { id: "business", en: "Business / Work" },
  { id: "family", en: "Visiting family / friends" },
  { id: "medical", en: "Medical treatment" },
  { id: "education", en: "Education / Study" },
  { id: "transit", en: "Transit" },
  { id: "official", en: "Official / Diplomatic" },
  { id: "conference", en: "Conference / Event" },
  { id: "other", en: "Other" },
] as const;

export type PurposeId = (typeof PURPOSES)[number]["id"];

export const SEX_OPTIONS = [
  { id: "female", en: "Female" },
  { id: "male", en: "Male" },
] as const;

export const MALARIA_WHEN = ["1", "3", "7", "14", "21", "30"] as const;
export const SEXUAL_WHEN = ["1", "3", "6", "9", "12", "15"] as const;

export const COUNTRIES: { name: string; dial: string }[] = [
  { name: "Kuwait", dial: "+965" },
  { name: "Saudi Arabia", dial: "+966" },
  { name: "United Arab Emirates", dial: "+971" },
  { name: "Qatar", dial: "+974" },
  { name: "Bahrain", dial: "+973" },
  { name: "Oman", dial: "+968" },
  { name: "Iraq", dial: "+964" },
  { name: "Iran", dial: "+98" },
  { name: "Jordan", dial: "+962" },
  { name: "Lebanon", dial: "+961" },
  { name: "Egypt", dial: "+20" },
  { name: "Syria", dial: "+963" },
  { name: "Yemen", dial: "+967" },
  { name: "India", dial: "+91" },
  { name: "Pakistan", dial: "+92" },
  { name: "Bangladesh", dial: "+880" },
  { name: "Philippines", dial: "+63" },
  { name: "Sri Lanka", dial: "+94" },
  { name: "Nepal", dial: "+977" },
  { name: "China", dial: "+86" },
  { name: "United Kingdom", dial: "+44" },
  { name: "United States", dial: "+1" },
  { name: "Canada", dial: "+1" },
  { name: "France", dial: "+33" },
  { name: "Germany", dial: "+49" },
  { name: "Italy", dial: "+39" },
  { name: "Spain", dial: "+34" },
  { name: "Turkey", dial: "+90" },
  { name: "Uganda", dial: "+256" },
  { name: "Kenya", dial: "+254" },
  { name: "Tanzania", dial: "+255" },
  { name: "Ethiopia", dial: "+251" },
  { name: "Nigeria", dial: "+234" },
  { name: "South Africa", dial: "+27" },
  { name: "Australia", dial: "+61" },
  { name: "Indonesia", dial: "+62" },
  { name: "Malaysia", dial: "+60" },
  { name: "Singapore", dial: "+65" },
  { name: "Thailand", dial: "+66" },
  { name: "Vietnam", dial: "+84" },
  { name: "Japan", dial: "+81" },
  { name: "South Korea", dial: "+82" },
  { name: "Russia", dial: "+7" },
  { name: "Brazil", dial: "+55" },
  { name: "Morocco", dial: "+212" },
  { name: "Tunisia", dial: "+216" },
  { name: "Algeria", dial: "+213" },
  { name: "Sudan", dial: "+249" },
  { name: "Afghanistan", dial: "+93" },
];

export const COUNTRY_NAMES = COUNTRIES.map((c) => c.name);
