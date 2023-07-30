import { useState } from "react";

//Styles
import styles from "./SuggestSearchTermInput.module.scss";
import input_styles from "@singleElementsStyles/input.module.scss";

//Hooks
import { useInputValue } from "@hooks/useInputValue";

//React query
import { useMutation } from "@tanstack/react-query";

//Request functions
import suggestSearchTermFunctions from "@request-functions/SuggestSearchTerm";

const SuggestSearchTermInput = () => {
  //States
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  //Controlling inputs
  const SUGGESTED_TERM = useInputValue("");

  //Constst
  const ALLOWED_TO_SUGGEST_TIME = 1000 * 45;

  //React query
  const ADD_SUGGESTED_TERM = useMutation({
    mutationFn: (search_term) =>
      suggestSearchTermFunctions.addNewSearchTerm(search_term),

    onSuccess: (data) => {
      setSent(true);
      SUGGESTED_TERM.setValue("");

      //Put a sent:true in session storage to avoid the user to send another suggestion in the same session
      sessionStorage.setItem("sent", true);

      //Leave the sent state to false for some time to avoid the user to immediately send another suggestion
      setTimeout(() => {
        setSent(false);
      }, ALLOWED_TO_SUGGEST_TIME);
    },

    onError: (error) => {
      console.log(error);
      setError("Ha ocurrido un error, inténtalo más tarde");
    },
  });

  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    //Check if the suggested term is empty
    if (SUGGESTED_TERM.value.length === 0) {
      setError("Escribe un término para sugerir");
      return;
    }

    //Check the session storage to avoid the user to send another suggestion in the same session. The user will have the illusion that following suggestions are being sent, but they won't
    if (sessionStorage.getItem("sent")) {
      setSent(true);
      SUGGESTED_TERM.setValue("");
      setTimeout(() => {
        setSent(false);
      }, ALLOWED_TO_SUGGEST_TIME);
      return;
    }

    //Send the suggestion to the backend
    ADD_SUGGESTED_TERM.mutate(SUGGESTED_TERM.value);
  };

  //Don't allow the suggested term to be longer than 50 characters
  const handleSuggestedTermChange = (e) => {
    const MAX_LENGTH = 30;
    if (e.target.value.length > MAX_LENGTH) {
      setError(
        `El término sugerido no puede tener más de ${MAX_LENGTH} caracteres`
      );
    } else {
      setError(null);
      SUGGESTED_TERM.onChange(e);
    }
  };

  return sent ? (
    /////////////////////////
    //  After sendig view  //
    /////////////////////////
    <div className={styles.sent_message_container}>
      <h4>¡Gracias por tu sugerencia!</h4>
      <p>
        Apreciamos mucho tu ayuda para mejorar nuestro sitio y haremos lo
        posible para ofrecer lo que buscas lo antes posible.
      </p>
    </div>
  ) : (
    /////////////////////////
    //  Before sendig view  //
    /////////////////////////
    <div className={styles.container}>
      <h4>No hay resultados</h4>
      <p>Cuéntanos que te gustaría que añadiéramos en nuestro sitio:</p>
      <form action="" method="POST" autoComplete="off" onSubmit={handleSubmit}>
        <input
          className={input_styles.input}
          type="text"
          name="suggested_term"
          id="suggested_term"
          placeholder="Marca, artículo o categoría"
          autoComplete="off"
          onChange={handleSuggestedTermChange}
          value={SUGGESTED_TERM.value}
        />
        <button
          className={`${styles.submit_btn} ${
            ADD_SUGGESTED_TERM.isLoading ? styles.buttonLoading : ""
          } btn button--red`}
        >
          Enviar sugerencia
        </button>
      </form>
      {error && <p className="error__messagev2">{error}</p>}
    </div>
  );
};

export default SuggestSearchTermInput;
