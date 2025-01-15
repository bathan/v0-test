'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, Settings, Wheat, Users, Flag, Map, Building2, MapPin, Wand2, BarChart, Dna, LayoutTemplate } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const menuItems = [
  { 
    name: 'Trials', 
    icon: ClipboardList, 
    href: '/dashboard/trials'
  },
  { 
    name: 'Producers', 
    icon: Users, 
    href: '/dashboard/producers'
  },
  {
    name: 'Charts',
    icon: BarChart,
    href: '/dashboard/charts'
  },
  { 
    name: 'Settings', 
    icon: Settings,
    subItems: [
      { name: 'Crops', icon: Wheat, href: '/dashboard/settings/crops' },
      { name: 'Hybrids', icon: Dna, href: '/dashboard/hybrids' },
      { name: 'Campaigns', icon: Flag, href: '/dashboard/settings/campaigns' },
    ]
  },
  {
    name: 'Regional Settings',
    icon: Map,
    subItems: [
      { name: 'Zones', icon: Map, href: '/dashboard/zones' },
      { name: 'States', icon: Building2, href: '/dashboard/states' },
      { name: 'Locations', icon: MapPin, href: '/dashboard/locations' },
    ]
  },
  {
    name: 'Gandalf',
    icon: Wand2,
    href: '/dashboard/gandalf'
  },
  {
    name: 'iFrame',
    icon: LayoutTemplate,
    subItems: [
      { name: 'Elminster', icon: Wand2, href: '/dashboard/iframe/Elminster' },
      { name: 'Gandalf', icon: Wand2, href: '/dashboard/iframe/Gandalf' },
      { name: 'Dumbledore', icon: Wand2, href: '/dashboard/iframe/Dumbledore' },
    ]
  }
]

export function LeftNavMenu() {
  const pathname = usePathname()
  const [openAccordion, setOpenAccordion] = useState<string | undefined>('item-1')

  return (
    <nav className="w-64 bg-primary text-primary-foreground shadow-md flex flex-col h-screen">
      <ul className="space-y-2 p-4 flex-grow">
        {menuItems.map((item, index) => (
          <li key={item.name}>
            {item.subItems ? (
              <Accordion
                type="single"
                collapsible
                value={openAccordion}
                onValueChange={setOpenAccordion}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="flex items-center justify-start py-2 px-4 text-primary-foreground hover:bg-primary/90 rounded-md w-full">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-6 space-y-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link 
                            href={subItem.href} 
                            className={cn(
                              "flex items-center justify-start py-2 px-4 text-primary-foreground hover:bg-primary/90 rounded-md w-full",
                              pathname === subItem.href && "bg-secondary text-secondary-foreground"
                            )}
                          >
                            <subItem.icon className="mr-2 h-5 w-5" />
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link 
                href={item.href} 
                className={cn(
                  "flex items-center justify-start py-2 px-4 text-primary-foreground hover:bg-primary/90 rounded-md w-full",
                  pathname === item.href && "bg-secondary text-secondary-foreground"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

