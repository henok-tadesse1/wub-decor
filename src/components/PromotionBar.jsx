const PROMOTION_MESSAGE =
  "✦ NOW BOOKING 2026 & 2027 EVENTS · FREE INITIAL CONSULTATION · MANCHESTER & SURROUNDING AREAS · FAITH • LOVE • PURPOSE ✦";

function PromotionBar() {
  return (
    <section className="promotion-bar" aria-label="Business promotion">
      <div className="promotion-track">
        <span className="promotion-text">{PROMOTION_MESSAGE}</span>
        <span className="promotion-text promotion-text-duplicate" aria-hidden="true">
          {PROMOTION_MESSAGE}
        </span>
      </div>
    </section>
  );
}

export default PromotionBar;
