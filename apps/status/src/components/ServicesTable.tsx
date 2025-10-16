import { services } from 'data';
import { StatusIcon } from './StatusIcon';

const ServicesTable = () => {
  return (
    <div className="border w-full rounded-lg max-w-2xl">
      <p className="bg-gray-100 font-semibold p-4">各サービス稼働状況</p>
      <ul>
        {services.map((svc) => (
          <li key={svc.id} className="flex border-b last:border-none p-4">
            <div className="flex-1">
              <p className="font-semibold">{svc.name}</p>
              <p className="text-xs mt-1">{svc.descriptionJa}</p>
            </div>
            <div className="flex justify-center items-center">
              <StatusIcon status={svc.status} className="h-8 w-8 md:ml-2 ml-3" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesTable;
