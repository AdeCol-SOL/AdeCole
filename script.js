const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

window.dataLayer = window.dataLayer || [];

/* =========================
   ASSESSMENT TRACKING
   ========================= */
function trackEvent (eventName, eventParameters = {}) {

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: eventName,
        ...eventParameters
    });

} 

console.log("NEW TRACK EVENT VERSION LOADED");

/* =========================
   DIGITAL MATURITY ASSESSMENT
   VERSION 2 - QUESTION FLOW
   ========================= */   

const assessmentQuestion =
    document.getElementById("assessment-question");

const assessmentOptions =
    document.querySelectorAll(".assessment-option");

const assessmentResult =
    document.getElementById("assessment-result");

const questionNumber =
    document.getElementById("question-number");

const nextQuestion =
    document.getElementById("next-question");

let currentQuestion = 1;

let assessmentScores = {
    customerUnderstanding: 0,
    value: 0,
    measurement: 0,
    acquisition: 0,
    optimization: 0
};


  

/* =========================
   QUESTIONS
   ========================= */
const questions = [
    {
        dimension: "customerUnderstanding",

        question:
            "How clearly can you identify the customer segment that generates the greatest business value?",

        options: [
            "We haven't identified it.",
            "We have assumptions based on experience.",
            "We have evidence identifying important segments.",
            "We continuously validate segment value using customer and performance data."
        ]
    },

    {
        dimension: "value",

        question:
            "Can you distinguish customers who generate high revenue from customers who generate high business value?",

        options: [
            "No. We mainly look at revenue.",
            "We consider some factors beyond revenue.",
            "We use several indicators such as retention, frequency or margin.",
            "We actively evaluate customer value using factors such as lifetime value, retention, margin and acquisition cost."
        ]
    },

    {
        dimension: "measurement",

        question:
            "When someone becomes a customer, can you reliably identify which marketing activity influenced that outcome?",

        options: [
            "Not at all.",
            "We have some tracking, but it's incomplete.",
            "Yes, for most important actions.",
            "Yes, and we actively use the data to optimize."
        ]
    },

    {
        dimension: "acquisition",

        question:
            "Can you determine which acquisition channels produce your highest-value customers—not simply the most leads or traffic?",

        options: [
            "No. We mainly optimize for traffic, clicks or lead volume.",
            "We look at channel performance, but mainly at volume and cost.",
            "We compare channels using conversion and customer-quality data.",
            "We actively optimize acquisition based on customer value, profitability and long-term performance."
        ]
    },

    {
        dimension: "optimization",

        question:
            "When performance changes, can your team identify what changed, why it changed and what action should be taken?",

        options: [
            "We usually react to performance changes without knowing the underlying cause.",
            "We investigate some changes, but the process is inconsistent.",
            "We regularly use performance data to diagnose changes and decide what to do next.",
            "We have a systematic optimization process that connects evidence, diagnosis, action and measured outcomes."
        ]
    }
];

/* =========================
   DISPLAY QUESTION
   ========================= */

function displayQuestion(questionIndex) {

    const question = questions[questionIndex];

    currentQuestion = questionIndex + 1;

    questionNumber.textContent = currentQuestion;

    assessmentQuestion.textContent = question.question;

    assessmentOptions.forEach((option, index) => {

        option.textContent = question.options[index];

        option.dataset.score = index + 1;

        option.style.borderColor = "#cbd5e1";
        option.style.background = "#ffffff";

    });

    assessmentResult.classList.remove("visible");

    nextQuestion.disabled = true;

}


/* =========================
   SELECT ANSWER
   ========================= */

assessmentOptions.forEach((option) => {

    option.addEventListener("click", () => {

        const score = Number(option.dataset.score);

        const question =
            questions[currentQuestion - 1];

        assessmentScores[question.dimension] = score;

        assessmentOptions.forEach((item) => {

            item.style.borderColor = "#cbd5e1";
            item.style.background = "#ffffff";

        });

        option.style.borderColor = "#2563eb";
        option.style.background = "#eff6ff";

        nextQuestion.disabled = false;

        assessmentResult.innerHTML = `
            <p>
                Score recorded: <strong>${score}/4</strong>
            </p>
        `;

        assessmentResult.classList.add("visible");

        console.log(
            question.dimension,
            score
        );

    });

});
/* =========================
   DIAGNOSTIC ENGINE
   ========================= */

function generateDiagnostic() {

    const scores = assessmentScores;

    const dimensions = {
        customerUnderstanding: "Customer Understanding",
        value: "Value",
        measurement: "Measurement",
        acquisition: "Acquisition",
        optimization: "Optimization"
    };

    const scoreValues = Object.values(scores);

    const totalScore = scoreValues.reduce(
        (total, score) => total + score,
        0
    );

    const averageScore = totalScore / scoreValues.length;

    let maturity;

    if (averageScore < 1.75) {

        maturity = "Foundation";

    } else if (averageScore < 2.5) {

        maturity = "Emerging";

    } else if (averageScore < 3.25) {

        maturity = "Measured";

    } else {

        maturity = "Optimized";
    }


    /* Find strongest capability */

    const strongestDimension =
        Object.keys(scores).reduce((strongest, dimension) => {

            return scores[dimension] > scores[strongest]
                ? dimension
                : strongest;

        });


    /* Find priority gap */

    const priorityDimension =
        Object.keys(scores).reduce((lowest, dimension) => {

            return scores[dimension] < scores[lowest]
                ? dimension
                : lowest;

        });


const recommendations = {

    customerUnderstanding:
        "Identify and validate the customer segments that create the greatest business value. Use customer behaviour, needs and outcomes to determine where acquisition effort should be focused.",

    value:
        "Define customer value using measurable business outcomes such as margin, retention, purchase frequency, lifetime value and acquisition cost. Use this definition to guide marketing decisions.",

    measurement:
        "Build a measurement framework that connects customer actions to marketing activity and business outcomes. Prioritize reliable conversion tracking before increasing optimization complexity.",

    acquisition:
        "Evaluate acquisition by the quality and value of customers generated, not simply traffic, clicks or lead volume. Identify the channels, campaigns and audiences producing the strongest business outcomes.",

    optimization:
        "Establish a repeatable optimization process that connects evidence, diagnosis, action and measured outcomes. Turn performance data into structured decisions and continuous improvement."

};

const actionPlans = {

    customerUnderstanding: [
        "Identify your highest-value customer segments.",
        "Validate their needs, behaviours and purchase patterns.",
        "Use these insights to prioritize acquisition opportunities."
    ],

    value: [
        "Define the business metric that represents customer value.",
        "Connect customer value to segments, behaviours and outcomes.",
        "Use customer value when evaluating acquisition decisions."
    ],

    measurement: [
        "Identify the customer actions that matter most to the business.",
        "Audit whether those actions are being measured reliably.",
        "Connect marketing activity to measurable business outcomes."
    ],

    acquisition: [
        "Identify the channels and campaigns generating customers.",
        "Compare customer quality rather than only lead or traffic volume.",
        "Shift investment toward acquisition sources producing stronger outcomes."
    ],

    optimization: [
        "Identify the performance signals that should drive decisions.",
        "Create a repeatable test-and-learn process.",
        "Use measured outcomes to continuously refine performance."
    ]

};
const dependencyInsights = {

    customerUnderstanding:
        "Customer understanding is foundational. Validate who your highest-value customers are before scaling acquisition.",

    value:
        "Customer value is a critical bridge between strategy and marketing. Define value before judging acquisition performance.",

    measurement:
        "Measurement is a dependency for reliable optimization. If outcomes cannot be observed consistently, optimization decisions may be misleading.",

    acquisition:
        "Acquisition should be evaluated against customer quality and business value, not only traffic, clicks or lead volume.",

    optimization:
        "Optimization is where evidence becomes action. A mature process should connect diagnosis, intervention and measured outcomes."

};


const ctaLabels = {

    customerUnderstanding:
        "Validate Your Customer Segments →",

    value:
        "Define Your Customer Value →",

    measurement:
        "Strengthen Your Measurement →",

    acquisition:
        "Improve Your Acquisition Strategy →",

    optimization:
        "Build Your Optimization Framework →"

};


const dependencyInsight =
    dependencyInsights[priorityDimension];

const actionDescriptions = {

    Foundation:
        "Establish the core capability before increasing investment or complexity.",

    Build:
        "Strengthen the capability and create a more consistent operating process.",

    Advance:
        "Improve consistency, connect capabilities and use evidence to drive better decisions.",

    Scale:
        "Use the mature capability to accelerate growth and continuously improve performance."

};
let actionLevel;

if (scores[priorityDimension] === 1) {

    actionLevel = "Foundation";

} else if (scores[priorityDimension] === 2) {

    actionLevel = "Build";

} else if (scores[priorityDimension] === 3) {

    actionLevel = "Advance";

} else {

    actionLevel = "Scale";

}
const actionDescription =
    actionDescriptions[actionLevel];

const ctaLabel =
    ctaLabels[priorityDimension];

const actionPlan =
    actionPlans[priorityDimension];

const result = {

    totalScore,

    averageScore,

    maturity,

    strongestCapability:
        dimensions[strongestDimension],

    strongestScore:
        scores[strongestDimension],

    priorityGap:
        dimensions[priorityDimension],

    priorityScore:
        scores[priorityDimension],

    recommendation:
        recommendations[priorityDimension],

    dependencyInsight:
        dependencyInsight,

    actionLevel:
        actionLevel,
        
    actionDescription:
        actionDescription,

    actionPlan:
        actionPlan,

    ctaLabel:
        ctaLabel

};


return result;

}

/* =========================
   NEXT QUESTION
   ========================= */

nextQuestion.addEventListener("click", () => {

    if (currentQuestion < questions.length) {

        displayQuestion(currentQuestion);

    
} else {

    const diagnostic = generateDiagnostic();
trackEvent(
    "assessment_completed",
    {
        maturity: diagnostic.maturity,
        total_score: diagnostic.totalScore,
        priority_gap: diagnostic.priorityGap,
        action_level: diagnostic.actionLevel
    }
);
    assessmentResult.innerHTML = `

    <div class="diagnostic-score">

    <span class="diagnostic-label">
        DIGITAL MATURITY
    </span>

    <strong class="diagnostic-maturity">
        ${diagnostic.maturity}
    </strong>

    <div class="diagnostic-score-number">
        ${diagnostic.totalScore}<span>/20</span>
    </div>

    <p>
        Overall maturity score
    </p>

</div>

    <div class="diagnostic-card">

    <span class="diagnostic-label">
        STRONGEST CAPABILITY
    </span>

    <strong>
        ${diagnostic.strongestCapability}
    </strong>

    <span class="diagnostic-value">
        ${diagnostic.strongestScore}/4
    </span>

</div>
    <div class="diagnostic-card diagnostic-priority">

    <span class="diagnostic-label">
        PRIORITY GAP
    </span>

    <strong>
        ${diagnostic.priorityGap}
    </strong>

    <span class="diagnostic-value">
        ${diagnostic.priorityScore}/4
    </span>

</div>
    <p>
        Your next opportunity is to strengthen your
        ${diagnostic.priorityGap.toLowerCase()}
        capability before increasing investment in areas
        that depend on it.
    </p>


    <div class="diagnostic-recommendation">

        <strong>
            Recommended next step
        </strong>

        <p>
            ${diagnostic.recommendation}
        </p>

    </div>


    <div class="diagnostic-insight">
<div class="diagnostic-plan">

    <span class="diagnostic-label">
        YOUR FIRST 3 MOVES
    </span>

    <ol>

        <li>
            ${diagnostic.actionPlan[0]}
        </li>

        <li>
            ${diagnostic.actionPlan[1]}
        </li>

        <li>
            ${diagnostic.actionPlan[2]}
        </li>

    </ol>

</div>
        <strong>
            Why this matters
        </strong>

        <p>
            ${diagnostic.dependencyInsight}
        </p>

    </div>
    
    
<div class="diagnostic-action">

    <span class="diagnostic-label">
        RECOMMENDED ACTION LEVEL
    </span>

    <strong>
        ${diagnostic.actionLevel}
    </strong>

    <p>
        ${diagnostic.actionDescription}
    </p>

</div>

    <div class="diagnostic-cta">

        <h3>
            Ready to identify your next growth opportunity?
        </h3>

        <p>
            AdeCole can help you turn this assessment into a
            practical digital growth roadmap.
        </p>
        
        <a href="#contact" class="primary-button">
        ${diagnostic.ctaLabel}
        
        </a>
        
        <button
        type="button"
        class="secondary-button"
        id="saveDiagnostic"
        >
        Save My Diagnostic
        </button>

    </div>

`;
const saveDiagnostic =
    document.getElementById("saveDiagnostic");

if (saveDiagnostic) {

    saveDiagnostic.addEventListener(
        "click",
        () => {

            window.print();

        }
    );

}
    assessmentResult.classList.add("visible");

    nextQuestion.style.display = "none";
}

});