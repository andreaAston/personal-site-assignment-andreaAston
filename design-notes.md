# Design Notes & System Specifications

**Project:** Professional Web Portfolio  
**Author:** Andrea Aston (BECE/21/SS/002, Year 5 Electronics and Computer Engineering, MUBAS)  
**Module:** ELE-IWS-521 — Internet & Web Services  
 

---

## 1. Target Audience & User Personas

### Primary Persona: Engineering Hiring Manager / Technical Recruiter
* **Industry:** IoT, Embedded Systems, Automation, Firmware & Software Engineering.
* **Goals:** Quickly evaluate technical competence, practical project experience (hardware-software integration), code quality, and problem-solving methodologies.
* **Pain Points:** Needs to find key information within 30 seconds; frustrated by visual fluff without technical depth or proof of hands-on capability.
* **Key Content Requirements:** Clear problem statements for engineering projects, tools used, downloadable CV, dynamic GitHub evidence, and clear contact options.

### Secondary Persona: Lecturer
* **Role:** Web Services Assessor.
* **Goals:** Audit compliance against assignment criteria (Semantic HTML, vanilla JS, custom CSS properties, responsive breakpoints, accessible design tokens, WCAG AA compliance, and performance metrics).
* **Key Content Requirements:** Clean code structure, documented design decisions, visible focus states, proper form validation, and valid dark/light theme switching.

---

## 2. Sitemap & Information Architecture


                                [ Home (index.html) ]
                                          │
        ┌───────────────────┬─────────────┴─────────────┬───────────────────┐
        ▼                   ▼                           ▼                   ▼
 [ About Page ]     [ Projects Page ]           [ Technical Article ]   [ Contact Page ]
  (about.html)       (projects.html)                (article.html)       (contact.html)
        │                   │                           │                   │
        ├─ Bio & Philosophy ├─ Smart Security           ├─ Technical Essay  ├─ Validation
        ├─ Skills Matrix    ├─ ServerRoom               │  (500+ words)     ├─ JS Form Hook
        └─ CV Download PDF  ├─ Anemometer IoT Dashboard └─ Live GitHub Feed └─ Social Links
                            └─ Additional Projects

                                [ Custom 404 Page ]
                                    (404.html)



## Page Content Plan
1. **Home:** High-impact technical hero banner, primary skills badge overview, direct link, featured project showcase.
2. **About:** Narrative on hardware-software integration, academic focus in Electronics & Computer Engineering, engineering philosophy Skills in details.
3.  **Contact:** A contact form that will be receing sent messages via JSform
4. **Projects:** 
   * *Smart security system
   * *Smart Serverroom monitoring system
   * *Anemometer Dashboard & IoT Node* (ESP32 telemetry display)
5. **Article:** Technical breakdown (e.g., *Implementing Interrupt Service Routines vs. Polling in Embedded Systems* or *Designing Dual-Redundancy IoT Data Pipelines with Supabase*).