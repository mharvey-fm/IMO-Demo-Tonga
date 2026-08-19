# Tonga National Technology Demonstration & Training Workshop — Participant Portal

A simple, client-side **participant portal** for the **Tonga National Technology
Demonstration Pilot**, delivered within the **MTCC Pacific capacity-building training
course** under the **IMO–Norad TEST Biofouling Project** (procurement IMO-2026-RFP-017).

- **When:** 18–21 August 2026 (live demonstration day within the course — confirmed by MTCC Pacific)
- **Where:** Faua Wharf, Nukuʻalofa, Tongatapu, Kingdom of Tonga
- **Delivered by:** Franmarine Underwater Services (technology provider), IMO TEST Biofouling
  Project Coordination Unit (PCU), MTCC Pacific (SPC · SPREP), and the Marine and Ports
  Division (Ministry of Infrastructure)

No login, no install — just open `index.html`.

## What's inside

| Tool | Path | Description |
|------|------|-------------|
| **Participant portal** | `index.html` | Branded landing page linking the workshop tools |
| **Course materials** | `course/index.html` | In-water cleaning and inspection packs, PDF viewer, and Activity 1 quiz |
| **Hull Fouling Cost Calculator** | `calculator/index.html` | Estimates fuel, cost and emissions penalty from hull fouling |
| **Fouling Scale Converter** | `converter/index.html` | Converts NSTM FR, Floerl LoF and IMO MEPC.378(80) ratings from growth type and cover |
| **Demo Hull Inspection Report** | `report/index.html` | MarineStream report from the Faua Wharf ROV demonstration |
| **BFMP Generator** | `bfmp/index.html` | Vessel-specific Biofouling Management Plan wizard |

## Course context

The demonstration sits inside the MTCC Pacific capacity-building training course on
biofouling risk assessment, inspection methodologies and in-water cleaning
(18–21 August 2026). Audience: Tongan policymakers, regulators and port authorities.

## Why this technology fits Tonga

Portable, self-contained and vessel-independent — no dry dock, slipway, crane or fixed
shore facility. The Pivot covers niche areas and non-ferrous hulls; the DT640 covers
systematic steel-hull surveys. Fouling Ratings in MarineStream support monitoring over
time and evidence-based national biofouling management.

## Demonstration technology

- **Deep Trekker Pivot** — flying ROV for niche areas (sea chests, gratings, thrusters, rudder, propeller, intakes, anodes, waterline); also inspects aluminium, fibreglass and composite hulls
- **Deep Trekker DT640** — magnetic-tracked hull crawler for systematic lane coverage of ferrous hull plating
- **MarineStream** — live annotation of Fouling Ratings and IMO 2023-aligned report generation
- **Starlink** — primary on-site connectivity for live video projection to participants

## Hosting

Pure static HTML/CSS/JS. Deploy with **GitHub Pages** (Settings → Pages → deploy from
`main`, root) or any static host. A `.nojekyll` file is included so all assets are served
as-is.

Custom domain (optional): `tongabiofoulingdemo.andagainapps.com` via `CNAME`.

## Inspection report

The Inspection Report tab (`report/index.html`) embeds the MarineStream biofouling hull
inspection report from the live Faua Wharf demonstration
(`assets/IMO Tonga Demo - Biofouling Hull Inspection Report_compressed.pdf`).

## Reporting invasive marine species in Tonga

Report suspected invasive marine species to the **Department of Environment (MEIDECC)**
and **Biosecurity** authorities, and notify the **Marine and Ports Division**
(Ministry of Infrastructure) / **Ports Authority Tonga** as appropriate for vessel-related
sightings.

## Credits

- Live demonstration technology by **Franmarine Underwater Services**.
- Cost calculator tools by **MarineStream**.
- Partner organisation names/logos are used to identify the project partnership only.
- Regional implementing partner: MTCC Pacific (SPC · SPREP).
