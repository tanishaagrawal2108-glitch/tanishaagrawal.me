import type { Capability } from "./site";

/**
 * A single map/figure in a project's gallery.
 * `src` is optional: until Tanisha drops the exported map image into
 * /public/images/<slug>/, the UI renders a captioned placeholder that matches
 * the design mockup. `alt` is always required for accessibility (508 / WCAG AA).
 */
export type ProjectMap = {
  caption: string;
  alt: string;
  src?: string;
};

export type DataSource = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  featured: boolean;
  title: string;
  /** One-line description used on cards and as the page subtitle. */
  oneliner: string;
  /** Capability filters this project belongs to. */
  categories: Capability[];
  /** Skill chips shown on cards and the detail hero. */
  chips: string[];
  role: string;
  affiliation: string;
  date: string;
  tools: string[];
  /** Describes the full-bleed hero map. */
  heroCaption: string;
  /** Optional real hero image (falls back to a captioned placeholder). */
  heroImage?: string;
  researchQuestion: string;
  objective: string;
  data: DataSource[];
  methodology: string[];
  maps: ProjectMap[];
  findings: string[];
  /**
   * Whether this project has an interactive ArcGIS Online web map.
   * When `arcgisEmbedUrl` is null, the detail page shows a documented placeholder
   * block — paste the ArcGIS Online "share → embed" URL here to go live.
   */
  webMap: boolean;
  arcgisEmbedUrl: string | null;
};

/**
 * Shared placeholder for the live ArcGIS Online embed.
 * TODO(tanisha): for each project with `webMap: true`, open the web map in
 * ArcGIS Online → Share → Embed, copy the iframe `src` (e.g. https://arcg.is/…)
 * and paste it into that project's `arcgisEmbedUrl` below.
 */
export const ARCGIS_EMBED_PLACEHOLDER: null = null;

export const projects: Project[] = [
  {
    slug: "pm25-health",
    featured: true,
    title: "Mapping Air Pollution & Public Health Risk in India",
    oneliner:
      "A PM2.5 suitability model paired with a district-level public-health risk index.",
    categories: ["Suitability Modeling", "Spatial Analysis", "Cartography"],
    chips: ["Suitability Modeling", "Raster Analysis", "Public Health"],
    role: "Sole analyst & cartographer",
    affiliation: "GEOG 4xx — Advanced Spatial Analysis",
    date: "2025",
    tools: ["ArcGIS Pro", "Python (arcpy)", "Spatial Analyst"],
    heroCaption:
      "Composite risk surface — northern India, PM2.5 × population density",
    researchQuestion:
      "Where do elevated PM2.5 concentrations overlap with vulnerable populations to create the highest public-health risk?",
    objective:
      "Combine remotely-sensed pollution estimates with demographic exposure to produce a transparent, district-ranked risk index that planners can act on.",
    data: [
      { label: "Van Donkelaar et al. surface PM2.5 (annual, 0.01°)", href: "https://sites.wustl.edu/acag/datasets/surface-pm2-5/" },
      { label: "WorldPop population density, India", href: "https://www.worldpop.org/" },
      { label: "GADM administrative boundaries (district)", href: "https://gadm.org/" },
    ],
    methodology: [
      "Resampled and clipped the PM2.5 raster to the national boundary; reprojected all layers to a common equal-area CRS.",
      "Reclassified PM2.5 and population density into 1–5 suitability scales against WHO and national thresholds.",
      "Applied a weighted overlay (PM2.5 0.6, population 0.4) to generate a continuous risk surface.",
      "Aggregated zonal statistics to district polygons and ranked the top decile of exposure.",
    ],
    maps: [
      {
        caption: "Fig. 1 — Annual mean PM2.5 surface, classified to WHO interim targets.",
        alt: "Choropleth of annual mean PM2.5 concentration across India, classified to WHO interim air-quality targets.",
      },
      {
        caption: "Fig. 2 — Weighted-overlay composite risk surface.",
        alt: "Continuous composite public-health risk surface produced by weighted overlay of PM2.5 and population density.",
      },
      {
        caption: "Fig. 3 — District ranking, top-decile exposure highlighted.",
        alt: "District-level ranking map of India with the top decile of public-health exposure highlighted.",
      },
    ],
    findings: [
      "The Indo-Gangetic Plain concentrates the highest combined risk, driven by both extreme PM2.5 and dense population.",
      "Eleven districts fall in the top exposure decile yet sit outside current monitoring-station coverage.",
      "Weighting sensitivity tests (±0.1) did not change the top-decile membership — the ranking is robust.",
    ],
    webMap: true,
    arcgisEmbedUrl: ARCGIS_EMBED_PLACEHOLDER,
  },
  {
    slug: "lion-habitat",
    featured: true,
    title: "Mountain Lion Habitat Suitability — LA County",
    oneliner:
      "Least-cost connectivity across fragmented terrain using slope, aspect and land cover.",
    categories: ["Suitability Modeling", "Spatial Analysis"],
    chips: ["Suitability Modeling", "Least-Cost Path", "Terrain Analysis"],
    role: "Sole analyst",
    affiliation: "GEOG 4xx — Spatial Modeling",
    date: "2025",
    tools: ["ArcGIS Pro", "Spatial Analyst", "Python"],
    heroCaption:
      "Least-cost corridor over a terrain hillshade — Los Angeles County",
    researchQuestion:
      "Which corridors let mountain lions move between protected habitat patches with the least landscape resistance?",
    objective:
      "Build a defensible cost surface from terrain and land cover, then derive least-cost paths linking core habitat patches across an urbanized county.",
    data: [
      { label: "USGS 3DEP 10 m DEM", href: "https://www.usgs.gov/3d-elevation-program" },
      { label: "NLCD land cover", href: "https://www.mrlc.gov/" },
      { label: "CPAD protected-area boundaries", href: "https://www.calands.org/cpad/" },
    ],
    methodology: [
      "Derived slope and aspect from the DEM and reclassified each to a movement-cost scale.",
      "Assigned land-cover resistance weights (developed = high, chaparral = low).",
      "Combined layers into a single cost surface via weighted overlay.",
      "Computed least-cost distance and backlink rasters, then traced corridors between patch centroids.",
    ],
    maps: [
      { caption: "Fig. 1 — Slope reclassified to movement cost.", alt: "Raster of terrain slope reclassified into a mountain-lion movement-cost scale." },
      { caption: "Fig. 2 — Combined landscape-resistance surface.", alt: "Combined landscape-resistance cost surface derived from slope, aspect and land cover." },
      { caption: "Fig. 3 — Least-cost corridors between core patches.", alt: "Least-cost corridor paths connecting core protected habitat patches across Los Angeles County." },
    ],
    findings: [
      "Two viable corridors remain, both pinching to under 400 m where they cross major freeways.",
      "Slope contributes more to total path cost than land cover in the northern patches.",
      "Identified one underpass location where a wildlife crossing would reconnect isolated habitat.",
    ],
    webMap: true,
    arcgisEmbedUrl: ARCGIS_EMBED_PLACEHOLDER,
  },
  {
    slug: "pm25-kde",
    featured: false,
    title: "Spatial Distribution of PM2.5 across India",
    oneliner:
      "A kernel-density heat map turning point monitor readings into a continuous surface.",
    categories: ["Cartography", "Spatial Analysis"],
    chips: ["Cartography", "Kernel Density"],
    role: "Cartographer",
    affiliation: "GEOG 3xx — Cartography",
    date: "2024",
    tools: ["ArcGIS Pro", "QGIS"],
    heroCaption: "Kernel-density heat map of station PM2.5 readings — India",
    researchQuestion:
      "How is monitored PM2.5 distributed across India, and where is the network sparse?",
    objective:
      "Translate discrete station readings into an interpolated heat surface and a clean, legible reference map.",
    data: [
      { label: "CPCB ground-station readings", href: "https://cpcb.nic.in/" },
      { label: "GADM boundaries", href: "https://gadm.org/" },
    ],
    methodology: [
      "Cleaned and geocoded the station table; removed duplicate and offline sensors.",
      "Ran kernel density with a search radius tuned to mean station spacing.",
      "Designed a sequential colour ramp and full marginalia for print output.",
    ],
    maps: [
      { caption: "Fig. 1 — Station locations over administrative base.", alt: "Point map of CPCB air-quality monitoring station locations over an administrative base map of India." },
      { caption: "Fig. 2 — Kernel-density PM2.5 heat surface.", alt: "Kernel-density heat surface interpolating station PM2.5 readings across India." },
    ],
    findings: [
      "Density peaks sharply over the northern plains; the network thins across central and northeastern states.",
      "Several high-population regions have no station within 100 km.",
    ],
    webMap: false,
    arcgisEmbedUrl: null,
  },
  {
    slug: "sc-fiscal",
    featured: true,
    title: "County Fiscal Capacity & Property Tax Base — South Carolina",
    oneliner:
      "A web map joining assessed valuation to county geography to visualize fiscal capacity.",
    categories: ["Web GIS", "Spatial Analysis", "Cartography"],
    chips: ["Web GIS", "Fiscal Analysis", "Choropleth"],
    role: "Analyst & web-map author",
    affiliation: "Independent project",
    date: "2025",
    tools: ["ArcGIS Online", "ArcGIS Pro", "SQL"],
    heroCaption: "Per-capita assessed valuation by county — South Carolina",
    researchQuestion:
      "How does per-capita property tax base vary across South Carolina counties, and where is fiscal capacity weakest?",
    objective:
      "Join fiscal records to county geography and publish an interactive choropleth that a fiscal-affairs office could use directly.",
    data: [
      { label: "SC county assessed valuation (state records)", href: "https://rfa.sc.gov/" },
      { label: "Census population estimates", href: "https://www.census.gov/programs-surveys/popest.html" },
      { label: "TIGER/Line county boundaries", href: "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html" },
    ],
    methodology: [
      "Normalized the fiscal table and joined it to county FIPS in SQL.",
      "Computed per-capita assessed valuation and a fiscal-capacity index.",
      "Classified with quantile and natural-breaks schemes and compared distributions.",
      "Published a hosted feature layer and configured a web map with pop-ups and a legend.",
    ],
    maps: [
      { caption: "Fig. 1 — Per-capita assessed valuation, natural-breaks classification.", alt: "Choropleth of per-capita assessed property valuation by South Carolina county, natural-breaks classification." },
      { caption: "Fig. 2 — Fiscal-capacity index with statewide median reference.", alt: "Choropleth of a fiscal-capacity index by South Carolina county against the statewide median." },
    ],
    findings: [
      "Per-capita capacity ranges more than fourfold between the strongest and weakest counties.",
      "Several rural counties pair low capacity with above-average service demand.",
      "The hosted layer updates automatically when the source valuation table is refreshed.",
    ],
    webMap: true,
    arcgisEmbedUrl: ARCGIS_EMBED_PLACEHOLDER,
  },
  {
    slug: "wetland-change",
    featured: false,
    title: "Wetland Change Detection — Coastal South Carolina",
    oneliner: "Multi-date NDVI differencing to quantify coastal wetland loss.",
    categories: ["Remote Sensing", "Spatial Analysis"],
    chips: ["Remote Sensing", "Change Detection", "NDVI"],
    role: "Sole analyst",
    affiliation: "GEOG 4xx — Remote Sensing",
    date: "2024",
    tools: ["ArcGIS Pro", "Python", "QGIS"],
    heroCaption: "NDVI difference image — coastal wetland change, 2014–2024",
    researchQuestion:
      "How much coastal wetland vegetation has been lost along the SC coast over the last decade?",
    objective:
      "Use a normalized vegetation index across two cloud-free dates to map and quantify wetland change.",
    data: [
      { label: "Landsat 8/9 surface reflectance", href: "https://www.usgs.gov/landsat-missions" },
      { label: "NWI wetland inventory", href: "https://www.fws.gov/program/national-wetlands-inventory" },
    ],
    methodology: [
      "Selected cloud-free scenes from 2014 and 2024 and applied atmospheric correction.",
      "Computed NDVI for each date and differenced the two surfaces.",
      "Thresholded the difference image and validated against the wetland inventory.",
    ],
    maps: [
      { caption: "Fig. 1 — NDVI, 2014 baseline.", alt: "NDVI raster of coastal South Carolina wetlands in 2014, the baseline date." },
      { caption: "Fig. 2 — NDVI difference, loss in warm tones.", alt: "NDVI difference image showing coastal wetland vegetation loss between 2014 and 2024 in warm tones." },
    ],
    findings: [
      "Measurable vegetation loss concentrates along developed estuary margins.",
      "Differencing flagged change the inventory had not yet captured.",
    ],
    webMap: false,
    arcgisEmbedUrl: null,
  },
  {
    slug: "solar-suitability",
    featured: false,
    title: "Utility-Scale Solar Site Suitability",
    oneliner: "Multi-criteria suitability screening for utility solar siting.",
    categories: ["Suitability Modeling", "Spatial Analysis"],
    chips: ["Suitability Modeling", "Multi-Criteria", "Slope"],
    role: "Analyst",
    affiliation: "GEOG 4xx — Spatial Modeling",
    date: "2024",
    tools: ["ArcGIS Pro", "Spatial Analyst"],
    heroCaption: "Multi-criteria solar suitability surface",
    researchQuestion:
      "Which parcels balance high solar potential with low slope, road access and exclusion constraints?",
    objective:
      "Screen a study region for utility-scale solar siting using weighted multi-criteria analysis.",
    data: [
      { label: "NREL solar irradiance", href: "https://www.nrel.gov/gis/solar-resource-maps.html" },
      { label: "DEM-derived slope", href: "https://www.usgs.gov/3d-elevation-program" },
      { label: "Roads & protected lands", href: "https://www.protectedlands.net/" },
    ],
    methodology: [
      "Built criteria layers for irradiance, slope, road proximity and exclusions.",
      "Reclassified each to a common suitability scale.",
      "Applied weighted overlay and masked out hard constraints.",
    ],
    maps: [
      { caption: "Fig. 1 — Slope suitability.", alt: "Reclassified slope-suitability raster for utility-scale solar siting." },
      { caption: "Fig. 2 — Final weighted suitability with exclusions removed.", alt: "Final weighted multi-criteria solar-suitability surface with excluded areas masked out." },
    ],
    findings: [
      "A compact set of high-suitability parcels clusters near existing transmission.",
      "Slope and exclusions remove most of the study area before weighting.",
    ],
    webMap: false,
    arcgisEmbedUrl: null,
  },
  {
    slug: "urban-heat",
    featured: false,
    title: "Urban Heat Island Mapping",
    oneliner:
      "Land-surface temperature from thermal imagery against land cover and canopy.",
    categories: ["Remote Sensing", "Cartography"],
    chips: ["Remote Sensing", "Land Surface Temp", "Raster Analysis"],
    role: "Sole analyst",
    affiliation: "GEOG 4xx — Remote Sensing",
    date: "2024",
    tools: ["ArcGIS Pro", "Python"],
    heroCaption: "Land-surface temperature surface over an urban core",
    researchQuestion:
      "Where are the hottest surfaces in the urban core, and how do they relate to canopy and impervious cover?",
    objective:
      "Derive land-surface temperature from thermal bands and relate it to land cover and tree canopy.",
    data: [
      { label: "Landsat thermal bands", href: "https://www.usgs.gov/landsat-missions" },
      { label: "NLCD canopy & impervious", href: "https://www.mrlc.gov/" },
    ],
    methodology: [
      "Converted thermal DN to brightness temperature and corrected for emissivity.",
      "Aligned LST with canopy and impervious-surface layers.",
      "Summarized temperature by land-cover class.",
    ],
    maps: [
      { caption: "Fig. 1 — Land-surface temperature.", alt: "Land-surface temperature raster derived from Landsat thermal bands over an urban core." },
      { caption: "Fig. 2 — LST vs. canopy cover.", alt: "Map comparing land-surface temperature against tree-canopy cover across the urban core." },
    ],
    findings: [
      "Industrial and low-canopy blocks run several degrees hotter than parkland.",
      "Canopy cover is the strongest negative correlate of surface temperature.",
    ],
    webMap: false,
    arcgisEmbedUrl: null,
  },
  {
    slug: "flood-exposure",
    featured: false,
    title: "Watershed Delineation & Flood Exposure",
    oneliner:
      "Hydrologic modeling to map watersheds and building-level flood exposure.",
    categories: ["Spatial Analysis", "Cartography"],
    chips: ["Hydrology", "Flood Risk", "Spatial Analysis"],
    role: "Analyst",
    affiliation: "GEOG 3xx — Hydrology GIS",
    date: "2024",
    tools: ["ArcGIS Pro", "Spatial Analyst"],
    heroCaption: "Delineated watersheds with flood-exposed structures",
    researchQuestion:
      "Which structures sit within modeled flood-prone zones, and which sub-watersheds drain to them?",
    objective:
      "Delineate watersheds from terrain and intersect flood zones with the building footprint layer.",
    data: [
      { label: "DEM", href: "https://www.usgs.gov/3d-elevation-program" },
      { label: "FEMA flood zones", href: "https://www.fema.gov/flood-maps" },
      { label: "Building footprints", href: "https://github.com/microsoft/USBuildingFootprints" },
    ],
    methodology: [
      "Filled the DEM and computed flow direction and accumulation.",
      "Delineated watersheds and stream networks.",
      "Intersected flood zones with footprints to count exposed structures.",
    ],
    maps: [
      { caption: "Fig. 1 — Flow accumulation & stream network.", alt: "Flow-accumulation raster with the derived stream network." },
      { caption: "Fig. 2 — Flood-exposed structures by sub-watershed.", alt: "Map of flood-exposed building structures classified by sub-watershed." },
    ],
    findings: [
      "Exposure concentrates in two low-lying sub-watersheds.",
      "A small share of structures accounts for most of the high-hazard exposure.",
    ],
    webMap: false,
    arcgisEmbedUrl: null,
  },
  {
    slug: "transit-access",
    featured: false,
    title: "Equity of Access to Public Transit",
    oneliner:
      "Network service areas measuring who can reach transit within a short walk.",
    categories: ["Web GIS", "Spatial Analysis"],
    chips: ["Web GIS", "Network Analysis", "Service Areas"],
    role: "Analyst & web-map author",
    affiliation: "Independent project",
    date: "2025",
    tools: ["ArcGIS Online", "Network Analyst"],
    heroCaption: "Walk-time service areas around transit stops",
    researchQuestion:
      "What share of residents — and which groups — live within a 10-minute walk of transit?",
    objective:
      "Build walk-time service areas around stops and overlay them with population and demographics.",
    data: [
      { label: "GTFS transit stops", href: "https://gtfs.org/" },
      { label: "Street network", href: "https://www.openstreetmap.org/" },
      { label: "Census demographics", href: "https://data.census.gov/" },
    ],
    methodology: [
      "Generated 5- and 10-minute walk service areas along the street network.",
      "Overlaid service areas with block-group population.",
      "Compared coverage rates across demographic groups.",
    ],
    maps: [
      { caption: "Fig. 1 — 10-minute walk service areas.", alt: "Map of 10-minute walk-time service areas generated around transit stops along the street network." },
      { caption: "Fig. 2 — Coverage gaps by block group.", alt: "Choropleth of transit-coverage gaps by census block group." },
    ],
    findings: [
      "Coverage is strongest downtown and drops sharply at the periphery.",
      "Lower-income block groups show below-average coverage.",
    ],
    webMap: true,
    arcgisEmbedUrl: ARCGIS_EMBED_PLACEHOLDER,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Prev/next wrap around the full ordered list (matches the mockup behaviour). */
export function getAdjacent(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? projects[i - 1] : projects[projects.length - 1];
  const next = i < projects.length - 1 ? projects[i + 1] : projects[0];
  return { prev, next };
}
