import "./HowItWorks.css";

const STEPS = [
  {
    title: "We check your weather",
    description:
      "Share your location, or we'll use a default one, and WTWR pulls the live conditions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "We sort it: hot, warm or cold",
    description:
      "Above 86°F is hot, 66–86°F is warm, and anything cooler is cold.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M12 9v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "You get outfits that fit",
    description:
      "Add your own clothes and see only the ones that suit today's weather.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 4 3.5 7.5 6 11l2-1.2V20h8V9.8l2 1.2 2.5-3.5L15 4a3 3 0 0 1-6 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function HowItWorks() {
  return (
    <section className="how" aria-label="How WTWR works">
      <ol className="how__steps">
        {STEPS.map((step, index) => (
          <li className="how__step" key={step.title}>
            <div className="how__icon">{step.icon}</div>
            <p className="how__number">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="how__title">{step.title}</h2>
            <p className="how__description">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default HowItWorks;
