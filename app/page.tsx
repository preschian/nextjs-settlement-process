import Link from 'next/link'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Select Your Role</CardTitle>
        <CardDescription>Role is for demonstration purposes only. You can switch between roles to see different views.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <RoleButton title="Request" description="Initiate a procurement request." />
          <RoleButton title="Review" description="Review and approve procurement requests." icon="lock" href="/review" />
        </div>
      </CardContent>
    </Card>
  )
}

function RoleButton({ title = '', description = '', icon = 'user', href = '/procurement' }) {
  const iconCss = `fa-sharp fa-light fa-${icon}`

  return (
    <Link href={href} className="flex gap-4 p-4 border rounded-lg hover:border-gray-900 hover:cursor-pointer">
      <div className="bg-gray-100 size-10 rounded-lg flex items-center justify-center">
        <i className={iconCss}></i>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col">
          <p>{title}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  )
}
