

# Developer Guide - Todo AI App

## Project Overview
This is a Next.js application built with React, TypeScript, and Tailwind CSS. The project follows modern web development best practices and is structured for scalability and maintainability.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js
- **Package Manager**: npm

## Project Structure

```
todo-ai/
├── src/
│   ├── app/                    # App Router directory (Next.js 13+)
│   │   ├── globals.css         # Global styles and Tailwind imports
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home page component
│   │   ├── api/                # API routes
│   │   │   └── [route]/        # Individual API endpoints
│   │   └── [feature]/          # Feature-based pages
│   │       ├── page.tsx        # Page component
│   │       └── layout.tsx      # Feature layout (optional)
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Base UI components (buttons, inputs, etc.)
│   │   ├── features/           # Feature-specific components
│   │   └── layout/             # Layout components (header, footer, etc.)
│   ├── lib/                    # Utility functions and configurations
│   │   ├── utils.ts            # Common utility functions
│   │   ├── validations.ts      # Zod schemas and validations
│   │   └── constants.ts        # App constants
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   │   ├── index.ts            # Main type exports
│   │   └── api.ts              # API-related types
│   └── styles/                 # Additional styling files
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.js             # Next.js configuration
```

## Folder Structure Guidelines

### `/src/app` - App Router (Next.js 13+)
- Use the new App Router for all new pages
- Each folder represents a route
- `page.tsx` defines the page component
- `layout.tsx` defines shared layout for nested routes
- `loading.tsx` for loading UI
- `error.tsx` for error boundaries

### `/src/components`
- **ui/**: Base, reusable UI components (Button, Input, Modal, etc.)
- **features/**: Feature-specific components that combine ui components
- **layout/**: Components for page structure (Header, Sidebar, Footer)

### `/src/lib`
- Utility functions, configurations, and shared logic
- Keep functions pure and well-tested
- Use meaningful names and JSDoc comments

### `/src/hooks`
- Custom React hooks for shared stateful logic
- Prefix with `use` (e.g., `useLocalStorage`, `useApi`)

### `/src/types`
- TypeScript interfaces and types
- Group related types in separate files
- Export commonly used types from `index.ts`

## Naming Conventions

### Files and Folders
- Use **kebab-case** for folders: `user-profile`, `api-client`
- Use **PascalCase** for React components: `UserProfile.tsx`, `ApiClient.tsx`
- Use **camelCase** for utilities and hooks: `formatDate.ts`, `useLocalStorage.ts`

### Components
- Use **PascalCase** for component names
- Use descriptive names that indicate purpose
- Suffix with component type when needed: `UserCard`, `LoginForm`, `LoadingSpinner`

### Variables and Functions
- Use **camelCase** for variables and functions
- Use descriptive names: `handleSubmit`, `isLoading`, `userProfile`
- Use **SCREAMING_SNAKE_CASE** for constants: `API_BASE_URL`, `MAX_RETRY_ATTEMPTS`

## Best Practices

### TypeScript
```typescript
// Always define types for props
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
  className?: string;
}

// Use type imports when possible
import type { User } from '@/types';

// Define return types for functions
const fetchUser = async (id: string): Promise<User> => {
  // implementation
};
```

### React Components
```typescript
// Use function components with TypeScript
const UserCard: React.FC<UserCardProps> = ({ user, onEdit, className }) => {
  return (
    <div className={`p-4 border rounded ${className}`}>
      {/* component content */}
    </div>
  );
};

export default UserCard;
```

### Tailwind CSS
- Use Tailwind utility classes instead of custom CSS when possible
- Group related classes: `flex items-center justify-between`
- Use responsive prefixes: `md:grid-cols-2 lg:grid-cols-3`
- Create custom components for repeated patterns

### API Routes
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // implementation
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### Error Handling
- Always handle errors gracefully
- Use try-catch blocks for async operations
- Provide meaningful error messages
- Use error boundaries for React components

### Performance
- Use `React.memo()` for expensive components
- Implement proper loading states
- Use Next.js Image component for images
- Implement proper caching strategies

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```


## Common Patterns

### Custom Hooks
```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setValue(JSON.parse(stored));
    }
  }, [key]);
  
  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  
  return [value, setStoredValue] as const;
};
```

### Error Boundaries
```typescript
// components/ErrorBoundary.tsx
'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error?: Error }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} />;
    }

    return this.props.children;
  }
}
```

## Troubleshooting

### Common Issues
1. **TypeScript errors**: Check type definitions and imports
2. **Tailwind not working**: Verify configuration and class names
3. **API routes not found**: Check file naming and folder structure
4. **Build failures**: Run `npm run type-check` to identify issues

### Debug Tips
- Use browser dev tools for client-side debugging
- Check Next.js console output for server-side issues
- Use TypeScript strict mode for better error catching
- Enable React DevTools for component debugging

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)