function Auth({ children }) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const router = useRouter();
    const { status } = useSession({ required: true, onUnauthenticated() {
      router.push('/login');
    }, })
  
    if (status === "loading") {
      return <div>Loading...</div>
    }
  
    return children
}

export default Auth