/**
 * Company image map — local, approved VRV Global photography.
 * ------------------------------------------------------------------
 * Source: the project `pictures/` folder ("VRV team photos" + "VRV Journey"),
 * optimised into /public/pictures/{team,about,journey} (web-sized JPEGs).
 *
 * NAMES are taken from the team-photo folder names (real, provided).
 * DESIGNATIONS and BIOS are NOT provided — they are editable placeholders;
 * replace with approved profiles before publishing. Do not invent titles/bios.
 *
 * IMAGE → USAGE MAP
 *   /pictures/team/*.jpg     → About ▸ Leadership cards (one portrait per person)
 *   /pictures/about/team-*.jpg → About ▸ Mission/Story group photos
 *   /pictures/journey/*.jpg  → About ▸ Our Journey / Milestones
 *   Raghu has no photo in the source set → card uses the initials fallback.
 */

export type LeadershipImage = {
  name: string;
  role: string;
  image: string; // "" → render initials fallback
  bio: string;
  focus: string;
  linkedin: string;
  message?: string; // personal quote from the individual profile page
  profileUrl?: string; // source profile page (reference; not linked in UI)
  imagePosition?: string; // CSS object-position override (default "center top")
};

export const leadershipImages: LeadershipImage[] = [
  {
    name: "Manoj",
    role: "[Designation — to confirm]",
    image: "/pictures/team/manoj.jpg",
    bio: "[Short approved bio to be added.]",
    focus: "Group strategy and sustainable supply chains",
    linkedin: "#",
  },
  {
    name: "Riaz",
    role: "[Designation — to confirm]",
    image: "/pictures/team/riaz.jpg",
    bio: "[Short approved bio to be added.]",
    focus: "Trading, sourcing and origin relationships",
    linkedin: "#",
  },
  {
    name: "Rakesh",
    role: "[Designation — to confirm]",
    image: "/pictures/team/rakesh.jpg",
    bio: "[Short approved bio to be added.]",
    focus: "Metals and circular economy supply chains",
    linkedin: "#",
  },
  {
    name: "Sathiya",
    role: "[Designation — to confirm]",
    image: "/pictures/team/sathiya.jpg",
    bio: "[Short approved bio to be added.]",
    focus: "Operations, quality and logistics",
    linkedin: "#",
  },
  {
    name: "Zac",
    role: "[Designation — to confirm]",
    image: "/pictures/team/zac.jpg",
    bio: "[Short approved bio to be added.]",
    focus: "Trade finance and risk management",
    linkedin: "#",
  },
  {
    name: "Florence",
    role: "[Designation — to confirm]",
    image: "/pictures/team/florence.jpg",
    bio: "[Short approved bio to be added.]",
    focus: "Sustainability, ESG and responsible sourcing",
    linkedin: "#",
  },
  {
    name: "Wini",
    role: "[Designation — to confirm]",
    image: "/pictures/team/wini.jpg",
    bio: "[Short approved bio to be added.]",
    focus: "Commercial coordination and partnerships",
    linkedin: "#",
  },
  {
    name: "Winly",
    role: "[Designation — to confirm]",
    image: "/pictures/team/winly.jpg",
    bio: "[Short approved bio to be added.]",
    focus: "Documentation, traceability and compliance",
    linkedin: "#",
  },
  {
    name: "Raghu",
    role: "[Designation — to confirm]",
    image: "", // no photo supplied → initials fallback
    bio: "[Short approved bio to be added.]",
    focus: "Long-term value creation",
    linkedin: "#",
  },
];

/** Group / office photos for the About mission & story sections. */
export const aboutGroupImages: { src: string; alt: string }[] = [
  { src: "/pictures/about/team-1.jpg", alt: "The VRV Global team together" },
  { src: "/pictures/about/team-2.jpg", alt: "VRV Global team group photo" },
  { src: "/pictures/about/team-3.jpg", alt: "VRV Global team at the office" },
];
