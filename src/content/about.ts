/**
 * About-page fallback content (used until Sanity is configured; also the seed
 * source). Mirror of the design mockup's About section.
 */
export type SkillGroup = { group: string; items: string[] };

export const about = {
  headshotUrl: undefined as string | undefined,
  headline: "I work where finance, the environment, and geography meet.",
  bio: [
    "I’m a final-year student completing a BS in Finance and Environmental Studies, on the CPA track. That combination is deliberate: I’m drawn to questions where fiscal data and environmental systems intersect — and where a map makes the answer legible.",
    "My spatial work spans suitability modeling, raster and terrain analysis, cartography, and web GIS in ArcGIS Pro and ArcGIS Online. My quantitative side brings Python, SQL, and financial analysis to bear on the same problems — so a habitat-connectivity model and a county fiscal-capacity map come from the same toolkit.",
    "I’m especially interested in roles that bridge spatial and fiscal analysis — like the GIS & Mapping work at a state revenue and fiscal affairs office — where rigorous data work directly supports public decisions.",
  ],
  educationDegree: "BS, Finance & Environmental Studies",
  educationDetail: "CPA track · bilingual",
  educationDate: "Exp. Dec 2026",
  skillsMatrix: [
    { group: "GIS & Mapping", items: ["ArcGIS Pro", "ArcGIS Online", "QGIS", "Spatial Analyst"] },
    { group: "Programming", items: ["Python", "SQL", "JavaScript", "arcpy"] },
    { group: "Spatial Analysis", items: ["Suitability Modeling", "Raster Analysis", "Remote Sensing", "Spatial Statistics"] },
    { group: "Finance & Quant", items: ["Financial Analysis", "Quantitative Methods", "CPA track"] },
  ] as SkillGroup[],
};
