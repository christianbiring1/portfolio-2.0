export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Track pageviews
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track specific events
export const event = ({
  action,
  category,
  label,
  value,
}: Record<string, any>) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
