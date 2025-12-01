export const checkPerformanceBudget = () => {
  const navigationTiming = performance.getEntriesByType("navigation")[0];
  const resources = performance.getEntriesByType("resource");

  const metrics = {
    pageLoad: navigationTiming.loadEventEnd - navigationTiming.navigationStart,
    domContentLoaded:
      navigationTiming.domContentLoadedEventEnd -
      navigationTiming.navigationStart,
    totalResources: resources.length,
    totalSize: resources.reduce(
      (total, resource) => total + (resource.transferSize || 0),
      0
    ),
  };

  // Performance budget
  const budget = {
    maxPageLoad: 3000,
    maxDomContentLoaded: 2000,
    maxResources: 50,
    maxSize: 2 * 1024 * 1024,
  };

  const violations = [];

  if (metrics.pageLoad > budget.maxPageLoad) {
    violations.push(`Page load time ${metrics.pageLoad}ms exceeds budget`);
  }

  if (metrics.totalSize > budget.maxSize) {
    violations.push(
      `Page size ${(metrics.totalSize / 1024 / 1024).toFixed(
        2
      )}MB exceeds budget`
    );
  }

  if (violations.length > 0 && window.gtag) {
    window.gtag("event", "performance_budget_violation", {
      event_category: "Performance",
      event_label: violations.join("; "),
    });
  }

  return { metrics, violations };
};
