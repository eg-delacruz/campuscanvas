import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

//Styles

const SecurePage = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  console.log({ session, loading });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (status === 'unauthenticated') {
    return (
      <p>
        Access Denied. Instead of returning this message, we could do
        router.push("/auth/login")
      </p>
    );
  }
  return (
    <div>
      <h1>Secure page</h1>
      <p>You can view this page because you are signed in.</p>
      <p>Email: {session.token.email}</p>
      <p>Rol: {session.token.role}</p>
    </div>
  );
};

export default SecurePage;
