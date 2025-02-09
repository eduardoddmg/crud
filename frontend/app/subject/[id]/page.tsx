'use client';

import { BreadcrumbComp } from '@/components/breadcrumb';
import { ModuleList } from '@/modules/module/list';

const Page = () => {
  return (
    <div className="py-5 space-y-5">
      <BreadcrumbComp
        items={[
          { href: '/subject', name: 'Disciplinas' },
          { href: '', name: 'Módulos' },
        ]}
      />
      <ModuleList />
    </div>
  );
};

export default Page;
