export const data = {
  education: [
    {
      id: 1,
      degree: "M.S. in Applied Data Intelligence",
      institution: "San Jose State University",
      location: "San Jose, CA",
      period: "2024 - 2026",
      gpa: "3.9/4.0",
      description: "Comprehensive blend of Data Analytics, Data Engineering, and Data Science, reinforced by Machine Learning and Artificial Intelligence.",
      achievements: [
        "Officer at Spartan Analytics",
      ],
      coursework: ["Machine Learning", "Deep Learning", "Generative Model Applications", "Big Data", "Data Warehouse & Pipelines", "Data Visualization", "Distributed Systems", "Statistics for Data Analytics"],
      logo: "/src/images/sjsu.png"
    },
    {
      id: 2,
      degree: "B.S. in Software Engineering",
      institution: "San Jose State University",
      location: "San Jose, CA",
      period: "2018 - 2023",
      gpa: "3.8/4.0",
      description: "Comprehensive foundation in computer science with focus on algorithms, data structures, and software engineering principles.",
      achievements: [
        "Dean's List - Spring 2020"
      ],
      coursework: ["Data Structures and Algorithms", "Object-Oriented Design", "Software Engineering Fundamentals", "Database Management Systems", "Software Quality Engineering", "Programming Paradigms"],
      logo: "/src/images/sjsu.png"
    }
  ],
  experiences: [
    {
      id: 1,
      title: "Senior Data Scientist",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Led a team of 5 data scientists in developing ML models for predictive analytics. Implemented advanced algorithms resulting in 25% improvement in model accuracy and $2M annual cost savings.",
      achievements: [
        "Deployed 15+ ML models to production",
        "Reduced model training time by 60%",
        "Led cross-functional team of 12 members"
      ],
      tags: ["Python", "TensorFlow", "AWS", "Docker", "Kubernetes"]
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      period: "2020 - 2022",
      description: "Developed scalable web applications serving 100K+ users. Built microservices architecture and implemented CI/CD pipelines, reducing deployment time by 80%.",
      achievements: [
        "Built 8 major features from scratch",
        "Improved application performance by 40%",
        "Mentored 3 junior developers"
      ],
      tags: ["React", "Node.js", "PostgreSQL", "Redis", "GraphQL"]
    }
  ],
  portfolioItems: [
    {
      id: 1,
      title: "Beyond the Tap – Water Quality Prediction in Bay Area",
      category: "Data Science",
      description: "Developed ML pipeline with feature engineering, applied ensemble models, and clustering to enhance prediction accuracy.",
      image: "/src/images/btt.png",
      tags: ["Pandas", "Scikit-learn", "XGBoost", "Random Forest", "K-Means", "DBSCAN"],
      github: "https://github.com/AnvayB/BeyondTheTap"
    },
    {
      id: 2,
      title: "SkyStream – Flight Delay & Economic Loss Prediction",
      category: "Data Engineering",
      description: "Built scalable PySpark ML pipeline for big data processing, predicting U.S. flight delays and airline revenue losses.",
      image: "/src/images/skys.jpeg",
      tags: ["Pandas", "Data Processing", "PySpark", "Apache MLlib", "Big Data Analytics"],
      github: "https://github.com/AnvayB/SkyStream"
    },
    {
      id: 3,
      title: "TrackFlow – Logistics and Order Management Platform",
      category: "Full-Stack",
      description: "Developed full-stack logistics platform, streamlining orders, PDF invoicing, email notifications, with scalable storage.",
      image: "/src/images/track.png",
      tags: ["TypeScript", "React", "Node.js", "AWS SES", "S3", "DynamoDB", "Microservices", "Leadership"],
      github: "https://github.com/AnvayB/TrackFlow"
    }
  ],
  contactInfo: [
    {
      icon: "Mail",
      label: "Email",
      value: "anvay.bhanap@gmail.com",
      href: "mailto:anvay.bhanap@gmail.com"
    },
    {
      icon: "Phone",
      label: "Phone",
      value: "+1 (408) 813-5245",
      href: "tel:+14088135245"
    },
    {
      icon: "MapPin",
      label: "Location",
      value: "San Jose, CA",
      href: "https://www.google.com/maps/place/San+Jose,+CA/@37.3731364,-121.9929255,11z/data=!4m6!3m5!1s0x808fcae48af93ff5:0xb99d8c0aca9f717b!8m2!3d37.33874!4d-121.8852525!16zL20vMGYwNHY?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D"
    }
  ]
};
