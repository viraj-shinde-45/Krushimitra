# KrishiMitra AI — Detailed System Workflows

This document outlines the detailed user journeys, system architectures, and sequences for the core features of KrishiMitra.

---

## 1. User Journey & Feature Navigation Flow

This flowchart shows how a farmer interacts with the KrishiMitra application, from landing on the homepage to navigating different dashboard modules.

```mermaid
graph TD
    A[Visitor arrives at Landing Page /] -->|Click Get Started or Sign In| B{Authenticated?}
    B -->|No| C[Auth Page /auth]
    C -->|Bypass Auth or Login with Supabase| D[Dashboard /dashboard]
    B -->|Yes| D
    
    D -->|Sidebar Menu| E[Advisory Modules]
    D -->|Sidebar Menu| F[Utility Modules]
    D -->|Sidebar Menu| G[Interactive Modules]
    
    E --> E1[Crop Advisor /crop-recommendation]
    E --> E2[Disease Pathologist /disease-detection]
    E --> E3[Govt. Schemes Hub /schemes]
    
    F --> F1[Weather Alerts /weather]
    F --> F2[Mandi Price Market /market]
    F --> F3[Planting growth Guide /planting-guide]
    F --> F4[Crop Lifecycle /lifecycle]
    
    G --> G1[AI Chat /chat]
    G --> G2[Interactive Calendar /calendar]
    G --> G3[Profit Calculator /profit]
    G --> G4[Community Feed /community]
```

---

## 2. Technical Sequence: AI Plant Disease Pathologist

This sequence diagram illustrates the lifecycle of a plant disease analysis request, starting from leaf camera capture to generating localized remedies.

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer / Client
    participant App as React UI (/disease-detection)
    participant Server as TanStack Server Function
    participant Gemini as Gemini 2.5 API
    
    Farmer->>App: Take picture or upload leaf image
    App->>App: Validate file type & convert to Base64 data url
    Farmer->>App: Select language toggle (e.g., Hindi)
    App->>Server: invoke detectCropDisease(imageBase64, mimeType, lang: "hi")
    Note over Server: Server Function extracts API Key safely from process.env
    Server->>Server: Inject System Prompt instructing response in Hindi
    Server->>Gemini: POST generateContent API (Vision prompt + Base64 image payload)
    Gemini-->>Server: Return raw JSON string listing disease, confidence, symptoms, and remedies
    Server->>Server: Parse raw JSON to safe typed object
    Server-->>App: Return structured disease report JSON
    App->>App: Cache output in state & trigger entry micro-animations
    App-->>Farmer: Render patholog report in Hindi (Zero English leakage)
```

---

## 3. Server-Client Boundary: Crop Recommendation Workflow

This workflow represents the data transfer and mapping that happens during soil-to-crop recommendation advisory.

1.  **Form Input**: Farmer selects soil type (e.g. `Black / Regur`), season (e.g. `Rabi`), previous crop (e.g. `Wheat`), and water availability.
2.  **API Translation Mapping**:
    *   Dropdown displays translated keys (e.g., `काली मिट्टी` in Hindi).
    *   Form handles keep track of standard English keys (`black`) for backend queries.
3.  **Server Call Execution**:
    *   Form triggers `getCropRecommendation` passing normalized parameters and client language.
    *   Server function maps parameters to precise agronomic terms for Gemini's optimal reasoning.
4.  **AI Formulation**:
    *   Gemini processes parameters and compiles 3 suitable crops.
    *   Replies containing crop names, suitability scores, and localized tips.
5.  **Re-Hydration & Render**:
    *   Results display on customized stat cards showing yield potentials, local mandi prices, and government MSP matches.

---

## 4. State Management: AI Chat Assistant & Storage Fallbacks

This workflow outlines the redirection sequence and fallback mechanics when loading the AI chatbot.

```mermaid
flowchart TD
    A[Navigate to /chat] --> B{Check URL Path}
    B -->|Matches /chat or /chat/| C[Read local storage database]
    B -->|Matches /chat/:threadId| G[Load ChatThreadView component]
    
    C -->|Storage Access Successful| D{Any existing conversations?}
    C -->|Storage Access Blocked by Security| E[Read memoryThreads in-memory cache]
    
    D -->|Yes| F[Redirect to /chat/$threadId of most recent chat]
    D -->|No| H[Generate unique uuid, create thread & Redirect]
    
    E --> F
    
    G --> I[Render Chat sidebar + conversation view]
    I -->|User sends text| J[Add message to state & call askKrishiMitraGemini]
    J -->|Success| K[Append AI response & update storage / memory cache]
    J -->|Network Error / Limits| L[Render localized error banner & restore typing focus]
```

---

## 5. Live translation & Synchronization Workflow

How selecting a language from the navbar translates static configurations and dynamic assets instantly:

*   **Language Selection**: Farmer clicks the Globe icon in the navigation bar and selects a language (e.g., `मराठी` / Marathi).
*   **Active i18n change**: `i18n.changeLanguage("mr")` is triggered.
*   **CSS and Document Reflow**: Local storage updates `"km_lang"` key so the language settings survive page refreshes.
*   **Static Data Mapping**: All local dataset imports (government schemes in `schemes-data.ts`, calendars in `calendar.tsx`) check the new language index and swap strings in-place.
*   **Dynamic UI Adjustments**: Elements (like labels inside the Recharts cost breakdowns) recalculate dynamically to show currency metrics and translated categories.
