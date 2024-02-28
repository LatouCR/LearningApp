import { updateSession } from '@/utils/middleware'
import { NextRequest } from 'next/server'
import readUserSession from "@/lib/readUserSession";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest) {
  const data = await readUserSession()
  if (!data) {
    return redirect('/logIn')
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/dashboard',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
