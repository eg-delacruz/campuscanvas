//Component used to analyze emails of students that skip
//the validation based on email structure, in order to
//improve verification sistem. These are stored in a separate collection
import store from "@server/components/unhandledEmails/store";

const createUnhandledEmailEntry = async (university, stu_email) => {
  if (!university || !stu_email || !stu_email.includes("@")) {
    console.error("[unhandledEmailsController] No hay universidad o password");
    return { message: "Los datos son incorrectos" };
  }

  //Check if the email is already in the database to avoid duplicates
  const unhandledEmail = await store.getByEmail(stu_email);

  if (unhandledEmail) {
    console.error(
      "[unhandledEmailsController] El email ya se encuentra en la base de datos"
    );
    return { message: "El email ya se encuentra en la base de datos" };
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
    console.error("[unhandledEmailsController]", error);
    throw new Error(error.message);
  }
};

const getAllUnhandledEmails = async () => {
  try {
    const unhandledEmails = await store.getAll();
    return unhandledEmails;
  } catch (error) {
    console.error(
      "[unhandledEmailsController | getAllUnhandledEmails function error]" +
        error.message
    );
    throw new Error(error.message);
  }
};

module.exports = {
  createUnhandledEmailEntry,
  getAllUnhandledEmails,
};
