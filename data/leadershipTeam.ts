/**
 * Leadership / team data — founder + executive leadership + directors.
 * Bios, messages and titles are SOURCED from each person's individual profile
 * page on the current VRV site and polished into premium corporate language
 * (meaning preserved). Raghu has no profile page → placeholder bio.
 *
 * IMAGE MAPPING (/public/pictures/team/):
 *  - Founder spotlight uses `mainImage` (manoj.jpg); a Manoj team/leadership
 *    card uses `cardImage` (manoj-vembu.jpg — a different photo).
 *  - "wini" in the source set refers to Yasuswini Subramanian (not Winly).
 *  - Raghu has no portrait → `image: ""` (initials fallback).
 *  Florence and Winly are intentionally excluded; no duplicate profiles.
 */
import type { LeadershipImage } from "./companyImages";

/** Founder spotlight (two images: large hero vs. team card). */
export const founder = {
  name: "Manoj Vembu",
  role: "Founder and Managing Director",
  mainImage: "/pictures/team/manoj.jpg", // large founder spotlight only
  cardImage: "/pictures/team/manoj-vembu.jpg", // carousel / leadership card only
  mainImagePosition: "center top",
  cardImagePosition: "center top",
  profileUrl: "https://vrv.campaigntag.com/managing-director/",
  focus: "Sustainable integrated supply chains, trade finance, strategy and long-term value creation",
  linkedin: "https://www.linkedin.com/in/manoj-vembu-b8349914",
  message: [
    "At VRV, I see an incredible opportunity to blend innovation with sustainability. Having spent two decades in trade, finance and strategic growth, I believe our role goes beyond business success — it is about creating impact that lasts.",
    "The most exciting part of working with VRV is shaping next-generation business models that are globally scalable and socially responsible.",
  ],
  bio: "Manoj Vembu is a seasoned business leader with 20 years of experience in trade structuring, trade finance, fund management and strategic expansion. He has founded, managed and successfully exited ventures in trade finance and management consulting, and served as Director — Finance & Strategy for a family-managed commodities business in Singapore. He is a Chartered Accountant from ICAI and holds a certification in Disruptive Strategy from Harvard Business School.",
};

/** Manoj as a standard leadership card (uses the card image). */
export const founderCard: LeadershipImage = {
  name: founder.name,
  role: founder.role,
  image: founder.cardImage,
  imagePosition: founder.cardImagePosition,
  bio: founder.bio,
  focus: founder.focus,
  linkedin: founder.linkedin,
  message: founder.message.join(" "),
  profileUrl: founder.profileUrl,
};

export const leadershipTeam = {
  founder,
  executives: [
    {
      name: "Riaz Altaff Hussien",
      role: "Deputy Managing Director",
      image: "/pictures/team/riaz-altaff-hussien.jpg",
      imagePosition: "center top",
      message:
        "At VRV Global, I see more than a trading platform — I see a long-term institution in the making. Sustainable growth must be built on strong fundamentals, disciplined execution and trusted partnerships.",
      bio: "Riaz Altaff Hussien is a seasoned business leader with over two decades of experience in global commodities, trade structuring, supply chain operations and strategic expansion across emerging and developed markets. He has built and led commercial platforms across commodity trading and operating businesses, with expertise in trade execution, procurement, logistics, risk management and cross-border structuring. His work integrates sustainability and responsible-sourcing practices — including traceability and long-term resource stewardship — into commercial decision-making. He holds a Bachelor's degree in Economics and Finance from RMIT University.",
      focus: "Global commodities, procurement, logistics, risk management and responsible sourcing",
      profileUrl: "https://vrv.campaigntag.com/riaz/",
      linkedin: "https://www.linkedin.com/in/riaz-altaff-hussien-41034828",
    },
    {
      name: "Sathiya Muthiah",
      role: "Chief Executive Officer",
      image: "/pictures/team/sathiya-muthiah.jpg",
      imagePosition: "center top",
      message:
        "What excites me about VRV is the chance to build a trading business with institutional depth — one that understands capital, policy and risk as much as it understands markets.",
      bio: "Sathiya Muthiah is Chief Executive Officer of VRV Global, leading the firm's strategy and the development of its trading and operating platforms across commodities. With nearly a decade of experience spanning the public and private sectors, he has built and scaled commodity trading businesses while working closely with policymakers, financial institutions and global counterparties. His leadership emphasises execution discipline, risk management and long-term partnerships between producers, customers and capital providers. He holds a Master's degree in Financial Management and a Master's degree in Government and Commercial Law.",
      focus: "Group strategy, trading platforms, risk and partnerships",
      profileUrl: "https://vrv.campaigntag.com/sathiya/",
      linkedin: "https://www.linkedin.com/in/sathiya-muthiah-70716534",
    },
    {
      name: "Yasuswini Subramanian",
      role: "Chief Financial Officer",
      image: "/pictures/team/yasuswini-subramanian.jpg",
      imagePosition: "center top",
      message:
        "At VRV, we are building a globally connected trading ecosystem driven by trust, discipline and financial strength.",
      bio: "Yasuswini Subramanian is a finance leader with over 15 years of experience across international finance and global commodities. As Chief Financial Officer she oversees financial operations, governance and performance management, ensuring discipline and efficiency across diverse business verticals. A Chartered Accountant from ICAI with broad exposure to global markets, she previously served as Finance Controller for a large Singapore-based family-managed enterprise, leading financial planning, reporting and operational controls. Her expertise spans financial strategy, compliance and process optimisation in fast-growing, multi-market organisations.",
      focus: "Finance, governance and long-term value creation",
      profileUrl: "https://vrv.campaigntag.com/yasuswini/",
      linkedin: "https://www.linkedin.com/in/yasuswini-subramanian-008627120",
    },
    {
      name: "Rakesh Bangera",
      role: "Chief Operating Officer",
      image: "/pictures/team/rakesh-bangera.jpg",
      imagePosition: "center top",
      message:
        "At VRV, our focus is to build resilient trade-finance frameworks that enable global commerce to move with confidence.",
      bio: "Rakesh Bangera is Chief Operating Officer at VRV Global, with over two decades of experience across trade, supply chain, treasury and structured finance. He leads business operations and trade-finance initiatives while strengthening financial partnerships for global transactions. He previously served as Head of Trade Finance & Cash Management at Agrocorp International in Singapore and led distribution and treasury solutions for Asia and the Middle East at Bunge. His expertise spans banking relationships, structured trade finance and operational strategy across global commodity markets. He holds a Master's degree in Commerce.",
      focus: "Operations, trade finance and structured finance",
      profileUrl: "https://vrv.campaigntag.com/rakesh/",
      linkedin: "https://www.linkedin.com/in/rakesh-bangera-23850929",
    },
  ] as LeadershipImage[],
  directors: [
    {
      name: "Zac Ng",
      role: "Director — Agro Commodities",
      image: "/pictures/team/zac-ng.jpg",
      imagePosition: "center top",
      message:
        "At VRV, I'm passionate about driving growth in the rubber sector by strengthening connections across markets and supply chains.",
      bio: "Zac Ng oversees VRV Global's rubber business strategy and growth, leveraging deep expertise across ASEAN and Greater China to connect with key end users of rubber products. He manages raw-material procurement in Africa alongside factory tolling operations in Malaysia. With prior experience at a leading Southeast Asian rubber producer and a graduate degree, Zac brings strong market insight and operational leadership to VRV's agro product division.",
      focus: "Natural rubber, procurement and ASEAN / Greater China markets",
      profileUrl: "https://vrv.campaigntag.com/zac/",
      linkedin: "https://www.linkedin.com/in/zac-ng-3b496543",
    },
    {
      name: "Raghu",
      role: "Director — Projects",
      // No portrait supplied in the source set (public/pictures/team/raghu.jpg is
      // absent) → initials fallback. Drop a file there to show a photo.
      image: "/pictures/team/raghu.jpg",
      imagePosition: "center top",
      message: "At VRV Global, every project is built around reliability, collaboration and long-term impact. Our focus is to turn ideas into well-executed solutions that create sustainable value for our partners, communities and the markets we serve.",
      bio: "Raghu leads project planning and execution at VRV Global, supporting the development of efficient, reliable and sustainable supply chain initiatives. He works closely with internal teams, partners and stakeholders to ensure projects are delivered with clear coordination, operational discipline and long-term business value.",
      focus: "Projects",
      profileUrl: "https://vrv.campaigntag.com/raghu/",
      linkedin: "https://www.linkedin.com/in/raghu-nathan-315b17343/", // no public profile yet → LinkedIn button hidden
    },
  ] as LeadershipImage[],
};
