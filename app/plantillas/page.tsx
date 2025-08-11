import { templates } from '@/lib/templates';
import Link from 'next/link';

export default function Page(){
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Plantillas disponibles</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {templates.map(t => (
          <div key={t.slug} className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{t.name}</h3>
              <span className="badge">Gratis (demo)</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t.description}</p>
            <Link href={`/editor?tpl=${t.slug}`} className="btn btn-primary">Rellenar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
