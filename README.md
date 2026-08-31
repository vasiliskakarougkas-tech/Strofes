# ΣΤΡΟΦΕΣ — Blog Αυτοκινήτων

Αυτό είναι το project του blog, χτισμένο με **Next.js**.

## Πώς να το ανεβάσεις στο GitHub

1. Φτιάξε ένα νέο repository στο GitHub (π.χ. ονόμασέ το `strofes`). Άφησέ το **κενό** (χωρίς README, χωρίς .gitignore — τα έχουμε ήδη).
2. Άνοιξε τερματικό μέσα σε αυτόν τον φάκελο και τρέξε:

```bash
git init
git add .
git commit -m "Πρώτη έκδοση του site"
git branch -M main
git remote add origin https://github.com/ΤΟ-USERNAME-ΣΟΥ/strofes.git
git push -u origin main
```

(Αντικατέστησε το link με αυτό που σου δίνει το GitHub όταν φτιάχνεις το repository.)

## Πώς να το κάνεις live με Vercel

1. Πήγαινε στο [vercel.com](https://vercel.com) και συνδέσου με τον λογαριασμό GitHub σου.
2. Πάτα **"Add New Project"**, επίλεξε το repository `strofes`.
3. Το Vercel αναγνωρίζει αυτόματα ότι είναι Next.js — απλά πάτα **Deploy**.
4. Σε ~1 λεπτό θα έχεις ένα live link (κάτι σαν `strofes.vercel.app`).

## Πώς να συνδέσεις το δικό σου domain (π.χ. strofes.gr)

1. Μέσα στο Vercel project, πήγαινε **Settings → Domains**.
2. Γράψε το domain σου (π.χ. `strofes.gr`) και πάτα Add.
3. Το Vercel θα σου δείξει είτε nameservers είτε DNS records.
4. Πήγαινε στο papaki.gr, στις ρυθμίσεις DNS του domain, και βάλε αυτά που σου έδωσε το Vercel.
5. Περίμενε λίγες ώρες μέχρι να ενημερωθεί το DNS.

## Πώς να το τρέξεις τοπικά (προαιρετικό, για να βλέπεις αλλαγές πριν τις ανεβάσεις)

```bash
npm install
npm run dev
```

Μετά άνοιξε το [http://localhost:3000](http://localhost:3000) στον browser.

## Πάνελ διαχείρισης περιεχομένου (σαν WordPress)

Το site είναι συνδεδεμένο με το **Sanity** (δωρεάν CMS). Το πάνελ διαχείρισης βρίσκεται στο:

**https://strofes.gr/studio**

Εκεί μπορείς να προσθέτεις/επεξεργάζεσαι:
- **Τεστ / Δοκιμή** (εμφανίζονται στην ενότητα "Τελευταία Τεστ")
- **Νέο** (εμφανίζονται στην ενότητα "Νέα")
- **Οδηγός Αγοράς** (εμφανίζονται στην ενότητα "Οδηγοί Αγοράς")

Μόλις προσθέσεις/αλλάξεις κάτι στο Studio, το site ενημερώνεται μόνο του μέσα σε ~30 δευτερόλεπτα — **δεν χρειάζεται git push, δεν χρειάζεται κώδικας**.

### Σημαντικό: πρώτη ρύθμιση CORS

Πριν συνδεθείς στο `/studio` για πρώτη φορά μέσα από το live site, χρειάζεται να επιτρέψεις στο domain σου να μιλάει με το Sanity:

1. Πήγαινε στο [sanity.io/manage](https://www.sanity.io/manage), μπες στο project "strofes"
2. Πήγαινε **API → CORS Origins → Add CORS origin**
3. Πρόσθεσε: `https://strofes.gr` (με "Allow credentials" ενεργό)
4. Πρόσθεσε επίσης: `https://www.strofes.gr` (με "Allow credentials" ενεργό)

## Δομή του project

```
app/
  layout.js      → βασικό skeleton της σελίδας (fonts, metadata)
  page.js        → η αρχική σελίδα (Hero, Τεστ, Νέα, Οδηγοί)
  globals.css    → όλο το styling
```

Για να προσθέσεις νέο περιεχόμενο (π.χ. νέο review card), αντίγραψε ένα υπάρχον `<ReviewCard .../>` μέσα στο `page.js` και άλλαξε τα στοιχεία του.
