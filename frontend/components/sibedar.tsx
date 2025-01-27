import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarItem {
  id: string;
  title: string;
  links: { href: string; label: string }[];
}

interface SidebarProps {
  title: string;
  Icon: LucideIcon;
  items: SidebarItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ title, Icon, items }) => {
  return (
    <ScrollArea className="h-[100vh] w-[250px] rounded-md bg-gray-100">
      <div className="bg-gray-400 text-white font-bold p-2 text-center flex gap-2 items-center justify-center">
        <Icon />
        <p>{title}</p>
      </div>
      <Accordion type="multiple" className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-none">
            <AccordionTrigger className="text-xs px-4 font-semibold text-gray-700 hover:text-gray-900 transition hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 bg-gray-200 px-0">
                {item.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-xs px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};
