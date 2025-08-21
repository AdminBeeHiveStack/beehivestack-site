# Overview

BeeHiveStack is a professional single-page landing website designed as a master brand for fast-launch websites and digital products. The project serves as a centralized platform for email capture and future product launches across ecommerce, SaaS, and digital product categories. The site emphasizes clean design, compliance readiness (including Stripe integration preparation), and professional credibility while maintaining a staged rollout approach where payments will be enabled after verification.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom design system featuring brand colors (Bee-Gold #FFC72C, Bee-Black #0B0B0C, Bee-Gray #F7F7F8, Bee-Slate #1F2937)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for email subscription management
- **Data Validation**: Zod schemas for request/response validation
- **Development Setup**: Vite middleware integration for hot module replacement in development

### Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL with Replit Database integration (ACTIVE - August 17, 2025)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Email Storage**: DatabaseStorage class using persistent PostgreSQL storage
- **Storage Interface**: IStorage interface with automatic fallback (database preferred, memory backup)

### Authentication and Authorization
- **Current Implementation**: No authentication system (email-only capture)
- **Session Management**: Express sessions configured with PostgreSQL session store (connect-pg-simple)
- **Future Considerations**: User authentication system prepared but not currently active

### Key Features
- **Email Subscription System**: Complete email capture workflow with validation, duplicate prevention, and persistent PostgreSQL storage
- **Email Automation**: SendGrid integration with automated welcome emails and admin notifications (activated August 21, 2025)
- **Admin Dashboard**: Email management interface at /admin for subscriber management and newsletter broadcasting
- **Database Storage**: Email signups permanently saved to PostgreSQL database (activated August 17, 2025)
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint coverage
- **Accessibility**: WCAG compliance with proper ARIA labels, keyboard navigation, and screen reader support
- **SEO Optimization**: Complete meta tags, Open Graph protocol, and Twitter Card integration
- **Policy Framework**: Legal compliance with Privacy Policy, Terms of Service, and Refund Policy modals

## External Dependencies

### Cloud Infrastructure
- **Database**: Neon Database (PostgreSQL serverless)
- **Hosting**: Configured for deployment on Replit with development banner integration

### Frontend Libraries
- **UI Framework**: Radix UI component primitives for accessible, unstyled components
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts (Inter) for typography
- **Date Handling**: date-fns for date manipulation and formatting

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: ESBuild for production bundling
- **Development Experience**: Replit integration with cartographer plugin and runtime error overlay

### Styling and Design
- **CSS Framework**: Tailwind CSS with PostCSS and Autoprefixer
- **Design System**: Class Variance Authority (CVA) for component variant management
- **Utility Libraries**: clsx and tailwind-merge for conditional styling

### Form and Validation
- **Form Library**: React Hook Form with Radix UI resolver integration
- **Validation**: Zod for schema validation and type inference
- **Database Validation**: Drizzle-Zod for ORM schema validation

### Future Integrations
- **Payment Processing**: Stripe integration prepared but not yet implemented
- **Email Services**: SMTP or email service provider integration planned for notification system