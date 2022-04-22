import store from '@server/components/unhandledEmails/store';

const createUnhandledEmailEntry = async (university, stu_email) => {
  if (!university || !stu_email || !stu_email.includes('@')) {
    console.error('[unhandledEmailsController] No hay universidad o password');
    return { message: 'Los datos son incorrectos' };
  }
  const unhandledEmailEntry = {
    university: university,
    stu_email: stu_email,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    const createdEntry = await store.add(unhandledEmailEntry);
    return createdEntry;
  } catch (error) {
    console.error('[unhandledEmailsController]', error);
    throw new Error(error.message);
  }
};

module.exports = {
  createUnhandledEmailEntry,
};
