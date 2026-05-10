bad = "import { useSearchParams } from 'next/navigation';`nimport { Suspense } from 'react';" 
good = "import { useSearchParams } from 'next/navigation';\nimport { Suspense } from 'react';" 
content = content.replace(bad, good) 
open('app/payment/success/page.tsx', 'w', encoding='utf-8').write(content) 
print('Done') 
