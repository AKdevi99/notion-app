'use client';
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split('/').filter(Boolean); // remove empty segments

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className=" hover:text-white transition-colors">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');

          const isLast = index === segments.length - 1;

          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-gray-300">{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className=" hover:text-white transition-colors">
                    {segment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
