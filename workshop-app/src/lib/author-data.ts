export const author = {
  name: "Kristiyan Velkov",
  title: "Docker Captain · Cursor Ambassador · DevRel at Zerops · Tech Author",
  bio: "Developer Advocate and international speaker with 11+ years building scalable web platforms. DevRel at Zerops, Docker Captain, Cursor Ambassador, and tech author — I help teams ship React, Next.js, and Docker in production.",
  profileUrl: "https://www.bulgaritech.com/me",
  zeropsUrl: "https://zerops.io",
  booksUrl: "https://www.kristiyanvelkov.com",
  promoCode: "AICODE50",
  promoDiscount: "50%",
  photo: "/author/kristiyan-velkov.webp",
  logo: "/author/bulgaritech-logo.svg",
  highlights: [
    "Docker Captain",
    "Cursor Ambassador",
    "DevRel at Zerops",
    "Founder · BulgariTech",
    "4 published tech books",
    "350+ technical interviews",
    "International speaker",
  ],
  books: [
    {
      title: "Docker for React.js Developers",
      description:
        "From Docker basics to production React on AWS — images, Compose, CI/CD, and deployments that ship.",
      cover: "/author/books/docker-for-react.png",
    },
    {
      title: "Mastering React.js Interviews: For Middle/Senior Developers",
      description:
        "System design, architecture, and senior-level React topics for your next step up.",
      cover: "/author/books/react-interviews-senior.jpg",
    },
    {
      title: "Mastering React.js Interviews: From 0 to Hero",
      description:
        "Core React, JavaScript, and interview fundamentals — junior to confident answers.",
      cover: "/author/books/react-interviews-junior.png",
    },
    {
      title: "Mastering TypeScript Core Utility Types",
      description:
        "Practical patterns with TypeScript utility types for safer, more expressive code.",
      cover: "/author/books/typescript-utility-types.jpg",
    },
  ],
} as const;
