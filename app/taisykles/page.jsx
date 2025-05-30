export const metadata = {
  title: "Taisyklės | Mano Mokykla",
  description:
    "Naudotojo atsakomybė, turinio tvarkymas, duomenų naudojimas ir kiti svarbūs aspektai platformos veikimui.",
  openGraph: {
    title: "Taisyklės | Mano Mokykla",
    description:
      "Naudotojo atsakomybė, turinio tvarkymas, duomenų naudojimas ir kiti svarbūs aspektai platformos veikimui.",
    url: "https://manomokykla.lt/taisyklės",
    type: "article",
    images: [
      {
        url: "/images/openGraph.png", 
        width: 1200,
        height: 630,
        alt: "Taisyklės – Mano Mokykla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taisyklės | Mano Mokykla",
    description:
      "Naudotojo atsakomybė, turinio tvarkymas, duomenų naudojimas ir kiti svarbūs aspektai platformos veikimui.",
    images: ["/images/openGraph.png"],
  },
};


export default function GuidelinesPage() {

  return (
    <div className="container max-w-4xl py-10 px-4 md:py-16 m-auto">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold font-title md:text-4xl">Taisyklės</h1>
          <p className="text-gray-500">Prašome peržiūrėti ir laikytis šių taisyklių naudojantis mūsų platforma</p>
        </div>

        <div className="rounded-lg border border-primary/20 overflow-hidden">
          <div className="bg-primary/5 p-6 pb-4">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              Mūsų misija
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Mūsų tikslas – sukurti naudingą, pagarbią bendruomenę, kurioje studentai galėtų dalintis sąžiningais
              atsiliepimais apie savo mokymosi patirtį.
            </p>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500">
              Šios gairės padeda užtikrinti, kad mūsų platforma išliktų vertingu šaltiniu švietimo bendruomenei, kartu
              apsaugant mokytojų ir institucijų privatumą bei orumą.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-gray-200 my-8" />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold font-title tracking-tight">Bendrosios elgesio taisyklės</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="p-4 pb-2">
                <div className="text-lg flex items-center gap-2 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Priimtinas elgesys
                </div>
              </div>
              <div className="p-4 pt-2">
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Teikti sąžiningus, konstruktyvius atsiliepimus</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Sutelkti dėmesį į mokymo metodus ir klasės patirtį</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Naudoti pagarbią kalbą</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Vertinti tik remiantis asmenine patirtimi</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="p-4 pb-2">
                <div className="text-lg flex items-center gap-2 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Nepriimtinas elgesys
                </div>
              </div>
              <div className="p-4 pt-2">
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Asmeniniai išpuoliai ar menkinantys komentarai</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Bet kokia diskriminacinė kalba</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Klaidinga informacija ar perdėti teiginiai</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Komentarai apie išvaizdą ar asmeninį gyvenimą</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-semibold font-title tracking-tight">Vertinimo gairės</h2>

          <div className="w-full border rounded-lg divide-y">
            <div className="border-b">
              <button
                className="flex justify-between w-full p-4 text-left font-medium"
              >
                Vertinimo kriterijai
                
              </button>
                <div className="p-4 pt-0">
                  <ul className="space-y-2 pl-6 text-sm list-disc">
                    <li>Vertinti pagal mokymo efektyvumą</li>
                    <li>Atsižvelgti į klasės valdymą, dalyko išmanymą ir mokymo stilių</li>
                    <li>Sutelkti dėmesį į tai, kaip gerai mokytojas padeda mokiniams mokytis</li>
                    <li>Atsižvelgti į vertinimo teisingumą ir pagalbos prieinamumą</li>
                  </ul>
                </div>
            </div>

            <div className="border-b">
              <button
                className="flex justify-between w-full p-4 text-left font-medium"
              >
                Atsiliepimų rašymas
                
              </button>
                <div className="p-4 pt-0">
                  <ul className="space-y-2 pl-6 text-sm list-disc">
                    <li>Parašykite išsamų komentarą</li>
                    <li>Subalansuokite kritiką su teigiamais pastebėjimais</li>
                    <li>Komentarai turi būti susiję su mokymo procesu</li>
                    <li>Venkite perdėjimų ir emocingos kalbos</li>
                  </ul>
                </div>
            </div>

            <div>
              <button
                className="flex justify-between w-full p-4 text-left font-medium"
              >
                Mokyklų ir mokytojų pridėjimas
                
              </button>
                <div className="p-4 pt-0">
                  <ul className="space-y-2 pl-6 text-sm list-disc">
                    <li>Pridėkite tik realias, patikrinamas švietimo įstaigas</li>
                    <li>Pateikite tikslią informaciją apie mokyklą/mokytoją</li>
                    <li>Nekurkite pasikartojančių įrašų</li>
                    <li>Pridėkite tik mokytojus, kurie šiuo metu moko arba neseniai mokė</li>
                  </ul>
                </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-semibold font-title tracking-tight">Turinio moderavimas</h2>

          <div className="rounded-lg border p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Peržiūros procesas</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Atsiliepimai nėra moderuojami. Turinys, pažeidžiantis mūsų gaires, patvirtintas nebus.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Klaidinga informacija</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Jei matote klaidingą turinį, praneškite apie jį naudodami mygtuką „Pranešti".
                </p>
              </div>

            </div>
          </div>
        </section>
        <p className="text-center text-sm text-gray-500 pt-4">
          Paskutinį kartą atnaujinta: 2025 m. gegužės 10 d.
        </p>
      </div>
    </div>
  )
}

