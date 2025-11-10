import { services } from "data";
import { StatusIcon } from "./StatusIcon";
import type { Locale } from "@utils/locale";

type Props = {
  locale: Locale;
};

const headings = {
  ja: "各サービス稼働状況",
  en: "Service status overview",
} as const;

const ServicesTable = ({ locale }: Props) => {
  return (
    <div className="border w-full rounded-lg max-w-2xl">
      <p className="bg-gray-100 font-semibold p-4">{headings[locale]}</p>
      <ul>
        {services.map((svc) => (
          <li
            key={svc.id}
            id={`service-${svc.id}`}
            className="flex border-b last:border-none p-4"
          >
            <div className="flex-1">
              <p className="font-semibold">{svc.label[locale]}</p>
              <p className="text-xs mt-1">{svc.description[locale]}</p>
            </div>
            <div className="flex justify-center items-center">
              <StatusIcon
                status={svc.status}
                className="h-8 w-8 md:ml-2 ml-3"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesTable;
