import { useState } from "react";
import { defaultClothingItems } from "../../utils/constants";
import "./SampleOutfit.css";

const TYPES = ["hot", "warm", "cold"];

// Most sample photos are hosted by TripleTen's storage, so one can disappear
// at any time. Show a tidy placeholder instead of a broken-image icon.
function SampleCard({ item }) {
  const [failed, setFailed] = useState(false);

  return (
    <li className="sample__card">
      {failed ? (
        <div className="sample__fallback" role="img" aria-label={item.name}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 7.5a2.2 2.2 0 1 1 2.2 2.2c-1.2.4-2.2 1.2-2.2 2.5v.8l-8 5.6a1.3 1.3 0 0 0 .75 2.4h14.5a1.3 1.3 0 0 0 .75-2.4l-8-5.6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <img
          className="sample__image"
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <span className="sample__name">{item.name}</span>
    </li>
  );
}

// Built-in sample wardrobe for signed-out visitors, so the landing page shows
// the weather-to-outfit matching instead of an empty list. It follows the live
// weather type until the visitor picks a different one.
function SampleOutfit({ currentType, onSignUpClick }) {
  const [pickedType, setPickedType] = useState(null);

  const activeType = pickedType || currentType || "warm";
  const isToday = activeType === currentType;

  const items = defaultClothingItems.filter(
    (item) => item.weather === activeType
  );

  return (
    <section className="sample" aria-label="Sample outfits">
      <div className="sample__header">
        <h2 className="sample__title">
          {isToday ? "Suggested for today" : `Sample ${activeType}-weather outfits`}
        </h2>

        <div className="sample__chips" role="group" aria-label="Weather type">
          {TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`sample__chip ${
                type === activeType ? "sample__chip_active" : ""
              }`}
              aria-pressed={type === activeType}
              onClick={() => setPickedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <ul className="sample__list">
        {items.map((item) => (
          <SampleCard key={item.id} item={item} />
        ))}
      </ul>

      <p className="sample__note">
        This is a sample wardrobe.{" "}
        <button type="button" className="sample__link" onClick={onSignUpClick}>
          Sign up
        </button>{" "}
        to build your own.
      </p>
    </section>
  );
}

export default SampleOutfit;
