'use client';

import type { Service } from '@/server/types';
import { StatusIcon } from '../StatusIcon';

type ServicesTableProps = {
  services: Service[];
};

export default function ServicesTable({ services }: ServicesTableProps) {
  return (
    <div className="border w-full rounded-lg max-w-2xl">
      <p className="bg-gray-100 font-semibold p-4">各サービス稼働状況</p>
      <ul>
        {services.map((svc) => (
          <li
            key={svc.id}
            id={`service-${svc.id}`}
            className="flex border-b last:border-none p-4"
          >
            <div className="flex-1">
              <p className="font-semibold">{svc.label.ja}</p>
              <p className="text-xs mt-1">{svc.description.ja}</p>
            </div>
            <div className="flex justify-center items-center">
              <StatusIcon status={svc.status} className="h-8 w-8 md:ml-2 ml-3" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
