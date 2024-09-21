import {Link} from "@/api/link.ts";

export const mockLinks: Link[] = [
    {
        _id: '1',
        title: 'Next.js Documentation',
        url: 'https://nextjs.org/docs',
        domain: 'nextjs.org',
        description: 'The React Framework for Production',
        image: 'https://nextjs.org/favicon.ico',
        tags: ['react', 'framework', 'documentation']
    },
    {
        _id: '2',
        title: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
        domain: 'tailwindcss.com',
        description: 'Rapidly build modern websites without ever leaving your HTML',
        image: 'https://tailwindcss.com/img/og-image.jpg',
        tags: ['css', 'utility-first', 'responsive']
    },
    {
        _id: '3',
        title: 'React Documentation',
        url: 'https://reactjs.org/docs',
        domain: 'reactjs.org',
        description: 'A JavaScript library for building user interfaces',
        image: 'https://reactjs.org/logo-og.png',
        tags: ['react', 'javascript', 'library']
    },
    {
        _id: '4',
        title: 'TypeScript Documentation',
        url: 'https://www.typescriptlang.org/docs/',
        domain: 'typescriptlang.org',
        description: 'TypeScript is JavaScript with syntax for types',
        image: 'https://www.typescriptlang.org/images/branding/logo-grouping.svg',
        tags: ['typescript', 'javascript', 'types']
    },
    {
        _id: '5',
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/',
        domain: 'developer.mozilla.org',
        description: 'Resources for developers, by developers',
        image: 'https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png',
        tags: ['web', 'documentation', 'html', 'css', 'javascript']
    },
]