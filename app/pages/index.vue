<script setup lang="ts">
import { computed, ref } from "vue";
import AnswerChoice from "~/components/AnswerChoice.vue";
import FeedbackExplanation from "~/components/FeedbackExplanation.vue";
import NextButton from "~/components/NextButton.vue";
import ProgressBar from "~/components/ProgressBar.vue";
import QuestionCard from "~/components/QuestionCard.vue";
import QuizSummary from "~/components/QuizSummary.vue";

type Q = {
    text: string;
    choices: string[];
    answer: number;
    explanation?: string;
    dataset?: string; // neu
};

const deptOptions = [
    "Präsidialdepartement",
    "Bau- und Verkehrsdepartement",
    "Erziehungsdepartement",
    "Finanzdepartement",
    "Gesundheitsdepartement",
    "Justiz- und Sicherheitsdepartement",
    "Departement für Wirtschaft, Soziales und Umwelt",
    "Sonstiges im Kanton (Parlamentsdienste etc.)",
    "Extern",
] as const;
const rheinschwimmenOptions = ["Ja", "Nein"] as const;

const dept = ref<(typeof deptOptions)[number] | null>(null);
const rheinschwimmen = ref<(typeof rheinschwimmenOptions)[number] | null>(null);

const questions = ref<Q[]>([
    {
        text: "An welchem Tag im Jahr 2025 hat die Station Basel-Binningen bisher die höchste Lufttemperatur gemessen?",
        choices: ["1. Januar", "2. Juli", "12. August", "13. August"],
        answer: 3,
        explanation:
            "Mit 36 °C wurde bisher am 13. August die höchste Lufttemperatur im Jahr 2025 gemessen. Das Tagesmittel war aber am 2. Juli mit 28.5 °C höher als am 13. August mit 26.9 °C als Tagesmittel.",
        dataset: "Tägliche Klimadaten der NBCN-Station Basel-Binningen",
    },
    {
        text: "Wie viel Wohnviertel besitzt der Kanton Basel-Stadt?",
        choices: ["4, wieso sonst heisst es Wohnviertel?", "21", "17", "18"],
        answer: 1,
        explanation:
            "Die Wohnviertel sind: Altstadt Grossbasel, Vorstädte, Am Ring, Breite, St. Alban, Gundeldingen, Bruderholz, Bachletten, Gotthelf, Iselin, St. Johann, Altstadt Kleinbasel, Clara, Wettstein, Hirzbrunnen, Rosental, Matthäus, Klybeck, Kleinhüningen, Riehen, Bettingen.",
        dataset: "Statistische Raumeinheiten: Wohnviertel",
    },
    {
        text: "Wann war der Wasserstand im Rhein im Jahr 2025 bisher am höchsten?",
        choices: ["3. August", "28. Januar", "10. März", "20. Mai"],
        answer: 0,
        explanation:
            "Am 3. August 2025 wurde der höchste Wasserstand im Rhein mit 247.379 m gemessen.",
        dataset: "Rhein Wasserstand, Pegel und Abfluss",
    },
    {
        text: "In welchem Jahr war bei der Grossratswahl der Anteil der gewählten Frauen im Vergleich zu allen andern Jahren am höchsten?",
        choices: ["2024", "2020", "2016", "2012"],
        answer: 0,
        explanation:
            "In den letzten Grossratswahlen 2024 wurden 46% der Sitze von Frauen gewonnen, was den höchsten Anteil in der Geschichte der Wahlen darstellt.",
        dataset: "Kandidierende der Grossratswahlen nach Geschlecht seit 1968",
    },
    {
        text: "Der Baumkataster umfasst den durch die Stadtgärtnerei Basel (Gebiet Stadt Basel) und die Gemeinde Riehen (Gebiet Riehen) gepflegten Baumbestand. Was ist laut OGD der aktuelle Baumbestand des Baumkatasters?",
        choices: ["31’905", "22’826", "14’271", "45’107"],
        answer: 0,
        explanation: "Der Baumkataster umfasst aktuell 31’905 Bäume.",
        dataset: "Baumkataster: Baumbestand",
    },
    {
        text: "Was ist der zweithäufigste Hundename im Kanton Basel-Stadt im Jahr 2024?",
        choices: ["Luna", "Rocky", "Nala", "Mia"],
        answer: 2,
        explanation:
            "Die Rangliste für das Jahr 2024 ist : 1) Luna, 2) Nala, 3) Rocky, 4) Kira, 5) Mia",
        dataset: "Hundenamen im Kanton Basel-Stadt seit 2008",
    },
    {
        text: "In welchem dieser Jahre hat die Stadtreinigung laut OGD am meisten Sprayereien an öffentlichen Anlagen entfernt?",
        choices: ["2021", "2022", "2023", "2024"],
        answer: 0,
        explanation:
            "Die Stadtreinigung reinigt jährlich mehr als 1000 Sprayereien an öffentlichen Anlagen und privaten Gebäuden. Im Jahr 2021 wurden 808 Sprayereien an öffentlichen Anlagen entfernt, was den höchsten Wert in den letzten Jahren darstellt.",
        dataset: "Sprayereien",
    },
    {
        text: "Welcher Strassenname kommt in allen drei Gemeinden Basel, Riehen, Bettingen vor?",
        choices: [
            "Ausserbergweg",
            "Es gibt keinen solchen Strassennamen",
            "Grenzacherstrasse",
            "Der krumme Weg",
        ],
        answer: 1,
        explanation:
            "Es gibt mehere Strassennamen, die in zwei der drei Gemeinden vorkommen darunter der Ausserbergweg, die Grenzacherstrasse und der Krumme Weg. Aber es gibt keinen Strassennamen, der in allen drei Gemeinden vorkommt.",
        dataset: "Strassennamen",
    },
    {
        text: "Was ist seit 2017 bis 2024 jährlich stetig gesunken?",
        choices: [
            "Anzahl der Eheschliessungen nach Trauungsdatum",
            "Kantonaler Stromverbrauch in kWh",
            "Durchschnitt der Anteil Sozialhilfeempfänger nach Wohnviertel",
            "Bezahlte Ordnungsbussen",
        ],
        answer: 2,
        explanation: "",
        dataset:
            "Eheschliessungen nach Trauungsdatum; Kantonaler Stromverbrauch; Kennzahlen zu den Basler Wohnvierteln und Landgemeinden; Ordnungsbussen",
    },
    {
        text: "Wie viel Datensätze sind im kantonalen Datenportal des Kantons Basel-Stadt aktuell verfügbar?",
        choices: ["101", "316", "42", "222"],
        answer: 1,
        explanation:
            "316 Datensätze sind im kantonalen Datenportal des Kantons Basel-Stadt aktuell verfügbar. Diese Zahl ändert sich laufend, da neue Datensätze hinzugefügt und bestehende aktualisiert werden.",
        dataset: "OGD Datensätze",
    },
]);

// Steps: 0=Umfrage1, 1=Umfrage2, 2=Quiz, 3=Ende
const step = ref<0 | 1 | 2 | 3>(0);

const idx = ref(0);
const selected = ref<number | null>(null);
const submitted = ref(false);
const score = ref(0);
const finished = computed(() => idx.value >= questions.value.length);
const isCorrect = computed(
    () =>
        submitted.value && selected.value === questions.value[idx.value].answer,
);

// Fortschritt: nur abgesendete Fragen zählen
const progressValue = computed(() =>
    Math.min(idx.value + (submitted.value ? 1 : 0), questions.value.length),
);
const progressMax = computed(() => questions.value.length);

const runId = ref<string>(
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
);

function onSelect(i: number) {
    if (submitted.value) return; // nach Absenden nicht mehr änderbar
    selected.value = i; // vor Absenden frei wähl-/wechselbar
}

function submitCurrent() {
    if (submitted.value || selected.value === null) return;
    submitted.value = true;
    if (selected.value === questions.value[idx.value].answer) score.value++;
}

function nextQuiz() {
    if (!submitted.value) return;
    if (idx.value < questions.value.length - 1) {
        idx.value++;
        selected.value = null;
        submitted.value = false;
    } else {
        idx.value = questions.value.length;
        step.value = 3;
        persistResult();
    }
}

function restart() {
    runId.value = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    step.value = 0;
    idx.value = 0;
    score.value = 0;
    selected.value = null;
    submitted.value = false;
    dept.value = null;
    rheinschwimmen.value = null;
}

function finalMessage(score: number) {
    if (score === 0)
        return "Uff – noch Luft nach oben. Jetzt das kantonale Datenportal Basel-Stadt besser kennenlernen! 💪";
    if (score <= 3)
        return "Solide! Jetzt das kantonale Datenportal Basel-Stadt besser kennenlernen! 📈";
    if (score <= 6) return "Gut gemacht! Schon einiges richtig. 🔎";
    if (score <= 9) return "Sehr stark! Fast perfekt. 🌟";
    return "Perfekt! 10 von 10 – grandios! 🏆";
}

const { public: pub } = useRuntimeConfig();

function persistResult() {
    const payload = {
        id: runId.value,
        dept: dept.value,
        rheinschwimmen: rheinschwimmen.value,
        correct: score.value,
        total: questions.value.length,
        finishedAt: new Date().toISOString()
    };

    // local backup
    try {
        const key = 'odbs-quiz-results';
        const current = JSON.parse(localStorage.getItem(key) || '[]');
        current.push(payload);
        localStorage.setItem(key, JSON.stringify(current));
    } catch (e) { console.error('Persist failed', e); }

    // send to proxy (only if configured)
    if (pub.pushProxyUrl) {
        fetch(pub.pushProxyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((r) => {
                if (!r.ok) throw new Error(`Push failed: ${r.status}`);
                return r.text();
            })
            .then((t) => console.log('Push success:', t))
            .catch((err) => console.error('Push error:', err));
    } else {
        console.warn('pushProxyUrl not configured');
    }
}

</script>

<template>
    <main style="max-width:720px;margin:2rem auto;padding:1.5rem">
        <h1>Open Data Basel-Stadt Quiz</h1>

        <!-- Step 0 -->
        <section v-if="step===0">
            <QuestionCard text="Bei welchem Departement arbeitest du?" />
            <div role="list" style="display:grid;gap:.5rem;margin:1rem 0">
                <AnswerChoice
                    v-for="opt in deptOptions" :key="opt"
                    :text="opt" :selected="dept===opt"
                    @select="dept=opt"
                />
            </div>
            <NextButton :disabled="!dept" @click="step=1">Nächste&nbsp;Frage</NextButton>
        </section>

        <!-- Step 1 -->
        <section v-else-if="step===1">
            <QuestionCard text="Gehst du gerne Rheinschwimmen?" />
            <div role="list" style="display:grid;gap:.5rem;margin:1rem 0">
                <AnswerChoice
                    v-for="opt in rheinschwimmenOptions" :key="opt"
                    :text="opt" :selected="rheinschwimmen===opt"
                    @select="rheinschwimmen=opt"
                />
            </div>
            <NextButton :disabled="!rheinschwimmen" @click="step=2">Zum&nbsp;Quiz</NextButton>
        </section>

        <!-- Step 2 -->
        <section v-else-if="step===2">
            <div style="display:flex;align-items:center;gap:.75rem">
                <span>Frage {{ idx + 1 }} / {{ questions.length }}</span>
                <div style="flex:1"></div>
            </div>
            <div style="margin:.5rem 0 1rem 0">
                <ProgressBar :value="progressValue" :max="progressMax" />
            </div>

            <QuestionCard :text="questions[idx].text" />

            <div role="list" style="display:grid;gap:.5rem;margin:1rem 0">
                <AnswerChoice
                    v-for="(c,i) in questions[idx].choices"
                    :key="i"
                    :text="c"
                    :selected="selected===i"
                    :disabled="submitted"
                    :correct="submitted && i === questions[idx].answer"
                    :wrong="submitted && selected===i && i !== questions[idx].answer"
                    @select="onSelect(i)"
                />
            </div>

            <FeedbackExplanation
                v-if="submitted"
                :correct="isCorrect"
                :explanation="questions[idx].explanation"
                :dataset="questions[idx].dataset"
            />
            <div style="display:flex;gap:.5rem;margin-top:1rem">
                <NextButton :disabled="selected===null || submitted" @click="submitCurrent">
                    Absenden
                </NextButton>
                <NextButton :disabled="!submitted" @click="nextQuiz">
                    Nächste&nbsp;Frage
                </NextButton>
            </div>
        </section>

        <!-- Step 3 -->
        <!-- Step 3 -->
        <section v-else>
            <QuizSummary :score="score" :total="questions.length" />
            <p style="margin:.5rem 0 1rem 0">{{ finalMessage(score) }}</p>
            <p style="opacity:.8; margin:.25rem 0 1rem 0">
                Departement: {{ dept }} · Rheinschwimmen: {{ rheinschwimmen }}
            </p>

            <NextButton @click="restart">Nochmal starten</NextButton>

            <!-- QR code section -->
            <div style="margin-top:2rem; text-align:center">
                <!-- Stats QR codes -->
                <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:2rem; margin-top:1rem">
                    <div style="text-align:center">
                        <p style="margin-bottom:.5rem">📊 Ergebnisse und Statistiken</p>
                        <img src="/statistik.png"
                             alt="QR Code für Ergebnisse und Statistiken"
                             style="display:block;width:150px;height:auto;margin:0 auto" />
                    </div>
                    <div style="text-align:center">
                        <p style="margin-bottom:.5rem">📢 Folge uns auf Social Media</p>
                        <img src="/social_media.png"
                             alt="Social Media"
                             style="display:block;width:150px;height:auto;margin:0 auto" />
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
