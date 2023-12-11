import Swal from "sweetalert2";

export const savedAlert = () => {
  Swal.fire({
    title: "Game Saved!",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    confirmButtonColor: "#3085d6",
  });
};

export const perfectGame = () => {
  Swal.fire({
    title: "Perfect Score!",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    confirmButtonColor: "#1976D2",
  });
};
