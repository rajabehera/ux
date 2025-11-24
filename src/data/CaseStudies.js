export const caseStudiesData = [
  {
    slug: "sudrives-user-app",
    badge: "UI/UX Case Study",
    title: "SuDrives User App",
    subtitle: "Delivering exceptional ride-hailing experiences through intuitive design and seamless functionality",
    colors: {
      primary: "#082c67ff",
      secondary: "#17545eff",
      accent: "#10b981"
    },
    meta: [
      { label: "Category", value: "Mobile Application" },
      { label: "Client", value: "Sudrives Pvt. Ltd." },
      { label: "Date", value: "March 2023" },
      { label: "Role", value: "UI/UX Designer" }
    ],
    overview: {
      title: "Project Overview",
      subtitle: "The SuDrives User App is a sophisticated and user-friendly platform designed to provide customers with an exceptional ride-hailing experience through advanced technology and a customer-centric approach.",
      challenge: {
        icon: "bi-bullseye",
        title: "The Challenge",
        description: "Customers needed a streamlined, reliable platform to book rides effortlessly, track their trips in real-time, and manage payments seamlessly while ensuring safety and transparency throughout the journey.",
        image:'../img/sd.png'
      },
      solution: {
        icon: "bi-lightbulb",
        title: "The Solution",
        description: "A comprehensive mobile application that integrates ride booking, real-time tracking, secure payment processing, and profile management into one intuitive, customer-focused platform."
      },
      impact: {
        icon: "bi-graph-up-arrow",
        title: "The Impact",
        description: "Enhanced user satisfaction through streamlined processes, improved transparency with real-time updates, and increased convenience with flexible payment options and comprehensive trip management."
      },
      highlights: [
        { emoji: "🎯", title: "User-Centered", description: "Designed with deep understanding of customer needs and pain points" },
        { emoji: "⚡", title: "Real-Time", description: "Live tracking and instant updates throughout the journey" },
        { emoji: "🔒", title: "Secure & Safe", description: "Comprehensive safety features and transparent driver information" }
      ]
    },
    screenshots: [
      {
        image: "../img/sd.png",
        label: "Home & Ride Booking",
        size: "medium"
      },
      {
        image: "../img/sudrives-user.png",
        label: "Real-Time Tracking",
        size: "wide"
      },
      {
        image: "../img/sudrives-user-1.png",
        label: "Thank you",
        size: "narrow"
      }
    ],
    features: [
      {
        icon: "bi-geo-alt",
        title: "Ride Booking",
          image: "../img/sd.png",
        description: "Straightforward and efficient ride booking process ensuring users can quickly arrange transportation with complete transparency and safety information.",
        subFeatures: [
          {
            icon: "bi-pin-map",
            title: "Location-Based Request",
            description: "Input pickup and drop-off locations with the app providing estimated fares and trip times for informed decision-making."
          },
          {
            icon: "bi-person-badge",
            title: "Driver Information",
            description: "Detailed driver information including name, rating, and vehicle details for enhanced safety and transparency."
          }
        ]
      },
      {
        icon: "bi-radar",
        title: "Real-Time Tracking",
        image: "../img/portfolio/sudrives-user.png",
        description: "Comprehensive real-time tracking from driver assignment to destination arrival, providing continuous visibility and peace of mind throughout the journey.",
        subFeatures: [
          {
            icon: "bi-broadcast",
            title: "Live Location Updates",
            description: "Real-time updates on driver location and estimated arrival time, keeping users informed at every moment."
          },
          {
            icon: "bi-speedometer",
            title: "Trip Progress",
            description: "Continuous trip tracking allowing users to view the route and any real-time changes during their journey."
          }
        ]
      },
      {
        icon: "bi-credit-card",
        title: "Payment Integration",
        image: "../img/portfolio/sudrives-user-1.png",
        description: "Simplified payment processing with transparent fare calculations and multiple payment options for maximum convenience and flexibility.",
        subFeatures: [
          {
            icon: "bi-wallet2",
            title: "Multiple Payment Methods",
            description: "Add and manage various payment options including credit/debit cards, digital wallets, and cash payments."
          },
          {
            icon: "bi-calculator",
            title: "Fare Calculation",
            description: "Transparent fare calculation with detailed breakdowns ensuring users understand the complete cost of their ride."
          },
          {
            icon: "bi-receipt",
            title: "Receipt Generation",
            description: "Automatic generation of digital receipts that can be accessed, viewed, and downloaded directly from the app."
          }
        ]
      },
      {
        icon: "bi-person-circle",
        title: "User Profile Management",
        image: "../img/portfolio/sudrives-user-2.png",
        description: "Comprehensive profile management system allowing users to maintain their information and access complete ride history for reference and record-keeping.",
        subFeatures: [
          {
            icon: "bi-pencil-square",
            title: "Update Personal Information",
            description: "Easily update personal details including name, contact information, and preferences for a personalized experience."
          },
          {
            icon: "bi-clock-history",
            title: "View Ride History",
            description: "Access detailed history of all past rides including comprehensive trip details and payment records."
          }
        ]
      }
    ],
    process: [
      {
        icon: <i class='bx  bx-group'></i> ,
        title: "User Research & Personas",
        description: "Conducted extensive user research to deeply understand customer needs, pain points, and expectations in the ride-hailing experience. Created detailed personas representing target users to inform and guide all design decisions throughout the project."
      },
      {
        icon: <i class='bx  bx-pencil-square'></i> ,
        title: "Wireframes & Prototyping",
        description: "Developed comprehensive wireframes to establish the app's structure, information architecture, and user flow. Created high-fidelity interactive prototypes demonstrating key functionalities and user interactions to validate design concepts."
      },
      {
        icon: <i class='bx  bx-check-circle'></i> ,
        title: "Usability Testing",
        description: "Conducted multiple usability testing sessions with potential users to gather valuable feedback on the app's functionality and user experience. Iteratively refined the design based on insights to enhance overall satisfaction and ease of use."
      },
      {
        icon: <i class='bx  bx-palette'></i>,
        title: "Visual Design",
        description: "Emphasized a clean, modern aesthetic with strong focus on usability and accessibility. Implemented a consistent color scheme and typography system to create a cohesive look and feel. Ensured essential information is easily accessible and all actions are straightforward and intuitive."
      }
    ],
    outcomes: {
      title: "Project Outcomes",
      description: "This case study illustrates the effective application of a comprehensive user-centered design process in developing the SuDrives User App. By meticulously following each stage—from initial research and conceptualization through iterative prototyping to final implementation—we created a solution that addresses the unique needs of users in the ride-hailing industry.",
      cards: [
        {
          icon: "bi-search",
          title: "Deep User Understanding",
          description: "Comprehensive insights gathered through extensive research and analysis of customer needs and expectations"
        },
        {
          icon: "bi-arrow-repeat",
          title: "Iterative Improvements",
          description: "Continuous design refinements based on user feedback and comprehensive usability testing sessions"
        },
        {
          icon: "bi-eye",
          title: "Visual Excellence",
          description: "Aesthetically appealing interface that perfectly balances visual design with functional requirements"
        },
        {
          icon: "bi-emoji-smile",
          title: "Enhanced Satisfaction",
          description: "Improved user satisfaction and convenience through streamlined processes and intuitive interactions"
        }
      ],
      conclusion: "The SuDrives User App stands as a testament to the power of user-centered design in creating digital products that not only meet but exceed user expectations. This project highlights the importance of a thorough design process in developing solutions that are both highly functional and visually compelling, ultimately delivering an exceptional ride-hailing experience that prioritizes customer satisfaction and convenience."
    }
  },
  {
    slug: "sahyog-healthcare-app",
    badge: "Healthcare UI/UX Case Study",
    title: "Sahyog Healthcare App",
    subtitle: "Connecting users with essential medical services through intuitive design and seamless healthcare access",
    colors: {
      primary: "#10b981",
      secondary: "#06b6d4",
      accent: "#3b82f6"
    },
    meta: [
      { label: "Category", value: "Healthcare Application" },
      { label: "Client", value: "Sahyog Pvt. Ltd." },
      { label: "Date", value: "November 2023" },
      { label: "Role", value: "UI/UX Designer" }
    ],
    overview: {
      title: "Project Overview",
      subtitle: "The Sahyog App is a comprehensive healthcare platform designed to connect users with essential medical services, offering an intuitive interface for booking diagnostics, pathology tests, and doctor appointments.",
      challenge: {
        icon: "bi-bullseye",
        title: "The Challenge",
        description: "Users needed a streamlined, accessible platform to book diagnostic tests, pathology services, and doctor appointments while ensuring security, transparency, and ease of use in healthcare service delivery."
      },
      solution: {
        icon: "bi-lightbulb",
        title: "The Solution",
        description: "A user-centric healthcare application integrating secure authentication, comprehensive service selection, and streamlined booking processes for diagnostics, pathology, and medical consultations."
      },
      impact: {
        icon: "bi-graph-up-arrow",
        title: "The Impact",
        description: "Simplified healthcare access with efficient booking processes, enhanced user confidence through transparent pricing and secure authentication, and improved convenience in managing health services."
      },
      highlights: [
        { emoji: "🏥", title: "Healthcare First", description: "Designed specifically for medical service accessibility and trust" },
        { emoji: "🔐", title: "Secure Access", description: "Multi-factor authentication with OTP verification for data privacy" },
        { emoji: "📊", title: "Transparent Pricing", description: "Clear pricing information for all diagnostic and pathology services" }
      ]
    },
    screenshots: [
      {
        image: "assets/img/portfolio/shayoag-1.png",
        label: "LogIn",
        size: "large"
      },
      {
        image: "assets/img/portfolio/shayoag-2.png",
        label: "Service Selection",
        size: "medium"
      },
      {
        image: "assets/img/portfolio/shayoag-3.png",
        label: "Diagnostics Booking",
        size: "medium"
      }
    ],
    features: [
      {
        icon: "bi-shield-lock",
        title: "Login and Registration",
        description: "Secure and straightforward authentication process ensuring user data privacy and account protection through multiple verification methods.",
        subFeatures: [
          {
            icon: "bi-phone",
            title: "Phone Number Verification",
            description: "Users can register and log in using their phone numbers with OTP verification process ensuring security and preventing unauthorized access."
          },
          {
            icon: "bi-key",
            title: "Password Authentication",
            description: "Secure password entry system to protect user accounts and maintain confidentiality of personal health information."
          }
        ]
      },
      {
        icon: "bi-grid-3x3",
        title: "Service Selection",
        description: "Easy navigation through various healthcare services offered by the app, providing users with comprehensive medical service options at their fingertips.",
        subFeatures: [
          {
            icon: "bi-clipboard-pulse",
            title: "Diagnostic Services",
            description: "Access to a wide range of diagnostic tests available from multiple accredited labs with transparent information."
          },
          {
            icon: "bi-microscope",
            title: "Pathology Services",
            description: "Comprehensive pathology testing options covering all essential medical examination requirements."
          },
          {
            icon: "bi-person-badge",
            title: "Doctor Appointments",
            description: "Convenient booking system for scheduling appointments with qualified doctors through the app interface."
          }
        ]
      },
      {
        icon: "bi-calendar-check",
        title: "Diagnostics Booking",
        description: "Comprehensive diagnostics section providing detailed information on available tests with transparent pricing and easy booking confirmation process.",
        subFeatures: [
          {
            icon: "bi-building",
            title: "Lab Selection",
            description: "Choose from multiple accredited laboratories with clear pricing information displayed for each facility and test option."
          },
          {
            icon: "bi-check-circle",
            title: "Booking Confirmation",
            description: "Streamlined booking process with instant confirmation and automatic receipt generation for record-keeping."
          }
        ]
      }
    ],
    process: [
      {
        icon: "bi-people",
        title: "User Research & Personas",
        description: "Conducted extensive user research to deeply understand the healthcare needs, pain points, and expectations of users seeking medical services. Developed detailed personas representing diverse user groups to guide the design process and ensure the solution addresses real-world healthcare challenges."
      },
      {
        icon: "bi-pencil-square",
        title: "Wireframes & Prototyping",
        description: "Created comprehensive wireframes to map out the app's structure, information architecture, and user flow for healthcare services. Developed high-fidelity prototypes to illustrate the app's functionality, demonstrating how users would navigate through diagnostics booking, service selection, and appointment scheduling."
      },
      {
        icon: "bi-check-circle",
        title: "Usability Testing",
        description: "Performed extensive usability testing with potential users from various demographics to gather comprehensive feedback on the app's functionality and user experience. Iteratively refined the design to improve accessibility, ease of use, and trust factors based on user insights and testing results."
      },
      {
        icon: "bi-palette",
        title: "Visual Design",
        description: "Focused on a clean and modern design aesthetic that instills trust and confidence in healthcare services. Implemented a consistent color scheme emphasizing health and wellness, with typography choices that enhance readability. Emphasized accessibility and ease of use throughout the design, ensuring all users can navigate healthcare services comfortably."
      }
    ],
    outcomes: {
      title: "Project Outcomes",
      description: "This case study showcases the successful development of the Sahyog App, a user-centric healthcare platform. Through a comprehensive design process that included user research, wireframing, prototyping, and usability testing, we created an app that effectively addresses the healthcare needs of users.",
      cards: [
        {
          icon: "bi-search",
          title: "In-Depth Understanding",
          description: "Comprehensive grasp of user requirements through extensive research and healthcare needs analysis"
        },
        {
          icon: "bi-arrow-repeat",
          title: "Iterative Enhancements",
          description: "Continuous design improvements based on user feedback and rigorous usability testing sessions"
        },
        {
          icon: "bi-eye",
          title: "Visually Appealing Interface",
          description: "Aesthetically pleasing and functional interface that builds trust and confidence in healthcare services"
        },
        {
          icon: "bi-speedometer2",
          title: "Streamlined Access",
          description: "Simplified and efficient access to essential healthcare services for all users"
        }
      ],
      conclusion: "The Sahyog App exemplifies the importance of user-centered design in developing digital solutions that meet and exceed user expectations. This project highlights the significance of a thorough design process in creating highly functional and visually compelling healthcare applications that genuinely improve access to essential medical services while maintaining security, transparency, and ease of use."
    }
  },
  {
    slug: "sudrives-partner-app",
    badge: "UI/UX Case Study",
    title: "SuDrives Partner App",
    subtitle: "Revolutionizing ride management through intuitive design and seamless user experience",
    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#f59e0b"
    },
    meta: [
      { label: "Category", value: "Mobile Application" },
      { label: "Client", value: "Sudrives Pvt. Ltd." },
      { label: "Date", value: "August 2023" },
      { label: "Role", value: "UI/UX Designer" }
    ],
    overview: {
      challenge: {
        title: "The Challenge",
        description: "Drivers and partners needed a streamlined solution to manage rides efficiently, track earnings, and maintain operational flexibility while navigating the complexities of modern ride-hailing services.",
        icon: "bi-bullseye"
      },
      solution: {
        title: "The Solution",
        description: "A user-centric mobile application that integrates ride creation, history management, wallet transactions, and real-time status tracking into one cohesive, intuitive platform.",
        icon: "bi-lightbulb"
      },
      impact: {
        title: "The Impact",
        description: "Enhanced operational efficiency, improved user satisfaction, and empowered drivers with tools to manage their work seamlessly while maintaining complete control over their availability.",
        icon: "bi-graph-up-arrow"
      },
      highlights: [
        { emoji: "🎯", title: "User-Centered", description: "Designed with drivers' needs at the core" },
        { emoji: "⚡", title: "Efficient Operations", description: "Streamlined workflow for maximum productivity" },
        { emoji: "💰", title: "Transparent Earnings", description: "Clear financial tracking and management" },
        { emoji: "🗺️", title: "Real-Time Control", description: "Complete availability management" }
      ]
    },
    screenshots: [
      {
        src: "assets/img/portfolio/sudrives-app-1.png",
        alt: "SuDrives App Ride Creation",
        label: "Ride Creation & Management"
      },
      {
        src: "assets/img/portfolio/sudrives-app-2.png",
        alt: "SuDrives App Dashboard",
        label: "Dashboard & Status Management"
      },
      {
        src: "assets/img/portfolio/sudrives-app.png",
        alt: "SuDrives App Wallet",
        label: "Onboarding"
      }
    ],
    features: [
      {
        title: "Ride Creation",
        icon: "bi-qr-code-scan",
        description: "Simplified ride creation process designed for efficiency and security, offering multiple authentication methods to suit different user needs.",
        subFeatures: [
          {
            title: "OTP Verification",
            icon: "bi-shield-check",
            description: "Secure One-Time Password authentication for partners, ensuring ride details are verified and reducing the risk of errors."
          },
          {
            title: "QR Code Scanning",
            icon: "bi-upc-scan",
            description: "Quick and contactless ride initiation through QR code scanning, providing an enhanced user experience for customers."
          }
        ]
      },
      {
        title: "Ride History Management",
        icon: "bi-clock-history",
        description: "Comprehensive ride tracking system providing detailed insights into all past trips with complete transparency.",
        subFeatures: [
          {
            title: "Status Updates",
            icon: "bi-arrow-repeat",
            description: "Real-time tracking of ride status including completed, ongoing, and cancelled trips for accurate record-keeping."
          },
          {
            title: "Trip Details",
            icon: "bi-map",
            description: "Detailed information including pickup/drop-off locations, distance covered, and fare details for comprehensive activity logs."
          }
        ]
      },
      {
        title: "Wallet Transactions",
        icon: "bi-wallet2",
        description: "Effortless financial management with transparent transaction tracking and flexible payment options.",
        subFeatures: [
          {
            title: "Current Balance",
            icon: "bi-cash-stack",
            description: "Real-time wallet balance display allowing drivers to track their earnings at a glance."
          },
          {
            title: "Transaction History",
            icon: "bi-list-check",
            description: "Detailed log of all financial activities including payments received and withdrawals made for complete transparency."
          },
          {
            title: "Payment Methods",
            icon: "bi-credit-card",
            description: "Add and manage multiple payment methods for flexible earning management and withdrawal options."
          },
          {
            title: "Withdraw Earnings",
            icon: "bi-bank",
            description: "Seamless withdrawal process with multiple options to receive earnings according to user preferences."
          }
        ]
      },
      {
        title: "Online/Offline Status Management",
        icon: "bi-geo-alt",
        description: "Real-time map integration providing drivers with complete control over their availability and location visibility.",
        subFeatures: [
          {
            title: "Status Toggle",
            icon: "bi-toggle-on",
            description: "Instant switching between online and offline modes, giving drivers full control over their availability."
          },
          {
            title: "Location Tracking",
            icon: "bi-pin-map",
            description: "Real-time location display on map for efficient navigation and customer visibility when online."
          }
        ]
      }
    ],
    process: [
      {
        title: "User Research & Personas",
        icon: "bi-people",
        description: "Conducted comprehensive user research to understand the needs, pain points, and daily challenges faced by cab drivers and partners. Created detailed personas representing target users to guide design decisions and ensure the solution addressed real-world problems."
      },
      {
        title: "Wireframes & Prototyping",
        icon: "bi-pencil-square",
        description: "Developed detailed wireframes to outline the app's structure, information architecture, and user flow. Created high-fidelity interactive prototypes demonstrating key functionalities and user interactions to validate design concepts before development."
      },
      {
        title: "Usability Testing",
        icon: "bi-check-circle",
        description: "Conducted multiple rounds of usability testing sessions with potential users to gather qualitative and quantitative feedback. Iteratively refined the design based on user insights to enhance overall user experience and address pain points."
      },
      {
        title: "Visual Design",
        icon: "bi-palette",
        description: "Emphasized a clean, modern aesthetic with strong focus on usability and accessibility. Implemented a consistent color scheme and typography system to create a cohesive look and feel. Ensured important information is easily accessible and actions are straightforward and intuitive throughout the interface."
      }
    ],
    outcomes: {
      summary: "This case study demonstrates the successful application of a comprehensive user-centered design process in developing the SuDrives Partner App. By meticulously following each stage—from initial research through iterative prototyping to final implementation—we created a solution that effectively addresses the unique needs of drivers and partners in the ride-hailing industry.",
      conclusion: "The SuDrives Partner App stands as a testament to the power of user-centered design in creating digital products that not only meet but exceed user expectations. This project highlights the importance of a thorough design process in developing solutions that are both highly functional and visually compelling, ultimately contributing to a more efficient and satisfying experience for all stakeholders in the ride-hailing ecosystem.",
      achievements: [
        {
          icon: "bi-search",
          title: "Deep User Understanding",
          description: "Comprehensive insights gathered through extensive research and analysis of user needs"
        },
        {
          icon: "bi-arrow-repeat",
          title: "Iterative Improvements",
          description: "Continuous design refinements based on user feedback and rigorous usability testing"
        },
        {
          icon: "bi-eye",
          title: "Visual Excellence",
          description: "Aesthetically appealing interface that perfectly balances form with functionality"
        },
        {
          icon: "bi-speedometer2",
          title: "Enhanced Efficiency",
          description: "Significantly improved operational efficiency for drivers and partners using the platform"
        }
      ]
    }
  }
];