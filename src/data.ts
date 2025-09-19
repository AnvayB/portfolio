import sjsu from './images/sjsu.png';
import btt from './images/btt.png';
import skys from './images/skys.jpeg';
import track from './images/track.png';
import sfcrime from './images/sfcrime.png';
import sjtraffic from './images/sjtraffic.png';
import platestack from './images/platestack.png';


export const data = {
  education: [
    {
      id: 1,
      degree: "M.S. in Applied Data Intelligence",
      institution: "San Jose State University",
      location: "San Jose, CA",
      period: "2024 - 2026",
      gpa: "3.9/4.0",
      description: "Seamless blend of Data Analytics, Data Engineering, and Data Science, reinforced by Machine Learning and Artificial Intelligence.",
      achievements: [
      ],
      coursework: ["Machine Learning", "Deep Learning", "Generative Model Applications", "Big Data", "Data Warehouse & Pipelines", "Data Visualization", "Distributed Systems", "Statistics for Data Analytics"],
      logo: sjsu
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
      logo: sjsu
    }
  ],
  experiences: [
    {
      id: 1,
      title: "Full-Stack Engineer (Gen AI)",
      company: "Stealth Startup",
      location: "San Jose, CA",
      period: "Nov. 2024 – Present",
      description: "",
      achievements: [

      ],
      tags: ["TypeScript", "React", "LangChain", "OpenAI", "Lovable", "Supabase"]
    },
    {
      id: 2,
      title: "Full-Stack Engineer",
      company: "CMSJ",
      location: "San Jose, CA",
      period: "May – Aug. 2025",
      description: "Developed and deployed full-stack SPA for real-time participant check-ins, with responsive UI, backend authentication, data pipelines, and automated CSV/XLSX exports.",
      achievements: [
        "Enabled seamless real-time check-ins across devices",
        "Automated backend exports and state management",
        "Scoped and delivered features with project manager"
      ],
      tags: ["JavaScript", "Node.js", "Express", "Tailwind CSS", "Python", "Render"]
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "Sdaemon Infotech",
      location: "Pune, India",
      period: "Jan. - Apr. 2025",
      description: "Created Power BI dashboards and automated reporting systems to track revenue, receivables, and client performance, delivering real-time insights for 57 international clients.",
      achievements: [
        "Built and maintained Power BI dashboards for financial health tracking",
        "Delivered real-time insights across 57 international clients",
        "Automated reporting with dynamic filters for products, locations, and segments"
      ],
      tags: ["Power BI", "Microsoft SQL Server", "DAX", "Data Visualization", "Analytics"]
    },
    {
      id: 4,
      title: "Principal Web Developer",
      company: "CHYK West",
      location: "San Jose, CA",
      period: "Dec. 2023 – Present",
      description: "Led development of national CHYK West website for 8,500+ members, enhancing SEO/UX, modernizing legacy code, and increasing traffic by 200%.",
      achievements: [
        "Increased monthly traffic by 200% (17,700+ views)",
        "Modernized codebase with secure JSON registration/payment forms",
        "Improved navigation and brand consistency"
      ],
      tags: ["WordPress", "CSS", "SEO", "UX", "Site Architecture"]
    },
    {
      id: 5,
      title: "WordPress Developer",
      company: "FiduciaryChat",
      location: "San Jose, CA",
      period: "May – Aug. 2023",
      description: "Built centralized networking hub for fiduciary industry with WordPress, designing consistent themes and implementing searchable directory, registration, and chat functionality.",
      achievements: [
        "Delivered cohesive user experience with plugins",
        "Created filterable search directory and chat system",
        "Designed consistent professional UI/UX"
      ],
      tags: ["WordPress", "Block Themes", "CSS", "Plugin Configuration"]
    },
    {
      id: 6,
      title: "Web Development Intern",
      company: "Prismatic Softwares",
      location: "Pune, India",
      period: "Jun. – Aug. 2022",
      description: "Developed internal employee management system using React and Spring Boot, integrating REST APIs and validating frontend-backend workflows.",
      achievements: [
        "Built React/Material-UI frontend for employee system",
        "Integrated REST APIs and tested with Postman",
        "Delivered functioning backend endpoints with Spring Boot"
      ],
      tags: ["React", "Material-UI", "Spring Boot", "REST APIs", "pgAdmin4"]
    }


  ],
  portfolioItems: [
    {
      id: 1,
      title: "Beyond the Tap – Water Quality Prediction in Bay Area",
      category: "Data Science",
      description: "Developed ML pipeline with feature engineering, applied ensemble models, and clustering to enhance prediction accuracy.",
      image: btt,
      tags: ["Pandas", "Scikit-learn", "XGBoost", "Random Forest", "K-Means", "DBSCAN"],
      link: "",
      github: "https://github.com/AnvayB/BeyondTheTap"
    },
    {
      id: 2,
      title: "SkyStream – Flight Delay & Economic Loss Prediction",
      category: "Data Engineering",
      description: "Built scalable PySpark ML pipeline for big data processing, predicting U.S. flight delays and airline revenue losses.",
      image: skys,
      tags: ["Pandas", "Data Processing", "PySpark", "Apache MLlib", "Streamlit", "Big Data Analytics"],
      link: "",
      github: "https://github.com/AnvayB/SkyStream"
    },
    {
      id: 3,
      title: "TrackFlow – Logistics and Order Management Platform",
      category: "Full-Stack",
      description: "Developed full-stack logistics platform, streamlining orders, PDF invoicing, email notifications, with scalable storage.",
      image: track,
      tags: ["TypeScript", "React", "Node.js", "AWS SES", "S3", "DynamoDB", "Microservices", "Leadership"],
      link: "",
      github: "https://github.com/AnvayB/TrackFlow"
    },
    {
      id: 4,
      title: "San Francisco Crime Pattern Analysis",
      category: "Data Engineering",
      description: "Designed data pipelines to process historical and real-time crime data to identify crime patterns, temporal trends, and geographic distributions.",
      image: sfcrime,
      tags: ["Pandas", "Snowflake", "dbt", "Airflow", "Power BI", "Predictive Analytics"],
      link: "https://drive.google.com/file/d/1wH0xzlh3snA5-PdfeY17hwcmski6wRpJ/view?usp=sharing",
      github: ""
    }, {
      id: 5,
      title: 'San Jose Traffic Collision Mapping',
      category: 'Data Analytics',
      description: 'Analyzed San Jose crash data to uncover causes, patterns, and danger zones, supporting traffic safety improvements and forecasting.',
      image: sjtraffic,
      tags: ['Pandas', 'Exploratory Data Analysis', 'Power BI', 'Tableau', 'Predictive Analytics'],
      link: 'https://drive.google.com/file/d/1gYrVsR-a6yDgWmhT1kXBhwZabDU4MXhr/view?usp=sharing',
      github: '',
    },
    {
      id: 6,
      title: 'PlateStack',
      category: 'Full-Stack',
      description: 'Lightweight mobile application for calculating barbell plate combinations for weightlifting (metric and imperial units).',
      image: platestack,
      tags: ['HTML', 'CSS', 'JavaScript', 'Creatine'],
      link: 'https://anvayb.github.io/PlateStack/',
      github: 'https://github.com/AnvayB/PlateStack',
    },
  ],
  contactInfo: [
    {
      icon: "Mail",
      label: "Email",
      value: "anvay.bhanap@gmail.com",
      href: "mailto:anvay.bhanap@gmail.com"
    },
    // {
    //   icon: "Phone",
    //   label: "Phone",
    //   value: "+1 (408) 813-5245",
    //   href: "tel:+14088135245"
    // },
    {
      icon: "MapPin",
      label: "Location",
      value: "San Jose, CA",
      href: "https://www.google.com/maps/place/San+Jose,+CA/@37.3731364,-121.9929255,11z/data=!4m6!3m5!1s0x808fcae48af93ff5:0xb99d8c0aca9f717b!8m2!3d37.33874!4d-121.8852525!16zL20vMGYwNHY?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D"
    }
  ]
};
