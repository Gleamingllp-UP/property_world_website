import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function PropertyListMessage({ msg, autoAnimate = true, delay = 250 }) {
  const {
    message,
    subMessage,
    link,
    linkText,
    totalProperties,
    language,
    data = [],
    done,
  } = msg;

  const [visibleLines, setVisibleLines] = useState([]);

  const { t } = useTranslation();

  function hasVal(v) {
    if (v === null || v === undefined) return false;
    if (typeof v === "string") {
      const s = v.trim();
      return s !== "" && s !== "-" && s.toLowerCase() !== "n/a";
    }
    if (typeof v === "number") {
      return !Number.isNaN(v) && v > 0;
    }
    return true;
  }

  function buildMetaLine(prop = {}, labels = {}) {
    const {
      bedrooms,
      bathrooms,
      size, // assumed already formatted like "1,274 sq ft"
    } = prop;

    const L = {
      bedrooms: labels.bedrooms || "Bedrooms",
      bathrooms: labels.bathrooms || "Bathrooms",
      size: labels.size || "Size",
    };

    const parts = [];
    console.log("language");
    if (hasVal(bedrooms))
      parts.push(
        `${t(L?.bedrooms?.toLowerCase(), { lng: language })}: ${bedrooms}`
      );
    if (hasVal(bathrooms))
      parts.push(
        `${t(L?.bathrooms?.toLowerCase(), { lng: language })}: ${bathrooms}`
      );
    if (hasVal(size))
      parts.push(`${t(L?.size?.toLowerCase(), { lng: language })}: ${size}`);

    return parts.length ? parts.join(" | ") : null;
  }
  const lines = React.useMemo(() => {
    const out = [];
    if (message) out.push({ kind: "header", text: message });
    if (subMessage) out.push({ kind: "sub", text: subMessage });
    if (link) {
      out.push({
        kind: "link",
        text: `${t(linkText ?? "viewListing", { lng: language })}${
          typeof totalProperties === "number"
            ? ` (${t("propertiesAvailable", {
                lng: language,
                count: totalProperties,
              })} )`
            : ""
        }`,
        href: link,
      });
    }
    data &&
      data?.forEach((prop, idx) => {
        const meta = buildMetaLine(prop, language);

        out.push({ kind: "spacer", text: "" });
        out.push({ kind: "prop_title", text: `${idx + 1}. ${prop.title}` });
        if (prop.type)
          out.push({ kind: "prop_line", text: `Type: ${prop.type}` });
        out.push({
          kind: "prop_line",
          text: `${t("location", { lng: language })}: ${prop.location}`,
        });
        if (meta) {
          out.push({
            kind: "prop_line",
            text: meta,
          });
        }

        out.push({
          kind: "prop_line",
          text: `${t("price", { lng: language })}: ${prop.price}${
            prop.price_per_sqft ? ` ${prop.price_per_sqft}` : ""
          }`,
        });
        if (prop?.features?.length) {
          const featureText =
            prop?.features.slice(0, 5).join(", ") +
            (prop?.features?.length > 5 ? ", and more." : "");
          out.push({
            kind: "prop_line",
            text: `${t("features", { lng: language })}: ${featureText}`,
          });
        }
        out.push({
          kind: "prop_cta",
          text: t("viewListing", { lng: language }),
          href: prop?.link,
        });
      });
    return out;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, subMessage, link, linkText, totalProperties, data]);

  useEffect(() => {
    if (!autoAnimate) {
      setVisibleLines(lines);
      return;
    }
    setVisibleLines([]);
    lines.forEach((ln, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, ln]);
      }, delay * i);
    });
  }, [lines, autoAnimate, delay]);

  return (
    <div className="text-start">
      {visibleLines &&
        visibleLines?.map((ln, idx) => {
          switch (ln.kind) {
            case "header":
              return (
                <p key={idx} className="fw-bold mb-2">
                  {ln.text}
                </p>
              );
            case "sub":
              return (
                <p key={idx} className="fw-semibold mb-2">
                  {ln.text}
                </p>
              );
            case "link":
              return (
                <p key={idx} className="mb-2">
                  <a
                    href={ln.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    {ln.text}
                  </a>
                </p>
              );
            case "spacer":
              return <div key={idx} style={{ marginTop: "0.75rem" }} />;
            case "prop_title":
              return (
                <p key={idx} className="mb-1 fw-bold text-primary">
                  {ln.text}
                </p>
              );
            case "prop_line":
              return (
                <p key={idx} className="mb-1 small">
                  {ln.text}
                </p>
              );
            case "prop_cta":
              return (
                <p key={idx} className="mb-1 small">
                  <a
                    href={ln.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    {ln.text}
                  </a>
                </p>
              );
            default:
              return (
                <p key={idx} className="mb-1 small">
                  {ln.text}
                </p>
              );
          }
        })}

      {done && visibleLines.length === lines.length && (
        <p className="text-muted small mt-3">
          {t("feelFreeText", { lng: language })}
        </p>
      )}
    </div>
  );
}

export default React.memo(PropertyListMessage);
