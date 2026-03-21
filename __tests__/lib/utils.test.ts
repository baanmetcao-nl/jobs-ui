import {
  capitalize,
  formatDate,
  formatNumber,
  truncate,
  intervalFormat,
  contractFormat,
  educationFormat,
  sanitizeInput,
  slugify,
} from "@/lib/utils";

describe("capitalize", () => {
  it("capitalizes the first letter and lowercases the rest", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("WORLD")).toBe("World");
    expect(capitalize("hELLO wORLD")).toBe("Hello world");
  });

  it("returns an empty string for falsy input", () => {
    expect(capitalize("")).toBe("");
  });

  it("handles a single character", () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize("A")).toBe("A");
  });
});

describe("formatDate", () => {
  it("formats a date string in Dutch locale", () => {
    const result = formatDate("2024-03-15");
    expect(result).toBe("15 maart 2024");
  });

  it("handles different months", () => {
    expect(formatDate("2024-01-01")).toBe("1 januari 2024");
    expect(formatDate("2024-12-31")).toBe("31 december 2024");
  });
});

describe("formatNumber", () => {
  it("formats a number in Dutch locale", () => {
    expect(formatNumber(1000)).toBe("1.000");
    expect(formatNumber(1000000)).toBe("1.000.000");
  });

  it("handles numbers below 1000 without separator", () => {
    expect(formatNumber(999)).toBe("999");
  });
});

describe("truncate", () => {
  it("returns the original string when within maxLength", () => {
    expect(truncate("hello", 10)).toBe("hello");
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("truncates and appends ellipsis when exceeding maxLength", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
  });

  it("handles an empty string", () => {
    expect(truncate("", 5)).toBe("");
  });
});

describe("intervalFormat", () => {
  it("returns the correct Dutch label for each interval", () => {
    expect(intervalFormat("hourly")).toBe("per uur");
    expect(intervalFormat("monthly")).toBe("per maand");
    expect(intervalFormat("daily")).toBe("per dag");
    expect(intervalFormat("weekly")).toBe("per week");
    expect(intervalFormat("4_weekly")).toBe("per 4 weken");
    expect(intervalFormat("yearly")).toBe("per jaar");
  });
});

describe("contractFormat", () => {
  it("returns the correct Dutch label for each contract type", () => {
    expect(contractFormat("permanent")).toBe("Vast contract");
    expect(contractFormat("temporary")).toBe("Tijdelijk contract");
  });
});

describe("educationFormat", () => {
  it("returns the correct Dutch label for each education level", () => {
    expect(educationFormat("none")).toBe("Geen");
    expect(educationFormat("primary")).toBe("Basisonderwijs");
    expect(educationFormat("secondary")).toBe("Voortgezet onderwijs");
    expect(educationFormat("vocational_training")).toBe("Beroepsopleiding");
    expect(educationFormat("higher_professional")).toBe(
      "Hoger beroepsonderwijs",
    );
    expect(educationFormat("university_bachelor")).toBe(
      "Universitair bachelor",
    );
    expect(educationFormat("university_master")).toBe("Universitair master");
    expect(educationFormat("doctorate")).toBe("Doctoraat");
    expect(educationFormat("unknown")).toBe("Niet bekend");
  });
});

describe("sanitizeInput", () => {
  it("replaces < with &lt;", () => {
    expect(sanitizeInput("<script>")).toBe("&lt;script&gt;");
  });

  it("replaces > with &gt;", () => {
    expect(sanitizeInput("value>0")).toBe("value&gt;0");
  });

  it("replaces both < and > in a string", () => {
    expect(sanitizeInput("<b>bold</b>")).toBe("&lt;b&gt;bold&lt;/b&gt;");
  });

  it("leaves a clean string unchanged", () => {
    expect(sanitizeInput("hello world")).toBe("hello world");
  });
});

describe("slugify", () => {
  it("converts a string to lowercase hyphen-separated slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes accents and diacritics", () => {
    expect(slugify("Développeur Fronténd")).toBe("developpeur-frontend");
  });

  it("replaces non-alphanumeric characters with hyphens", () => {
    expect(slugify("React & TypeScript!")).toBe("react-typescript");
  });

  it("strips leading and trailing hyphens", () => {
    expect(slugify("-hello-")).toBe("hello");
  });

  it("collapses multiple special characters into a single hyphen", () => {
    expect(slugify("foo   bar")).toBe("foo-bar");
  });

  it("handles an empty string", () => {
    expect(slugify("")).toBe("");
  });
});
