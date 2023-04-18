// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useSession, getSession } from 'next-auth/react'

export default async function handler(req, res) {
  // const session = await getSession()
  const session = req.body.session.data.user
	console.log(session)
  res.status(200).json({ name: 'John Doe' })
}
