const PROMOTION_MESSAGE =
  "✦ NOW BOOKING 2026 & 2027 EVENTS · FREE INITIAL CONSULTATION · MANCHESTER & SURROUNDING AREAS · FAITH • LOVE • PURPOSE ✦";

function PromotionBar() {
  return (
    <section className="promotion-bar" aria-label="Business promotion">
      <div className="promotion-track">
        <div className="promotion-group">
          <span className="promotion-text">{PROMOTION_MESSAGE}</span>
        </div>
        <div className="promotion-group promotion-group-duplicate" aria-hidden="true">
          <span className="promotion-text">{PROMOTION_MESSAGE}</span>
        </div>
      </div>
    </section>
  );
}

export default PromotionBar;
