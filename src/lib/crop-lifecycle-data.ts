export interface RawStage {
  title: string;
  duration: string;
  color: string;
  desc: string;
  keyActivities: string[];
  inputs: string[];
  commonProblems: string[];
  tips: string;
}

export interface CropData {
  description: string;
  totalDays: string;
  season: string;
  stages: RawStage[];
}

export const CROP_LIFECYCLE_DATA: Record<string, Record<string, CropData>> = {
  en: {
    Wheat: {
      description: "India's premier Rabi crop, grown from November to April across the Indo-Gangetic plains. Requires cool weather for germination and warm dry conditions at maturity.",
      totalDays: "120–150 days",
      season: "Rabi (Sow: Oct–Nov, Harvest: Mar–Apr)",
      stages: [
        {
          title: "Seed Selection & Treatment",
          duration: "Pre-sowing",
          color: "wheat",
          desc: "Choose certified seeds suited to your region. Treat seeds before sowing to prevent soil-borne diseases.",
          keyActivities: [
            "Choose certified variety: HD-2967, PBW-550, DBW-187, GW-496",
            "Inspect seeds for purity and germination rate (>85%)",
            "Treat with Carbendazim 50WP @ 2g/kg seed",
            "Store treated seed in shade until sowing"
          ],
          inputs: [
            "Certified seeds (40 kg/acre)",
            "Carbendazim fungicide",
            "Rhizobium/Azospirillum culture (optional)"
          ],
          commonProblems: [
            "Loose smut — use smut-free certified seed",
            "Low germination — check seed viability before purchase"
          ],
          tips: "Buy seeds from KVK or registered seed dealer. Check seed lot number and germination test report."
        },
        {
          title: "Land Preparation",
          duration: "15–20 days before sowing",
          color: "soil",
          desc: "Wheat needs a fine, firm, and level seedbed with good tilth for uniform germination.",
          keyActivities: [
            "Deep plough once in summer/early Kharif",
            "Apply 4–5 tonnes FYM per acre 3–4 weeks before sowing",
            "2–3 cross harrowings to break clods",
            "Level field with plank/laser leveller for uniform irrigation"
          ],
          inputs: [
            "Farm Yard Manure (FYM): 4–5 tonnes/acre",
            "DAP (di-ammonium phosphate): 50 kg/acre (basal)",
            "Muriate of Potash (MOP): 25 kg/acre (basal)"
          ],
          commonProblems: [
            "Waterlogging — ensure proper field drainage",
            "Hard soil — deep plough when moist, not dry"
          ],
          tips: "Laser land levelling saves 25–30% irrigation water and improves yield by 8–10%. Many states provide subsidized levelling services."
        },
        {
          title: "Sowing",
          duration: "Day 1–3",
          color: "leaf",
          desc: "Timely sowing is the single most important factor in wheat yield. Sow between Oct 25 – Nov 25 for best results.",
          keyActivities: [
            "Use seed drill at 22 cm row spacing",
            "Sowing depth: 4–5 cm",
            "Seed rate: 40 kg/acre (timely sowing), 50 kg (late sowing)",
            "Ensure good soil moisture at sowing — irrigate if needed"
          ],
          inputs: [
            "Treated seeds",
            "Seed drill (tractor-operated or bullock-drawn)",
            "Basal NPK fertilizer"
          ],
          commonProblems: [
            "Late sowing (after Nov 25) reduces yield by 1–1.5 qtl/week delay",
            "Uneven sowing — calibrate seed drill before use"
          ],
          tips: "For late sowing (Nov 25 – Dec 15), use late-tolerant varieties like HD-3086 or WR-544 and increase seed rate to 50–60 kg/acre."
        },
        {
          title: "Crown Root Initiation (CRI) Irrigation",
          duration: "Day 20–25",
          color: "sky",
          desc: "The MOST CRITICAL irrigation in wheat. Missing this irrigation can reduce yield by 20–30%.",
          keyActivities: [
            "Irrigate 20–25 days after sowing",
            "Apply first dose of urea: 25 kg/acre",
            "Monitor for aphid attack on young leaves",
            "Remove weeds manually or spray herbicide (Isoproturon)"
          ],
          inputs: [
            "Urea: 25 kg/acre",
            "Water: 5–6 cm irrigation",
            "Herbicide (if needed): Isoproturon 75WP"
          ],
          commonProblems: [
            "Miss irrigation here → severe yield loss",
            "Waterlogging causes yellowing — use channels for drainage"
          ],
          tips: "If you can give only one irrigation, give it at CRI stage. After CRI irrigation, apply urea and lightly irrigate or wait for rain to mix it in."
        },
        {
          title: "Tillering & Fertilization",
          duration: "Day 25–45",
          color: "primary",
          desc: "Wheat tillers vigorously. Apply balanced nutrition to ensure maximum productive tillers.",
          keyActivities: [
            "Second urea top-dress: 25 kg/acre at 45 DAS",
            "Second irrigation at tillering stage (40–45 DAS)",
            "Watch for yellow rust — orange powdery spots on leaves",
            "Inter-row cultivation to break soil crust"
          ],
          inputs: [
            "Urea: 25 kg/acre",
            "Zinc Sulphate (if deficiency): 10 kg/acre",
            "Water: 5–6 cm irrigation"
          ],
          commonProblems: [
            "Yellow rust — spray Propiconazole 25EC @ 1ml/L water immediately",
            "Nitrogen deficiency — pale yellow leaves, apply urea"
          ],
          tips: "Avoid giving urea just before heavy rain — it will wash away. Apply 3–4 days before expected rain."
        },
        {
          title: "Jointing, Booting & Pest Watch",
          duration: "Day 45–75",
          color: "terracotta",
          desc: "Crop is growing fast. Scout fields twice a week for pests and diseases.",
          keyActivities: [
            "Third irrigation at jointing stage (60–65 DAS)",
            "Monitor for stem rust, leaf rust and yellow rust",
            "Check for aphid colonies under leaves",
            "Spray if pest exceeds economic threshold level (ETL)"
          ],
          inputs: [
            "Water: 5–6 cm irrigation",
            "Propiconazole / Tebuconazole for rust",
            "Imidacloprid / Thiamethoxam for aphids"
          ],
          commonProblems: [
            "Brown rust appears as orange-brown pustules on leaves",
            "Aphids in clusters — heavily infested plants look sticky"
          ],
          tips: "Use pheromone traps to monitor pest populations. Spray pesticides only when ETL is crossed — unnecessary spraying wastes money and kills beneficial insects."
        },
        {
          title: "Flowering & Grain Filling",
          duration: "Day 75–100",
          color: "wheat",
          desc: "Critical reproductive phase. Water stress here causes shriveled grains and massive yield loss.",
          keyActivities: [
            "Fourth irrigation at flowering / heading (80–85 DAS)",
            "Fifth irrigation at milking stage (95–100 DAS)",
            "Do NOT spray any chemical during flowering",
            "Monitor for Karnal Bunt disease (black powder in grain)"
          ],
          inputs: [
            "Water: 5–6 cm irrigation × 2",
            "No pesticide spraying during flowering"
          ],
          commonProblems: [
            "Heat wave during grain filling — irrigate immediately in the evening",
            "Karnal Bunt — use certified disease-free seed next season"
          ],
          tips: "If temperature exceeds 35°C during grain filling, irrigate immediately. Even one day of heat stress at this stage can reduce yield by 10–15%."
        },
        {
          title: "Harvest",
          duration: "Day 115–140",
          color: "leaf",
          desc: "Harvest at the right maturity to maximize yield, quality and price.",
          keyActivities: [
            "Harvest when grain is hard and straw turns golden yellow",
            "Grain moisture at harvest: 18–22%",
            "Use combine harvester for large fields",
            "Thresh within 2–3 days to avoid grain weathering"
          ],
          inputs: [
            "Combine harvester (rent if needed)",
            "Tarpaulin for threshing floor",
            "Gunny bags for storage"
          ],
          commonProblems: [
            "Delayed harvest causes grain shattering loss",
            "Premature harvest gives shriveled, light grain — poor price"
          ],
          tips: "Bite a grain to check hardness. If it's hard and the straw is dry, harvest immediately. Delay can cause 2–5% yield loss per day in windy/rainy weather."
        },
        {
          title: "Post-Harvest Storage & Selling",
          duration: "After harvest",
          color: "soil",
          desc: "Proper storage preserves grain quality and allows you to sell when prices are better.",
          keyActivities: [
            "Dry grain to 10–12% moisture before storage",
            "Store in clean, fumigated bins or bags on wooden pallets",
            "Apply Aluminium Phosphide tablets for insect control in storage",
            "Monitor market prices before selling — don't rush"
          ],
          inputs: [
            "Moisture meter",
            "Aluminium Phosphide fumigant tablets",
            "Gunny bags / Metal bins"
          ],
          commonProblems: [
            "Weevil attack in storage — fumigate every 3 months",
            "Musty grain from high moisture — sun dry 2–3 days before storage"
          ],
          tips: "If MSP procurement is open, sell 50% to government FCI/state agencies at MSP. Hold rest 30–45 days for better mandi price."
        }
      ]
    },
    "Rice / Paddy": {
      description: "India's most important Kharif staple, growing from June to November. Demands ample water, warm temperatures and fertile soil. The foundation of food security for over a billion people.",
      totalDays: "110–145 days",
      season: "Kharif (Sow: Jun–Jul, Harvest: Oct–Nov)",
      stages: [
        {
          title: "Seed Selection & Nursery Raising",
          duration: "Pre-sowing to Day 25",
          color: "wheat",
          desc: "Healthy nursery is the foundation of a good paddy crop. Spend time here.",
          keyActivities: [
            "Choose variety: Pusa Basmati 1121 (Basmati), Swarna/MTU-7029 (non-Basmati)",
            "Soak seeds 24 hours, then incubate 48 hours until sprouted",
            "Prepare raised nursery beds (1/10th of main field)",
            "Broadcast sprouted seeds @ 20 kg seed/acre nursery"
          ],
          inputs: [
            "Certified seeds (8 kg/acre)",
            "Nursery fertilizer: Urea 2 kg, DAP 2 kg per 100 sqm",
            "Carbendazim or Tricyclazole for blast prevention"
          ],
          commonProblems: [
            "Blast disease in nursery — spray Tricyclazole @ 0.6g/litre",
            "Damping off — don't over-water, maintain good drainage"
          ],
          tips: "Raise nursery 25–30 days before planned transplanting. Keep nursery beds near water source for easy irrigation."
        },
        {
          title: "Land Preparation & Puddling",
          duration: "Day 1–7",
          color: "soil",
          desc: "Puddling creates the waterlogged condition paddy needs and suppresses weeds.",
          keyActivities: [
            "Flood main field 2–3 days before puddling",
            "Puddle with rotavator or tractor + disc harrow",
            "Apply 4 tonnes FYM/acre before puddling",
            "Level puddled field — uneven fields waste water and reduce yield"
          ],
          inputs: [
            "Water (flood irrigation)",
            "FYM / green manure",
            "Basal fertilizers: DAP 25 kg + Urea 30 kg/acre"
          ],
          commonProblems: [
            "Incomplete puddling — weeds survive and compete with crop",
            "Uneven levelling — high spots go dry, low spots drown seedlings"
          ],
          tips: "The smoother and more level the puddled surface, the less water you waste and the better weed control you get."
        },
        {
          title: "Transplanting",
          duration: "Day 7–10",
          color: "leaf",
          desc: "Transplant young, healthy seedlings from the nursery into puddled main field.",
          keyActivities: [
            "Transplant 25–30 day seedlings (2–3 per hill)",
            "Spacing: 20×15 cm (high yield) or 20×20 cm (SRI method)",
            "Transplanting depth: 2–3 cm only — don't plant too deep",
            "Complete transplanting within 48 hours of pulling nursery"
          ],
          inputs: [
            "Nursery seedlings",
            "Labor (6–8 per acre)",
            "Zinc Sulphate 10 kg/acre (if soil is deficient)"
          ],
          commonProblems: [
            "Transplanting shock — yellowing of seedlings for 7–10 days is normal",
            "Deep planting reduces tillering and yield"
          ],
          tips: "In SRI method, transplant single 8-day seedlings at 25×25 cm. Yield can be 25–40% higher with less water and less seed."
        },
        {
          title: "Water Management",
          duration: "Day 10–100",
          color: "sky",
          desc: "Water management is the most critical skill in paddy cultivation.",
          keyActivities: [
            "Maintain 2–5 cm standing water during vegetative phase",
            "Drain water every 7–10 days for 1–2 days (AWD method saves 30% water)",
            "Keep field drained during panicle initiation",
            "Stop irrigation 10 days before harvest"
          ],
          inputs: [
            "Water (most critical input)",
            "Bund/embankment maintenance"
          ],
          commonProblems: [
            "Flood — opens bunds immediately after flash flood recedes",
            "Drought — keep field moist always, don't let cracks appear"
          ],
          tips: "Alternate Wetting & Drying (AWD) technique: drain field until 10–15 cm below soil surface, then flood again. Saves water and reduces methane emissions."
        },
        {
          title: "Fertilizer Management",
          duration: "Day 10–60",
          color: "primary",
          desc: "Paddy is a heavy feeder — needs NPK in 3 split applications.",
          keyActivities: [
            "Basal: DAP 25 kg + MOP 20 kg/acre at transplanting",
            "First top-dress: Urea 30 kg/acre at tillering (21 DAS)",
            "Second top-dress: Urea 25 kg/acre at panicle initiation (45 DAS)",
            "Apply Zinc Sulphate 10 kg/acre if yellowing occurs"
          ],
          inputs: [
            "DAP: 25 kg/acre",
            "Urea: 55 kg/acre (total, in 2 splits)",
            "MOP: 20 kg/acre",
            "Zinc Sulphate: 10 kg/acre (if needed)"
          ],
          commonProblems: [
            "Over-application of N causes lodging (crop falling down)",
            "Zinc deficiency — leaves turn bronze, common in Punjab and Haryana"
          ],
          tips: "Apply urea on a clear day when water is on the field. Applying before rain causes N loss — wait for dry spell."
        },
        {
          title: "Pest & Disease Management",
          duration: "Day 20–90",
          color: "terracotta",
          desc: "Paddy has many pests. Scout every week and act quickly at first signs.",
          keyActivities: [
            "Stem borer: pheromone traps + spray Cartap Hydrochloride",
            "Brown Plant Hopper (BPH): don't apply excessive N, use BPHV-resistant variety",
            "Blast: spray Tricyclazole @ 6g/10L water at neck emergence",
            "Sheath blight: spray Hexaconazole @ 2ml/L water"
          ],
          inputs: [
            "Pheromone traps (5/acre)",
            "Cartap Hydrochloride / Chlorpyrifos for stem borer",
            "Tricyclazole for blast",
            "Hexaconazole for sheath blight"
          ],
          commonProblems: [
            "Hopperburn — BPH outbreak turns large patches brown",
            "Neck blast — neck of panicle turns black and grain becomes empty"
          ],
          tips: "Use light traps to monitor moth populations. Install 5 pheromone traps per acre in the first week of transplanting."
        },
        {
          title: "Harvest & Post-Harvest",
          duration: "Day 110–140",
          color: "wheat",
          desc: "Harvest timing is everything — too early gives chalky grain, too late causes shattering.",
          keyActivities: [
            "Harvest when 80–85% of panicles turn golden yellow",
            "Drain field 10 days before harvest for combine access",
            "Grain moisture at harvest: 20–25%",
            "Dry grain to 14% before storage"
          ],
          inputs: [
            "Combine harvester or sickle + thresher",
            "Drying yard or mechanical dryer",
            "Moisture meter"
          ],
          commonProblems: [
            "Delayed harvest in rain — grain ferments and quality falls",
            "Early harvest — greenish grain not preferred in market"
          ],
          tips: "Sell Basmati paddy to dedicated Basmati rice mills for premium price. Non-Basmati can be sold to FCI procurement centers at MSP during kharif marketing season."
        }
      ]
    },
    "Cotton": {
      description: "India's white gold. The world's largest cotton producer after China, India grows cotton across Maharashtra, Gujarat, Telangana, Punjab, Haryana and Madhya Pradesh. Bt cotton dominates with 90%+ area under it.",
      totalDays: "160–200 days",
      season: "Kharif (Sow: Jun–Jul, Pick: Oct–Jan)",
      stages: [
        {
          title: "Seed Selection",
          duration: "Pre-sowing",
          color: "wheat",
          desc: "Choose the right Bt hybrid for your region. Wrong variety = 30–40% lower yield.",
          keyActivities: [
            "Choose region-specific Bt hybrid: RCH-2 BG-II (Maharashtra), JKch-1947 (Gujarat)",
            "Buy from authorized seed dealer with tag and test report",
            "Check for Bollguard-II certification (two toxin genes)",
            "Do NOT use seed saved from Bt cotton — it doesn't work"
          ],
          inputs: [
            "Bt cotton hybrid seed (450g/acre)",
            "Imidacloprid 70 WS seed treatment for early pest protection"
          ],
          commonProblems: [
            "Spurious Bt cotton sold in market — always buy tagged seed",
            "Pink bollworm resistance to Bt developing in some areas"
          ],
          tips: "Register seed purchase with dealer for accountability. In case of crop failure due to bad seed, you can claim replacement."
        },
        {
          title: "Land Preparation",
          duration: "Apr–May (pre-monsoon)",
          color: "soil",
          desc: "Deep summer ploughing is mandatory — it kills overwintering pink bollworm pupae.",
          keyActivities: [
            "Deep plough in April–May to expose soil to sun",
            "Apply 5 tonnes FYM/acre 3–4 weeks before sowing",
            "Form raised beds for rainfed or beds + furrows for irrigated",
            "Final harrowing after first monsoon shower"
          ],
          inputs: [
            "Tractor + MB plough for deep ploughing",
            "FYM/Green Manure",
            "Basal: SSP 100 kg/acre (for sulphur and phosphorus)"
          ],
          commonProblems: [
            "Shallow ploughing leaves pink bollworm pupae alive in soil",
            "Too fine a tilth in heavy black soil — clods help in moisture retention"
          ],
          tips: "Deep summer ploughing (18–20 inches) is the most cost-effective way to reduce pink bollworm and soil-borne fungal diseases."
        },
        {
          title: "Sowing",
          duration: "Day 1 (Jun–Jul)",
          color: "leaf",
          desc: "Sow with the first good monsoon shower. Timing and spacing determine final yield.",
          keyActivities: [
            "Sow June 15 – July 15 with first 25mm rain",
            "Spacing: 90×45 cm (rainfed), 120×60 cm (irrigated)",
            "Dibble 2 seeds per hill, 3–4 cm deep",
            "Don't sow in dry soil — wait for adequate moisture"
          ],
          inputs: [
            "Bt cotton seed",
            "Seed drill or dibbler",
            "Starter fertilizer"
          ],
          commonProblems: [
            "Sowing too early in May with pre-monsoon showers can cause crop failure if rains fail",
            "Too close spacing leads to pest and disease buildup"
          ],
          tips: "For drip irrigated cotton, sow on raised beds with 150 cm spacing between beds. You can grow an intercrop in the furrow (onion, fenugreek)."
        },
        {
          title: "Thinning, Gap-Filling & Weeding",
          duration: "Day 15–30",
          color: "primary",
          desc: "One healthy plant per hill. Remove weak seedlings and fill gaps.",
          keyActivities: [
            "Thin to 1 plant per hill at 15–20 DAS",
            "Fill gaps with nursery transplants within 20 DAS",
            "First inter-row cultivation at 20 DAS",
            "Apply Diuron or Pendimethalin for weed control"
          ],
          inputs: [
            "Labor for thinning and gap-filling",
            "Herbicide (if using chemical weeding)",
            "Urea for nursery seedlings used in gap filling"
          ],
          commonProblems: [
            "Late gap-filling after 25 DAS — transplanted seedlings don't establish well",
            "Excessive weeds in first 30 days reduce yield by 40–60%"
          ],
          tips: "Thinning is a critical step most farmers skip. Two plants per hill compete and reduce yield — always leave the strongest single plant."
        },
        {
          title: "Pest Management (80–160 DAS)",
          duration: "Day 80–160",
          color: "terracotta",
          desc: "This is the most pest-prone phase of cotton. Pink bollworm and whitefly are the two biggest threats.",
          keyActivities: [
            "Install 5 pheromone traps/acre for pink bollworm monitoring",
            "Install yellow sticky traps for whitefly",
            "Spray Profenofos or Emamectin Benzoate when ETL is crossed",
            "Rotate insecticides every 2 sprays to avoid resistance"
          ],
          inputs: [
            "Pheromone traps: 5/acre",
            "Yellow sticky cards: 10/acre",
            "Profenofos 50EC or Emamectin 5% SG",
            "Neem oil for early whitefly control"
          ],
          commonProblems: [
            "Pink bollworm resistance to Bt — pick up and destroy all fallen squares and bolls",
            "Whitefly transmits leaf curl virus — there is no cure, manage vector"
          ],
          tips: "Spray ONLY when pest count exceeds ETL (2 moths/trap/week for PBW). Unnecessary spraying kills natural enemies and creates resistance."
        },
        {
          title: "Boll Development & Picking",
          duration: "Day 120–180+",
          color: "wheat",
          desc: "Cotton is picked in 3–4 rounds over 2–3 months. Quality picking = premium price.",
          keyActivities: [
            "First picking: 120–130 DAS when first bolls open",
            "Pick every 15–20 days (3–4 total pickings)",
            "Pick only fully open, dry bolls — don't pick immature bolls",
            "Keep picked cotton in clean gunny bags — avoid contamination"
          ],
          inputs: [
            "Gunny bags (not plastic bags)",
            "Labor: 2–3 per acre per picking",
            "Storage shed"
          ],
          commonProblems: [
            "Contaminated cotton (polythene, colored thread) rejected at ginning",
            "Late picking after rain reduces grade and price"
          ],
          tips: "Never mix different-grade cotton. Store in dry, clean conditions. Sell to ginning mills rather than local traders for better price."
        }
      ]
    },
    "Soybean": {
      description: "The queen of oilseeds. India grows soybean mainly in Madhya Pradesh, Maharashtra, and Rajasthan during Kharif. It's the world's richest plant protein source and a critical cash crop for central India farmers.",
      totalDays: "90–110 days",
      season: "Kharif (Sow: Jun–Jul, Harvest: Oct)",
      stages: [
        {
          title: "Seed Selection & Treatment",
          duration: "Pre-sowing",
          color: "wheat",
          desc: "Soybean seed loses viability quickly. Use fresh seed (< 6 months old) every year.",
          keyActivities: [
            "Choose variety: JS-335, JS-9560, NRC-7 based on region",
            "Germination test: >70% is acceptable for sowing",
            "Treat with Rhizobium culture (crucial for nitrogen fixation)",
            "Treat with Thiram or Captan @ 3g/kg seed against seed rot"
          ],
          inputs: [
            "Certified seed (30 kg/acre)",
            "Rhizobium culture (250g/packet)",
            "Thiram or Captan fungicide"
          ],
          commonProblems: [
            "Old seed with <50% germination — double the seed rate or buy fresh",
            "Skipping Rhizobium inoculation — loses free nitrogen fixation worth ₹2,000/acre"
          ],
          tips: "Rhizobium inoculation is free money — bacteria fix atmospheric nitrogen reducing your urea cost by 50%. Don't skip it."
        },
        {
          title: "Land Preparation & Sowing",
          duration: "Day 1–3",
          color: "soil",
          desc: "Soybean needs well-drained land. Waterlogging is its biggest enemy.",
          keyActivities: [
            "Deep plough once, then 2 harrowings",
            "Apply 3 tonnes FYM/acre before sowing",
            "Make broad-bed furrow (BBF) for better drainage",
            "Sow June 20 – July 15 with 6–8 cm row spacing",
            "Seed rate: 30 kg/acre, depth: 3–4 cm"
          ],
          inputs: [
            "FYM: 3 tonnes/acre",
            "Seed + Rhizobium culture",
            "Pendimethalin herbicide (pre-emergence)"
          ],
          commonProblems: [
            "Sowing too early in waterlogged conditions after heavy rain",
            "Sowing too deep (>5 cm) — poor germination"
          ],
          tips: "Broad-bed furrow system (BBF) made with a special BBF planter improves drainage and reduces crop failure by 40% in black cotton soils."
        },
        {
          title: "Pest & Disease Watch",
          duration: "Day 20–80",
          color: "terracotta",
          desc: "Girdle beetle, stem fly and yellow mosaic virus are the top threats in soybean.",
          keyActivities: [
            "Monitor for girdle beetle damage (stem girdling by beetle)",
            "Install 5 pheromone traps/acre for tobacco caterpillar",
            "Watch for yellow mosaic virus (bright yellow patches — incurable)",
            "Spray Quinalphos or Emamectin Benzoate when ETL crossed"
          ],
          inputs: [
            "Pheromone traps",
            "Quinalphos 25 EC or Emamectin 5 SG",
            "Mancozeb for bacterial pustule"
          ],
          commonProblems: [
            "Yellow Mosaic Virus (YMV) — no cure, remove and burn infected plants",
            "Girdle beetle damage looks like thin stem constriction — yield loss 20–40%"
          ],
          tips: "For YMV, spray Imidacloprid to control whitefly vector. Remove infected plants within 20 days of sowing."
        },
        {
          title: "Harvest & Storage",
          duration: "Day 90–110",
          color: "leaf",
          desc: "Harvest at right moisture to prevent pod shattering and storage loss.",
          keyActivities: [
            "Harvest when leaves turn yellow and pods turn brown (80% pod maturity)",
            "Grain moisture at harvest: 15–17%",
            "Use combine harvester or sickle + thresher",
            "Dry to 12% moisture before storage"
          ],
          inputs: [
            "Combine harvester or thresher",
            "Moisture meter",
            "Storage bags"
          ],
          commonProblems: [
            "Pod shattering if delayed — harvest loss 10–15%",
            "High moisture in storage — aflatoxin risk"
          ],
          tips: "Sell to NAFED, Oilseeds Cooperative or private crushers. Check MSP — government procurement usually opens October–December."
        }
      ]
    },
    "Onion": {
      description: "India's most price-volatile vegetable and a critical cash crop in Maharashtra, Karnataka, and Rajasthan. Mastering storage and selling timing determines profitability more than yield.",
      totalDays: "120–160 days (transplanted)",
      season: "Rabi (Sow: Oct–Nov, Harvest: Mar–Apr)",
      stages: [
        {
          title: "Nursery & Seed Bed",
          duration: "Pre-transplanting (25–30 days)",
          color: "wheat",
          desc: "Quality nursery seedlings are the foundation of a good onion crop.",
          keyActivities: [
            "Prepare raised nursery beds 1m wide × 3m long",
            "Sow 5 kg seed per acre of main field",
            "Water nursery twice daily (morning and evening)",
            "Apply Trichoderma for damping-off prevention"
          ],
          inputs: [
            "Certified onion seed: 5 kg/acre",
            "Trichoderma: 2.5 kg per nursery bed",
            "Shade net for nursery"
          ],
          commonProblems: [
            "Damping off in nursery — overcrowding + excess water causes it",
            "Thrips in nursery — spray Fipronil @ 1ml/L"
          ],
          tips: "Good nursery produces pencil-thick seedlings ready in 25–30 days. Thin seedlings transplanted in main field give better yield than thick ones."
        },
        {
          title: "Land Preparation & Transplanting",
          duration: "Day 1–5",
          color: "soil",
          desc: "Onion needs friable, well-drained fertile soil with high organic matter.",
          keyActivities: [
            "Deep plough + 2 harrowings",
            "Apply 8–10 tonnes FYM per acre",
            "Form flat beds or ridges (for well-drained irrigation)",
            "Transplant 30-day-old seedlings at 15×10 cm spacing",
            "Irrigate immediately after transplanting"
          ],
          inputs: [
            "FYM: 8–10 tonnes/acre",
            "Basal NPK: 50:25:25 kg/acre",
            "Seedlings",
            "Labor (10–12 per acre)"
          ],
          commonProblems: [
            "Planting too deep buries neck — poor bulb formation",
            "Uneven field causes waterlogging patches"
          ],
          tips: "Only plant the tender tip 1–2 cm into soil. Planting too deep is the #1 reason for poor bulbing in India."
        },
        {
          title: "Thrips & Purple Blotch Management",
          duration: "Day 30–90",
          color: "terracotta",
          desc: "Thrips and purple blotch are the two deadliest threats to onion. Act fast.",
          keyActivities: [
            "Install 10 blue sticky traps per acre at crop canopy level",
            "Scout leaves weekly for silvery streaks (thrips)",
            "For thrips: spray Spinosad @ 0.3ml/L or Fipronil @ 0.5ml/L",
            "For purple blotch: spray Iprodione 50WP @ 2g/L"
          ],
          inputs: [
            "Blue sticky traps (10/acre)",
            "Spinosad or Fipronil for thrips",
            "Iprodione or Mancozeb for purple blotch"
          ],
          commonProblems: [
            "Thrips resistance to common insecticides — rotate chemicals",
            "Purple blotch spreads rapidly in humid, foggy weather"
          ],
          tips: "Mix a sticker/spreader with fungicide sprays in onion — leaf surface is waxy and spray drops off without it."
        },
        {
          title: "Harvest & Curing",
          duration: "Day 110–130",
          color: "wheat",
          desc: "Curing is the secret to longer shelf life and better storage price.",
          keyActivities: [
            "Harvest when 50–60% of tops fall over naturally",
            "Leave harvested bulbs in field for 3–5 days for field curing",
            "Move to shade for 10–15 more days of curing",
            "Trim roots and 2 cm of neck before storage"
          ],
          inputs: [
            "Labor for harvest and curing",
            "Jute bags or onion nets",
            "Storage shed with good ventilation"
          ],
          commonProblems: [
            "Harvesting too early — high moisture, short storage life",
            "Poor curing — neck rot during storage"
          ],
          tips: "Properly cured onion stores for 4–5 months. Store in well-ventilated shade on raised platforms — not directly on ground."
        }
      ]
    }
  },
  hi: {
    Wheat: {
      description: "भारत की प्रमुख रबी फसल, सिंधु-गंगा के मैदानी इलाकों में नवंबर से अप्रैल तक उगाई जाती है। अंकुरण के लिए ठंडी जलवायु और पकने के समय गर्म सूखे मौसम की आवश्यकता होती है।",
      totalDays: "120–150 दिन",
      season: "रबी (बुवाई: अक्टूबर-नवंबर, कटाई: मार्च-अप्रैल)",
      stages: [
        {
          title: "बीज चयन और उपचार",
          duration: "बुवाई से पहले",
          color: "wheat",
          desc: "अपने क्षेत्र के लिए उपयुक्त प्रमाणित बीज चुनें। मिट्टी जनित रोगों से बचाव के लिए बुवाई से पहले बीजों का उपचार करें।",
          keyActivities: [
            "प्रमाणित किस्म चुनें: HD-2967, PBW-550, DBW-187, GW-496",
            "शुद्धता और अंकुरण दर (>85%) के लिए बीजों की जांच करें",
            "कार्बेन्डाजिम 50WP @ 2 ग्राम/किलोग्राम बीज से उपचारित करें",
            "उपचारित बीज को बुवाई तक छाया में रखें"
          ],
          inputs: [
            "प्रमाणित बीज (40 किग्रा/एकड़)",
            "कार्बेन्डाजिम कवकनाशी (Fungicide)",
            "राइजोबियम/एजोस्पाइरिलम कल्चर (वैकल्पिक)"
          ],
          commonProblems: [
            "कंडुआ रोग (Loose Smut) — केवल प्रमाणित और उपचारित बीजों का उपयोग करें",
            "कम अंकुरण — खरीदने से पहले बीजों के अंकुरण की गुणवत्ता जांचें"
          ],
          tips: "कृषि विज्ञान केंद्र (KVK) या पंजीकृत बीज विक्रेता से ही बीज खरीदें। बीज के थैले का लॉट नंबर और अंकुरण रिपोर्ट जांच लें।"
        },
        {
          title: "खेत की तैयारी",
          duration: "बुवाई से 15-20 दिन पहले",
          color: "soil",
          desc: "गेहूं के बेहतर अंकुरण के लिए एक महीन, भुरभुरी, समतल और नमीयुक्त क्यारी की आवश्यकता होती है।",
          keyActivities: [
            "गर्मियों में या खरीफ के शुरुआत में एक बार गहरी जुताई करें",
            "बुवाई से 3-4 सप्ताह पहले प्रति एकड़ 4-5 टन गोबर की सड़ी खाद (FYM) डालें",
            "मिट्टी के ढेलों को तोड़ने के लिए 2-3 बार तिरछी हैरो चलाएं",
            "समान सिंचाई के लिए पाटा या लेजर लैंड लेवलर से खेत को समतल करें"
          ],
          inputs: [
            "गोबर की सड़ी खाद (FYM): 4-5 टन/एकड़",
            "डीएपी (DAP): 50 किग्रा/एकड़ (बुवाई के समय आधारभूत खुराक)",
            "म्यूरिएट ऑफ पोटाश (MOP): 25 किग्रा/एकड़ (आधारभूत खुराक)"
          ],
          commonProblems: [
            "जलभराव — खेत में जल निकासी की उचित व्यवस्था सुनिश्चित करें",
            "कठिन मिट्टी — मिट्टी गीली होने पर गहरी जुताई करें, सूखी होने पर नहीं"
          ],
          tips: "लेजर लैंड लेवलर से खेत को समतल करने पर 25-30% सिंचाई के पानी की बचत होती है और उपज में 8-10% की वृद्धि होती है। कई राज्यों में सरकार इस पर सब्सिडी देती है।"
        },
        {
          title: "बुवाई",
          duration: "दिन 1-3",
          color: "leaf",
          desc: "समय पर बुवाई गेहूं की अच्छी उपज का सबसे बड़ा कारक है। सर्वोत्तम परिणामों के लिए 25 अक्टूबर से 25 नवंबर के बीच बुवाई करें।",
          keyActivities: [
            "22 सेमी कतार से कतार की दूरी पर सीड ड्रिल का उपयोग करें",
            "बुवाई की गहराई: 4-5 सेमी रखें",
            "बीज दर: 40 किग्रा/एकड़ (समय पर बुवाई), 50 किग्रा (देर से बुवाई)",
            "बुवाई के समय मिट्टी में अच्छी नमी सुनिश्चित करें — आवश्यकता हो तो सिंचाई करें"
          ],
          inputs: [
            "उपचारित बीज",
            "सीड ड्रिल (ट्रैक्टर संचालित या बैल चालित)",
            "बुवाई के समय आधारभूत एनपीके (NPK) खाद"
          ],
          commonProblems: [
            "देर से बुवाई (25 नवंबर के बाद) करने से प्रति सप्ताह 1-1.5 क्विंटल/एकड़ उपज कम हो जाती है",
            "असमान बुवाई — बुवाई शुरू करने से पहले सीड ड्रिल की जांच और अंशांकन (calibration) करें"
          ],
          tips: "देर से बुवाई (25 नवंबर - 15 दिसंबर) के लिए, देर से बोई जाने वाली किस्मों जैसे HD-3086 या WR-544 का उपयोग करें और बीज दर बढ़ाकर 50-60 किग्रा/एकड़ करें।"
        },
        {
          title: "मुकुट जड़ बनने के समय (CRI) सिंचाई",
          duration: "दिन 20–25",
          color: "sky",
          desc: "गेहूं में सबसे महत्वपूर्ण सिंचाई चरण। इस समय सिंचाई न करने से उपज में 20–30% तक की भारी कमी आ सकती है।",
          keyActivities: [
            "बुवाई के 20–25 दिन बाद पहली सिंचाई करें",
            "यूरिया की पहली टॉप-ड्रेसिंग करें: 25 किग्रा/एकड़",
            "युवा पत्तियों पर चेपा (Aphid) कीट के हमले की निगरानी करें",
            "हाथ से निराई करें या शाकनाशी (Isoproturon) का छिड़काव करें"
          ],
          inputs: [
            "यूरिया: 25 किग्रा/एकड़",
            "पानी: 5-6 सेमी सिंचाई",
            "शाकनाशी (यदि आवश्यक हो): आइसोप्रोट्यूरॉन 75WP"
          ],
          commonProblems: [
            "सिंचाई चूक जाना → इस चरण में पानी न देने से भारी नुकसान होगा",
            "जलभराव से पत्तियां पीली पड़ जाती हैं — जल निकासी के लिए नालियां बनाएं"
          ],
          tips: "यदि आपके पास केवल एक ही सिंचाई की व्यवस्था हो, तो इसे CRI चरण (20-25 दिन) पर ही दें। यूरिया डालने के बाद हल्की सिंचाई करें या बारिश का इंतजार करें।"
        },
        {
          title: "कल्ले निकलना (Tillering) और उर्वरक प्रबंधन",
          duration: "दिन 25–45",
          color: "primary",
          desc: "गेहूं के पौधों से कल्ले तेजी से निकलते हैं। अधिकतम कल्ले बनने के लिए संतुलित पोषण प्रदान करें।",
          keyActivities: [
            "यूरिया की दूसरी टॉप-ड्रेसिंग करें: 25 किग्रा/एकड़ 45 दिनों पर",
            "कल्ले निकलने के चरण (40-45 दिनों) पर दूसरी सिंचाई करें",
            "पीला रतुआ (Yellow Rust) की निगरानी करें — पत्तियों पर पीले-नारंगी पाउडर जैसे धब्बे",
            "मिट्टी की पपड़ी तोड़ने के लिए कतारों के बीच हल्की गुड़ाई करें"
          ],
          inputs: [
            "यूरिया: 25 किग्रा/एकड़",
            "जिंक सल्फेट (यदि मिट्टी में कमी हो): 10 किग्रा/एकड़",
            "पानी: 5-6 सेमी सिंचाई"
          ],
          commonProblems: [
            "पीला रतुआ — दिखने पर तुरंत प्रोपिकोनाज़ोल 25EC @ 1ml/L पानी में घोलकर छिड़काव करें",
            "नाइट्रोजन की कमी — पत्तियां पीली पड़ने लगती हैं, यूरिया की खुराक दें"
          ],
          tips: "तेज बारिश की संभावना होने पर यूरिया डालने से बचें, क्योंकि यह पानी के साथ बह जाएगा। बारिश होने से 3-4 दिन पहले डालें।"
        },
        {
          title: "गांठ बनना (Jointing) और कीट नियंत्रण",
          duration: "दिन 45–75",
          color: "terracotta",
          desc: "फसल तेजी से बढ़ती है। सप्ताह में दो बार कीटों और बीमारियों के लिए खेतों का निरीक्षण करें।",
          keyActivities: [
            "गांठ बनने के चरण (60-65 दिनों) पर तीसरी सिंचाई करें",
            "तना रतुआ, पत्ती रतुआ और पीला रतुआ की निगरानी करें",
            "पत्तियों के नीचे चेपा कीट के झुंडों की जांच करें",
            "यदि कीट आर्थिक नुकसान सीमा (ETL) पार करते हैं तो अनुशंसित कीटनाशक छिड़कें"
          ],
          inputs: [
            "पानी: 5-6 सेमी सिंचाई",
            "रतुआ नियंत्रण के लिए प्रोपिकोनाज़ोल / टेबुकोनाज़ोल कवकनाशी",
            "चेपा कीट नियंत्रण के लिए इमिडाक्लोप्रिड / थायामेथोक्सम"
          ],
          commonProblems: [
            "भूरा रतुआ (Brown Rust) पत्तियों पर भूरे-नारंगी रंग के छोटे धब्बों के रूप में दिखता है",
            "चेपा कीट का हमला होने पर पत्तियां चिपचिपी हो जाती हैं और पौधों का विकास रुक जाता है"
          ],
          tips: "कीटों की निगरानी के लिए फेरोमोन ट्रैप लगाएं। कीटनाशकों का उपयोग केवल तभी करें जब कीटों की संख्या सीमा पार करे, अन्यथा मित्र कीट नष्ट हो जाएंगे।"
        },
        {
          title: "फूल आना और दाना भरना (Flowering & Grain Filling)",
          duration: "दिन 75–100",
          color: "wheat",
          desc: "संवेदनशील प्रजनन चरण। इस समय पानी की कमी होने से दाने सिकुड़ जाते हैं और भारी नुकसान होता है।",
          keyActivities: [
            "फूल आने के समय (80-85 दिनों) पर चौथी सिंचाई करें",
            "दूधिया चरण (Milking stage, 95-100 दिनों) पर पांचवीं सिंचाई करें",
            "फूल आने के दौरान किसी भी रासायनिक कीटनाशक का छिड़काव न करें",
            "करनाल बंट (Karnal Bunt) रोग की निगरानी करें (दानों का काला पड़ना)"
          ],
          inputs: [
            "पानी: 5-6 सेमी सिंचाई (2 बार)",
            "फूल आने के दौरान कोई कीटनाशक छिड़काव नहीं"
          ],
          commonProblems: [
            "दाना भरते समय तेज गर्मी — शाम को तुरंत हल्की सिंचाई करें",
            "करनाल बंट रोग — अगले सीजन के लिए प्रमाणित रोग-मुक्त बीजों का ही उपयोग करें"
          ],
          tips: "यदि दाना भरते समय तापमान 35°C से अधिक हो जाता है, तो तुरंत सिंचाई करें। इस चरण में एक दिन की गर्मी भी 10-15% उपज घटा सकती है।"
        },
        {
          title: "कटाई (Harvesting)",
          duration: "दिन 115–140",
          color: "leaf",
          desc: "अधिकतम उपज, गुणवत्ता और मंडी भाव प्राप्त करने के लिए सही समय पर कटाई करें।",
          keyActivities: [
            "जब दाना सख्त हो जाए और डंठल सुनहरे पीले रंग का हो जाए तब कटाई करें",
            "कटाई के समय दानों में नमी: 18-22% होनी चाहिए",
            "बड़े खेतों के लिए कंबाइन हार्वेस्टर का उपयोग करें",
            "कटाई के बाद अनाज को नुकसान से बचाने के लिए 2-3 दिन में गहाई (Threshing) कर लें"
          ],
          inputs: [
            "कंबाइन हार्वेस्टर (किराए पर लें यदि आवश्यक हो)",
            "खलिहान के लिए तिरपाल",
            "भंडारण के लिए बोरियां"
          ],
          commonProblems: [
            "कटाई में देरी होने पर दाने खेत में झड़ने लगते हैं",
            "समय से पहले कटाई करने से दाने सिकुड़ जाते हैं और मंडी में भाव कम मिलता है"
          ],
          tips: "अनाज के दाने को दांत से दबाकर देखें। यदि वह कड़ा हो और डंठल पूरी तरह सूखा हो, तो तुरंत कटाई करें। आंधी या बारिश में देरी से 2-5% का नुकसान हो सकता है।"
        },
        {
          title: "कटाई के बाद भंडारण और बिक्री",
          duration: "कटाई के बाद",
          color: "soil",
          desc: "उचित भंडारण अनाज की गुणवत्ता को बनाए रखता है और जब दाम अच्छे हों तब बेचने की अनुमति देता है।",
          keyActivities: [
            "भंडारण से पहले अनाज को धूप में सुखाकर नमी 10-12% तक लाएं",
            "अनाज को साफ, कीटाणुरहित कोठियों या जूट की बोरियों में लकड़ी के तख्तों पर रखें",
            "भंडारण में कीटों से बचाने के लिए एल्युमिनियम फॉस्फाइड की गोलियों का उपयोग करें",
            "बेचने से पहले मंडी के भावों की निगरानी करें — जल्दबाजी न करें"
          ],
          inputs: [
            "नमी मापक यंत्र (Moisture Meter)",
            "एल्युमिनियम फॉस्फाइड गोलियां",
            "जूट की बोरियां / धातु की टंकियां"
          ],
          commonProblems: [
            "घुन (Weevil) का हमला — हर 3 महीने में अनाज के बक्से की जांच करें",
            "नमी के कारण फफूंद लगना — भंडारण से पहले अनाज को 2-3 दिन अच्छी धूप में सुखाएं"
          ],
          tips: "यदि सरकारी खरीद केंद्र (FCI) चालू है, तो 50% अनाज न्यूनतम समर्थन मूल्य (MSP) पर बेचें। शेष भाग को मंडी भाव बढ़ने पर 30-45 दिन बाद बेचें।"
        }
      ]
    },
    "Rice / Paddy": {
      description: "भारत की सबसे महत्वपूर्ण खरीफ फसल, जून से नवंबर तक उगाई जाती है। इसे प्रचुर मात्रा में पानी, गर्म तापमान और उपजाऊ मिट्टी की आवश्यकता होती है। यह देश की खाद्य सुरक्षा का आधार है।",
      totalDays: "110–145 दिन",
      season: "खरीफ (बुवाई: जून-जुलाई, कटाई: अक्टूबर-नवंबर)",
      stages: [
        {
          title: "बीज चयन और नर्सरी (पौध) तैयार करना",
          duration: "बुवाई से लेकर 25 दिनों तक",
          color: "wheat",
          desc: "एक स्वस्थ नर्सरी ही धान की बंपर पैदावार की नींव है। इस पर विशेष ध्यान दें।",
          keyActivities: [
            "क्षेत्र के अनुकूल किस्म चुनें: पूसा बासमती 1121 (बासमती), स्वर्णा/MTU-7029 (गैर-बासमती)",
            "बीज को 24 घंटे पानी में भिगोएं, फिर अंकुरित होने तक 48 घंटे के लिए ढककर रखें",
            "ऊंची क्यारियों पर नर्सरी तैयार करें (मुख्य खेत का 1/10 हिस्सा)",
            "अंकुरित बीजों को नर्सरी में डालें @ 20 किग्रा बीज/एकड़ नर्सरी"
          ],
          inputs: [
            "प्रमाणित बीज (8 किग्रा/एकड़)",
            "नर्सरी खाद: 100 वर्ग मीटर में 2 किग्रा यूरिया, 2 किग्रा डीएपी",
            "झुलसा रोग (Blast) से बचाव के लिए कार्बेन्डाजिम या ट्राइसाइक्लाज़ोल"
          ],
          commonProblems: [
            "नर्सरी में झुलसा रोग — ट्राइसाइक्लाज़ोल @ 0.6 ग्राम/लीटर पानी का छिड़काव करें",
            "पौध सड़न (Damping off) — पानी का जमाव न होने दें, जल निकासी रखें"
          ],
          tips: "मुख्य खेत में रोपाई से 25-30 दिन पहले नर्सरी की बुवाई करें। नर्सरी को पानी के स्रोत के पास रखें ताकि सिंचाई में आसानी हो।"
        },
        {
          title: "खेत की तैयारी और लेह (Puddling)",
          duration: "दिन 1–7",
          color: "soil",
          desc: "लेह करने से मिट्टी में पानी का ठहराव बढ़ता है, जो धान के लिए जरूरी है, और इससे खरपतवार भी दब जाते हैं।",
          keyActivities: [
            "लेह करने से 2-3 दिन पहले मुख्य खेत में पानी भरें",
            "रोटावेटर या ट्रैक्टर चालित हैरो से खेत में अच्छी तरह लेह (कीचड़) बनाएं",
            "लेह करने से पहले प्रति एकड़ 4 टन गोबर की खाद डालें",
            "लेह किए गए खेत को पाटे से समतल करें — असमान खेत में पानी और खाद का नुकसान होता है"
          ],
          inputs: [
            "पानी (बाढ़ सिंचाई)",
            "गोबर की खाद / हरी खाद",
            "आधारभूत खाद: डीएपी 25 किग्रा + यूरिया 30 किग्रा/एकड़"
          ],
          commonProblems: [
            "अपूर्ण लेह — खरपतवार बच जाते हैं और धान के पौधों को नुकसान पहुंचाते हैं",
            "असमान समतलीकरण — ऊंचे स्थानों पर सूखा पड़ जाता है और निचले स्थानों पर पौधे डूब जाते हैं"
          ],
          tips: "खेत जितना अधिक समतल होगा, पानी की खपत उतनी ही कम होगी और खरपतवार नियंत्रण उतना ही बेहतर होगा।"
        },
        {
          title: "रोपाई (Transplanting)",
          duration: "दिन 7–10",
          color: "leaf",
          desc: "नर्सरी से तैयार स्वस्थ और युवा पौधों को मुख्य खेत में रोपें।",
          keyActivities: [
            "नर्सरी से 25-30 दिन के पौधे निकालें और प्रति स्थान 2-3 पौधे रोपें",
            "दूरी: 20×15 सेमी (अधिक उपज के लिए) या 20×20 सेमी (SRI विधि)",
            "रोपाई की गहराई: केवल 2-3 सेमी रखें — पौधों को ज्यादा गहरा न रोपें",
            "नर्सरी से उखाड़ने के 48 घंटे के भीतर रोपाई का काम पूरा करें"
          ],
          inputs: [
            "नर्सरी के पौधे",
            "मजदूर (6-8 प्रति एकड़)",
            "जिंक सल्फेट: 10 किग्रा/एकड़ (यदि मिट्टी में कमी हो)"
          ],
          commonProblems: [
            "रोपाई का झटका — रोपाई के बाद 7-10 दिनों तक पौधों का पीला होना सामान्य है",
            "गहरी रोपाई करने से कल्ले कम निकलते हैं और उपज घट जाती है"
          ],
          tips: "श्री (SRI) विधि में, 8-12 दिन के सिंगल पौधे को 25×25 सेमी की दूरी पर लगाएं। इससे कम पानी और बीज में 25–40% अधिक उपज मिलती है।"
        },
        {
          title: "पानी का प्रबंधन",
          duration: "दिन 10–100",
          color: "sky",
          desc: "धान की खेती में पानी का सही प्रबंधन सबसे महत्वपूर्ण कौशल है।",
          keyActivities: [
            "वानस्पतिक विकास चरण के दौरान खेत में 2-5 सेमी पानी बनाकर रखें",
            "हर 7-10 दिनों में 1-2 दिन के लिए पानी सूखा दें (AWD विधि से 30% पानी बचता है)",
            "बालियां बनते समय खेत से पानी पूरी तरह न सूखने दें",
            "कटाई से 10 दिन पहले सिंचाई पूरी तरह बंद कर दें"
          ],
          inputs: [
            "पानी (सबसे महत्वपूर्ण आवश्यकता)",
            "खेत की मेड़ों की मरम्मत"
          ],
          commonProblems: [
            "बाढ़ — यदि बाढ़ आती है तो पानी उतरते ही मेड़ खोलकर अतिरिक्त पानी निकालें",
            "सूखा — खेत में हमेशा नमी रखें, दरारें न पड़ने दें"
          ],
          tips: "अल्टरनेट वेटिंग एंड ड्राइंग (AWD) तकनीक: खेत का पानी सूखने दें जब तक कि वह सतह से 10-15 सेमी नीचे न चला जाए, फिर दोबारा पानी भरें। इससे पानी बचता है और मीथेन गैस का उत्सर्जन कम होता।"
        },
        {
          title: "उर्वरक (खाद) प्रबंधन",
          duration: "दिन 10–60",
          color: "primary",
          desc: "धान को अधिक पोषक तत्वों की आवश्यकता होती है — यूरिया को 3 भागों में बांटकर डालें।",
          keyActivities: [
            "आधारभूत: रोपाई के समय डीएपी 25 किग्रा + पोटाश (MOP) 20 किग्रा/एकड़ डालें",
            "पहली टॉप-ड्रेसिंग: रोपाई के 21 दिन बाद (कल्ले निकलते समय) 30 किग्रा यूरिया/एकड़ डालें",
            "दूसरी टॉप-ड्रेसिंग: रोपाई के 45 दिन बाद (बालियां बनने की शुरुआत में) 25 किग्रा यूरिया/एकड़ डालें",
            "यदि पत्तियां पीली पड़ रही हों, तो जिंक सल्फेट 10 किग्रा/एकड़ का छिड़काव करें"
          ],
          inputs: [
            "डीएपी: 25 किग्रा/एकड़",
            "यूरिया: कुल 55 किग्रा/एकड़ (2 भागों में)",
            "म्यूरिएट ऑफ पोटाश (MOP): 20 किग्रा/एकड़",
            "जिंक सल्फेट: 10 किग्रा/एकड़ (आवश्यकतानुसार)"
          ],
          commonProblems: [
            "नाइट्रोजन (यूरिया) का अत्यधिक उपयोग करने से पौधे कमजोर होकर गिर (lodging) जाते हैं",
            "जिंक की कमी — पत्तियां तांबे के रंग जैसी लाल-भूरी हो जाती हैं"
          ],
          tips: "यूरिया का छिड़काव तब करें जब आसमान साफ हो और खेत में पानी हो। बारिश से तुरंत पहले छिड़काव करने से नाइट्रोजन बह जाता है।"
        },
        {
          title: "कीट और रोग नियंत्रण",
          duration: "दिन 20–90",
          color: "terracotta",
          desc: "धान में कीटों का प्रकोप अधिक होता है। हर हफ्ते खेत की निगरानी करें और शुरुआती लक्षण दिखते ही कार्रवाई करें।",
          keyActivities: [
            "तना छेदक (Stem Borer): फेरोमोन ट्रैप लगाएं + कार्टाप हाइड्रोक्लोराइड का छिड़काव करें",
            "भूरा फुदका (BPH): यूरिया का अधिक उपयोग न करें, प्रतिरोधी किस्म का चयन करें",
            "झुलसा रोग (Blast): बालियां निकलने के समय ट्राइसाइक्लाज़ोल का छिड़काव करें",
            "शीथ ब्लाइट (Sheath Blight): हेक्साकोनाज़ोल का छिड़काव करें"
          ],
          inputs: [
            "फेरोमोन ट्रैप (5 प्रति एकड़)",
            "तना छेदक के लिए कार्टाप हाइड्रोक्लोराइड / क्लोरपायरीफॉस",
            "झुलसा के लिए ट्राइसाइक्लाज़ोल कवकनाशी",
            "शीथ ब्लाइट के लिए हेक्साकोनाज़ोल"
          ],
          commonProblems: [
            "हॉपर बर्न (Hopperburn) — भूरे फुदके के हमले से खेत के बड़े हिस्से जलकर भूरे रंग के हो जाते हैं",
            "गर्दन झुलसा (Neck Blast) — बालियों की गर्दन काली पड़ जाती है और दाने खाली रह जाते हैं"
          ],
          tips: "कीटों की निगरानी के लिए रोपाई के पहले सप्ताह में ही खेत में 5 फेरोमोन ट्रैप प्रति एकड़ स्थापित करें।"
        },
        {
          title: "कटाई और गहाई (Harvest & Post-Harvest)",
          duration: "दिन 110–140",
          color: "wheat",
          desc: "कटाई का समय बहुत महत्वपूर्ण है — जल्दी काटने से चावल टूटता है, देर से काटने से दाने खेत में झड़ जाते हैं।",
          keyActivities: [
            "जब 80-85% बालियां सुनहरी पीली हो जाएं तब कटाई करें",
            "कंबाइन मशीन चलाने के लिए कटाई से 10 दिन पहले खेत का पानी सुखा दें",
            "कटाई के समय दानों में 20-25% नमी होनी चाहिए",
            "भंडारण से पहले अनाज को धूप में सुखाकर नमी 14% तक लाएं"
          ],
          inputs: [
            "कंबाइन हार्वेस्टर या दरांती + थ्रेशर मशीन",
            "सुखाने के लिए पक्का खलिहान या ड्रायर",
            "नमी मापक यंत्र (Moisture Meter)"
          ],
          commonProblems: [
            "बारिश में देरी से कटाई — अनाज सड़ने लगता है और चावल की गुणवत्ता गिर जाती है",
            "समय से पहले कटाई — हरे दाने अधिक होते हैं जिन्हें बाजार में कम दाम मिलता है"
          ],
          tips: "बासमती धान को प्रीमियम भाव पाने के लिए समर्पित बासमती राइस मिलों में बेचें। गैर-बासमती धान को न्यूनतम समर्थन मूल्य (MSP) पर सरकारी खरीद केंद्रों में बेचें।"
        }
      ]
    },
    // We will complete the rest of hi/mr crops in the next step to keep chunks balanced, or load them here
    Cotton: {
      description: "भारत का 'सफेद सोना'। कपास एक प्रमुख नकदी फसल है जो महाराष्ट्र, गुजरात, तेलंगाना, पंजाब और हरियाणा में उगाई जाती है। भारत में 90% से अधिक क्षेत्र में बीटी (Bt) कपास की खेती की जाती है।",
      totalDays: "160–200 दिन",
      season: "खरीफ (बुवाई: जून-जुलाई, चुनाई: अक्टूबर-जनवरी)",
      stages: [
        {
          title: "बीज चयन",
          duration: "बुवाई से पहले",
          color: "wheat",
          desc: "अपने क्षेत्र के लिए उपयुक्त सही बीटी हाइब्रिड बीज चुनें। गलत किस्म से उपज में 30-40% की कमी हो सकती है।",
          keyActivities: [
            "क्षेत्र-विशिष्ट बीटी हाइब्रिड किस्म चुनें (जैसे महाराष्ट्र के लिए RCH-2 BG-II, गुजरात के लिए JKch-1947)",
            "प्रमाणित बीज विक्रेता से ही बिल और टैग के साथ बीज खरीदें",
            "बोलगार्ड-II (Bollgard-II) प्रमाणीकरण अवश्य जांचें",
            "बीटी कपास के बचे हुए बीजों का दोबारा उपयोग न करें — इनमें दोबारा वह गुण नहीं होते"
          ],
          inputs: [
            "बीटी कपास हाइब्रिड बीज (450 ग्राम/एकड़)",
            "शुरुआती कीटों से सुरक्षा के लिए इमिडाक्लोप्रिड 70 WS से बीज उपचार"
          ],
          commonProblems: [
            "बाजार में नकली बीटी बीज की बिक्री — हमेशा सरकारी पंजीकृत विक्रेता से ही खरीदें",
            "गुलाबी सुंडी (Pink Bollworm) का बीटी कपास के प्रति प्रतिरोधक क्षमता विकसित करना"
          ],
          tips: "बीज खरीदते समय बिल जरूर लें। बीज के खराब होने या अंकुरण न होने की स्थिति में आप कृषि विभाग में शिकायत दर्ज करा सकते हैं।"
        },
        {
          title: "खेत की तैयारी",
          duration: "अप्रैल-मई (मानसून से पहले)",
          color: "soil",
          desc: "गर्मियों में गहरी जुताई करना बहुत जरूरी है — यह गुलाबी सुंडी के छिपे हुए प्यूपा को नष्ट कर देता है।",
          keyActivities: [
            "मृदा सौरिकीकरण (Soil solarization) के लिए अप्रैल-मई में गहरी जुताई करें",
            "बुवाई से 3-4 सप्ताह पहले प्रति एकड़ 5 टन गोबर की खाद डालें",
            "वर्षा आधारित खेती के लिए ऊंची क्यारियां और सिंचित क्षेत्र के लिए क्यारी व नाली बनाएं",
            "मानसून की पहली बारिश के बाद अंतिम जुताई और पाटा चलाएं"
          ],
          inputs: [
            "ट्रैक्टर चालित गहरी जुताई यंत्र",
            "गोबर की सड़ी खाद",
            "आधारभूत खाद: सिंगल सुपर फॉस्फेट (SSP) 100 किग्रा/एकड़ (सल्फर और फास्फोरस के लिए)"
          ],
          commonProblems: [
            "उथली जुताई से गुलाबी सुंडी के प्यूपा मिट्टी में जीवित रह जाते हैं",
            "काली भारी मिट्टी को बहुत अधिक महीन करने से बचें — ढेले नमी बनाए रखने में मदद करते हैं"
          ],
          tips: "गर्मियों में 18-20 इंच गहरी जुताई गुलाबी सुंडी और मिट्टी जनित फंगस रोगों को नियंत्रित करने का सबसे सस्ता और प्रभावी तरीका है।"
        },
        {
          title: "बुवाई",
          duration: "दिन 1 (जून-जुलाई)",
          color: "leaf",
          desc: "मानसून की पहली अच्छी बारिश के बाद बुवाई करें। सही समय और पौधों की उचित दूरी ही उपज तय करती है।",
          keyActivities: [
            "जून 15 से जुलाई 15 के बीच 25 मिमी बारिश होने के बाद बुवाई करें",
            "दूरी: 90×45 सेमी (वर्षा आधारित), 120×60 सेमी (सिंचित)",
            "प्रति स्थान 2 बीज 3-4 सेमी की गहराई पर बोएं",
            "सूखी मिट्टी में बुवाई न करें — पर्याप्त नमी का इंतजार करें"
          ],
          inputs: [
            "बीटी कपास के प्रमाणित बीज",
            "सीड ड्रिल या हाथ से चौका लगाने का यंत्र",
            "शुरुआती आधारभूत उर्वरक"
          ],
          commonProblems: [
            "मई के महीने में बिना मानसून के बहुत जल्दी बुवाई करने से बारिश न होने पर फसल सूख सकती है",
            "बहुत पास-पास बुवाई करने से कीटों और रोगों का प्रकोप बढ़ जाता है"
          ],
          tips: "ड्रिप सिंचाई वाले खेतों में कपास को उठी हुई क्यारियों पर बोएं, जहां क्यारियों के बीच 150 सेमी की दूरी हो। आप बीच की नालियों में प्याज या मेथी की अंतःफसली (intercrop) खेती कर सकते हैं।"
        },
        {
          title: "छंटाई, खाली स्थान भरना और निराई-गुड़ाई",
          duration: "दिन 15–30",
          color: "primary",
          desc: "प्रति स्थान केवल एक ही स्वस्थ पौधा रखें। कमजोर पौधों को निकालें और खाली स्थानों पर नए पौधे लगाएं।",
          keyActivities: [
            "बुवाई के 15-20 दिन बाद प्रति स्थान केवल 1 स्वस्थ पौधा छोड़कर बाकी निकाल दें",
            "खाली जगहों पर नर्सरी में तैयार पौधे 20 दिन के भीतर लगाएं",
            "बुवाई के 20 दिन बाद कतारों के बीच पहली गुड़ाई करें",
            "खरपतवार नियंत्रण के लिए पेंडीमेथालिन का छिड़काव करें"
          ],
          inputs: [
            "पौधों की छंटाई और खाली जगह भरने के लिए मजदूर",
            "खरपतवार नाशक रसायन (यदि आवश्यक हो)",
            "खाली जगह लगाने के लिए नर्सरी में तैयार किए गए पौधे"
          ],
          commonProblems: [
            "25 दिनों के बाद देर से खाली स्थान भरना — नए पौधे अच्छी तरह स्थापित नहीं हो पाते",
            "पहले 30 दिनों में खरपतवारों के कारण उपज में 40-60% की भारी गिरावट आ सकती है"
          ],
          tips: "पौधों की छंटाई (Thinning) एक बहुत महत्वपूर्ण कार्य है जिसे अधिकांश किसान छोड़ देते हैं। एक जगह दो पौधे होने से वे आपस में पोषक तत्वों के लिए लड़ते हैं और उपज कम हो जाती है।"
        },
        {
          title: "कीट प्रबंधन (80-160 दिन)",
          duration: "दिन 80–160",
          color: "terracotta",
          desc: "यह कपास का सबसे संवेदनशील चरण है। गुलाबी सुंडी (Pink Bollworm) और सफेद मक्खी (Whitefly) इस समय सबसे बड़े खतरे हैं।",
          keyActivities: [
            "गुलाबी सुंडी की निगरानी के लिए 5 फेरोमोन ट्रैप प्रति एकड़ लगाएं",
            "सफेद मक्खी की निगरानी के लिए पीले चिपचिपे कार्ड (Yellow Sticky Traps) लगाएं",
            "कीटों की संख्या सीमा पार करने पर प्रोफेनोफॉस या इमामेक्टिन बेंजोएट का छिड़काव करें",
            "कीटनाशकों के प्रति प्रतिरोधक क्षमता से बचने के लिए हर 2 छिड़काव के बाद कीटनाशक बदलें"
          ],
          inputs: [
            "फेरोमोन ट्रैप: 5 प्रति एकड़",
            "पीले चिपचिपे कार्ड: 10 प्रति एकड़",
            "प्रोफेनोफॉस 50EC या इमामेक्टिन 5% SG कीटनाशक",
            "सफेद मक्खी के शुरुआती नियंत्रण के लिए नीम का तेल"
          ],
          commonProblems: [
            "गुलाबी सुंडी का प्रकोप बढ़ने पर नीचे गिरे हुए फूलों और कलियों को इकट्ठा कर तुरंत नष्ट करें",
            "सफेद मक्खी पत्ती मरोड़ वायरस (Leaf Curl Virus) फैलाती है — इसका कोई इलाज नहीं है, मक्खी को रोकें"
          ],
          tips: "छिड़काव केवल तभी करें जब कीट आर्थिक नुकसान सीमा पार करें (गुलाबी सुंडी के लिए 2 पतंगे प्रति ट्रैप प्रति सप्ताह)। अनावश्यक छिड़काव से मित्र कीट मर जाते हैं।"
        },
        {
          title: "डोडे (Boll) का विकास और कपास की चुनाई",
          duration: "दिन 120–180+ ",
          color: "wheat",
          desc: "कपास की चुनाई 2-3 महीनों में 3-4 चक्रों में की जाती है। साफ चुनाई से मंडी में प्रीमियम भाव मिलता है।",
          keyActivities: [
            "पहली चुनाई: बुवाई के 120-130 दिन बाद जब डोडे पूरी तरह खुल जाएं तब करें",
            "हर 15-20 दिनों में चुनाई करें (कुल 3-4 बार)",
            "केवल पूरी तरह से खिले और सूखे डोडो से ही रुई निकालें — अधपके डोडो को न छुएं",
            "चुनी गई कपास को साफ जूट की बोरियों में रखें — प्लास्टिक थैलियों से बचें"
          ],
          inputs: [
            "जूट की साफ बोरियां (प्लास्टिक नहीं)",
            "चुनाई के लिए मजदूर",
            "सूखा भंडारण शेड"
          ],
          commonProblems: [
            "कपास में प्लास्टिक या रंगीन धागों की मिलावट होने पर स्पिनिंग मिलों द्वारा इसे खारिज कर दिया जाता है",
            "बारिश के बाद देर से चुनाई करने पर रुई पीली पड़ जाती है जिससे भाव कम मिलता है"
          ],
          tips: "अलग-अलग गुणवत्ता की कपास को आपस में न मिलाएं। इसे सूखे और हवादार स्थान पर रखें। स्थानीय व्यापारियों के बजाय सीधे कॉटन स्पिनिंग/जिनिंग मिलों को बेचें।"
        }
      ]
    },
    Soybean: {
      description: "तिलहन फसलों की रानी। भारत में मुख्य रूप से मध्य प्रदेश, महाराष्ट्र और राजस्थान में खरीफ के दौरान उगाई जाती है। यह प्रोटीन का सबसे समृद्ध स्रोत है और किसानों की प्रमुख नकदी फसल है।",
      totalDays: "90–110 दिन",
      season: "खरीफ (बुवाई: जून-जुलाई, कटाई: अक्टूबर)",
      stages: [
        {
          title: "बीज चयन और उपचार",
          duration: "बुवाई से पहले",
          color: "wheat",
          desc: "सोयाबीन के बीजों की अंकुरण क्षमता जल्दी खत्म हो जाती है। हर साल ताजे बीजों (< 6 महीने पुराने) का ही उपयोग करें।",
          keyActivities: [
            "अपने क्षेत्र के अनुसार किस्म चुनें: JS-335, JS-9560, NRC-7",
            "अंकुरण परीक्षण करें: बुवाई के लिए >70% अंकुरण दर स्वीकार्य है",
            "नाइट्रोजन स्थिरीकरण के लिए राइजोबियम कल्चर (Rhizobium) से उपचारित करें",
            "बीज सड़न से बचाव के लिए थीरम या कैप्टन @ 3 ग्राम/किग्रा बीज से उपचार करें"
          ],
          inputs: [
            "प्रमाणित बीज (30 किग्रा/एकड़)",
            "राइजोबियम कल्चर (250 ग्राम पैकेट)",
            "थीरम या कैप्टन कवकनाशी"
          ],
          commonProblems: [
            "पुराने बीजों की अंकुरण दर <50% होना — ऐसे बीजों का उपयोग करने से बचें या बीज दर बढ़ाएं",
            "राइजोबियम उपचार न करना — इससे मुफ्त नाइट्रोजन का लाभ नहीं मिल पाता"
          ],
          tips: "राइजोबियम उपचार बहुत सस्ता और अत्यंत प्रभावी है — इससे यूरिया का खर्च 50% तक कम हो जाता है। इसे कभी न छोड़ें।"
        },
        {
          title: "खेत की तैयारी और बुवाई",
          duration: "दिन 1–3",
          color: "soil",
          desc: "सोयाबीन के लिए अच्छे जल निकासी वाली भूमि आवश्यक है। जलभराव इसकी फसल का सबसे बड़ा दुश्मन है।",
          keyActivities: [
            "एक बार गहरी जुताई करें, उसके बाद 2 बार हैरो चलाएं",
            "बुवाई से पहले प्रति एकड़ 3 टन गोबर की सड़ी खाद डालें",
            "काली मिट्टी में बेहतर जल निकासी के लिए ब्रॉड-बेड फरो (BBF) विधि का उपयोग करें",
            "20 जून से 15 जुलाई के बीच 30-45 सेमी कतार की दूरी पर बुवाई करें",
            "बीज दर: 30 किग्रा/एकड़, गहराई: 3-4 सेमी"
          ],
          inputs: [
            "गोबर की खाद: 3 टन/एकड़",
            "बीज + राइजोबियम कल्चर",
            "खरपतवार नियंत्रण के लिए पेंडीमेथालिन शाकनाशी"
          ],
          commonProblems: [
            "भारी बारिश के तुरंत बाद जलभराव की स्थिति में बहुत जल्दी बुवाई करना",
            "बीज को बहुत गहरा (>5 सेमी) बोना — इससे अंकुरण प्रभावित होता है"
          ],
          tips: "ब्रॉड-बेड फरो (BBF) विधि से बुवाई करने पर अधिक बारिश की स्थिति में पानी आसानी से निकल जाता है और सूखे की स्थिति में नमी बनी रहती है।"
        },
        {
          title: "कीट और रोग नियंत्रण",
          duration: "दिन 20–80",
          color: "terracotta",
          desc: "गर्डल बीटल (चक्री भृंग), तना मक्खी और पीला मोज़ेक वायरस सोयाबीन के प्रमुख खतरे हैं।",
          keyActivities: [
            "चक्री भृंग (Girdle Beetle) के नुकसान की निगरानी करें (तने पर छल्ला बनाना)",
            "तंबाकू की इल्ली के लिए 5 फेरोमोन ट्रैप प्रति एकड़ स्थापित करें",
            "पीला मोज़ेक वायरस (YMV) से प्रभावित पौधों को उखाड़कर नष्ट करें",
            "कीटों की संख्या सीमा पार होने पर क्विनालफॉस या इमामेक्टिन बेंजोएट का छिड़काव करें"
          ],
          inputs: [
            "फेरोमोन ट्रैप",
            "क्विनालफॉस 25 EC या इमामेक्टिन 5 SG",
            "बैक्टीरियल पश्च्यूल रोग के लिए मैंकोजेब"
          ],
          commonProblems: [
            "पीला मोज़ेक वायरस (YMV) — इसका कोई इलाज नहीं है, केवल सफेद मक्खी (वाहक) को नियंत्रित किया जा सकता है",
            "चक्री भृंग के हमले से तना सूख जाता है जिससे 20-40% उपज का नुकसान हो सकता है"
          ],
          tips: "पीला मोज़ेक वायरस को फैलने से रोकने के लिए वाहक सफेद मक्खी के नियंत्रण हेतु इमिडाक्लोप्रिड का छिड़काव करें। प्रभावित पौधों को तुरंत खेत से हटा दें।"
        },
        {
          title: "कटाई और भंडारण",
          duration: "दिन 90–110",
          color: "leaf",
          desc: "सही समय पर कटाई करें ताकि फलियां खेत में चटकने (shattering) न पाएं और भंडारण में नुकसान न हो।",
          keyActivities: [
            "जब पत्तियां पीली होकर गिरने लगें और 80% फलियां भूरी हो जाएं तब कटाई करें",
            "कटाई के समय दानों में 15-17% नमी होनी चाहिए",
            "कटाई के लिए कंबाइन हार्वेस्टर या दरांती व थ्रेशर का उपयोग करें",
            "भंडारण से पहले दानों को सुखाकर नमी 12% तक लाएं"
          ],
          inputs: [
            "कंबाइन हार्वेस्टर या थ्रेशर मशीन",
            "नमी मापक यंत्र",
            "भंडारण के लिए बोरियां"
          ],
          commonProblems: [
            "कटाई में देरी होने पर फलियां चटकने लगती हैं जिससे दाने खेत में गिर जाते हैं",
            "भंडारण में अधिक नमी होने पर फफूंद (Aflatoxin) लगने का खतरा रहता है"
          ],
          tips: "सोयाबीन को सरकारी खरीद केंद्रों (MSP पर) या सीधे तेल मिलों को बेचें। सरकारी खरीद आमतौर पर अक्टूबर से दिसंबर के बीच खुली रहती है।"
        }
      ]
    },
    Onion: {
      description: "भारत की सबसे संवेदनशील सब्जियों में से एक और महाराष्ट्र, कर्नाटक व राजस्थान के किसानों की प्रमुख नकदी फसल। प्याज की खेती में भंडारण और बिक्री का सही समय ही मुनाफा तय करता है।",
      totalDays: "120–160 दिन (रोपाई विधि)",
      season: "रबी (बुवाई: अक्टूबर-नवंबर, कटाई: मार्च-अप्रैल)",
      stages: [
        {
          title: "नर्सरी और पौध तैयार करना",
          duration: "रोपाई से 25–30 दिन पहले",
          color: "wheat",
          desc: "स्वस्थ नर्सरी ही प्याज की अच्छी फसल की नींव है। इस पर विशेष ध्यान दें।",
          keyActivities: [
            "1 मीटर चौड़ी और 3 मीटर लंबी उठी हुई क्यारियां तैयार करें",
            "मुख्य खेत के एक एकड़ क्षेत्र के लिए 5 किग्रा बीज की नर्सरी डालें",
            "नर्सरी में सुबह और शाम हल्की सिंचाई करें",
            "नर्सरी में गलन रोग से बचाव के लिए ट्राइकोडर्मा का उपयोग करें"
          ],
          inputs: [
            "प्याज के प्रमाणित बीज: 5 किग्रा/एकड़",
            "ट्राइकोडर्मा जैविक कवकनाशी: 2.5 किग्रा प्रति नर्सरी क्यारी",
            "नर्सरी के लिए शेड नेट (छाया नेट)"
          ],
          commonProblems: [
            "नर्सरी में आर्द्र गलन (Damping off) — अधिक पानी और घनी बुवाई के कारण होता है",
            "थ्रिप्स (Thrips) कीट का हमला — पत्तियां मुड़ने लगती हैं, फिप्रोनिल छिड़कें"
          ],
          tips: "स्वस्थ नर्सरी के पौधे लगभग पेंसिल जितने मोटे होने चाहिए जो 25-30 दिन में तैयार हो जाते हैं। रोपाई के लिए मध्यम आकार के पौधे ही चुनें।"
        },
        {
          title: "खेत की तैयारी और रोपाई",
          duration: "दिन 1–5",
          color: "soil",
          desc: "प्याज के लिए भुरभुरी, अच्छी जल निकासी वाली और प्रचुर जीवांश (गोबर खाद) युक्त मिट्टी की आवश्यकता होती है।",
          keyActivities: [
            "खेत की गहरी जुताई करें और 2 बार हैरो चलाएं",
            "प्रति एकड़ 8-10 टन गोबर की सड़ी खाद अच्छी तरह मिलाएं",
            "सिंचाई की सुविधा के अनुसार समतल क्यारियां या कतार नाली बनाएं",
            "30 दिन के पौधों को 15×10 सेमी की दूरी पर रोपें",
            "रोपाई के तुरंत बाद खेत में हल्की सिंचाई करें"
          ],
          inputs: [
            "गोबर की खाद: 8-10 टन/एकड़",
            "आधारभूत खाद: एनपीके 50:25:25 किग्रा/एकड़",
            "नर्सरी के पौधे",
            "मजदूर"
          ],
          commonProblems: [
            "पौधों को बहुत गहरा रोपना — इससे प्याज का कंद छोटा बनता है",
            "असमान खेत के कारण पानी का जमाव होना"
          ],
          tips: "रोपाई करते समय पौधे के केवल नीचे के हिस्से (1-2 सेमी) को ही मिट्टी में दबाएं। भारत में प्याज का आकार छोटा रहने का सबसे बड़ा कारण गहरी रोपाई है।"
        },
        {
          title: "थ्रिप्स और बैंगनी धब्बा (Purple Blotch) प्रबंधन",
          duration: "दिन 30–90",
          color: "terracotta",
          desc: "थ्रिप्स कीट और बैंगनी धब्बा रोग प्याज के दो सबसे बड़े दुश्मन हैं। समय पर नियंत्रण आवश्यक है।",
          keyActivities: [
            "कीटों की निगरानी के लिए प्रति एकड़ 10 नीले चिपचिपे जाल (Blue Sticky Traps) लगाएं",
            "पत्तियों पर सफेद धारियों (थ्रिप्स के लक्षण) की साप्ताहिक जांच करें",
            "थ्रिप्स के लिए: स्पिनोसैड @ 0.3ml या फिप्रोनिल @ 0.5ml प्रति लीटर पानी में छिड़कें",
            "बैंगनी धब्बा के लिए: इप्रोडियोन 50WP @ 2 ग्राम/लीटर का छिड़काव करें"
          ],
          inputs: [
            "नीले चिपचिपे जाल (10/एकड़)",
            "स्पिनोसैड या फिप्रोनिल कीटनाशक",
            "इप्रोडियोन या मैंकोजेब कवकनाशी"
          ],
          commonProblems: [
            "थ्रिप्स कीट में रासायनिक दवाओं के प्रति प्रतिरोधक क्षमता — कीटनाशक बदल-बदल कर डालें",
            "कोहरे और नमी वाले मौसम में बैंगनी धब्बा रोग तेजी से फैलता है"
          ],
          tips: "प्याज की पत्तियां मोमी (waxy) होती हैं, इसलिए दवाओं के छिड़काव के साथ हमेशा स्टीकर/गोंद अवश्य मिलाएं, अन्यथा दवा पत्तियों पर नहीं टिकेगी।"
        },
        {
          title: "खुदाई, सुखाई (Curing) और भंडारण",
          duration: "दिन 110–130",
          color: "wheat",
          desc: "सुखाई प्याज को लंबे समय तक सुरक्षित रखने और बाजार में अच्छा दाम पाने की सबसे बड़ी कुंजी है।",
          keyActivities: [
            "जब प्याज के पौधों की 50-60% पत्तियां पीली होकर गिर जाएं तब खुदाई करें",
            "खुदे हुए प्याज को 3-5 दिन खेत में ही पत्तों से ढककर छोड़ दें (Field Curing)",
            "इसके बाद प्याज को 10-15 दिन छायादार और हवादार स्थान पर सुखाएं",
            "भंडारण से पहले जड़ों को पूरी तरह और पत्तों को 2 सेमी छोड़कर काटें"
          ],
          inputs: [
            "खुदाई और सुखाई के लिए मजदूर",
            "जूट की बोरियां या हवादार जालीदार बैग",
            "हवादार प्याज भंडारण गृह (कांदा चाळ)"
          ],
          commonProblems: [
            "बहुत जल्दी खुदाई करना — दानों में नमी अधिक रहने से प्याज सड़ जाता है",
            "खराब सुखाई के कारण भंडारण के दौरान प्याज का सड़ना"
          ],
          tips: "अच्छी तरह सुखाए गए प्याज को 4-5 महीने तक सुरक्षित रखा जा सकता है। इन्हें हवादार बांस के मचानों पर जमीन से ऊपर रखें, सीधे फर्श पर नहीं।"
        }
      ]
    }
  },
  mr: {
    Wheat: {
      description: "भारतातील रब्बी हंगामातील मुख्य पीक, नोव्हेंबर ते एप्रिल या कालावधीत इंडो-गंगेच्या खोऱ्यात घेतले जाते. उगवणीसाठी थंड हवामान आणि पक्वतेच्या वेळी उष्ण व कोरडे हवामान आवश्यक असते.",
      totalDays: "१२०–१५० दिवस",
      season: "रब्बी (पेरणी: ऑक्टोबर-नोव्हेंबर, काढणी: मार्च-एप्रिल)",
      stages: [
        {
          title: "बियाणे निवड आणि बीजप्रक्रिया",
          duration: "पेरणीपूर्वी",
          color: "wheat",
          desc: "तुमच्या भागासाठी शिफारस केलेले प्रमाणित बियाणे निवडा. मातीतून पसरणाऱ्या रोगांना प्रतिबंध करण्यासाठी पेरणीपूर्वी बियाण्यांवर बीजप्रक्रिया करा.",
          keyActivities: [
            "प्रमाणित वाण निवडा: HD-2967, PBW-550, DBW-187, GW-496",
            "बियाण्याची शुद्धता आणि उगवण क्षमता (>८५%) तपासा",
            "कार्बेन्डाझिम ५०WP @ २ ग्रॅम/किलो बियाणे या प्रमाणात बीजप्रक्रिया करा",
            "प्रक्रिया केलेले बियाणे पेरणी होईपर्यंत सावलीत साठवा"
          ],
          inputs: [
            "प्रमाणित बियाणे (४० किलो/एकर)",
            "कार्बेन्डाझिम बुरशीनाशक",
            "रायझोबियम/अझोस्पिरिलम जीवाणू खत (पर्यायी)"
          ],
          commonProblems: [
            "काणी रोग (Loose Smut) — केवळ प्रमाणित आणि प्रक्रिया केलेल्या बियाण्यांचा वापर करा",
            "कमी उगवण — खरेदी करण्यापूर्वी उगवण क्षमता तपासून घ्या"
          ],
          tips: "कृषी विज्ञान केंद्र (KVK) किंवा नोंदणीकृत बियाणे विक्रेत्याकडूनच बियाणे खरेदी करा. बियाण्याचे लॉट नंबर आणि उगवण चाचणी अहवाल तपासा."
        },
        {
          title: "जमीन तयार करणे",
          duration: "पेरणीपूर्वी १५-२० दिवस",
          color: "soil",
          desc: "गव्हाच्या चांगल्या उगवणीसाठी जमीन चांगली भुसभुशीत, सपाट आणि योग्य ओलावा असलेली असणे गरजेचे आहे.",
          keyActivities: [
            "उन्हाळ्यात किंवा खरीप हंगामाच्या सुरुवातीला एकदा खोल नांगरणी करा",
            "पेरणीपूर्वी ३-४ आठवडे आधी प्रति एकर ४-५ टन चांगले कुजलेले शेणखत (FYM) टाका",
            "मातीची ढेकळे फोडण्यासाठी २-३ वेळा वखरणी करा",
            "योग्य सिंचनासाठी जमीन सपाट करून घ्या (शक्य असल्यास लेझर लँड लेव्हलर वापरा)"
          ],
          inputs: [
            "शेणखत (FYM): ४-५ टन/एकर",
            "डीएपी (DAP): ५० किलो/एकर (पेरणीच्या वेळी आधारभूत डोस)",
            "म्युरिएट ऑफ पोटॅश (MOP): २५ किलो/एकर (आधारभूत डोस)"
          ],
          commonProblems: [
            "पाणी साचणे — शेतातून पाण्याचा निचरा होण्याची योग्य व्यवस्था करा",
            "कडक जमीन — जमीन योग्य ओली असताना खोल नांगरणी करा, कोरडी असताना नको"
          ],
          tips: "लेझर लँड लेव्हलरने जमीन सपाट केल्यास २५-३०% पाण्याच्या पाण्याची बचत होते आणि उत्पादनात ८-१०% वाढ होते. बऱ्याच राज्यांमध्ये सरकार यासाठी अनुदान देते."
        },
        {
          title: "पेरणी",
          duration: "दिवस १-३",
          color: "leaf",
          desc: "योग्य वेळी पेरणी करणे हा गव्हाच्या उत्पादनातील सर्वात महत्त्वाचा घटक आहे. उत्तम उत्पादनासाठी २५ ऑक्टोबर ते २५ नोव्हेंबर दरम्यान पेरणी करा.",
          keyActivities: [
            "दोन ओळीत २२ सेमी अंतर ठेवून पेरणी यंत्राने (सीड ड्रिल) पेरणी करा",
            "पेरणीची खोली: ४-५ सेमी ठेवा",
            "बियाणे प्रमाण: ४० किलो/एकर (योग्य वेळी पेरणी), ५० किलो (उशिरा पेरणी)",
            "पेरणीच्या वेळी जमिनीत पुरेसा ओलावा असल्याची खात्री करा — गरज असल्यास ओलित करा"
          ],
          inputs: [
            "प्रक्रिया केलेले बियाणे",
            "पेरणी यंत्र (ट्रॅक्टर किंवा बैलाच्या साहाय्याने चालणारे)",
            "पेरणीच्या वेळचे आधारभूत एनपीके (NPK) खत"
          ],
          commonProblems: [
            "उशिरा पेरणी (२५ नोव्हेंबरनंतर) केल्यास दर आठवड्याला १-१.५ क्विंटल प्रति एकर उत्पादन घटते",
            "असमान पेरणी — पेरणी सुरू करण्यापूर्वी पेरणी यंत्राचे कॅलिब्रेशन (calibration) करून घ्या"
          ],
          tips: "उशिरा पेरणीसाठी (२५ नोव्हेंबर - १५ डिसेंबर), उशिरा पेरणीसाठी शिफारस केलेले वाण जसे की HD-3086 किंवा WR-544 वापरा आणि बियाण्याचे प्रमाण ५०-६० किलो/एकर पर्यंत वाढवा."
        },
        {
          title: "मुकुट मुळे फुटण्याच्या वेळी (CRI) सिंचन",
          duration: "दिवस २०–२५",
          color: "sky",
          desc: "गव्हातील सर्वात महत्त्वाची पहिली पाणी पाळी. या वेळी पाणी न दिल्यास गव्हाच्या उत्पादनात २०–३०% घट होऊ शकते.",
          keyActivities: [
            "पेरणीनंतर २०–२५ दिवसांनी पहिली पाणी पाळी द्या",
            "युरियाचा पहिला हप्ता द्या: २५ किलो/एकर",
            "कोवळ्या पानांवर मावा (Aphids) किडीचा प्रादुर्भाव तपासा",
            "हाताने कोळपणी करा किंवा बुरशीनाशक/तणनाशक (Isoproturon) फवारा"
          ],
          inputs: [
            "युरिया: २५ किलो/एकर",
            "पाणी: ५-६ सेमी सिंचन",
            "तणनाशक (गरज असल्यास): आयसोप्रोट्युरॉन ७५WP"
          ],
          commonProblems: [
            "पाणी पाळी चुकणे → या टप्प्यात पाणी न दिल्यास पिकाचे प्रचंड नुकसान होते",
            "पाणी साचल्यामुळे पाने पिवळी पडतात — पाण्याचा निचरा करण्यासाठी तात्काळ चारी काढा"
          ],
          tips: "जर तुमच्याकडे फक्त एकाच पाण्याची सोय असेल, तर ते पाणी CRI टप्प्यावरच (२०-२५ दिवस) दिले पाहिजे. युरिया दिल्यानंतर हलके पाणी द्या किंवा पावसाची वाट पहा."
        },
        {
          title: "फुटवे फुटणे (Tillering) आणि खत व्यवस्थापन",
          duration: "दिवस २५–४५",
          color: "primary",
          desc: "गव्हाला फुटवे वेगाने येतात. जास्तीत जास्त फुटवे मिळवण्यासाठी संतुलित अन्नद्रव्ये द्या.",
          keyActivities: [
            "युरियाचा दुसरा डोस द्या: २५ किलो/एकर (पेरणीनंतर ४५ दिवसांनी)",
            "फुटवे फुटण्याच्या टप्प्यावर (४०-४५ दिवसांनी) दुसरी पाणी पाळी द्या",
            "तांबेरा (Yellow Rust) रोगाचा प्रादुर्भाव तपासा — पानांवर पिवळसर-नारंगी रंगाचे पावडरसारखे ठिपके",
            "जमिनीचा पापुद्रा फोडण्यासाठी दोन ओळींमध्ये कोळपणी करा"
          ],
          inputs: [
            "युरिया: २५ किलो/एकर",
            "झिंक सल्फेट (कमतरता असल्यास): १० किलो/एकर",
            "पाणी: ५-६ सेमी सिंचन"
          ],
          commonProblems: [
            "तांबेरा रोग — प्रादुर्भाव दिसताच तात्काळ प्रोपिकोनाझोल २५EC @ १ मिली/लीटर पाण्यात मिसळून फवारा",
            "नायट्रोजनची कमतरता — पाने पिवळी पडतात, युरियाचा हप्ता द्या"
          ],
          tips: "अतिवृष्टीची शक्यता असताना युरिया टाकू नका, कारण तो पाण्यासोबत वाहून जाईल. पाऊस येण्याच्या ३-४ दिवस आधी किंवा पाऊस उघडल्यावर टाका."
        },
        {
          title: "कांड्या धरणे (Jointing) आणि कीड नियंत्रण",
          duration: "दिवस ४५–७५",
          color: "terracotta",
          desc: "गव्हाची वाढ झपाट्याने होते. आठवड्यातून दोनदा कीड व रोगासाठी शेताची पाहणी करा.",
          keyActivities: [
            "कांड्या धरण्याच्या अवस्थेत (६०-६५ दिवसांनी) तिसरी पाणी पाळी द्या",
            "खोड तांबेरा, पानावरील तांबेरा आणि पिवळा तांबेरा या रोगांवर लक्ष ठेवा",
            "पानांच्या खाली मावा किडीचा प्रादुर्भाव तपासा",
            "किडींचे प्रमाण आर्थिक नुकसान पातळी (ETL) पेक्षा जास्त असल्यास फवारणी करा"
          ],
          inputs: [
            "पाणी: ५-६ सेमी सिंचन",
            "तांबेरा नियंत्रणासाठी प्रोपिकोनाझोल / टेबुकोनाझोल बुरशीनाशक",
            "मावा नियंत्रणासाठी इमिडाक्लोप्रिड / थायामेथोक्सम"
          ],
          commonProblems: [
            "तपकिरी तांबेरा रोग पानांवर लहान नारंगी-तपकिरी ठिपक्यांच्या स्वरूपात दिसतो",
            "मावा किडीचा प्रादुर्भाव झाल्यास पाने चिकट होतात आणि पिकाची वाढ खुंटते"
          ],
          tips: "किडींच्या देखरेखीसाठी फेरोमोन ट्रॅप वापरा. कीटकनाशकांचा वापर आवश्यकतेनुसारच करा, अन्यथा मित्र कीटक नष्ट होतील."
        },
        {
          title: "फुलारा आणि दाणे भरणे (Flowering & Grain Filling)",
          duration: "दिवस ७५–१००",
          color: "wheat",
          desc: "संवेदनशील पुनरुत्पादन टप्पा. या वेळी पाण्याच्या कमतरतेमुळे दाणे बारीक राहतात आणि मोठे नुकसान होते.",
          keyActivities: [
            "फुलारा अवस्थेत (८०-८५ दिवसांनी) चौथी पाणी पाळी द्या",
            "दाणे भरण्याच्या (चिकट/दूधिया) अवस्थेत (९५-१०० दिवसांनी) पाचवी पाणी पाळी द्या",
            "फुलारा अवस्थेत कोणत्याही रासायनिक कीटकनाशकाची फवारणी करू नका",
            "कर्नाल बंट (Karnal Bunt) रोगावर लक्ष ठेवा (दाणे काळे पडणे)"
          ],
          inputs: [
            "पाणी: ५-६ सेमी सिंचन (२ वेळा)",
            "फुलारा अवस्थेत कीटकनाशक फवारणी करू नका"
          ],
          commonProblems: [
            "दाणे भरताना अति उष्णता — संध्याकाळी तात्काळ हलके पाणी द्या",
            "कर्नाल बंट रोग — पुढील हंगामासाठी प्रमाणित रोगमुक्त बियाणेच वापरा"
          ],
          tips: "दाणे भरताना तापमान ३५°C पेक्षा जास्त असल्यास तात्काळ पाणी द्या. या टप्प्यातील एक दिवसाचा ताण देखील १०-१५% उत्पादन घटवू शकतो."
        },
        {
          title: "काढणी (Harvesting)",
          duration: "दिवस ११५–१४०",
          color: "leaf",
          desc: "उत्तम उत्पादन आणि दर्जेदार धान्य मिळवण्यासाठी योग्य वेळी काढणी करा.",
          keyActivities: [
            "दाणा कडक झाल्यावर आणि गव्हाचे धाड/खोड सोनेरी पिवळे झाल्यावर कापणी करा",
            "कापणीच्या वेळी दाण्यातील ओलावा: १८-२२% असावा",
            "मोठ्या शेतासाठी कंबाइन हार्वेस्टरचा वापर करा",
            "धान्याचे नुकसान टाळण्यासाठी कापणीनंतर २-३ दिवसांत मळणी (Threshing) करून घ्या"
          ],
          inputs: [
            "कंबाइन हार्वेस्टर (गरज असल्यास भाड्याने घ्या)",
            "मळणीच्या जागेसाठी ताडपत्री",
            "साठवणुकीसाठी सुती/जूटच्या पोत्या"
          ],
          commonProblems: [
            "काढणीला उशीर झाल्यास दाणे शेतात गळू लागतात",
            "वेळेपूर्वी काढणी केल्यास दाणे बारीक व सुरकुतलेले राहतात आणि बाजारात कमी भाव मिळतो"
          ],
          tips: "धान्याचा दाणा दाताने दाबून पहा. जर तो कडक असेल आणि खोड पूर्ण सुकले असेल तर कापणी करा. आंधी किंवा पावसामुळे काढणी लांबल्यास रोज २-५% नुकसान होऊ शकते."
        },
        {
          title: "काढणीपश्चात साठवणूक आणि विक्री",
          duration: "काढणीनंतर",
          color: "soil",
          desc: "योग्य साठवणुकीमुळे धान्याचा दर्जा टिकून राहतो आणि जेव्हा भाव चांगले असतील तेव्हा विकता येते.",
          keyActivities: [
            "साठवणुकीपूर्वी धान्य उन्हात चांगले वाळवून ओलावा १०-१२% पर्यंत आणा",
            "धान्य स्वच्छ, जंतूमुक्त कोठ्यांमध्ये किंवा जूटच्या गोण्यांमध्ये लाकडी फळ्यांवर ठेवा",
            "कीड नियंत्रणासाठी ॲल्युमिनियम फॉस्फाईडच्या गोळ्या वापरा",
            "घाई करू नका — बाजारातील गव्हाचे भाव तपासूनच विक्रीचा निर्णय घ्या"
          ],
          inputs: [
            "ओलावा मोजणारे यंत्र (Moisture Meter)",
            "ॲल्युमिनियम फॉस्फाईड गोळ्या",
            "जूटच्या गोण्या / लोखंडी टाक्या"
          ],
          commonProblems: [
            "धान्याला कीड (घून) लागणे — दर ३ महिन्यांनी साठवणुकीच्या जागेची तपासणी करा",
            "दमटपणामुळे बुरशी लागणे — साठवण्यापूर्वी धान्य किमान २-३ दिवस कडक उन्हात वाळवा"
          ],
          tips: "शासकीय खरेदी केंद्र सुरू असल्यास ५०% धान्य किमान आधारभूत किमतीने (MSP) शासकीय केंद्रावर विका. उर्वरित धान्य ३०-४५ दिवसांनी भाव वाढल्यावर विका."
        }
      ]
    },
    "Rice / Paddy": {
      description: "भारतातील खरीप हंगामातील अत्यंत महत्त्वाचे अन्नधान्याचे पीक, जून ते नोव्हेंबर दरम्यान घेतले जाते. या पिकाला मुबलक पाणी, उष्ण हवामान आणि सुपीक मातीची आवश्यकता असते. देशाच्या अन्न सुरक्षेचा हा मुख्य आधार आहे.",
      totalDays: "११०–१४५ दिवस",
      season: "खरीप (पेरणी: जून-जुलै, काढणी: ऑक्टोबर-नोव्हेंबर)",
      stages: [
        {
          title: "बियाणे निवड आणि रोपवाटिका तयार करणे",
          duration: "पेरणीपासून २५ दिवसांपर्यंत",
          color: "wheat",
          desc: "निरोगी रोपवाटिका (नर्सरी) हाच भात पिकाच्या उत्तम उत्पादनाचा पाया आहे. यावर विशेष लक्ष द्या.",
          keyActivities: [
            "भाताचे प्रमाणित वाण निवडा: पुसा बासमती ११२१ (बासमती), स्वर्णा/MTU-७०२९ (साधा भात)",
            "बियाणे २४ तास पाण्यात भिजवून ठेवा, नंतर मोड येण्यासाठी ४८ तास गोणपाटाने झाकून ठेवा",
            "गादी वाफ्यावर रोपवाटिका तयार करा (मुख्य शेताच्या १/१० वा भाग)",
            "मोड आलेले बियाणे रोपवाफ्यावर फेकावे @ २० किलो बियाणे/एकर नर्सरी"
          ],
          inputs: [
            "प्रमाणित बियाणे (८ किलो/एकर)",
            "रोपवाटिका खत: १०० चौ. मीटर जागेसाठी २ किलो युरिया, २ किलो डीएपी",
            "करपा (Blast) रोगाच्या प्रतिबंधासाठी कार्बेन्डाझिम किंवा ट्रायसायक्लाझोल"
          ],
          commonProblems: [
            "रोपवाटिकेत करपा रोग — ट्रायसायक्लाझोल @ ०.६ ग्रॅम/लिटर पाण्यात मिसळून फवारा",
            "रोपे कोलमडणे (Damping off) — वाफ्यावर पाणी साचू देऊ नका, निचरा चांगला ठेवा"
          ],
          tips: "मुख्य शेतात पुनर्लागवड करण्यापूर्वी २५-३० दिवस आधी रोपवाटिकेत बियाणे टाका. रोपवाटिका पाण्याच्या स्रोताजवळ ठेवा जेणेकरून पाणी देणे सोपे होईल."
        },
        {
          title: "जमीन तयार करणे आणि चिखलणी (Puddling)",
          duration: "दिवस १–७",
          color: "soil",
          desc: "चिखलणी (पडलिंग) केल्यामुळे मातीमध्ये पाणी साचून राहण्याची क्षमता वाढते आणि तणांचा प्रादुर्भाव कमी होतो.",
          keyActivities: [
            "चिखलणी करण्यापूर्वी २-३ दिवस आधी मुख्य शेतात पाणी साठवून ठेवा",
            "रोटाव्हेटर किंवा ट्रॅक्टरच्या साहाय्याने शेतामध्ये चांगला चिखल तयार करा",
            "चिखलणी करण्यापूर्वी शेतात प्रति एकर ४ टन कुजलेले शेणखत टाका",
            "चिखल केलेला खाचराचा भाग सपाट करा — असमान शेतामुळे पाणी आणि खतांचा अपव्यय होतो"
          ],
          inputs: [
            "पाणी (पूर सिंचन)",
            "शेणखत / हिरवळीचे खत",
            "आधारभूत खते: डीएपी २५ किलो + युरिया ३० किलो/एकर"
          ],
          commonProblems: [
            "अपूर्ण चिखलणी — तणे शिल्लक राहतात आणि भाताच्या वाढीला अडथळा आणतात",
            "असमान पातळी — उंचावरील रोपे सुकतात आणि खोल भागातील रोपे पाण्यात कुजतात"
          ],
          tips: "भात खाचर जितके जास्त सपाट असेल, तितकी पाण्याची बचत होईल आणि तण नियंत्रण अधिक सोपे होईल."
        },
        {
          title: "पुनर्लागवड (Transplanting)",
          duration: "दिवस ७–१०",
          color: "leaf",
          desc: "रोपवाटिकेतून काढलेली निरोगी आणि कोवळी रोपे चिखल केलेल्या खाचरात लावा.",
          keyActivities: [
            "रोपवाटिकेतील २५-३० दिवसांची रोपे काढा आणि एका ठिकाणी २-३ रोपे लावा",
            "अंतर: २०×१५ सेमी (अधिक उत्पादनासाठी) किंवा २०×२० सेमी (SRI पद्धत)",
            "लागवडीची खोली: केवळ २-३ सेमी ठेवा — रोपे जास्त खोल लावू नका",
            "रोपवाटिकेतून रोपे उपटल्यापासून ४८ तासांच्या आत पुनर्लागवड पूर्ण करा"
          ],
          inputs: [
            "रोपवाटिकेतील रोपे",
            "मजूर (६-८ प्रति एकर)",
            "झिंक सल्फेट: १० किलो/एकर (जमिनीत कमतरता असल्यास)"
          ],
          commonProblems: [
            "लागवडीचा धक्का — पुनर्लागवडीनंतर ७-१० दिवस रोपे पिवळी पडणे सामान्य आहे",
            "जास्त खोल लागवड केल्यास फुटवे कमी निघतात आणि उत्पादन घटते"
          ],
          tips: "श्री (SRI) पद्धतीमध्ये, ८-१२ दिवसांचे सिंगल रोप २५×२५ सेमी अंतरावर लावावे. यामुळे पाणी आणि बियाण्यात मोठी बचत होऊन २५–४०% अधिक उत्पादन मिळते."
        },
        {
          title: "पाणी व्यवस्थापन",
          duration: "दिवस १०–१००",
          color: "sky",
          desc: "भात शेतीमध्ये पाण्याचे योग्य व्यवस्थापन करणे हे सर्वात महत्त्वाचे कौशल्य आहे.",
          keyActivities: [
            "पिकाच्या वाढीच्या काळात खाचरात २-५ सेमी पाणी साठवून ठेवा",
            "दर ७-१० दिवसांनी खाचरातील पाणी १-२ दिवसांसाठी पूर्ण सुकू द्या (AWD पद्धतीने ३०% पाणी वाचते)",
            "पिंजर/पोगा अवस्थेत (Panicle initiation) जमिनीत सतत ओलावा ठेवा, पाणी सुकू देऊ नका",
            "काढणीच्या १० दिवस आधी पाणी देणे पूर्णपणे बंद करा"
          ],
          inputs: [
            "पाणी (अतिशय महत्त्वाचा घटक)",
            "खाचराच्या बांधांची दुरुस्ती"
          ],
          commonProblems: [
            "अतिवृष्टी / पूर — अतिवृष्टी झाल्यास बांधाचे तोंड उघडून अतिरिक्त पाणी बाहेर काढा",
            "दुष्काळ/पाणी टंचाई — खाचरात नेहमी ओलावा ठेवा, जमिनीला भेगा पडू देऊ नका"
          ],
          tips: "अल्टरनेट वेटिंग अँड ड्रायिंग (AWD) तंत्रज्ञान: खाचरातील पाणी सुकू द्या जोपर्यंत ते जमिनीच्या खाली १०-१५ सेमी जात नाही, नंतर पुन्हा पाणी द्या. यामुळे पाणी वाचते आणि हरितगृह वायूचे (मीथेन) उत्सर्जन कमी होते."
        },
        {
          title: "खत व्यवस्थापन",
          duration: "दिवस १०–६०",
          color: "primary",
          desc: "भात पिकाला खतांची जास्त गरज असते — नायट्रोजन (युरिया) ३ टप्प्यात विभागून द्या.",
          keyActivities: [
            "आधारभूत: पुनर्लागवडीच्या वेळी डीएपी २५ किलो + पोटॅश (MOP) २० किलो/एकर द्या",
            "पहिला हप्ता: पुनर्लागवडीनंतर २१ दिवसांनी (फुटवे फुटताना) ३० किलो युरिया/एकर द्या",
            "दुसरा हप्ता: पुनर्लागवडीनंतर ४५ दिवसांनी (बाल्या धरताना) २५ किलो युरिया/एकर द्या",
            "पाने पिवळी पडत असल्यास झिंक सल्फेट १० किलो/एकर या प्रमाणात फवारा"
          ],
          inputs: [
            "डीएपी: २५ किलो/एकर",
            "युरिया: एकूण ५५ किलो/एकर (२ हप्त्यांत)",
            "म्युरिएट ऑफ पोटॅश (MOP): २० किलो/एकर",
            "झिंक सल्फेट: १० किलो/एकर (आवश्यकतेनुसार)"
          ],
          commonProblems: [
            "युरियाचा अतिवापर केल्याने रोपे कमजोर होऊन लोळतात (lodging)",
            "झिंकची कमतरता — पाने तांबूस-तपकिरी रंगाची होतात, महाराष्ट्रातील कोकण भागात हा प्रादुर्भाव जास्त दिसतो"
          ],
          tips: "युरियाचा वापर करताना खाचरात पाणी असावे आणि पाऊस उघडलेला असावा. पावसापूर्वी खत दिल्यास ते वाहून जाते."
        },
        {
          title: "कीड आणि रोग नियंत्रण",
          duration: "दिवस २०–९०",
          color: "terracotta",
          desc: "भातावर विविध कीड-रोगांचा प्रादुर्भाव जास्त होतो. नियमितपणे देखरेख करा आणि तात्काळ उपाय करा.",
          keyActivities: [
            "खोडकिडा (Stem Borer): फेरोमोन ट्रॅप लावा आणि कार्टाप हायड्रोक्लोराईड फवारा",
            "तपकिरी तुडतुडे (BPH): युरियाचा अतिवापर टाळा, शिफारसीनुसार औषधे फवारा",
            "करपा रोग (Blast): लोंब्या निघताना ट्रायसायक्लाझोलची फवारणी करा",
            "शीथ ब्लाइट (Sheath Blight): हेक्साकोनाझोलची फवारणी करा"
          ],
          inputs: [
            "फेरोमोन ट्रॅप (५ प्रति एकर)",
            "खोडकिड्यासाठी कार्टाप हायड्रोक्लोराईड / क्लोरपायरीफॉस",
            "करप्यासाठी ट्रायसायक्लाझोल",
            "शीथ ब्लाइटसाठी हेक्साकोनाझोल बुरशीनाशक"
          ],
          commonProblems: [
            "हॉपर बर्न (Hopperburn) — तुडतुड्यांच्या अति प्रादुर्भावामुळे भाताचे खाचर जळल्यासारखे पिवळे-तपकिरी पडते",
            "लोंबी करपा (Neck Blast) — लोंबीचा सांधा काळा पडतो आणि दाणे न भरता लोंब्या पांढऱ्या पडतात"
          ],
          tips: "कीड नियंत्रणासाठी पुनर्लागवडीच्या पहिल्या आठवड्यातच शेतात ५ फेरोमोन ट्रॅप प्रति एकर लावावेत."
        },
        {
          title: "काढणी आणि मळणी (Harvest & Post-Harvest)",
          duration: "दिवस ११०–१४०",
          color: "wheat",
          desc: "काढणीची वेळ योग्य असणे आवश्यक आहे — लवकर काढणी केल्यास तांदूळ तुटतो आणि उशिरा केल्यास दाणे गळतात.",
          keyActivities: [
            "जेव्हा ८०-८५% लोंब्या सोनेरी पिवळ्या रंगाच्या होतील तेव्हा काढणी करा",
            "कंबाइन मशिन चालवण्यासाठी काढणीच्या १० दिवस आधी शेतातील पाणी काढून टाका",
            "धान्य काढणीच्या वेळी दाण्यांमध्ये २०-२५% ओलावा असावा",
            "साठवणुकीपूर्वी धान्य कडक उन्हात सुकवून ओलावा १४% पर्यंत आणा"
          ],
          inputs: [
            "कंबाइन हार्वेस्टर किंवा विळा + थ्रेशर मशिन",
            "वाळवण्यासाठी पक्के खळे किंवा ड्रायर",
            "ओलावा मोजणारे यंत्र"
          ],
          commonProblems: [
            "पावसात काढणी उशिरा होणे — धान्य सडू लागते आणि तांदळाची गुणवत्ता खराब होते",
            "अवेळी काढणी — हिरवे दाणे जास्त राहतात ज्यामुळे बाजारात भाव मिळत नाही"
          ],
          tips: "बासमती भाताला चांगला भाव मिळण्यासाठी थेट बासमती राइस मिलमध्ये विका. साधा भात शासकीय खरेदी केंद्रावर किमान आधारभूत किमतीने (MSP) विका."
        }
      ]
    },
    Cotton: {
      description: "भारताचे 'पांढरे सोने'. कापूस हे महाराष्ट्र, गुजरात, तेलंगणा आणि पंजाबमधील एक मुख्य नगदी पीक आहे. सध्या ९०% पेक्षा जास्त क्षेत्रावर बीटी (Bt) कापसाची लागवड केली जाते.",
      totalDays: "१६०–२०० दिवस",
      season: "खरीप (पेरणी: जून-जुलै, वेचणी: ऑक्टोबर-जानेवारी)",
      stages: [
        {
          title: "बियाणे निवड",
          duration: "पेरणीपूर्वी",
          color: "wheat",
          desc: "तुमच्या भागासाठी योग्य बीटी हायब्रिड बियाणे निवडा. चुकीच्या वाणामुळे उत्पादनात ३०-४०% घट होऊ शकते.",
          keyActivities: [
            "भागासाठी शिफारस केलेले बीटी वाण निवडा (उदा. महाराष्ट्रासाठी RCH-2 BG-II)",
            "अधिकृत विक्रेत्याकडून पक्क्या बिलासह प्रमाणित बियाणे खरेदी करा",
            "बोलगार्ड-II (Bollgard-II) प्रमाणीकरण असल्याची खात्री करा",
            "बीटी कापसाच्या घरगुती बियाण्याचा पुन्हा वापर करू नका — त्यातून अपेक्षित गुण मिळत नाहीत"
          ],
          inputs: [
            "बीटी कापूस बियाणे (४५० ग्रॅम/एकर)",
            "सुरुवातीच्या रसशोषक किडींपासून संरक्षणासाठी इमिडाक्लोप्रिड ७० WS ची बीजप्रक्रिया"
          ],
          commonProblems: [
            "बाजारात बनावट बियाण्यांची विक्री — नेहमी अधिकृत कृषी सेवा केंद्रातूनच खरेदी करा",
            "बीटी कापसावर गुलाबी बोंडअळीचा (Pink Bollworm) प्रादुर्भाव वाढणे"
          ],
          tips: "बियाणे खरेदी करताना पक्के बिल आणि बियाण्याचे पाकीट जपून ठेवा. बियाणे न उगवल्यास नुकसान भरपाई मिळवण्यासाठी याची मदत होते."
        },
        {
          title: "जमीन तयार करणे",
          duration: "एप्रिल-मे (पावसाळ्यापूर्वी)",
          color: "soil",
          desc: "उन्हाळ्यात खोल नांगरणी करणे अनिवार्य आहे — यामुळे जमिनीतील गुलाबी बोंडअळीचे कोष (pupae) नष्ट होतात.",
          keyActivities: [
            "एप्रिल-मे मध्ये खोल नांगरणी करून जमीन उन्हात तापू द्या",
            "पेरणीच्या ३-४ आठवडे आधी प्रति एकर ५ टन शेणखत टाका",
            "कोरडवाहूसाठी गादी वाफे आणि सिंचनासाठी सरी-वरंबे तयार करा",
            "पहिल्या पावसाच्या चांगल्या सरीनंतर वखरणी करून शेत सपाट करा"
          ],
          inputs: [
            "खोल नांगरणीसाठी ट्रॅक्टर / नांगर",
            "शेणखत / हिरवळीचे खत",
            "आधारभूत खत: सिंगल सुपर फॉस्फेट (SSP) १०० किलो/एकर (गंधक आणि स्फुरदसाठी)"
          ],
          commonProblems: [
            "उथळ नांगरणी केल्यास बोंडअळीचे कोष जमिनीत जिवंत राहतात",
            "भारी काळ्या मातीची जास्त बारीक वखरणी टाळा — ढेकळे ओलावा टिकवून ठेवण्यास मदत करतात"
          ],
          tips: "उन्हाळ्यात १८-२० इंच खोल नांगरणी केल्याने बोंडअळी आणि जमिनीतून पसरणाऱ्या बुरशीजन्य रोगांचे नियंत्रण होते."
        },
        {
          title: "पेरणी",
          duration: "दिवस १ (जून-जुलै)",
          color: "leaf",
          desc: "पहिल्या चांगल्या पावसावर (७५ ते १०० मिमी) पेरणी करा. योग्य वेळ आणि झाडांमधील अंतर यावरच कापसाचे उत्पादन अवलंबून असते.",
          keyActivities: [
            "१५ जून ते १५ जुलै दरम्यान पुरेसा पाऊस झाल्यावर पेरणी करा",
            "अंतर: ९०×४५ सेमी (कोरडवाहू), १२०×६० सेमी (बागायती)",
            "एका ठिकाणी २ बिया ३-४ सेमी खोलीवर टोकाव्यात",
            "कोरड्या जमिनीत पेरणी करू नका — पुरेसा ओलावा असावा"
          ],
          inputs: [
            "बीटी कापूस बियाणे",
            "टोकण यंत्र किंवा हाताने टोकण करणे",
            "सुरुवातीचे रासायनिक खत"
          ],
          commonProblems: [
            "मे महिन्यात फार लवकर पेरणी करणे — पाऊस लांबल्यास रोपे सुकून जातात",
            "अतिशय जवळ लागवड केल्यास कीड व रोगांचा प्रादुर्भाव वाढतो"
          ],
          tips: "ठिबक सिंचन असेल तर कापसाची लागवड गादी वाफ्यावर (Raised bed) १५० सेमी अंतरावर करा. नालीमध्ये कांदा किंवा मेथीचे आंतरपीक घेऊ शकता."
        },
        {
          title: "विरळणी, नांगे भरणे आणि कोळपणी",
          duration: "दिवस १५–३०",
          color: "primary",
          desc: "एका ठिकाणी केवळ एकच निरोगी झाड ठेवा. कमकुवत झाडे काढून नांगे भरा.",
          keyActivities: [
            "पेरणीनंतर १५-२० दिवसांनी एका ठिकाणी केवळ १ मजबूत रोप ठेवून बाकीचे काढून टाका",
            "नांगे पडलेल्या जागी २० दिवसांच्या आत नवीन रोपे लावून घ्या",
            "पेरणीनंतर २० दिवसांनी कोळपणी करा आणि खुरपणी करून तण काढून टाका",
            "तण नियंत्रणासाठी पेंडीमेथालिन तणनाशकाचा वापर करा"
          ],
          inputs: [
            "विरळणी आणि नांगे भरण्यासाठी मजूर",
            "तणनाशक (आवश्यकता असल्यास फवारणी)",
            "नांगे भरण्यासाठी आधीच पिशवीत तयार केलेली रोपे"
          ],
          commonProblems: [
            "२५ दिवसांनंतर उशिरा नांगे भरणे — नवीन लावलेली रोपे नीट वाढत नाहीत",
            "पहिल्या ३० दिवसांत तण वाढल्यास उत्पादनात ४०-६०% घट होऊ शकते"
          ],
          tips: "कापूस पिकात विरळणी (Thinning) अत्यंत महत्त्वाचे काम आहे. एकाच ठिकाणी दोन झाडे राहिल्यास त्यांच्यात स्पर्धा होते आणि बोंडांचा आकार बारीक राहतो."
        },
        {
          title: "कीड व्यवस्थापन (८०-१६० दिवस)",
          duration: "दिवस ८०–१६०",
          color: "terracotta",
          desc: "हा कापसाचा सर्वात संवेदनशील काळ आहे. गुलाबी बोंडअळी आणि पांढरी माशी या मुख्य किडी आहेत.",
          keyActivities: [
            "गुलाबी बोंडअळीच्या निगराणीसाठी ५ कामगंध सापळे (Pheromone traps) प्रति एकर लावा",
            "पांढऱ्या माशीसाठी पिवळे चिकट सापळे (Yellow Sticky Traps) लावा",
            "किडींचे प्रमाण नुकसान पातळीच्या वर गेल्यास प्रोफेनोफॉस किंवा इमामेक्टिन बेंजोएट फवारा",
            "किडींमध्ये प्रतिकारशक्ती येऊ नये म्हणून औषध बदलून फवारा"
          ],
          inputs: [
            "कामगंध सापळे: ५ प्रति एकर",
            "पिवळे चिकट सापळे: १० प्रति एकर",
            "प्रोफेनोफॉस ५०EC किंवा इमामेक्टिन ५% SG",
            "सुरुवातीला पांढऱ्या माशीसाठी निंबोळी अर्क ५%"
          ],
          commonProblems: [
            "बोंडअळीचा प्रादुर्भाव वाढल्यास गळलेली फुले व बोंडे वेचून नष्ट करा",
            "पांढरी माशी पानांवर चकाकी निर्माण करते आणि पानांचा गुच्छ होतो (Leaf Curl Virus)"
          ],
          tips: "फवारणी केवळ तेव्हाच करा जेव्हा किडी नुकसान पातळी ओलांडतील (उदा. गुलाबी बोंडअळीचे आठवड्याला सापळ्यात २ पेक्षा जास्त पतंगे सापडणे)."
        },
        {
          title: "बोंडे भरणे आणि वेचणी",
          duration: "दिवस १२०–१८०+",
          color: "wheat",
          desc: "कापसाची वेचणी ३-४ टप्प्यात २-३ महिन्यांत केली जाते. स्वच्छ वेचणीमुळे चांगला बाजार भाव मिळतो.",
          keyActivities: [
            "पहिली वेचणी: बुवाईनंतर १२०-१३० दिवसांनी जेव्हा बोंडे पूर्णपणे उमलतात तेव्हा करा",
            "दर १५-२० दिवसांनी वेचणी करा (एकूण ३-४ वेचण्या)",
            "केवळ पूर्ण खिलेला आणि सुका कापूस वेचावा — ओल्या कापसाची वेचणी टाळा",
            "वेचलेला कापूस स्वच्छ सुती किंवा जूटच्या पोत्यात साठवा — प्लास्टिक वापरू नका"
          ],
          inputs: [
            "जूटची स्वच्छ पोती (प्लास्टिक पोती वापरू नका)",
            "वेचणीसाठी मजूर",
            "कापूस ठेवण्यासाठी कोरडी साठवणूक शेड"
          ],
          commonProblems: [
            "कापसामध्ये प्लास्टिक किंवा रंगाचे धागे आढळल्यास बाजारात भाव खूप कमी मिळतो",
            "पाऊस पडून गेल्यावर वेचणी केल्यास कापूस पिवळसर पडतो आणि दर्जा घसरतो"
          ],
          tips: "कधीही वेगवेगळ्या वेचणीचा कापूस एकत्र करू नका. तो कोरड्या आणि हवेशीर ठिकाणी साठवा. स्थानिक व्यापाऱ्यांपेक्षा थेट जिनिंग प्रेसिंग मिलमध्ये विक्री करा."
        }
      ]
    },
    Soybean: {
      description: "सोयाबीन हे महाराष्ट्रातील खरीप हंगामातील अत्यंत महत्त्वाचे नगदी पीक आहे. हे प्रथिने आणि तेलाचे मुख्य स्त्रोत असून विदर्भ आणि पश्चिम महाराष्ट्रात मोठ्या प्रमाणावर घेतले जाते.",
      totalDays: "९०–११० दिवस",
      season: "खरीप (पेरणी: जून-जुलै, काढणी: ऑक्टोबर)",
      stages: [
        {
          title: "बियाणे निवड आणि बीजप्रक्रिया",
          duration: "पेरणीपूर्वी",
          color: "wheat",
          desc: "सोयाबीन बियाण्याची उगवण क्षमता लवकर कमी होते. दरवर्षी नवीन घरचे किंवा प्रमाणित बियाणे वापरा.",
          keyActivities: [
            "भागानुसार वाण निवडा: JS-335, JS-9560, फुले संगम (KDS-726)",
            "उगवण क्षमता चाचणी घ्या: कमीत कमी ७०% उगवण क्षमता असणे गरजेचे आहे",
            "नत्र स्थिरीकरणासाठी रायझोबियम (Rhizobium) आणि पीएसबी जीवाणू संवर्धकाची बीजप्रक्रिया करा",
            "खोडकुजव्या रोगापासून संरक्षणासाठी थिरम किंवा थायोफिनेट मिथाईलची बीजप्रक्रिया करा"
          ],
          inputs: [
            "प्रमाणित बियाणे (३० किलो/एकर)",
            "रायझोबियम आणि पीएसबी कल्चर (२५० ग्रॅम पाकीट)",
            "थिरम किंवा बुरशीनाशक औषध"
          ],
          commonProblems: [
            "बियाण्याची कमी उगवण क्षमता — पेरणीपूर्वी घरच्या बियाण्याची उगवण चाचणी न करणे",
            "बीजप्रक्रिया न करणे — यामुळे पिकाची सुरुवातीची वाढ मंदावते आणि कीड-रोग वाढतात"
          ],
          tips: "रायझोबियम आणि पीएसबी बीजप्रक्रिया अत्यंत स्वस्त आणि फायदेशीर आहे. याने पिकाला हवेतील नत्र आणि जमिनीतील स्फुरद सहज मिळते व रासायनिक खतांचा खर्च २५% वाचतो."
        },
        {
          title: "जमीन तयार करणे आणि पेरणी",
          duration: "दिवस १–३",
          color: "soil",
          desc: "सोयाबीनला चांगल्या निचऱ्याची जमीन लागते. पाणी साचून राहिल्यास पीक पिवळे पडते आणि सडते.",
          keyActivities: [
            "एकदा खोल नांगरणी करून २ वेळा वखरणी करा",
            "पेरणीपूर्वी शेतात प्रति एकर ३ टन चांगले कुजलेले शेणखत पसरा",
            "भारी जमिनीत बीबीएफ (रुंद वरंबा सरी) पद्धतीने पेरणी करा",
            "योग्य ओलावा झाल्यावर ३0 ते ४५ सेमी अंतरावर पेरणी करा",
            "पेरणीची खोली: ३-४ सेमी ठेवा, जास्त खोल पेरणी करू नका"
          ],
          inputs: [
            "शेणखत: ३ टन/एकर",
            "बियाणे + रायझोबियम जीवाणू खत",
            "तण नियंत्रणासाठी पेंडीमेथालिन तणनाशक (पेरणीनंतर लगेच)"
          ],
          commonProblems: [
            "खूप ओल्या जमिनीत घाईघाईने पेरणी करणे — बियाणे कुजण्याची शक्यता असते",
            "बियाणे ५ सेमी पेक्षा जास्त खोल पडणे — रोपे बाहेर येत नाहीत"
          ],
          tips: "बीबीएफ (BBF) पद्धतीने पेरणी केल्यास अतिवृष्टीच्या काळात अतिरिक्त पाण्याचा निचरा होतो आणि कोरड्या कालखंडात पिकाला पाण्याचा ताण बसत नाही."
        },
        {
          title: "कीड आणि रोग नियंत्रण",
          duration: "दिवस २०–८०",
          color: "terracotta",
          desc: "खोडकिडा (Stem Fly), चक्री भुंगा (Girdle Beetle) आणि तांबेरा रोग हे सोयाबीनचे प्रमुख शत्रू आहेत.",
          keyActivities: [
            "चक्री भुंग्याचा (Girdle Beetle) प्रादुर्भाव तपासा (तनावरील दोन चक्राकार खाचा)",
            "लष्करी अळीच्या निगराणीसाठी ५ कामगंध सापळे प्रति एकर लावा",
            "पिवळा मोझॅक वायरस (YMV) ग्रस्त झाडे दिसताच उपटून नष्ट करा",
            "किडी आर्थिक नुकसान पातळीच्या वर गेल्यास शिफारसीनुसार कीटकनाशक फवारा"
          ],
          inputs: [
            "कामगंध सापळे",
            "क्विनालफॉस २५ EC किंवा इमामेक्टिन ५ SG",
            "तांबेरा रोगासाठी टेबुकोनाझोल किंवा हेक्साकोनाझोल बुरशीनाशक"
          ],
          commonProblems: [
            "पिवळा मोझॅक (YMV) — हा रोग पांढऱ्या माशीमुळे पसरतो, यावर थेट औषध नाही, झाडे उपटणे हाच उपाय",
            "चक्री भुंग्यामुळे सोयाबीनचे झाड वाळून उत्पादनात मोठी घट होते"
          ],
          tips: "पिवळा मोझॅक पसरू नये म्हणून पांढऱ्या माशीचे नियंत्रण करण्यासाठी पिवळे सापळे लावा आणि इमिडाक्लोप्रिड फवारा. रोगट झाडे तात्काळ शेतातून बाहेर काढून नष्ट करा."
        },
        {
          title: "काढणी आणि साठवणूक",
          duration: "दिवस ९०–११०",
          color: "leaf",
          desc: "योग्य वेळी काढणी करा जेणेकरून शेंगा शेतात फुटून दाणे सांडणार नाहीत.",
          keyActivities: [
            "पाने पिवळी पडून गळू लागल्यावर आणि ८०% शेंगा तपकिरी झाल्यावर काढणी करा",
            "काढणीच्या वेळी दाण्यांमध्ये १५-१७% ओलावा असावा",
            "काढणीसाठी कंबाइन हार्वेस्टर किंवा विळ्याने कापून थ्रेशरने मळणी करा",
            "धान्य साठवण्यापूर्वी कडक उन्हात वाळवून ओलावा १२% पेक्षा कमी आणा"
          ],
          inputs: [
            "कंबाइन हार्वेस्टर किंवा मळणी यंत्र (थ्रेशर)",
            "ओलावा मोजण्याचे यंत्र",
            "धान्य साठवणीची पोती"
          ],
          commonProblems: [
            "काढणीला उशीर झाल्यास शेंगा फुटतात आणि सोयाबीन शेतात गळून पडतो",
            "धान्यात जास्त ओलावा असल्यास बुरशी लागून सोयाबीनची उगवण क्षमता नष्ट होते"
          ],
          tips: "सोयाबीनची विक्री शासकीय खरेदी केंद्रावर किमान आधारभूत किमतीने (MSP) करा किंवा बाजार भाव चांगले असताना तेल मिलला थेट विक्री करा."
        }
      ]
    },
    Onion: {
      description: "कांदा हे महाराष्ट्रातील, विशेषतः नाशिक आणि नगर जिल्ह्यातील शेतकऱ्यांचे मुख्य नगदी पीक आहे. साठवणूक क्षमता आणि विक्रीचा योग्य वेळ यावरच या पिकाचा नफा अवलंबून असतो.",
      totalDays: "१२०–१६० दिवस (पुनर्लागवड पद्धत)",
      season: "रबी (पेरणी: ऑक्टोबर-नोव्हेंबर, काढणी: मार्च-एप्रिल)",
      stages: [
        {
          title: "रोपवाटिका (नर्सरी) तयार करणे",
          duration: "पुनर्लागवडीपूर्वी २५–३० दिवस",
          color: "wheat",
          desc: "दर्जेदार आणि निरोगी रोपे हाच कांदा पिकाच्या बंपर उत्पादनाचा पाया आहे.",
          keyActivities: [
            "१ मीटर रुंद आणि ३ मीटर लांब गादी वाफे तयार करा",
            "मुख्य शेताच्या १ एकर क्षेत्रासाठी ५ किलो कांदा बियाण्याची रोपवाटिका टाका",
            "रोपवाटिकेला सकाळी आणि संध्याकाळी हलके पाणी (झारीने) द्या",
            "रोपे सडू नयेत (Damping off) म्हणून बियाण्याला ट्रायकोडर्मा लावा"
          ],
          inputs: [
            "कांदा बियाणे: ५ किलो/एकर",
            "ट्रायकोडर्मा बुरशीनाशक: २.५ किलो प्रति रोपवाटिका",
            "रोपवाटिकेसाठी सावलीचे जाळे (शेड नेट)"
          ],
          commonProblems: [
            "रोप कुजणे (Damping off) — वाफ्यावर पाणी साचल्याने आणि दाट पेरणीमुळे हा रोग होतो",
            "थ्रिप्स (फुलकिडे) किडीचा प्रादुर्भाव — रोपांची पाने वाकडी होतात, फिप्रोनिल फवारा"
          ],
          tips: "कांद्याचे रोप पुनर्लागवडीसाठी पेन्सिलच्या जाडीचे असावे. २५ ते ३० दिवसांत रोप तयार होते. लागवडीसाठी मध्यम आकाराचीच रोपे निवडावीत."
        },
        {
          title: "जमीन तयार करणे आणि पुनर्लागवड",
          duration: "दिवस १–५",
          color: "soil",
          desc: "कांदा पिकाला मध्यम ते भारी, पाण्याचा उत्तम निचरा होणारी आणि सेंद्रिय खतांनी समृद्ध असलेली जमीन लागते.",
          keyActivities: [
            "जमिनीची खोल नांगरणी करून २ वेळा कुळवणी करा",
            "प्रति एकर ८-१० टन चांगले कुजलेले शेणखत शेतात मिसळा",
            "पाण्याच्या सोयीनुसार सपाट वाफे किंवा सरी-वरंबे तयार करा",
            "३० दिवसांचे रोप उपटून १५×१० सेमी अंतरावर पुनर्लागवड करा",
            "लागवडीनंतर लगेचच शेताला हलके पाणी (शेंडी पाणी) द्या"
          ],
          inputs: [
            "शेणखत: ८-१० टन/एकरी",
            "आधारभूत खते: एनपीके ५०:२५:२५ किलो/एकर",
            "रोपवाटिकेतील रोपे",
            "लागवडीसाठी मजूर"
          ],
          commonProblems: [
            "रोपे जास्त खोलवर लावणे — यामुळे कांद्याची मान जाड होते आणि कांदा मोठा होत नाही",
            "असमान जमिनीमुळे काही भागात पाणी साचून राहणे"
          ],
          tips: "पुनर्लागवड करताना रोपाचे केवळ मूळ आणि खालचा भाग (१-२ सेमी) मातीत दाबा. जास्त खोल लागवड केल्यास कांदा लहान राहतो."
        },
        {
          title: "फुलकिडे (Thrips) आणि करपा रोग व्यवस्थापन",
          duration: "दिवस ३०–९०",
          color: "terracotta",
          desc: "थ्रिप्स (फुलकिडे) आणि करपा (Purple Blotch) हे कांद्यावरील सर्वात घातक शत्रू आहेत. वेळीच उपाय करा.",
          keyActivities: [
            "फुलकिड्यांच्या देखरेखीसाठी १० निळे चिकट सापळे प्रति एकर पिकाच्या उंचीवर लावा",
            "पानांवर पांढरे चट्टे (थ्रिप्सची लक्षणे) आहेत का याची तपासणी करा",
            "थ्रिप्ससाठी: स्पिनोसॅड @ ०.३ मिली किंवा फिप्रोनिल @ ०.५ मिली प्रति लिटर पाण्यात मिसळून फवारा",
            "करपा रोगासाठी: इप्रोडिओन ५०WP @ २ ग्रॅम/लिटर पाण्यात मिसळून फवारा"
          ],
          inputs: [
            "निळे चिकट सापळे (१०/एकर)",
            "स्पिनोसॅड किंवा फिप्रोनिल कीटकनाशक",
            "इप्रोडिओन किंवा मँकोझेब बुरशीनाशक"
          ],
          commonProblems: [
            "फुलकिड्यांमध्ये औषधांविरुद्ध प्रतिकारशक्ती वाढणे — औषधे आलटून-पालटून फवारा",
            "दमट आणि धुक्याच्या हवामानात करपा रोग वेगाने पसरतो"
          ],
          tips: "कांद्याची पाने गुळगुळीत आणि मेचट असतात, म्हणून फवारणीच्या औषधात 'स्टिकर' (डिंक) आवर्जून वापरा, अन्यथा औषध पानांवर टिकणार नाही."
        },
        {
          title: "काढणी, सुकवणी (Curing) आणि साठवणूक",
          duration: "दिवस ११०–१३०",
          color: "wheat",
          desc: "कांदा काढणीनंतरची सुकवणी (Curing) हीच कांदा टिकवण्याची मुख्य गुरुकिल्ली आहे.",
          keyActivities: [
            "जेव्हा कांद्याची ५०-६०% पात जमिनीवर आपोआप पडेल तेव्हा काढणी करा",
            "काढलेला कांदा ३-५ दिवस शेतातच पातीसह सुकू द्या (Field Curing)",
            "त्यानंतर कांदा १०-१५ दिवस सावलीत चांगल्या हवेशीर ठिकाणी सुकवा",
            "साठवण्यापूर्वी कांद्याची मुळे आणि मानेकडील २ सेमी पात ठेवून बाकीची कापून टाका"
          ],
          inputs: [
            "काढणी आणि सुकवणीसाठी मजूर",
            "हवेशीर जाळीदार पोती (कांदा गोणी)",
            "हवेशीर कांदा चाळ साठवणुकीसाठी"
          ],
          commonProblems: [
            "खूप लवकर काढणी करणे — जास्त ओलावा राहिल्याने कांदा साठवणुकीत सडतो",
            "योग्य सुकवणी न केल्यामुळे कांद्याला बुरशी लागणे आणि कोंब येणे"
          ],
          tips: "योग्य पद्धतीने सुकवलेला कांदा ४-५ महिने चाळीत चांगला टिकतो. कांदा साठवण्यासाठी हवेशीर चाळीचा वापर करा आणि तो जमिनीपासून उंच मंचावर ठेवा."
        }
      ]
    }
  }
};
