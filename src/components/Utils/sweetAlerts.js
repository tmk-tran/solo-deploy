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
